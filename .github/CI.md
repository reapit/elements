# Workflow Architecture

> Setting up a new maintenance branch? See [MAINTENANCE.md](MAINTENANCE.md).

## Overview

Five workflows drive CI and deployment:

| Trigger                                                 | Workflow                 | Purpose                                                     |
| ------------------------------------------------------- | ------------------------ | ----------------------------------------------------------- |
| Pull request (opened / synchronize / reopened / edited) | `lint-pr.yml`            | Validate the PR title                                       |
| Pull request (opened / synchronize / reopened)          | `test-pr.yml`            | Validate the PR before merge and deploy a Storybook preview |
| Pull request (closed) / schedule (weekly)               | `cleanup-preview.yml`    | Delete preview Workers when a PR is closed or orphaned      |
| Push to `main`                                          | `release.yml`            | Run CI, create the version PR or publish, deploy docs       |
| Push to `lts`                                           | `release.yml`            | Run CI, create the version PR or publish v4 LTS docs        |
| Manual (`workflow_dispatch`)                            | `release.yml`            | Recovery publish from a specific ref                        |
| Manual (`workflow_dispatch`)                            | `deploy-docs-manual.yml` | Emergency deploys and v4 LTS storybook updates              |

## Workflow map

`release.yml` job dependencies (push to `main`):

```
check ──┐               ┌── record-release   (only if published)
test  ──┼── release ────┼── publish-figma    (only if published)
build ──┘               └── deploy-docs      (prod if published, dev otherwise)
                            │
docs ───────────────────────┘
```

`release.yml` job dependencies (push to `lts`):

```
check ──┐
test  ──┼── release ────┐
build ──┘               └── deploy-docs   (v4, only if published)
                            │
docs ───────────────────────┘
```

`release.yml` job dependencies (`workflow_dispatch`):

```
check ──┐
test  ──┼── release-manual
build ──┘
```

`lint-pr.yml` runs a single job:

```
title
```

`test-pr.yml` runs these jobs in parallel, with `codacy` waiting on `test` and `deploy-preview` waiting on `docs`:

```
check
test ──── codacy
build
docs ──── deploy-preview
figma
```

`cleanup-preview.yml` runs one of two jobs depending on the trigger:

```
cleanup          (pull_request: closed)
sweep            (schedule: weekly)
```

## Composite actions

Shared step bundles in `.github/actions/`. Each composite action handles Node setup before running its command; most also run `yarn install`. `deploy-docs` skips `yarn install` because it has no project dependencies. The calling job must run `actions/checkout` first — GitHub Actions requires the repository to be present on the runner before it can locate a local composite action.

| Action           | Command                             | Used by                                                                                                |
| ---------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `check`          | `yarn check`                        | `test-pr.yml` check job, `release.yml` check job                                                       |
| `test`           | `yarn test run [args]`              | `test-pr.yml` test job (with `--coverage --silent`), `release.yml` test job                            |
| `build-lib`      | `yarn build:lib`                    | `test-pr.yml` build job, `release.yml` build job                                                       |
| `build-docs`     | `yarn build:docs`                   | `test-pr.yml` docs job, `release.yml` docs job, `deploy-docs-manual.yml`                               |
| `deploy-docs`    | Cloudflare Wrangler deploy          | `release.yml` deploy-docs job, `deploy-docs-manual.yml`                                                |
| `deploy-preview` | Cloudflare Wrangler deploy          | `test-pr.yml` deploy-preview job                                                                       |
| `publish-figma`  | `yarn figma connect publish [args]` | `test-pr.yml` figma job (with `--dry-run --exit-on-unreadable-files`), `release.yml` publish-figma job |

## Deployment strategy

`release.yml` is the single source of truth for docs deployments on `main` and `lts`. The `docs` job builds Storybook early in the pipeline (parallel with check, test, and build) and uploads the artifact for deployment. The `deploy-docs` job waits for both `release` and `docs` to complete, then chooses its target based on the branch and whether packages were published:

**`main`:**

- **`published == 'true'`** (version PR was merged): deploys to `prod`
- **`published != 'true'`** (version PR created/updated, or no changesets): deploys to `dev`

**`lts`:**

- **`published == 'true'`**: deploys to `v4`
- **`published != 'true'`**: skipped — no point updating the LTS storybook for a version PR that has not yet been merged

`deploy-docs-manual.yml` retains a `workflow_dispatch` trigger for emergency manual deploys and out-of-band LTS storybook updates.

### Preview deployments

`test-pr.yml` deploys a Storybook preview for every PR. The `docs` job builds Storybook and uploads the artifact. The `deploy-preview` job downloads it and deploys to a Cloudflare Worker named `gbl-ds-elements-pr-<number>` on the custom domain `pr-<number>.elements.reapit.com.au`. The preview uses the `preview` environment in `wrangler.jsonc`, which inherits the MCP worker from the top-level config. Each push to the PR overwrites the same Worker.

After deployment, a sticky PR comment is posted (or updated) with the preview URL. The comment uses a hidden HTML marker (`<!-- storybook-preview -->`) so subsequent pushes update the same comment rather than creating new ones. A GitHub Deployment status is also created, surfacing a "View deployment" link on the pull request.

`cleanup-preview.yml` handles two cleanup paths:

- **PR close:** deletes the preview Worker, updates the PR comment, and deactivates the GitHub Deployment when a PR is merged or closed.
- **Weekly sweep:** runs every Monday at 3 am UTC, lists all `gbl-ds-elements-pr-*` Workers, and deletes any whose PR is no longer open. This catches orphaned Workers left behind by failed close-time cleanup runs.

## Key decisions

### Concurrency and scheduling

**Why does `release.yml` use `cancel-in-progress: false` for its concurrency group?**
Aborting a publish mid-flight can leave npm in a partially-published state. Serialising with `cancel-in-progress: false` lets the second run wait rather than kill the first.

**Why does `deploy-docs-manual.yml` use `cancel-in-progress: true` for its concurrency group?**
Unlike a publish, a Cloudflare deploy is idempotent — the most recent deployment wins. Cancelling a stale deploy and letting the newest one proceed is safe and avoids deploying an outdated build.

### Publishing and authentication

**Why is there no `NPM_TOKEN` secret for publishing?**
Both release paths authenticate to npm via OIDC trusted publishing — no long-lived secret is needed. GitHub Actions mints a short-lived OIDC token, which npm exchanges for a publish token.

**Why does the `release` job use `environment: release`?**
The `release` environment is restricted to the `main` and `lts` branches in GitHub Settings → Environments. This ensures GitHub mints an OIDC token only for runs on those branches, providing a belt-and-braces guard on top of the `on: push: branches: [main, lts]` trigger. Both the `release` and `release-manual` jobs use this environment. The `release` environment is separate from `production`, which the `record-release` job uses solely to signal a deployment event to Jira.

**Why is provenance attestation not enabled?**
Sigstore provenance requires a public source repository. This repository is private, so npm rejects the attestation bundle during publish.

### Release scope

**Why do `record-release` and `publish-figma` only run on `main`, not `lts`?**
Jira is not configured to manage two release streams, so emitting a deployment record for an `lts` patch would either duplicate the `main` signal or produce a record Jira cannot act on. Figma Code Connect reflects the latest stable release — publishing from `lts` would overwrite the current version's definitions.

**Why does manual dispatch skip `record-release`, `publish-figma`, and `deploy-docs`?**
Manual dispatch exists solely as a recovery tool for failed automated releases. Creating a deployment record could duplicate the automated workflow's Jira signal or point at a different commit than Jira expects (since the dispatch checks out an arbitrary ref rather than HEAD of `main`). The dispatch skips Figma Code Connect and docs because it may target a commit other than the latest on `main`. Deploy docs independently via `deploy-docs-manual.yml` if needed.

### Job design

**Why does the `release` job repeat checkout/setup/install instead of using a composite action?**
The `release` job needs to control `actions/checkout` directly because it must use a write-scoped checkout token (from the GitHub App) so that `changesets/action` can push the version PR branch. In this repo, the shared composite actions are local actions under `.github/actions/`, so they cannot be used until the repository is checked out. `release` therefore repeats checkout, setup, and install rather than delegating to a composite action.

**Why is `fetch-depth: 0` only in the `release` job?**
`changesets/action` walks the full git history to find the last release tag and determine which packages changed. The `check`, `test`, `build`, and `docs` jobs need only a shallow clone, which is faster.

**Why are `dist` and `docs` artifacts passed between jobs rather than rebuilding?**
Building twice wastes runner time and risks non-determinism. Uploading from the build job and downloading in the consumer job guarantees the same output is published or deployed.

**Why is Codacy coverage upload PR-only?**
Coverage feedback is most actionable pre-merge, where reviewers can see whether new code is tested. After a change lands on `main`, reviewers can no longer act on it.

**Why is Figma Code Connect validated with `--dry-run` in PRs but only published after a release?**
Dry-running in `test-pr.yml` catches broken Code Connect definitions before merge without touching Figma. The publish-figma job runs only when `published == 'true'`, keeping Figma component definitions in sync with the npm release — the job never publishes definitions for unreleased code.

**Why is `deploy-docs-manual.yml` a standalone workflow rather than a reusable workflow called from `release.yml`?**
It provides an emergency path that bypasses the full CI pipeline — useful when docs need redeploying without a code change (e.g. after an infrastructure update or a failed deploy). In `release.yml`, the `docs` job builds Storybook and the `deploy-docs` job deploys the pre-built artifact, so docs are built only once per run.

### Preview deployments

**Why do preview deployments use the same `wrangler.jsonc` instead of a separate config?**
The `preview` environment inherits the top-level `main` entry point (`workers/mcp.ts`), so the MCP endpoint is available on previews for free. A separate config would duplicate the assets configuration and risk drift. The Worker name and custom domain are overridden at deploy time via `--name` and `--domain` flags.

**Why does preview cleanup use both a PR close trigger and a scheduled sweep?**
The PR close trigger handles the normal lifecycle. The weekly sweep catches edge cases: failed cleanup runs, PRs closed while the runner was unavailable, or any other scenario that leaves an orphaned Worker behind.

### Supply chain

**Why does the preview PR comment use inline `gh api` calls instead of a third-party action?**
Third-party comment actions (`marocchino/sticky-pull-request-comment`, `peter-evans/create-or-update-comment`) introduce supply-chain risk for a task achievable with eight lines of shell. The `gh` CLI is pre-installed on the runners and uses the workflow's `GITHUB_TOKEN` directly.

**Why does the deployment status use inline `gh api` calls instead of `bobheadxi/deployments`?**
The GitHub Deployments REST API requires only two calls (create deployment, post status) to surface a "View deployment" link on the pull request. The `bobheadxi/deployments` action wraps the same API but introduces a third-party dependency. Inline `gh api` calls keep the supply chain minimal, consistent with the PR comment approach.

**Why are all actions pinned to commit SHAs?**
A compromised or force-pushed tag can silently change the code a workflow executes. Pinning every action — including GitHub-owned ones — to a full commit SHA with a version comment (e.g. `actions/checkout@<sha> # v6`) locks each reference to an immutable commit. Dependabot preserves this pinning style when it proposes updates, so the next weekly PR auto-heals any reference that drifts back to a tag.
