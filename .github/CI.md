# Workflow Architecture

## Overview

Three entry points drive CI and deployment:

| Trigger                             | Workflow                 | Purpose                                               |
| ----------------------------------- | ------------------------ | ----------------------------------------------------- |
| Pull request (opened / synchronise) | `test-pr.yml`            | Validate the PR before merge                          |
| Push to `main`                      | `release.yml`            | Run CI, create the version PR or publish, deploy docs |
| Manual (`workflow_dispatch`)        | `deploy-docs-manual.yml` | Emergency deploys and v4 LTS storybook updates        |

A fourth workflow, `release-manual.yml`, recovers from situations where the automated release workflow cannot run (e.g. a failed publish mid-run).

## Workflow map

`release.yml` job dependencies:

```
check ──┐               ┌── record-release   (only if published)
test  ──┼── release ────┼── publish-figma    (only if published)
build ──┘               └── deploy-docs      (prod if published, dev otherwise)
                            │
docs ───────────────────────┘
```

`test-pr.yml` runs these jobs in parallel, with `codacy` waiting on `test`:

```
pr-lint
check
test ──── codacy
build
docs
figma
```

## Composite actions

Shared step bundles in `.github/actions/`. Each composite action handles Node setup before running its command; most also run `yarn install`. `deploy-docs` skips `yarn install` because it has no project dependencies. The calling job must run `actions/checkout` first — GitHub Actions requires the repository to be present on the runner before it can locate a local composite action.

| Action          | Command                             | Used by                                                                                                |
| --------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `check`         | `yarn check`                        | `test-pr.yml` check job, `release.yml` check job                                                       |
| `test`          | `yarn test run [args]`              | `test-pr.yml` test job (with `--coverage --silent`), `release.yml` test job                            |
| `build-lib`     | `yarn build:lib`                    | `test-pr.yml` build job, `release.yml` build job                                                       |
| `build-docs`    | `yarn build:docs`                   | `test-pr.yml` docs job, `release.yml` docs job, `deploy-docs-manual.yml`                               |
| `deploy-docs`   | Cloudflare Wrangler deploy          | `release.yml` deploy-docs job, `deploy-docs-manual.yml`                                                |
| `publish-figma` | `yarn figma connect publish [args]` | `test-pr.yml` figma job (with `--dry-run --exit-on-unreadable-files`), `release.yml` publish-figma job |

## Deployment strategy

`release.yml` is the single source of truth for docs deployments on `main`. The `docs` job builds Storybook early in the pipeline (parallel with check, test, and build) and uploads the artifact for deployment. The `deploy-docs` job waits for both `release` and `docs` to complete, then chooses its target based on whether the release job published packages:

- **`published == 'true'`** (version PR was merged): deploys to `prod`
- **`published != 'true'`** (version PR created/updated, or no changesets): deploys to `dev`

`deploy-docs-manual.yml` retains a `workflow_dispatch` trigger for manual deploys — primarily updating the v4 LTS storybook from the `lts` branch, which `release.yml` cannot reach.

## Key decisions

**Why does `release.yml` use `cancel-in-progress: false` for its concurrency group?**
Aborting a publish mid-flight can leave npm in a partially-published state. Serialising with `cancel-in-progress: false` lets the second run wait rather than kill the first.

**Why does `deploy-docs-manual.yml` use `cancel-in-progress: true` for its concurrency group?**
Unlike a publish, a Cloudflare deploy is idempotent — the most recent deployment wins. Cancelling a stale deploy and letting the newest one proceed is safe and avoids deploying an outdated build.

**Why does the `release` job repeat checkout/setup/install instead of using a composite action?**
The `release` job needs to control `actions/checkout` directly because it must use a write-scoped checkout token (from the GitHub App) so that `changesets/action` can push the version PR branch. In this repo, the shared composite actions are local actions under `.github/actions/`, so they cannot be used until after the repository has already been checked out. `release` therefore repeats checkout/setup/install explicitly rather than delegating to a composite action.

**Why is `fetch-depth: 0` only in the `release` job?**
`changesets/action` walks the full git history to find the last release tag and determine which packages changed. The `check`, `test`, `build`, and `docs` jobs need only a shallow clone, which is faster.

**Why are `dist` and `docs` artifacts passed between jobs rather than rebuilding?**
Building twice wastes runner time and risks non-determinism. Uploading from the build job and downloading in the consumer job guarantees the same output is published or deployed.

**Why is Codacy coverage upload PR-only?**
Coverage feedback is most actionable pre-merge, where reviewers can see whether new code is tested. After a change lands on `main`, reviewers can no longer act on it.

**Why is Figma Code Connect validated with `--dry-run` in PRs but only published after a release?**
Dry-running in `test-pr.yml` catches broken Code Connect definitions before merge without touching Figma. The publish-figma job runs only when `published == 'true'`, keeping Figma component definitions in sync with the npm release — the job never publishes definitions for unreleased code.

**Why is `deploy-docs-manual.yml` a standalone workflow rather than a reusable workflow called from `release.yml`?**
The v4 LTS storybook must be deployable from the `lts` branch independently of `main`. A standalone `workflow_dispatch`-enabled workflow supports this without coupling v4 deploys to the release flow. In `release.yml`, the `docs` job builds Storybook and the `deploy-docs` job deploys the pre-built artifact, so docs are built only once per run.
