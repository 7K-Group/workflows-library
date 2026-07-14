# Agent Notes

This repo is a **GitHub Actions reusable-workflow library**, not an application. Consuming
7KGroup repos call these workflows directly via
`uses: 7K-Group/workflows-library/.github/workflows/<file>.yml@v1`.

There is **no** top-level `ci.yml`/`release.yml` dispatcher — consumers call the per-stack
files (`ci-<stack>.yml`, `release-<stack>.yml`) directly.

## Workflows

CI: `ci-app`, `ci-cdk8s`, `ci-go-function`, `ci-crossplane`, `ci-crossplane-e2e`,
`ci-e2e-kind`, `ci-helm`, `ci-helm-library`, `ci-helm-docs`, `ci-docs`, `ci-kubeconform`,
`ci-lint-pr-title`.

Release: `release-app`, `release-crossplane`, `release-function`, `release-helm`,
`release-docs`, `release-please`. Promotion (re-tag by digest): `promote`.

## Naming convention

Reusable workflow files follow a hierarchical grammar — left to right: *when* it
runs → *what ecosystem* → *what artifact* → *what toolchain* → *which variant*:

```
<phase>-<domain>[-<artifact>][-<lang>][-<variant>].yml
name: "<Phase>: <Domain>[ <Artifact>][ (<Lang>)][ – <Variant>]"
```

- **phase** (closed set): `ci` | `release` | `promote` | `bootstrap` | `library`
  (repo-internal pipelines).
- **domain**: technology/ecosystem, never the tool — `app`, `cdk8s`, `crossplane`,
  `helm`, `docs`, `manifests`, `pr`, `artifacthub`, `image`. Tools (kubeconform,
  helm-docs, cosign) are implementation detail and live in the workflow body.
- **artifact** (optional): a *secondary* artifact of the platform. A bare platform
  name means its primary artifact (`crossplane` = Configuration package,
  `helm` = chart); secondary artifacts are spelled out (`crossplane-function`).
- **lang** (optional): `go`, `python`, ... — only when the workflow pins a language
  toolchain. Omit for language-neutral (Docker/OCI) workflows.
- **variant** (optional, always last): `e2e`, `library`, `docs`, `metadata`, `lint`.
- Exception: `release-please.yml` — its domain *is* the tool.
- Job ids inside files follow the same idea (`build`, `test`, `e2e`, `lint`).
- Display names already use the v2 forms below even where files keep v1 names
  until the v2 tag — consumers reference file paths, not display names.

### v2 rename mapping (do NOT rename on v1 — breaking change)

| v1 (current) | v2 | Display name (already in use) |
|---|---|---|
| `ci-e2e-kind.yml` | `ci-cdk8s-e2e.yml` | `CI: cdk8s – e2e (kind)` |
| `ci-go-function.yml` | `ci-crossplane-function-go.yml` | `CI: Crossplane Function (Go)` |
| `ci-kubeconform.yml` | `ci-manifests.yml` | `CI: Manifests` |
| `ci-lint-pr-title.yml` | `ci-pr-lint.yml` | `CI: PR – Lint` |
| `promote.yml` | `promote-image.yml` | `Promote: Image` |
| `release-function.yml` | `release-crossplane-function.yml` | `Release: Crossplane Function` |

v2 migration notes: renames break consumer `uses:` paths AND cosign verification —
release workflows pin the workflow filename in `certificate-identity-regexp`
(e.g. `release-function.yml`), so consumers must update their verify policies in
lockstep with the v2 tag.

Enforcement: a `naming-check` job in `library-ci.yml` (regex-validating filenames
against the grammar, whitelisting the legacy names until v2) was considered and
deliberately NOT implemented — the convention is enforced in review. Revisit if
drift appears.

## Conventions

- `concurrency` goes ONLY on top-level workflows (callers). Reusable (`workflow_call`)
  workflows must NOT declare `concurrency` — inside a reusable call `${{ github.workflow }}`
  resolves to the caller's name, so the nested job joins the caller's group and GitHub
  reports a "deadlock for concurrency group" and cancels everything. Reusable workflows keep
  `timeout-minutes` per job; cancellation policy lives with the caller
  (CI `cancel-in-progress: true`, release `false`).
- **Release workflows** (`release-*.yml`, `promote.yml`) pin every third-party action to a
  full SHA (with a `# vX` comment for Renovate `pinDigests`); first-party refs stay on `@v1`.
  `library-ci.yml`'s `pin-check` job enforces this. CI workflows stay on major tags.
- Tool installers live in the composite action `.github/actions/setup-platform-tools`
  (crossplane/helm/kubeconform/pluto). Reference it ONLY via the fully-qualified form
  `7K-Group/workflows-library/.github/actions/setup-platform-tools@v1` — a relative `uses: ./...`
  path resolves against the *calling* repo's checkout and breaks consumers. This requires the
  repo to stay public: composite actions in private repos cannot be consumed cross-repo.
- **Version management**: `.tool-versions` holds the canonical tool versions; the composite
  action's input defaults MUST mirror them, and any `*-version` workflow input default must
  match too. `library-ci.yml`'s `version-sync` job enforces all three stay in sync, and its
  install guard fails any workflow that installs crossplane/helm/kubeconform/pluto directly
  (curl or `azure/setup-helm`) instead of via the action. Workflows expose `helm-version` /
  `kubeconform-version` / `pluto-version` overrides defaulting to the standard version.
  In the action, pass `""` for tools you don't need (defaults install ALL four).
- Release workflows publish to **Harbor** and require secrets `HARBOR_REGISTRY`,
  `HARBOR_PROJECT`, `HARBOR_ROBOT_NAME`, `HARBOR_ROBOT_TOKEN` (consumers use `secrets: inherit`).
- `release-app` / `release-function` take a **short** image name and build the full ref as
  `${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${name}`. `ci-app` takes a **full** ref (CI tagging only).
- All published artifacts are signed with **keyless cosign** (`id-token: write`). Container
  images and Function xpkgs also get an SPDX SBOM attestation; Configuration packages contain
  only YAML and are signature-only.
- Crossplane xpkgs: build with `crossplane xpkg build --package-root=<dir> -o <file>`;
  Function xpkgs embed the runtime via `--embed-runtime-image=<image@digest>` (image must be in
  the local Docker cache — `docker pull` first in CI). Push with `crossplane xpkg push -f <file> <registry>/<repo>/<name>:<semver>` (tag must be semver).
- cdk8s repos are npm-workspace monorepos; `ci-cdk8s` runs at the workspace root (`path: .`).
- Helm charts require `values.schema.json`; library charts use `ci-helm-library`, not `ci-helm`.
- Helm docs generation lives in `ci-helm-docs` (auto-commits `README.md` from
  `README.md.gotmpl`, `chart-root` input selects the search dir). Release workflows never
  generate docs — the released chart must already have them.

## Local validation

No build/test/package manager. Validate with the same tools CI uses:

```bash
pip install yamllint
yamllint -d "{extends: default, rules: {line-length: {max: 200}, truthy: disable, document-start: disable}}" .github/workflows/
# actionlint (run in CI via raven-actions/actionlint@v2)
```

## E2E testing (fixtures + dry runs)

`library-e2e.yml` (PRs) exercises the reusable workflows and the composite action for
real, using minimal fixtures under `tests/fixtures/`:

- `helm-chart` — app chart with `values.schema.json` + helm-unittest suite (feeds `ci-helm`, `release-helm`)
- `helm-chart-broken` — same chart WITHOUT `values.schema.json` (negative test: `ci-helm` must fail)
- `helm-library-chart` — library-type chart (feeds `ci-helm-library`)
- `manifests` — plain k8s manifests (feeds `ci-kubeconform`)
- `go-function` — tiny Go module + Dockerfile (feeds `ci-go-function`, `release-function`)
- `app` — minimal Dockerfile (feeds `ci-app`, `release-app`)
- `crossplane-package` — Configuration meta + Composition + XRD (feeds `ci-crossplane`, `ci-crossplane-e2e`, `release-crossplane`)
- `function-package` — Function meta for `release-function`'s embedded-runtime xpkg build
- `cdk8s` — npm-workspace monorepo (one cdk8s package; feeds `ci-cdk8s`, `ci-e2e-kind`)
- `docs` — Markdown file (feeds `ci-docs`)

The composite action is tested via a relative `uses: ./.github/actions/setup-platform-tools`
(works inside this repo's own workflows only — consumers must still use the fully-qualified
`...@v1` form). `.ct.yaml` at the repo root disables chart-testing's version-increment and
maintainer checks for the fixture charts (`ci-helm-library` keeps its own increment check —
bump `helm-library-chart`'s `version` when touching it).

Release workflows (`release-app`, `release-helm`, `release-crossplane`, `release-function`)
and `promote` accept `dry-run: true`: they build/package/validate locally but skip Harbor
login, push/re-tag, cosign sign/verify and SBOM attestation. Harbor secrets are optional and
only validated when `dry-run` is false — the e2e pipeline calls them with no secrets at all.
Keep `dry-run` false (the default) for real consumer releases.

The negative-test job (`negative-helm-missing-schema`) lints the broken chart (passes) and
then asserts ci-helm's schema gate verbatim rejects it — `continue-on-error` is not allowed on
reusable-call jobs, so negative tests run as shell jobs. The final `e2e-summary` job
aggregates all results — make it the required status check in branch protection.

## Repo CI / release

- `library-ci.yml` (PRs): semantic PR-title lint + yamllint + actionlint + version-sync
  check + install guard + release pin-check.
- `library-release.yml` (push to `main`): release-please (`simple`) → tag `vX.Y.Z` → force-update
  the `v1` major tag. Consumers pin `@v1`. Never create tags manually.

## PR conventions

Conventional Commits. Allowed types (`ci-lint-pr-title.yml`):
`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
