# Gaffer — design decisions

A record of _why_ gaffer looks the way it does.
[`README.md`](./README.md) covers what is built and how to use it; this file
covers the decisions and open items behind it.

**Status: proof of concept.** Everything under `tools/gaffer/`,
`.gaffer/`, and `.github/workflows/gaffer.yml` has not been run
against a live PR. `package.json`, `yarn.lock`, and `tsconfig.json` were
modified in place (new devDependencies, `tools` added to the typecheck
`include`) and `yarn install` has been run, so those are consistent. All
other code is unverified beyond typecheck, lint, format, and a throwaway
local smoke test of the pure gate logic — see "Testing status" below.

## Origin

Ported from PostHog's stamphog
([`tools/pr-approval-agent/`](https://github.com/PostHog/posthog/blob/master/tools/pr-approval-agent/README.md))
— note that path is PostHog's, this repo's port now lives under `tools/gaffer/`.
The brief was: copy the architecture, preserve its safety invariants, but
re-derive the deny-list and size thresholds from this repo's own risk surface
rather than copying PostHog's. Their categories (auth, billing, migrations,
public API) do not exist here; this is a design-system component library with
no backend, published to npm and consumed by other teams' frontends.

## Safety invariants

- **Fails closed.** A gate denial or unmet condition never defaults to
  `factory-made`. When prerequisites cannot be confirmed (e.g. `mergeable`
  is still `null` after polling), the PR receives `quality-hold`.
- **Never posts reviews, never merges.** Phase 1 applies a label and posts a
  classification comment. Nothing else.
- **Classification is idempotent and self-correcting.** The label is
  re-evaluated on every push. A PR that previously passed can be reclassified
  `quality-hold` if a subsequent push crosses a threshold.
- **Nothing is a permanent block.** A `quality-hold` label means a human review is
  required — it does not close the PR or prevent further runs.

## Key decisions

### TypeScript, not Python

PostHog's tool is Python because their repo is Python. This repo is 100% TS:
it already runs standalone TypeScript scripts directly via
`node --experimental-strip-types` (`codemods/`, `src/tokens/build.ts`), the
Node engine is `>=24`, and the toolchain (Octokit, minimatch, js-yaml) all
ship first-party TS types. No capability was traded away by choosing TS.

### Octokit over the `gh` CLI

Considered matching stamphog's approach of shelling out to `gh` and parsing
JSON. Chose Octokit instead: typed responses match this repo's "explicit type
definitions" convention; calls are trivially mockable in Vitest; and it avoids
the fragility of parsing CLI stderr for error classification. Trade-off: local
dry-run testing needs `GH_TOKEN` set explicitly (`gh auth token`) rather than
`gh`'s own ambient auth — trivial in practice.

### Deny-list and scrutiny-floor are two separate mechanisms

Both live in `.gaffer/policy.yml`, and the split is a design decision, not
just configuration:

- **`denyCategories`** — hard deny, `T2-never`. Reserved for paths that are
  genuinely rare and dangerous: CI/CD (`.github/workflows/`, `.github/actions/`,
  `actions/`), workflow diffs that reference `secrets.`, deploy infra
  (`wrangler*.jsonc`, `workers/`), git hooks (`.husky/`), release/publish
  config, and dangerous `package.json` fields specifically.
- **`scrutinyFloorCategories`** — not denied; tier floored at `T1c-medium` so
  changes here can never be classified as trivial by line count alone. Reserved
  for paths with frequent, legitimate churn: design tokens, codemods, barrel
  exports, the Figma Code Connect contract, and build toolchain config.

A real bug surfaced this distinction during smoke-testing: the first draft
hard-denied **any** `package.json` change, including plain dependency bumps.
Fixed by content-gating the deny on specific dangerous fields
(`scripts`/`engines`/`packageManager`/`publishConfig`/`name`) via a regex
against the diff patch. Ordinary dependency add, bump, or remove is not denied.

### Gaffer's own files: scrutiny floor for implementation, hard deny for the workflow

`tools/gaffer/**` and `.gaffer/policy.yml` are in
`scrutinyFloorCategories` (`gaffer_agent`). Changes to gaffer's own
implementation have legitimate churn and should not be hard-denied, but they
should never be treated as trivial by line count alone.

`.github/workflows/gaffer.yml` is intentionally **not** included in
`scrutinyFloorCategories`. It lives under `.github/workflows/**`, which is
covered by the `ci_cd` deny category — so any change to the workflow file is
hard-denied as `T2-never`, exactly like any other workflow file. CI/CD changes
carry elevated blast radius regardless of which tool they configure; gaffer is
not a special case.

### Workflow checks out head SHA; policy loaded from base SHA

The workflow checks out the **head SHA** so the tool is always present — even
on PRs that introduce or modify gaffer itself. After checkout, `.gaffer/policy.yml`
is overwritten from the **base SHA** via a separate `git checkout` step. This
preserves the core safety invariant (a PR cannot relax its own gates by
modifying policy) while ensuring tool-modification PRs work correctly in CI.

The two operations run in the same ephemeral job; the mixed-SHA working
directory has no effect on any other workflow or job.

### Classify every non-draft PR

The workflow triggers on `opened`, `synchronize`, `reopened`, and
`ready_for_review` for all non-draft PRs — no opt-in label required.
Classifying every PR from the start gives the best signal on whether the
gates are calibrated correctly (false positives, over-denying) across real
PR volume.

### Size tiers — calibrated with real data

A background agent sampled 75 of the last 150 merged PRs (stratified, via
`gh pr view --json additions,deletions,changedFiles,files`), excluding
non-substantive files. Result: median 5 substantive lines / 1 file; p90 ~240
lines / 8 files; only 3/75 (4%) exceeded PostHog's raw 800-line/30-file
ceiling. This repo's real distribution sits comfortably inside PostHog's
numbers, so the tiers were kept as-is (T1a ≤20/≤3, T1b ≤100/≤5,
T1c ≤300/≤15, hard ceiling >800 lines or >30 files).

### `setLabel` removes conflicting managed labels on re-run

Rather than appending blindly, `GitHubClient.setLabel` fetches the current
label set, adds the new label, and removes any other gaffer-managed labels
(`factory-made` / `quality-hold`) in a single parallel call. This ensures a label
flip on a subsequent push leaves the PR in a clean state — never both labels
applied simultaneously.

## Verified facts about this repo's environment

Pulled live via `gh api` — worth re-checking if this document gets stale:

- Branch protection is a **ruleset** ("Main branch protection", id `8566043`),
  not classic branch protection.
- `required_approving_review_count: 1`, `require_code_owner_review: true`,
  `dismiss_stale_reviews_on_push: false`, `allowed_merge_methods: ["squash"]`.
- `copilot_code_review: {review_on_push: true, review_draft_pull_requests: true}`
  is already active.
- Repo settings: `allow_squash_merge: true`, `allow_auto_merge: true`,
  `delete_branch_on_merge: true`.

## Prerequisites not yet done

- [ ] Create the `factory-made` and `quality-hold` labels in the repo.
- [ ] A real end-to-end run against a live PR — see "Testing status."

## Testing status

- `yarn check:types`, `oxlint`, `oxfmt` all clean.
- Gate logic (`classify`, deny/scrutiny matching, the `package.json`
  content-gating fix) was smoke-tested with a throwaway local script, deleted
  after — not a committed test suite.
- **Never run against a live PR.** The Octokit calls (`addLabels`,
  `removeLabel`, `getPullRequest`) are unverified beyond the SDK's type
  definitions. Treat the first real run as the first real test.

## Known simplifications vs. stamphog

- **No migration-risk bypass.** This repo has no database, so there is no
  analogue to stamphog's `migrations` deny-category bypass via a CI check.
