# workflows-library

Reusable GitHub Actions workflows for the 7KGroup ecosystem. Consuming repos call
per-stack files directly — there is **no** top-level `ci.yml`/`release.yml` dispatcher.

```yaml
jobs:
  app-ci:
    uses: 7K-Group/workflows-library/.github/workflows/ci-app.yml@v1
    with:
      path: .
      image-name: ghcr.io/7kgroup/my-app
    secrets: inherit
```

Consumers pin to the moving major tag `@v1`, which `library-release.yml` force-updates
to the latest `v1.x.x` on every release.

## CI workflows

| Workflow                | Purpose                                                                                      | Key inputs                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `ci-app.yml`            | Docker build + Trivy scan (uploads SARIF)                                                    | `path`, `image-name` (full ref)                                                       |
| `ci-cdk8s.yml`          | `npm ci → lint → build → test:unit → synth → validate` for cdk8s workspace roots             | `path` (default `.`), `node-version`, `validate`, `lint`                              |
| `ci-go-function.yml`    | `go build/vet/test` (+ optional govulncheck, golangci-lint) for a Crossplane function module | `path`, `go-version` (default `1.24`), `run-golangci`, `run-govulncheck`              |
| `ci-crossplane.yml`     | yamllint + `crossplane xpkg build` (no push) + kubeconform + pluto; fails loudly             | `path` (package dir w/ `crossplane.yaml`), `kubernetes-version`, `crossplane-version` |
| `ci-e2e-kind.yml`       | kind cluster + optional setup script + `npm run test:e2e`                                    | `path`, `cluster-name`, `setup-script`                                                |
| `ci-helm.yml`           | lint → template → unittest → chart-testing → kubeconform → pluto                             | `path`, `kubernetes-version`                                                          |
| `ci-helm-library.yml`   | lint + schema check for `type: library` charts                                               | `path`, `target-branch`                                                               |
| `ci-helm-docs.yml`      | regenerate + auto-commit chart README from `README.md.gotmpl`                                | —                                                                                     |
| `ci-docs.yml`           | markdown lint                                                                                | `path`                                                                                |
| `ci-kubeconform.yml`    | kubeconform + pluto on raw manifests                                                         | `path`                                                                                |
| `ci-lint-pr-title.yml`  | Conventional-Commit PR title lint                                                            | —                                                                                     |
| `ci-secret-scan.yml`    | gitleaks secret scanning (full history)                                                      | —                                                                                     |
| `ci-crossplane-e2e.yml` | build xpkg → install into ephemeral kind via local registry → assert XRDs `Established`      | `path`, `image`, `prebuild`, `crossplane-version`, `kube-version`                     |

Helm charts require `values.schema.json`; add `.ci-api-versions` for custom CRDs.

## Release workflows

All release workflows publish to **Harbor** and sign with keyless cosign. Required secrets
(use `secrets: inherit`): `HARBOR_REGISTRY`, `HARBOR_PROJECT`, `HARBOR_ROBOT_NAME`, `HARBOR_ROBOT_TOKEN`.

| Workflow                 | Publishes                                                              | Key inputs                                                                                    |
| ------------------------ | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `release-app.yml`        | multi-tag container image + SBOM + cosign attest                       | `path`, `version`, `image-name` (**short** name)                                              |
| `release-crossplane.yml` | Configuration xpkg → Harbor OCI, signed + SBOM                         | `path`, `version`, `image` (short), `examples-root`                                           |
| `release-function.yml`   | runtime image + Function xpkg (runtime embedded) → Harbor, both signed | `path`, `package-path`, `version`, `image-name` (runtime), `function-name` (xpkg)             |
| `release-helm.yml`       | OCI chart → Harbor                                                     | `path`, `version`                                                                             |
| `release-docs.yml`       | TechDocs → S3 + dispatch                                               | `path`, `version`, `target-owner`, `target-repo`                                              |
| `release-please.yml`     | wrapper around release-please (manifest-aware)                         | `config-file`, `manifest-file`, `target-branch`; secret `RELEASE_PLEASE_TOKEN` (optional PAT) |
| `promote.yml`            | re-tag an existing image digest to `staging`/`prod` (no rebuild)       | `image` (short), `digest`, `tags` (csv), `sign`; Harbor secrets                               |

`release-app.yml` and `release-function.yml` build the full Harbor ref as
`${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${image-name}` — pass the **short** name, not a full ref.

## Typical consumer wiring

cdk8s platform repo (Hiroba-style):

```yaml
# .github/workflows/ci.yml
name: CI
on: { pull_request: { branches: [main] }, push: { branches: [main] } }
jobs:
  pr-title:
    if: github.event_name == 'pull_request'
    uses: 7K-Group/workflows-library/.github/workflows/ci-lint-pr-title.yml@v1
  cdk8s:
    uses: 7K-Group/workflows-library/.github/workflows/ci-cdk8s.yml@v1
    with: { path: . }
  function:
    uses: 7K-Group/workflows-library/.github/workflows/ci-go-function.yml@v1
    with: { path: functions/platform }
  xpkg:
    uses: 7K-Group/workflows-library/.github/workflows/ci-crossplane.yml@v1
    with: { path: packages/primitives }
```

```yaml
# .github/workflows/release.yml
name: Release
on: { push: { branches: [main] } }
jobs:
  release-please:
    uses: 7K-Group/workflows-library/.github/workflows/release-please.yml@v1
    secrets: inherit
  function:
    needs: release-please
    if: ${{ fromJson(needs.release-please.outputs.releases_created || '{}')['functions/platform'] }}
    uses: 7K-Group/workflows-library/.github/workflows/release-function.yml@v1
    with:
      path: functions/platform
      package-path: functions/platform/package
      version: <from release-please outputs>
      image-name: function-platform
      function-name: function-platform
    secrets: inherit
```

## Security & supply chain

- **Action pinning:** third-party actions are pinned to commit SHAs by Renovate
  (`renovate.json5` → `pinDigests: true`). First-party calls stay on the moving `@v1`.
- **Concurrency + timeouts:** every reusable workflow sets `concurrency` (CI cancels
  superseded runs; releases do not) and `timeout-minutes` per job.
- **Signing + verification:** `release-app` / `release-crossplane` / `release-function`
  sign with keyless cosign, attach an SPDX SBOM, and **self-verify** the signature and
  attestation against the workflow identity before finishing.
- **Promote by digest:** `promote.yml` re-tags an existing `image@sha256` (no rebuild),
  so staging/prod are byte-identical to what CI tested.
- **Deploy-time enforcement:** `policies/sigstore-clusterimagepolicy.yaml` is a reference
  Sigstore `ClusterImagePolicy` that rejects unsigned platform artifacts — copy it into
  cluster GitOps and substitute the Harbor registry/project placeholders.
- **Secret scanning:** `ci-secret-scan.yml` (gitleaks) runs on PRs.
- **Harbor auth:** releases use a Harbor robot user (`HARBOR_REGISTRY` / `HARBOR_PROJECT` /
  `HARBOR_ROBOT_NAME` / `HARBOR_ROBOT_TOKEN`, supplied via `secrets: inherit`). `id-token: write`
  on publish jobs is for keyless cosign signing only.

## Toolchain

Tool installers are centralized in the composite action
`.github/actions/setup-platform-tools` (crossplane / helm / kubeconform / pluto). Canonical
versions live in `.tool-versions`; keep the action's defaults in sync when bumping.

## Versioning

Do not create tags manually. `library-release.yml` runs release-please (`simple`) on `main`,
tags `vX.Y.Z`, then force-updates the `v1` major tag. Consumers pin `@v1`.

## PR conventions

PR titles must be Conventional Commits. Allowed types (`ci-lint-pr-title.yml`):
`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
