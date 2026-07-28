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

## Phase 0 — Start Storybook

This skill starts its own Storybook instance on a free port so it never depends on whatever is already running.

### Step 1: Find a free port

```bash
python3 -c "import socket; s=socket.socket(); s.bind(('',0)); print(s.getsockname()[1]); s.close()"
```

This prints a free port number (e.g. `52341`). Use this value as `<PORT>` throughout.

### Step 2: Start Storybook

```bash
yarn storybook dev -p <PORT> --ci > /tmp/storybook-<PORT>.log 2>&1 &
echo $!
```

Note the printed PID — you will need it to stop Storybook in Phase 4.

### Step 3: Resolve your Desktop path

Run the appropriate command for your platform and store the result as `<DESKTOP_PATH>`:

```bash
# macOS / Linux
echo "$HOME/Desktop"

# Windows (PowerShell)
[Environment]::GetFolderPath('Desktop')
```

Use this value as `<DESKTOP_PATH>` wherever screenshot file paths appear.

### Step 4: Wait for Storybook to be ready

Poll until the server responds, with a 60-second timeout:

```bash
for i in $(seq 1 60); do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:<PORT>)
  if [ "$STATUS" = "200" ]; then echo "ready"; break; fi
  sleep 1
done
```

If it does not become ready within 60 seconds, check `/tmp/storybook-<PORT>.log` for errors.

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
http://localhost:<PORT>/iframe.html?id=<story-id>&viewMode=story&nav=0
```

To confirm a story ID, check the `.stories.tsx` file for the `title` and `name` of each story export.

---

## Phase 2 — Capture Screenshots

Use the Chrome DevTools MCP tools with the `<PORT>` chosen in Phase 0.

### File naming

All files must be saved to an absolute Desktop path. **Do not use `~/Desktop/`** — the screenshot tool does not expand `~` and may treat it as a relative path. Instead, use the `<DESKTOP_PATH>` value resolved in Phase 0.

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

Screenshots must be **tightly cropped** to the component — do not capture the full viewport. Follow these steps for every screenshot:

1. Navigate to the story iframe URL:

   ```
   http://localhost:<PORT>/iframe.html?id=<story-id>&viewMode=story&nav=0
   ```

2. Confirm the story has loaded by taking a snapshot or waiting for `#storybook-root`.

3. **Measure the component bounding box** using `chrome-devtools_evaluate_script`:

   ```js
   () => {
     const el = document.querySelector("#storybook-root > :first-child");
     if (!el) return null;
     const r = el.getBoundingClientRect();
     return {
       w: Math.round(r.width),
       h: Math.round(r.height),
       x: Math.round(r.x),
       y: Math.round(r.y),
     };
   };
   ```

4. **Resize the viewport** to match the component tightly (component height + padding on both axes) using `chrome-devtools_resize_page`. A padding of `16px` top and bottom (matching the Storybook default padding) works well — so total height is typically `h + 32`. Width is typically `1440` (full story width).

   ```
   chrome-devtools_resize_page → { width: 1440, height: <h + 32> }
   ```

5. Take the screenshot and save to the absolute Desktop path:

   ```
   chrome-devtools_take_screenshot → filePath: <DESKTOP_PATH>/DS-102-button-default.png
   ```

6. **Reset the viewport** to `1440×900` between screenshots so the next measurement is clean:

   ```
   chrome-devtools_resize_page → { width: 1440, height: 900 }
   ```

7. For interactive components, capture each relevant state:
   - **Default** — the component as it first renders
   - **Hover** — hover over the primary interactive element, then measure and resize before screenshotting
   - **Active/open** — click or trigger the open state (dropdowns, dialogs, tooltips). For open states, the popup/overlay extends below the trigger — measure the total height including the overlay:

     ```js
     () => {
       const root = document.querySelector("#storybook-root > :first-child");
       const dialog = document.querySelector(
         '[role="dialog"], [role="listbox"], [data-floating-ui-portal]',
       );
       if (!root) return null;
       const rootR = root.getBoundingClientRect();
       let bottom = rootR.bottom;
       if (dialog) {
         const dR = dialog.getBoundingClientRect();
         bottom = Math.max(bottom, dR.bottom);
       }
       return { totalH: Math.round(bottom + 16) };
     };
     ```

     Then resize to `{ width: 1440, height: totalH }`.

   - **Disabled** — if a disabled story exists

**Example (Chrome DevTools MCP):**

Navigate to the story:

```
chrome-devtools_navigate_page → url: http://localhost:<PORT>/iframe.html?id=core-button--primary&viewMode=story&nav=0
```

Measure bounding box:

```
chrome-devtools_evaluate_script → (see Step 3 above)
```

Resize viewport:

```
chrome-devtools_resize_page → { width: 1440, height: <h + 32> }
```

Take screenshot:

```
chrome-devtools_take_screenshot → filePath: <DESKTOP_PATH>/DS-102-button-default.png
```

Reset viewport:

```
chrome-devtools_resize_page → { width: 1440, height: 900 }
```

Hover for hover state:

```
chrome-devtools_hover → uid: <uid of button from snapshot>
chrome-devtools_resize_page → { width: 1440, height: <h + 32> }  (re-measure if layout shifts)
chrome-devtools_take_screenshot → filePath: <DESKTOP_PATH>/DS-102-button-hover.png
chrome-devtools_resize_page → { width: 1440, height: 900 }
```

---

## Phase 3 — Embed in PR Description

Add a `## Visual changes` section to the PR description. List each captured file with its full Desktop path. The user must drag and drop the files into the PR body on GitHub — GitHub does not support programmatic image/file attachment via the API or `gh` CLI.

**Template:**

```markdown
## Visual changes

<!-- Drag and drop each file below into this PR description on GitHub -->

| State   | File                                       |
| ------- | ------------------------------------------ |
| Default | `<DESKTOP_PATH>/DS-102-button-default.png` |
| Hover   | `<DESKTOP_PATH>/DS-102-button-hover.png`   |
```

**Note for the user:** GitHub accepts images (`.png`, `.jpg`, `.gif`) dragged directly into the PR description text area. There is no programmatic upload path — the drag-and-drop step must be done manually in the browser.

---

## Phase 4 — Stop Storybook

Always stop the Storybook process when finished, even if screenshot capture failed part-way through.

```bash
kill <PID>
rm /tmp/storybook-<PORT>.log
```

If you no longer have the PID, find it by port:

```bash
lsof -ti tcp:<PORT> | xargs kill
```

---

## Quick Checklist

Before moving on:

- [ ] Free port chosen and noted as `<PORT>`
- [ ] Storybook started on `<PORT>`, PID noted
- [ ] `<DESKTOP_PATH>` resolved and noted (Phase 0, Step 3)
- [ ] Storybook confirmed ready (curl returned 200)
- [ ] `git diff` analysed — visual changes identified
- [ ] Ticket reference extracted from branch, commit, or PR title
- [ ] Story IDs confirmed against `.stories.tsx` files
- [ ] Screenshot taken for each relevant story and state
- [ ] Viewport resized tightly before each screenshot (component height + 32px padding)
- [ ] Viewport reset to `1440×900` between screenshots
- [ ] Files saved to `<DESKTOP_PATH>/` with correct naming (`<ticket>-<component>-<state>.png`)
- [ ] `## Visual changes` section added to PR description
- [ ] User informed to drag and drop files into GitHub PR
- [ ] Storybook process stopped (`kill <PID>`) and log cleaned up

---

## Common Mistakes

**Saving files inside the repository:**

```
❌ .visual-test/DS-102-button-default.png
✅ <DESKTOP_PATH>/DS-102-button-default.png
```

**Using `~/Desktop/` instead of an absolute path:**

The screenshot tool does not expand `~` and may treat it as a relative path. Resolve your Desktop path in Phase 0 (Step 3) and use `<DESKTOP_PATH>` throughout.

```
❌ ~/Desktop/DS-102-button-default.png
✅ <DESKTOP_PATH>/DS-102-button-default.png
```

**Ticket at the end of the filename:**

```
❌ button-default-DS-102.png
✅ DS-102-button-default.png
```

**Using the Storybook canvas URL instead of the iframe URL:**

```
❌ http://localhost:<PORT>/?path=/story/core-button--primary
✅ http://localhost:<PORT>/iframe.html?id=core-button--primary&viewMode=story&nav=0
```

**Capturing a full-viewport screenshot instead of a tight crop:**

Always resize the viewport to the component's bounding box before screenshotting. A full-viewport screenshot shows too much empty whitespace and makes visual comparisons harder.

```
❌ Take screenshot immediately after navigation
✅ Measure bounding box → resize viewport → take screenshot → reset viewport
```

**Taking a screenshot before `#storybook-root` is present:**

Always confirm the story has loaded by waiting for `#storybook-root` or taking a snapshot first.

**Capturing only one state for interactive components:**

Capture default, hover, and open/active states where relevant. Reviewers need to see the full interaction.

**Not resetting the viewport between screenshots:**

Always reset to `1440×900` after each screenshot. Forgetting this causes the next bounding-box measurement to be wrong because the element's position and size depend on the viewport.

**Not stopping Storybook when finished:**

Always kill the process when done. Leaving it running wastes resources and may block the same port for future runs.

---

## Reference

- `visual-tests/utils.ts` — `getStoryUrl()` helper showing the iframe URL pattern
- `visual-tests/index.spec.ts` — existing visual regression test for reference
- For PR title and description conventions, use the `writing-pull-requests` skill
