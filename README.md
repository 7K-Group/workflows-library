# workflow-library

Reusable GitHub Actions workflows for the 7KGroup ecosystem.

All application repositories scaffolded by [Hiroba](https://github.com/7K-Hiroba/Hiroba) reference these workflows via `uses: 7K-Hiroba/workflows-library/.github/workflows/<workflow>.yml@v1`.

## Architecture

Consuming repos call two entry-point workflows (`ci.yml`, `release.yml`) with a `stack` parameter. These dispatchers route to per-stack workflow files:

```
Consuming repo                    workflow-library
─────────────                     ────────────────
ci.yml                            ci.yml (dispatcher)
  job: stack=app       ──────►      ci-app.yml           → test, build, scan
  job: stack=helm      ──────►      ci-helm.yml          → lint, template, test
  job: stack=docs      ──────►      ci-docs.yml          → build, lint
  job: stack=crossplane ─────►      ci-crossplane.yml    → validate
  job: stack=kubeconform ────►      ci-kubeconform.yml   → validate manifests, deprecated APIs

release-please.yml                release.yml (dispatcher)
  job: stack=app       ──────►      release-app.yml      → build+push to GHCR
  job: stack=helm      ──────►      release-helm.yml     → package+push OCI chart
  job: stack=docs      ──────►      release-docs.yml     → publish TechDocs
  job: stack=crossplane ─────►      release-crossplane.yml → package xpkg
```

## Workflows

### Entry Points (called by consuming repos)

| Workflow | Purpose |
|---|---|
| `ci.yml` | Dispatcher — routes to per-stack CI workflow |
| `release.yml` | Dispatcher — routes to per-stack release workflow |

### Per-Stack CI

| Workflow | Jobs |
|---|---|
| `ci-app.yml` | Detect runtime → test (node/go/python) → docker build → Trivy scan |
| `ci-helm.yml` | Helm lint → template render → chart-testing → kubeconform → deprecated API detection |
| `ci-helm-library.yml` | Verify `type: library` → helm lint → values.schema.json presence → ct lint. Use for Helm *library* charts (the standard `ci-helm.yml` can't render templates of a library chart). |
| `ci-docs.yml` | markdown lint |
| `ci-crossplane.yml` | YAML validation → kubectl dry-run |
| `ci-kubeconform.yml` | kubeconform schema validation → pluto deprecated API detection |

### Per-Stack Release

| Workflow | Jobs |
|---|---|
| `release-app.yml` | Build + push multi-tag image to GHCR |
| `release-helm.yml` | Lint → package → push chart to OCI registry |
| `release-docs.yml` | Build + publish TechDocs |
| `release-crossplane.yml` | Validate → package (xpkg) |

## Inputs

### `ci.yml`

| Input | Required | Description |
|---|---|---|
| `stack` | yes | Stack type: `app`, `helm`, `docs`, `crossplane` |
| `path` | yes | Path to the stack root within the repo |
| `image-name` | app only | Full image name (e.g., `ghcr.io/7kgroup/myapp`) |

### `release.yml`

| Input | Required | Description |
|---|---|---|
| `stack` | yes | Stack type: `app`, `helm`, `docs`, `crossplane` |
| `path` | yes | Path to the stack root within the repo |
| `version` | yes | Semver version from release-please |
| `image-name` | app only | Full image name for container registry |

## Usage

```yaml
# In a consuming repo's ci.yml:
jobs:
  helm-base:
    uses: 7K-Hiroba/workflows-library/.github/workflows/ci.yml@v1
    with:
      stack: helm
      path: helm/base
    secrets: inherit
```

## Adding a New Stack

1. Create `ci-<stack>.yml` with `workflow_call` trigger and `path` input
2. Create `release-<stack>.yml` with `workflow_call` trigger and `path` + `version` inputs
3. Add routing entries in `ci.yml` and `release.yml` dispatchers

## Versioning

This repo uses tags for stability. Consuming repos pin to `@v1`. We maintain `v1` as a moving tag on the latest `v1.x.x` release.

## License

[Apache License 2.0](LICENSE)
