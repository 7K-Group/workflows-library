# Agent Notes

This repo is a **GitHub Actions reusable-workflow library**, not an application. Consuming Hiroba repos call these workflows via `uses: 7K-Hiroba/workflows-library/.github/workflows/<file>.yml@v1`.

## Local validation

There is no local build, test, or package manager. Validate workflow edits with the same tools CI uses:

```bash
pip install yamllint
yamllint -d "{extends: default, rules: {line-length: {max: 200}, truthy: disable, document-start: disable}}" .github/workflows/
```

`actionlint` is also run in CI via `raven-actions/actionlint@v2`; install locally if you want a pre-push check.

## Repo CI / release vs. consumer dispatchers

- **This repo's CI**: `.github/workflows/library-ci.yml` runs on PRs (semantic PR title lint, yamllint, actionlint).
- **This repo's release**: `.github/workflows/library-release.yml` runs on `main` (release-please, then force-updates the `v1` major tag).
- **Consumer entry points**: The README refers to `ci.yml` / `release.yml`, but the actual reusable dispatchers consumed by apps are the per-stack files (`ci-<stack>.yml`, `release-<stack>.yml`). There is no top-level `ci.yml` or `release.yml` in this repo.

## Workflow gotchas

- `ci-app.yml` takes a full `image-name` (e.g. `ghcr.io/7kgroup/myapp`) only for tagging the local CI build. `release-app.yml` takes a **short** `image-name` (e.g. `my-app`) and constructs the full Harbor path from `HARBOR_REGISTRY`/`HARBOR_PROJECT` secrets.
- `release-app.yml` pushes to **Harbor**, signs images with keyless cosign, and generates/attests an SPDX SBOM.
- Helm CI (`ci-helm.yml`) requires `values.schema.json` at the chart root and supports an optional `.ci-api-versions` file for extra `--api-versions` flags during `helm template` and kubeconform.
- `ci-helm-library.yml` is only for charts with `type: library` in `Chart.yaml`; use `ci-helm.yml` for application charts.
- `ci-helm-docs.yml` auto-commits generated `README.md` changes. It skips if the last commit already starts with `chore: update helm-docs` to avoid loops.
- `release-docs.yml` publishes TechDocs to S3 (`APPDOCS_S3_BUCKET`) and dispatches `docs-updated` to the `7K-Hiroba/Hiroba` repo via a GitHub App.
- `release-crossplane.yml` currently only validates YAML; the xpkg push is stubbed out.

## Versioning

Releases are fully automated. Do not manually create tags. `release-please` (simple release type) produces tags like `v1.10.0`, then `library-release.yml` force-pushes the `v1` major tag. Consuming repos pin to `@v1`.

## PR conventions

PR titles must follow Conventional Commits. Allowed types are defined in `.github/workflows/ci-lint-pr-title.yml`: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
