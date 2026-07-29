# Gaffer — PR classifier

Classifies pull requests as `factory-made` or `handmade` by running a chain
of deterministic safety gates against this repo's policy. A `factory-made`
label means all gates passed and an automated review workflow may proceed; a
`handmade` label means at least one gate denied the PR and a human review is
required.

Architecture ported from
[PostHog's stamphog](https://github.com/PostHog/posthog/blob/master/tools/pr-approval-agent/README.md),
re-derived (not copied) for this repo's actual risk surface: a design-system
component library with no backend, no auth, no billing, and no database
migrations, published to npm and consumed by other teams' frontends.

## Classification gates

Gates run in order. The first failure short-circuits the remainder.

1. **Prerequisites gate** — PR must be non-draft, mergeable, and have no
   outstanding change requests.
2. **Deny-list gate** — any file matching a `denyCategories` glob in
   `.gaffer/policy.yml` makes the PR `T2-never`: automatically `handmade`,
   regardless of size.
3. **Size-ceiling gate** — PRs exceeding the hard ceiling (>800 substantive
   lines or >30 substantive files) are denied as too large to classify
   automatically.

If all gates pass, the PR is `factory-made`. If any gate fails, the PR is
`handmade`. The label is applied (or updated) on every run, so a subsequent
push that crosses a threshold flips the label correctly.

## Deny-list vs. scrutiny-floor

Two mechanisms in `.gaffer/policy.yml`:

- **`denyCategories`** — hard deny. Any match makes the PR `T2-never` and
  `handmade`. Reserved for high-blast-radius paths: CI/CD, workflow changes
  referencing secrets, deploy infra, git hooks, release/publish config.
- **`scrutinyFloorCategories`** — not denied. The tier is floored at
  `T1c-medium` so a change here can never be classified as trivial by line
  count alone. Used for paths with frequent, legitimate churn: design tokens,
  codemods, barrel exports, build toolchain config, and gaffer's own
  implementation.

## Size tiers

Calibrated against ~150 merged PRs in this repo (median 5 substantive
lines / 1 file; p90 ~240 lines / 8 files):

- `T0-deterministic` — nothing substantive changed (only exempt files)
- `T1a-trivial` — ≤20 lines, ≤3 files
- `T1b-small` — ≤100 lines, ≤5 files
- `T1c-medium` — ≤300 lines, ≤15 files
- `T1d-complex` — over T1c but within the hard ceiling
- hard ceiling: **>800 substantive lines or >30 substantive files → handmade**
- `T2-never` — any deny-list match, regardless of size

## Branch-protection prerequisites

| Requirement                  | Current state                                           |
| ---------------------------- | ------------------------------------------------------- |
| `factory-made` label created | **Not yet** — create in repo settings before first run. |
| `handmade` label created     | **Not yet** — create in repo settings before first run. |

## Local usage

```bash
export GH_TOKEN=$(gh auth token)

# Classify only — no side effects:
node --experimental-strip-types tools/pr-approval-agent/classify-pr.ts 1517 --dry-run

# Full run, verbose evidence bundle to stderr:
node --experimental-strip-types tools/pr-approval-agent/classify-pr.ts 1517 -v
```

`--repo owner/repo` overrides the target repository; defaults to
`GITHUB_REPOSITORY` (set automatically in the Actions runner).

## File layout

```
tools/pr-approval-agent/
├── README.md              — this file
├── classify-pr.ts         — classification pipeline (CLI entry point)
├── classify-gates.ts      — policy loading, deny-list/scrutiny-floor matching, tier classification
├── github.ts              — Octokit wrapper (PR data, label application)
└── types.ts               — shared domain types

.gaffer/
└── policy.yml             — size thresholds, deny/scrutiny/advisory categories

.github/workflows/gaffer.yml              — workflow, triggers on every non-draft PR push
```
