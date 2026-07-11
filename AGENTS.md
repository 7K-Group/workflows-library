# Agent Notes

This repo is a **GitHub Actions reusable-workflow library**, not an application. Consuming
7KGroup repos call these workflows directly via
`uses: 7K-Group/workflows-library/.github/workflows/<file>.yml@v1`.

There is **no** top-level `ci.yml`/`release.yml` dispatcher — consumers call the per-stack
files (`ci-<stack>.yml`, `release-<stack>.yml`) directly.

## Workflows

CI: `ci-app`, `ci-cdk8s`, `ci-go-function`, `ci-crossplane`, `ci-crossplane-e2e`,
`ci-e2e-kind`, `ci-helm`, `ci-helm-library`, `ci-helm-docs`, `ci-docs`, `ci-kubeconform`,
`ci-lint-pr-title`, `ci-secret-scan`.

Release: `release-app`, `release-crossplane`, `release-function`, `release-helm`,
`release-docs`, `release-please`. Promotion (re-tag by digest): `promote`.

## Conventions

- Every reusable workflow sets top-level `concurrency` (CI `cancel-in-progress: true`;
  release `false`) and `timeout-minutes` per job. Preserve both when adding workflows.
- Third-party actions are SHA-pinned by Renovate (`pinDigests: true`); keep first-party on `@v1`.
- Tool installers live in the composite action `.github/actions/setup-platform-tools`
  (crossplane/helm/kubeconform/pluto). Canonical versions are in `.tool-versions` — keep the
  action's defaults in sync when bumping. Prefer the action over inline curl installs.
- Release workflows publish to **Harbor** and require secrets `HARBOR_REGISTRY`,
  `HARBOR_PROJECT`, `HARBOR_ROBOT_NAME`, `HARBOR_ROBOT_TOKEN` (consumers use `secrets: inherit`).
- `release-app` / `release-function` take a **short** image name and build the full ref as
  `${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${name}`. `ci-app` takes a **full** ref (CI tagging only).
- All published artifacts are signed with **keyless cosign** (`id-token: write`) and get an
  SPDX SBOM attestation where applicable.
- Crossplane xpkgs: build with `crossplane xpkg build --package-root=<dir> -o <file>`;
  Function xpkgs embed the runtime via `--embed-runtime-image=<image@digest>` (image must be in
  the local Docker cache — `docker pull` first in CI). Push with
  `crossplane xpkg push -f <file> <registry>/<repo>/<name>:<semver>` (tag must be semver).
- cdk8s repos are npm-workspace monorepos; `ci-cdk8s` runs at the workspace root (`path: .`).
- Helm charts require `values.schema.json`; library charts use `ci-helm-library`, not `ci-helm`.

## Local validation

No build/test/package manager. Validate with the same tools CI uses:

```bash
pip install yamllint
yamllint -d "{extends: default, rules: {line-length: {max: 200}, truthy: disable, document-start: disable}}" .github/workflows/
# actionlint (run in CI via raven-actions/actionlint@v2)
```

## Repo CI / release

- `library-ci.yml` (PRs): semantic PR-title lint + yamllint + actionlint.
- `library-release.yml` (push to `main`): release-please (`simple`) → tag `vX.Y.Z` → force-update
  the `v1` major tag. Consumers pin `@v1`. Never create tags manually.

## PR conventions

Conventional Commits. Allowed types (`ci-lint-pr-title.yml`):
`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
