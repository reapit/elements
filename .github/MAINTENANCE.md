# Maintenance Branch Setup

When a new major version lands on `main`, the previous version becomes a maintenance line. This document is the step-by-step runbook for standing up that line.

The maintenance branch is named `lts`. When a new major ships on `main`, the previous `lts` branch is archived and the new maintenance line takes its place. This keeps a single, predictable branch name.

The goal is **maximum byte-parity with `main`** so that each cutover is a deliberate, scoped diff rather than a workflow rewrite.

---

## 1. Prerequisites (out-of-band)

Do these before raising the branch-setup PR: they can't be automated.

| What                                                                      | Why                                                                                                          |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| GitHub branch protection for the new maintenance branch                   | Prevents force-pushes; enables required status checks                                                        |
| `release` Environment → add the maintenance branch as a deployment target | The `release` job has `environment: release`; GitHub won't mint an OIDC token unless the branch is permitted |
| Cloudflare secrets are **repo-scoped**, not environment-scoped            | `ANZ_CLOUDFLARE_TOKEN` and `ANZ_CLOUDFLARE_ACCOUNT_ID` must be available to workflow runs on any branch      |
| npm Trusted Publisher registration                                        | Already workflow-scoped (`release.yml`), so it auto-covers new branches, just verify                         |

---

## 2. Changes to `main`'s `release.yml`

The release workflow is the only file on `main` that needs updating to support a new maintenance branch.

**2a. Add the new branch to the push trigger.**

**2b. Add a condition to the `deploy-docs` target expression** that maps the new branch name to its Cloudflare target (e.g. `github.ref_name == '<branch>' && 'v<N>'`). Append it before the existing `main`/`dev` fallback conditions.

**2c. Add `lts` to `deploy-docs/action.yml`:** the `validate target` step lists accepted values; add `lts`. Raise this as a separate PR to `main` before the maintenance branch PR, so the composite action is already in place when the new branch's CI runs.

---

## 3. Changes on the maintenance branch

All of these belong in the single "backport infra" PR. Minimise scope: no component, token, or utility changes.

### 3a. `package.json`

| Field                                              | Change                                             | Why                                                                                                   |
| -------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `publishConfig.tag`                                | `"v<N>"` (e.g. `"v5"`)                             | Prevents `yarn changeset publish` defaulting to `latest` and clobbering the trunk's dist-tag          |
| `packageManager`                                   | Match main                                         | Ensures consistent Yarn version across branches                                                       |
| `scripts.build:docs`                               | Alias to the branch's storybook-build command      | `build-docs` composite action calls `yarn build:docs`                                                 |
| `scripts.build:lib`                                | Alias to the branch's lib-build command            | `build-lib` composite action calls `yarn build:lib`                                                   |
| `scripts.test:ci`                                  | Non-interactive test invocation                    | `test` composite action calls `yarn test:ci`; ensure this script exists and exits non-zero on failure |
| `scripts.check`                                    | Mirror main: `yarn check:types && yarn check:lint` | Ensures both type checking and linting run via the `check` composite action                           |
| `repository`, `homepage`, `bugs` URLs              | Update if org/repo slug changed                    | npm trusted publisher cross-checks these                                                              |
| Remove `bin`, `deploy`, or any CDK-related scripts | n/a                                                | Delete dead entrypoints when removing deployment infrastructure                                       |

> **Important:** Audit `devDependencies` for packages tied to the new major version's toolchain. Dependencies that don't work with the maintenance branch will break `yarn install` or produce peer-requirement noise. Remove them.

### 3b. `.changeset/config.json`

```json
{
  "baseBranch": "<branch-name>",
  "changelog": ["./changelog-format.js", { "repo": "reapit-global/gbl-ds-elements" }]
}
```

`baseBranch` must match the maintenance branch name (e.g. `lts`), not `"main"`.

Do **not** copy historical `.changeset/*.md` entries from `main`, because they describe trunk work. Do **not** copy `pre.json` if main is in pre-release mode.

### 3c. Composite action: `test/action.yml`

The action calls `yarn test:ci`. On `main` that script fans out across workspaces; on a
single-package maintenance branch it is an ordinary script, so the action needs no change as
long as the branch defines `test:ci`:

```yaml
# main: fans out across workspaces
"test:ci": "yarn workspaces foreach --all --exclude gbl-ds-elements run test:ci"

# maintenance branch: a plain non-interactive test run
"test:ci": "vitest run"
```

This is the only composite action that should diverge; document it in the footnote table in `.github/CI.md`.

### 3d. `lint-staged.config.js`

Update the lint, format, and test commands to match the maintenance branch's toolchain. The file structure and key shape stay identical; only the commands change.

---

## 4. Verification checklist

Before opening the PR:

- [ ] `yarn install --immutable` completes cleanly (no missing-peer errors)
- [ ] `yarn check` (now `check:types && check:lint`) exits 0
- [ ] `yarn test:ci` exits 0; coverage thresholds met
- [ ] `yarn build:lib && yarn build:docs` both succeed
- [ ] `yarn changeset status` (with a real `.changeset/*.md` entry) reports the correct bump
- [ ] `yarn node -e "require('./.changeset/changelog-format.js')"` confirms the changelog formatter loads

After the PR merges and CI is green:

- [ ] `gh workflow run "Deploy Docs (Manual)" --ref <branch> -f target=v<N>`: smoke-test the Storybook deploy
- [ ] Check `npm dist-tag ls @reapit/elements`: confirm `v<N>` tag exists and points at the new version; `latest` still points at main's release

---

## 5. Audit for divergence from `main`

Run `git diff main <maintenance-branch>` and verify that every difference is an intentional divergence documented in `.github/CI.md`. Zero unexplained differences means the maintenance line is minimal-divergence.

---

## 6. Intentional divergences — where to document them

Add a footnote to the composite-actions table in `.github/CI.md` for any action that differs from main. Keep the format already established for the `test` action:

```
† On `main`, `yarn test:ci` fans out across workspaces. On `lts` it
  runs a single package — [reason]. See `package.json` on each branch.
```

This keeps `.github/CI.md` as the single source of truth for "what the CI does and why it differs".
