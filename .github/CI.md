# Workflow Architecture

## Overview

Three entry points drive CI and deployment:

| Trigger                             | Workflow          | Purpose                                               |
| ----------------------------------- | ----------------- | ----------------------------------------------------- |
| Pull request (opened / synchronise) | `test-pr.yml`     | Validate the PR before merge                          |
| Push to `main`                      | `release.yml`     | Run CI, create the version PR or publish, deploy docs |
| Manual (`workflow_dispatch`)        | `deploy-docs.yml` | Emergency deploys and v4 LTS storybook updates        |

A fourth workflow, `release-manual.yml`, exists as a recovery tool for when the automated release workflow cannot run (e.g. after a failed publish mid-run).

## Workflow map

`release.yml` job dependencies:

```
check ──┐
test  ──┼── release ──── record-release  (only if published)
build ──┘          └──── deploy-docs     (prod if published, dev otherwise)
```

`test-pr.yml` runs these jobs in parallel, with `codacy` waiting on `test`:

```
pr-lint
check
test ──── codacy
build
docs
```

## Composite actions

Shared step bundles in `.github/actions/`. Each composite action handles Node setup and `yarn install` before running its command. The calling job is responsible for running `actions/checkout` first — GitHub Actions requires the repository to be present on the runner before a local composite action can be located.

| Action       | Command                | Used by                                                                     |
| ------------ | ---------------------- | --------------------------------------------------------------------------- |
| `check`      | `yarn check`           | `test-pr.yml` check job, `release.yml` check job                            |
| `test`       | `yarn test run [args]` | `test-pr.yml` test job (with `--coverage --silent`), `release.yml` test job |
| `build-lib`  | `yarn build:lib`       | `test-pr.yml` build job, `release.yml` build job                            |
| `build-docs` | `yarn build:docs`      | `test-pr.yml` docs job, `deploy-docs.yml`                                   |

## Deployment strategy

`release.yml` is the single source of truth for docs deployments on `main`. After the `release` job runs, the `deploy-docs` job always fires and chooses its target based on whether packages were published:

- **`published == 'true'`** (version PR was merged): deploys to `prod`
- **`published != 'true'`** (version PR created/updated, or no changesets): deploys to `dev`

`deploy-docs.yml` keeps its `workflow_dispatch` trigger to allow manual deploys — primarily for updating the v4 LTS storybook from the `lts` branch, which `release.yml` cannot do.

## Key decisions

**Why does the `release` job repeat checkout/setup/install instead of using a composite action?**
The `release` job needs a write-scoped checkout token (from the GitHub App) so that the `changesets/action` can push the version PR branch. Composite actions do their own checkout using the default read-only `GITHUB_TOKEN`. There is no way to pass a custom token into a composite action's `uses: actions/checkout` step, so the `release` job handles setup manually.

**Why is `fetch-depth: 0` only in the `release` job?**
`changesets/action` walks the full git history to find the last release tag and determine which packages changed. The `check`, `test`, and `build` jobs do not need history — a shallow clone is faster and sufficient.

**Why is the `dist/` artifact passed between jobs rather than rebuilding in `release`?**
Building twice wastes runner time and risks non-determinism between the build that was tested and the build that gets published. Uploading from `build` and downloading in `release` guarantees the exact same output is published.

**Why is Codacy coverage upload PR-only?**
Coverage feedback is most actionable pre-merge, where reviewers can see whether new code is tested. By the time a change lands on `main`, the window for acting on that feedback has closed.

**Why is `deploy-docs.yml` a separate reusable workflow rather than inlined into `release.yml`?**
The v4 LTS storybook must be deployable from the `lts` branch independently of `main`. A standalone `workflow_dispatch`-enabled workflow supports this without coupling v4 deploys to the release flow.
