---
name: capturing-visual-changes
description: Capture screenshots of UI component changes and embed them in pull request descriptions. Use this skill whenever a PR touches visual UI changes — new components, style updates, layout changes, or interaction behaviour.
---

# Capturing Visual Changes

## When to Use This Skill

Use this skill whenever a PR includes visual UI changes:

- New components or stories
- Style, layout, or spacing changes
- Interactive behaviour changes (open/close, hover, focus states)

Skip this skill for non-visual changes: test-only, type-only, docs-only, build/CI changes.

---

## Phase 1 — Identify Visual Changes

Analyse the diff to find which components have changed visually, then map them to Storybook story IDs.

### Step 1: Find changed component files

```bash
git diff --name-only main...HEAD | grep -E "src/(core|lab|deprecated|tokens)/"
```

Ignore changes to:

- `*.test.ts` / `*.test.tsx` — test-only
- `*.stories.tsx` changes that only add/rename stories (no component logic change)
- `*.types.ts` — type-only
- `CHANGELOG.md`, `*.md` — docs-only

### Step 2: Extract a ticket reference

Check in order, stopping at the first match:

```bash
# 1. Branch name
git branch --show-current | grep -oiE '[a-z]+-[0-9]+' | head -1 | tr '[:lower:]' '[:upper:]'
# e.g. feat/ds-131-add-xyz → DS-131
# e.g. feat/PLAT-1234-button-redesign → PLAT-1234

# 2. Most recent commit message
git log -1 --format="%s" | grep -oiE '[a-z]+-[0-9]+' | head -1 | tr '[:lower:]' '[:upper:]'
# e.g. "feat: DS-102 Add Combobox component" → DS-102

# 3. PR title (if a PR exists)
gh pr view --json title -q .title 2>/dev/null | grep -oiE '[a-z]+-[0-9]+' | head -1 | tr '[:lower:]' '[:upper:]'
# e.g. "feat: ds-102 Add Combobox component" → DS-102
```

Match ticket keys case-insensitively (`[A-Za-z]+-[0-9]+`) and always uppercase the result — filenames always use uppercase ticket references regardless of the casing in the branch name or commit message. If no ticket is found, omit it from filenames entirely — do not use a placeholder.

### Step 3: Map components to Storybook story IDs

Story IDs follow the pattern `<category>-<componentname>--<storyname>`, all lowercase, spaces replaced with hyphens.

| Component location | Story ID pattern             | Example                     |
| ------------------ | ---------------------------- | --------------------------- |
| `src/core/`        | `core-<name>--<story>`       | `core-button--primary`      |
| `src/lab/`         | `lab-<name>--<story>`        | `lab-combobox--default`     |
| `src/deprecated/`  | `deprecated-<name>--<story>` | `deprecated-badge--default` |

The Storybook URL for a story iframe is:

```
http://localhost:6006/iframe.html?id=<story-id>&viewMode=story&nav=0
```

To confirm a story ID, check the `.stories.tsx` file for the `title` and `name` of each story export.

---

## Phase 2 — Capture Screenshots

Use the Chrome DevTools MCP tools. Storybook must be running on port 6006 (`yarn start`).

### File naming

All files are saved to `~/Desktop/`.

**Pattern:**

```
<ticket>-<component>-<state>.png
```

- `<ticket>` — the extracted ticket key, e.g. `DS-102`. Omit entirely (including the trailing hyphen) when no ticket is found.
- `<component>` — lowercase component name, e.g. `button`, `combobox`
- `<state>` — the story or interaction state, e.g. `default`, `hover`, `open`, `disabled`

**Examples:**

| Situation                                | Filename                    |
| ---------------------------------------- | --------------------------- |
| Button default, ticket DS-102            | `DS-102-button-default.png` |
| Button hover, ticket DS-102              | `DS-102-button-hover.png`   |
| Branch `feat/ds-131-add-xyz` (lowercase) | `DS-131-button-default.png` |
| No ticket found                          | `button-default.png`        |

### Workflow

1. Navigate to the story iframe URL:

   ```
   http://localhost:6006/iframe.html?id=<story-id>&viewMode=story&nav=0
   ```

2. Wait for `#storybook-root` to confirm the story has loaded.

3. Take a screenshot and save to `~/Desktop/<filename>.png`.

4. For interactive components, capture each relevant state:
   - **Default** — the component as it first renders
   - **Hover** — hover over the primary interactive element
   - **Active/open** — click or trigger the open state (dropdowns, dialogs, tooltips)
   - **Disabled** — if a disabled story exists

**Example (Chrome DevTools MCP):**

Navigate to the story:

```
chrome-devtools_navigate_page → url: http://localhost:6006/iframe.html?id=core-button--primary&viewMode=story&nav=0
```

Wait for load:

```
chrome-devtools_wait_for → text: ["#storybook-root"] (or use take_snapshot to confirm)
```

Take screenshot:

```
chrome-devtools_take_screenshot → filePath: ~/Desktop/DS-102-button-default.png
```

Hover for hover state:

```
chrome-devtools_hover → uid: <uid of button from snapshot>
chrome-devtools_take_screenshot → filePath: ~/Desktop/DS-102-button-hover.png
```

---

## Phase 3 — Embed in PR Description

Add a `## Visual changes` section to the PR description. List each captured file with its full Desktop path. The user must drag and drop the files into the PR body on GitHub — GitHub does not support programmatic image/file attachment via the API or `gh` CLI.

**Template:**

```markdown
## Visual changes

<!-- Drag and drop each file below into this PR description on GitHub -->

| State   | File                                  |
| ------- | ------------------------------------- |
| Default | `~/Desktop/DS-102-button-default.png` |
| Hover   | `~/Desktop/DS-102-button-hover.png`   |
```

**Note for the user:** GitHub accepts images (`.png`, `.jpg`, `.gif`) dragged directly into the PR description text area. There is no programmatic upload path — the drag-and-drop step must be done manually in the browser.

---

## Quick Checklist

Before moving on:

- [ ] `git diff` analysed — visual changes identified
- [ ] Ticket reference extracted from branch, commit, or PR title
- [ ] Story IDs confirmed against `.stories.tsx` files
- [ ] Storybook running on port 6006 (`yarn start`)
- [ ] Screenshot taken for each relevant story and state
- [ ] Files saved to `~/Desktop/` with correct naming (`<ticket>-<component>-<state>.png`)
- [ ] `## Visual changes` section added to PR description
- [ ] User informed to drag and drop files into GitHub PR

---

## Common Mistakes

**Saving files inside the repository:**

```
❌ .visual-test/DS-102-button-default.png
✅ ~/Desktop/DS-102-button-default.png
```

**Ticket at the end of the filename:**

```
❌ button-default-DS-102.png
✅ DS-102-button-default.png
```

**Using the Storybook canvas URL instead of the iframe URL:**

```
❌ http://localhost:6006/?path=/story/core-button--primary
✅ http://localhost:6006/iframe.html?id=core-button--primary&viewMode=story&nav=0
```

**Taking a screenshot before `#storybook-root` is present:**

Always confirm the story has loaded by waiting for `#storybook-root` or taking a snapshot first.

**Capturing only one state for interactive components:**

Capture default, hover, and open/active states where relevant. Reviewers need to see the full interaction.

---

## Reference

- `visual-tests/utils.ts` — `getStoryUrl()` helper showing the iframe URL pattern
- `visual-tests/index.spec.ts` — existing visual regression test for reference
- For PR title and description conventions, use the `writing-pull-requests` skill
