# Artifact visual style

House style for the handoff-review Artifact, reached from [`SKILL.md`](SKILL.md)
step 7 alongside [`ARTIFACT-STATE.md`](ARTIFACT-STATE.md). Follow `artifact-design`
for everything below that this file does not fix: measure, both-theme support,
building from real content.

Treat the palette, type, and component vocabulary as fixed. That repetition is the
point: a designer reads several of these, for different files and for successive
passes on one file, and the fourth pass on a file should look like the first. Adapt
only what the content forces: how many findings a section holds, whether a section
has any at all.

This intentionally overrides `artifact-design`'s instinct to pick a bespoke look per
subject. It also diverges from the `please-explain` house style, which is a
manuscript to read; this is a worklist to act on and come back to, so the register
is closer to an instrument panel: sans-serif, tight vertical rhythm, colour used
functionally and never decoratively.

**Do not present this as Reapit Elements.** An artifact cannot load the library's
stylesheet: the CSP blocks every external host: so any resemblance would be
hand-copied values drifting from the real tokens. The palette below is neutral on
purpose. Never label a colour with an Elements token name, and never imply the page
is built from Elements.

## Reference stylesheet

This block is the page's stylesheet, whole. Paste it into a new build as-is, then
add only what that file's content forces: a `data-status` value the page does not
yet style, an extra area.

It is the only copy. Every section below explains why a rule here is shaped the way
it is, and carries markup, JS, and reasoning but no CSS declarations, so there is
nothing to keep in sync and no second copy to drift. Never reassemble this
stylesheet from the prose below: the prose cannot produce it, by design. Change a
colour or a component here, and edit the prose only where it describes the rule in
words.

Ratios in the comments are against `--surface` in the relevant theme, computed
rather than eyeballed. Recompute them if you change a value.

```css
:root {
  --ground: #fbfbfa; /* page */
  --surface: #ffffff; /* cards, inputs */
  --sunk: #f2f2f0; /* nav row hover, table headers */
  --ink: #1a1a18; /* body text                          16.8:1 */
  --ink-soft: #57564f; /* secondary prose, fixes              7.4:1 */
  --ink-faint: #6e6c64; /* labels, metadata, stale text        5.3:1 */
  --rule: #e3e2dd; /* hairlines only: never text, never a control */
  --control-border: #94928b; /* input and button edges              3.1:1 */

  --blocked: #b3261e; /* 6.5:1 */
  --attention: #8a5a00; /* 5.9:1 */
  --done: #1d5fa6; /* 6.5:1 */
  --link: #2a5f73; /* 7.0:1: layer links only */

  --blocked-tint: #fdf2f1;
  --attention-tint: #fcf6e8;
  --done-tint: #eef4fb;

  --sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace;
  color-scheme: light;
}

:root:not([data-theme="light"]) {
  @media (prefers-color-scheme: dark) {
    --ground: #17171a;
    --surface: #1e1e22;
    --sunk: #121215;
    --ink: #e8e7e2; /* 13.4:1 */
    --ink-soft: #a8a69e; /*  6.8:1 */
    --ink-faint: #8e8c84; /*  4.9:1 */
    --rule: #33333a;
    --control-border: #6e6c78; /*  3.2:1 */

    --blocked: #f2938c; /* 7.2:1 */
    --attention: #e0a83e; /* 7.2:1 */
    --done: #5b8def; /* 5.5:1 */
    --link: #7fbfd4; /* 8.2:1 */

    --blocked-tint: #2a1d1c;
    --attention-tint: #2a2418;
    --done-tint: #1d2733;
    color-scheme: dark;
  }
}

:root[data-theme="dark"] {
  --ground: #17171a;
  --surface: #1e1e22;
  --sunk: #121215;
  --ink: #e8e7e2;
  --ink-soft: #a8a69e;
  --ink-faint: #8e8c84;
  --rule: #33333a;
  --control-border: #6e6c78;

  --blocked: #f2938c;
  --attention: #e0a83e;
  --done: #5b8def;
  --link: #7fbfd4;

  --blocked-tint: #2a1d1c;
  --attention-tint: #2a2418;
  --done-tint: #1d2733;
  color-scheme: dark;
}

* {
  box-sizing: border-box;
}
p,
h1,
h2,
h3,
dl,
dt,
dd {
  margin: 0;
}
body {
  margin: 0;
  background: var(--ground);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 15px;
  line-height: 1.5;
}
a {
  color: var(--link);
}
:focus-visible {
  outline: 2px solid var(--link);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

code,
.chip {
  font-family: var(--mono);
  font-size: 0.92em;
  background: color-mix(in srgb, currentColor 10%, transparent);
  border-radius: 4px;
  padding: 0.1em 0.4em;
}

.shell {
  display: grid;
  grid-template-columns: 232px minmax(0, 780px);
  justify-content: center;
  gap: 56px;
  max-width: 1180px;
  margin: 0 auto;
  padding: 48px 32px 96px;
}

.toc {
  position: sticky;
  top: 40px;
  align-self: start;
  font-size: 13px;
}
.toc-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin: 0 0 10px 10px;
}
.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-row {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 6px 10px;
  min-height: 44px;
  border-radius: 6px;
  text-decoration: none;
  color: var(--ink-soft);
  line-height: 1.3;
}
.nav-row:hover,
.nav-row.current {
  background: var(--sunk);
  color: var(--ink);
}
.nav-num {
  color: var(--ink-faint);
  flex: 0 0 auto;
  font-variant-numeric: tabular-nums;
}
.nav-name {
  flex: 1;
}
.status-mark {
  flex: 0 0 auto;
  font-size: 13px;
  line-height: 1;
}
.status-mark[data-status="blocked"] {
  color: var(--blocked);
}
.status-mark[data-status="attention"] {
  color: var(--attention);
}
.status-mark[data-status="done"] {
  color: var(--done);
}
.status-mark[data-status="not-checked"] {
  color: var(--ink-faint);
}
.status-mark[data-status="stale"] {
  color: var(--ink-faint);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.save-indicator {
  margin: 14px 0 0 10px;
  font-size: 13px;
  color: var(--ink-faint);
}
.save-indicator[data-conflict="true"] {
  color: var(--attention);
}

.readonly-banner {
  background: var(--attention-tint);
  color: var(--attention);
  padding: 10px 24px;
  font-size: 13px;
  font-weight: 600;
}

.doc-head {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--rule);
  margin-bottom: 36px;
}
.eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin: 0;
}
h1.doc-title {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0;
  text-wrap: balance;
}
.doc-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 13px;
  color: var(--ink-faint);
  margin: 0;
}
.verdict-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  border: 1px solid currentColor;
}
.verdict-pill[data-status="blocked"] {
  color: var(--blocked);
  background: var(--blocked-tint);
}
.verdict-pill[data-status="attention"] {
  color: var(--attention);
  background: var(--attention-tint);
}
.verdict-pill[data-status="done"] {
  color: var(--done);
  background: var(--done-tint);
}

.scope-block {
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 8px;
  padding: 16px 18px;
  margin-bottom: 32px;
}
.scope-block h2 {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin: 0 0 8px;
}
.scope-block dl {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 4px 12px;
  margin: 0;
  font-size: 13px;
}
.scope-block dt {
  color: var(--ink-faint);
}
.scope-block dd {
  margin: 0;
}
.scope-block details {
  margin-top: 10px;
  font-size: 13px;
  color: var(--ink-faint);
}

section.area {
  margin-bottom: 36px;
  scroll-margin-top: 16px;
}
h2.area-title {
  font-size: 19px;
  font-weight: 600;
  margin: 0 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--rule);
}
h2.area-title .area-num {
  color: var(--ink-faint);
  font-weight: 600;
  margin-right: 6px;
}

.item {
  padding: 10px 0;
  border-bottom: 1px solid var(--rule);
}
.item:last-child {
  border-bottom: none;
}
.item[data-kind="inspect"] {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.item-mark {
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  margin-top: 1px;
}
.item-mark[data-status="done"] {
  background: var(--done-tint);
  color: var(--done);
}
.item-mark[data-status="blocked"] {
  background: var(--blocked-tint);
  color: var(--blocked);
}
.item-mark[data-status="attention"] {
  background: var(--attention-tint);
  color: var(--attention);
}
.item-mark[data-status="not-checked"] {
  background: var(--sunk);
  color: var(--ink-faint);
}

.item-body {
  flex: 1;
  min-width: 0;
}
.item-line {
  font-size: 15px;
  margin: 0;
}
.item-evidence {
  display: block;
  color: var(--ink-faint);
  font-size: 13px;
  margin: 4px 0 0;
}
.over-to-you-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 4px;
}

.finding {
  margin-top: 8px;
  border-left: 4px solid var(--rule);
  border-radius: 0 8px 8px 0;
  padding: 12px 14px;
}
.finding[data-severity="blocker"] {
  background: var(--blocked-tint);
  border-left-color: var(--blocked);
}
.finding[data-severity="advisory"] {
  background: var(--attention-tint);
  border-left-color: var(--attention);
}
.finding[data-severity="ds"] {
  background: var(--attention-tint);
  border-left-color: var(--attention);
}
.finding[data-state="dismissed"],
.finding[data-state="stale"] {
  background: var(--surface);
  border-left-color: var(--rule);
}
.finding-label {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin: 0 0 6px;
}
.finding[data-severity="blocker"] .finding-label {
  color: var(--blocked);
}
.finding[data-severity="advisory"] .finding-label,
.finding[data-severity="ds"] .finding-label {
  color: var(--attention);
}
.finding[data-state="dismissed"] .finding-label,
.finding[data-state="stale"] .finding-label {
  color: var(--ink-faint);
}
.finding-detail {
  margin: 0 0 8px;
  font-size: 15px;
  color: var(--ink);
}
.finding[data-state="dismissed"] .finding-detail {
  text-decoration: line-through;
  color: var(--ink-faint);
}
.finding-link {
  margin: 0 0 4px;
  font-size: 13px;
}
.finding-link::before {
  content: "↳ ";
  color: var(--ink-faint);
}
.finding-fix {
  margin: 0;
  font-size: 13px;
  color: var(--ink-soft);
}
.finding-note {
  font-size: 13px;
  color: var(--ink-faint);
  margin: 6px 0 0;
}

.dismiss-details {
  margin-top: 8px;
}
.dismiss-details > summary {
  cursor: pointer;
  list-style: none;
  font-size: 13px;
  font-weight: 600;
  color: var(--link);
  display: inline-flex;
  align-items: center;
  gap: 5px;
  user-select: none;
}
.dismiss-details > summary::-webkit-details-marker {
  display: none;
}
.dismiss-details > summary::before {
  content: "▸";
  font-size: 10px;
  color: var(--ink-faint);
  display: inline-block;
  transition: transform 0.15s ease;
}
.dismiss-details[open] > summary::before {
  transform: rotate(90deg);
}
.dismiss-details .dismiss-form {
  margin-top: 8px;
  display: flex;
  gap: 8px;
  align-items: flex-end;
  flex-wrap: wrap;
}
.dismiss-form label {
  display: block;
  font-size: 12px;
  color: var(--ink-faint);
  margin-bottom: 4px;
}
.dismiss-form input[type="text"] {
  font-family: var(--sans);
  font-size: 13px;
  padding: 7px 9px;
  border: 1px solid var(--control-border);
  border-radius: 4px;
  background: var(--surface);
  color: var(--ink);
  min-width: 260px;
  min-height: 34px;
}
button {
  font-family: var(--sans);
  font-size: 13px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid var(--control-border);
  background: var(--surface);
  color: var(--ink);
  padding: 7px 12px;
  min-height: 34px;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.confirm-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  min-height: 44px;
}
.confirm-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  margin-top: 1px;
  flex: 0 0 auto;
}
.confirm-body {
  flex: 1;
}
.confirm-body label.confirm-label {
  font-size: 15px;
  display: block;
  margin-bottom: 6px;
  cursor: pointer;
}
.confirm-body input[type="text"] {
  width: 100%;
  font-family: var(--sans);
  font-size: 13px;
  padding: 7px 9px;
  min-height: 34px;
  border: 1px solid var(--control-border);
  border-radius: 4px;
  background: var(--surface);
  color: var(--ink);
}

@media (max-width: 900px) {
  .shell {
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
    padding: 28px 20px 80px;
  }
  .toc {
    position: static;
  }
  .toc-label {
    display: none;
  }
  .nav-list {
    flex-direction: row;
    overflow-x: auto;
    gap: 4px;
    padding-bottom: 6px;
  }
  .nav-row {
    flex: 0 0 auto;
    white-space: nowrap;
  }
  .save-indicator {
    margin-left: 0;
  }
}
```

## Palette

Three status hues carry the whole page: one each for blocked, attention, and done,
against a neutral ground. Nothing else is coloured; no accent per section, no
decorative tint. A designer scanning for what is left has to be able to trust that
colour means status.

**Never pair red and green for status.** `--blocked` and `--done` sit on opposite
ends of the red-green axis, which is exactly the pairing deuteranopia and
protanopia collapse into indistinguishable browns: the two most common forms of
colour vision deficiency. `--done` is blue (`#1D5FA6` light, `#5B8DEF` dark)
instead of green, keeping every status on a hue a red-green deficiency still
resolves. `--attention`'s amber is left alone: red+amber isn't the problematic
pairing.

Every text pairing clears 4.5:1 in both themes, on the surface it is actually used
on: including each status colour on its own tint, and `--ink-faint` on `--sunk` as
well as on `--surface`. The lowest is `--ink-faint`, at 5.3:1 light and 4.9:1 dark.

Dark values apply under both `@media (prefers-color-scheme: dark)` guarded as
`:root:not([data-theme="light"])` and `:root[data-theme="dark"]`, so a manual toggle
wins in both directions. That is why the dark tokens appear twice in the reference
stylesheet, and the duplication there is load-bearing rather than an oversight.

**Two tokens for two jobs, and they are not interchangeable.** `--rule` draws
hairlines: section rules, row separators, card edges: and sits near 1.3:1 against
its background on purpose, because a separator that competes with text is noise. It
must never bound a control. Inputs and buttons take `--control-border` instead, at
3.1:1 light and 3.2:1 dark, which is what WCAG 1.4.11 requires of the visual
boundary of a control. A text field edged in `--rule` is legible in its text and
invisible in its shape: the field reads as absent until clicked.

**A chip tints itself from its own text colour**, `color-mix(in srgb, currentColor
10%, transparent)`, never a fixed `--sunk` fill. A finding card already sits on a
status tint, and a fixed light-grey chip on a pale red tint lands at 1.02:1: the
hex literal in a blocker loses its chip precisely where the chip is the point.
Mixing from `currentColor` keeps the same 10% lift on every background the page has,
in both themes, with one declaration.

**Colour is never the only signal.** Each status also carries its own word and its
own glyph, so the page survives a monochrome print and any colour vision
deficiency, blue-yellow included: blocked `●` _Blocked_, attention `▲` _Attention_,
done `✓` _Done_, not checked `○` _Not checked_, stale `–` _Not detected_. A pill
showing only a coloured dot is the failure this rule exists to prevent: the
red-green-safe hues above are the first line of defence, this is the second.

## Type

- Body 15px, `line-height: 1.5`. This is a scanning document; the generous measure
  of a reading document works against it.
- Findings and item text 15px. Metadata, layer links, and dismissal reasons 13px in
  `--ink-faint`.
- **A fix line is not metadata.** 13px, but `--ink-soft`, not `--ink-faint`. The fix
  is the one part of a finding the designer acts on, and setting it in the faintest
  ink at the smallest size ranks it below the link that merely points at it.
- Section headings 19px, weight 600, with the area number in `--ink-faint` before
  the name; `3 · Colour, type, and spacing`.
- Labels and pills: 12px, `font-weight: 600`, `letter-spacing: 0.04em`,
  `text-transform: uppercase`. 12px is the floor; 11px uppercase with tracking
  clears contrast and still reads as fine print, and this page's labels carry
  status.
- A finding's severity label is the exception: 12px `--mono` at weight 700, and
  **not** uppercased. It is a word the designer triages on rather than a category
  label, `Design System` is long enough that tracked capitals hurt it, and the mono
  face plus the status colour already set it apart from the detail beneath.
- `--mono` at 0.92em for every variable name, hex literal, and layer name, in a
  chip. Bare `#0a7d8c` in prose reads as a word; the chip is what makes a literal
  value scannable.
- The main column caps at 780px. Finding cards span it rather than sitting narrower.

## Base reset

The reset near the top of the reference stylesheet; `box-sizing` on everything, and
zeroed margins on `p`, the headings, and the `dl` family: is why every margin in the
sheet below it is additive on top of zero rather than a correction of an unknown
browser default.

Keep it there, and keep giving margin back explicitly per component. The alternative
is how a gap-sized bug got in once: `.item-line` shipped as a bare `<p>` with no
margin rule of its own, and the browser's ~1em default opened a visible gap between
an item's status mark and its title. No rule in the sheet was wrong in isolation.

## Layout

A centred two-column grid: a contents rail and the document: floating on
`--ground`. Both columns share one page background; neither sits in a panel.

```
        ┌──────────────┬────────────────────────────────┐
        │ AREAS        │  HANDOFF READINESS REVIEW      │
        │ ✓ 1 File …   │  Tenancy flow; Checkout       │
        │ ● 2 Comp…    │  ⚠ Not ready · 25 Aug · 3 dis… │
        │ …            │  ── scope ──                   │
        │ ▲ 10 Cross…  │  ── 1 File hygiene ──          │
        │ Saved 14:32  │  items, findings inline        │
        └──────────────┴────────────────────────────────┘
```

The rail is `232px`, `position: sticky; top: 40px; align-self: start`; it sticks at
its own height, not the viewport's, so it never scrolls internally and never draws a
column edge down the page. No background, no border: the only chrome is the `Areas`
eyebrow and the row that is hovered or current, which takes `--sunk` and darkens to
`--ink`. Rows are 6px-radius pills at `--ink-soft`, 44px tall.

Each row carries a status mark, the area number, and the name, and links to its
section (`href="#area-3"`). All ten areas, always, in checklist order. It is the
instrument: a designer returning after two days reads it top to bottom and knows
what is left without re-reading a single finding.

**The mark is a glyph, not a dot.** A coloured dot is the tidier rail and the wrong
one: it carries status by hue alone, which fails WCAG 1.4.1, and our five statuses
do not survive reduction to a traffic light. Keep `●▲✓○–` in the status colour, and
give each one its word for a screen reader:

```html
<span class="status-mark" data-status="blocked" aria-hidden="true">●</span>
<span class="visually-hidden">Blocked</span>
```

Dropping the visible uppercase word is the whole gain of this rail over a
full-height sidebar: the row reads as navigation, and the status is a glance rather
than a second column of shouted text.

Recompute every mark on each render, from the rules in `ARTIFACT-STATE.md`. A rail
that does not move when a box is ticked is the one bug that makes the whole artifact
pointless.

**The rail also tracks the scroll position.** `.current` goes on the row for the last
`section.area` whose `offsetTop` is above `scrollY + 80`, recomputed on scroll and
after every render. Without it a designer working down a 10-section page has no idea
where they are, and the styling for `.current` in the reference stylesheet does
nothing.

Register that scroll listener **once**, at the foot of the app script: never inside
the render function. `render()` runs on every tick, dismissal and reopen, so
registering there adds a listener per render and they accumulate for the life of the
tab. The handler has to re-query `.nav-row` and `section.area` on each call, because
render replaces the DOM wholesale, so it cannot close over cached node lists:

```js
render();
window.addEventListener("scroll", markCurrentNav, { passive: true });
```

Under 900px the grid collapses to one column and the rail unsticks into a horizontal
scroller above the content. Do not collapse it into a menu: it is the navigation
and the status display at once, and hiding it hides the progress.

Main column: capped at 780px by the grid track, generous section spacing, a hairline
rule under each section heading. Every section renders even when empty of findings;
a section of ticks is how a designer tells a clean area from an unreviewed one.

## Components

**Header block**, top of the main column. Four rows, in this order: the `Handoff
readiness review` eyebrow; the title as `<file> — <scope>` at 26px; a meta row; then
the scope block.

The meta row holds exactly four things, in this order, and nothing else:

1. **The verdict**, as a pill: the word in its status colour on the matching tint,
   `border: 1px solid currentColor`. The three verdicts map to `data-status` as
   `Not ready` → `blocked`, `Ready with caveats` → `attention`, `Ready for Dev` →
   `done`. The pill carries the word alone; nothing is appended to it.
2. **The pass date**, as `Pass 2026-08-25`. This is the document's only copy of it.
3. **The dismissed count**, where any finding is dismissed: _3 dismissed by the
   designer_. Omitted entirely at zero.
4. **`Open in Figma`**, linking `state.file.url`; the file, not a node. Last,
   because it is the one item that leaves the page.

The dismissed count is not optional. It is what stops a verdict resting on the
designer's judgment from reading as one resting on evidence.

```html
<p class="doc-meta">
  <span class="verdict-pill" data-status="done">Ready for Dev</span>
  <span>Pass 2026-08-25</span>
  <span>11 dismissed by the designer</span>
  <a href="https://www.figma.com/design/AbC123/Tenancy-flow">Open in Figma</a>
</p>
```

The verdict belongs here rather than in the rail because it is a property of the
document, not a place to navigate to. In the rail it read as an eleventh nav row; in
the title region it reads as the answer to the question the title asks.

**Scope block**, directly under the header block. A `<dl>` of exactly three rows, in
this order and under these labels: **Pages**, **Frames**, **Excluded**. Frames are
layer links, per step 6's linking rule; pages are plain text, because a page needs no
node ID to find. Where earlier passes covered different scope, a `<details>` beneath
it lists them: one line per pass, oldest last.

Keep all three rows even where a value is thin. A whole-page pass records no frame
list, and the row then reads `All top-level frames on the page` rather than rendering
an empty `<dd>`; an unexplained blank next to a label reads as a page that failed to
load its own scope.

**No `Pass date` row.** The date belongs to the document, not to the scope, and the
meta row above already carries it: a fourth row repeating it four lines lower reads
as a second, differently-scoped date. The block answers one question only: what was
and was not looked at.

**Derive the excluded line; never default it.** It says what a reader will otherwise
assume wrongly, so it has to come from `scope.pagesInFile` against `scope.pages`, per
`ARTIFACT-STATE.md`:

```js
var covered = pass.scope.pages,
  all = pass.scope.pagesInFile || [];
var rest = all.filter(function (p) {
  return covered.indexOf(p) === -1;
});
var text = pass.scope.excluded
  ? pass.scope.excluded
  : all.length === 0
    ? "Not established"
    : rest.length === 0
      ? "Nothing: the file's only page" +
        (all.length > 1 ? "s, all " + all.length + " reviewed" : "")
      : "Other pages in this file: " + rest.join(", ");
```

A constant fallback here is how a review of one page out of five shipped a header
reading _Nothing: whole file reviewed_. An empty `excluded` field means nobody
recorded an exclusion; it does not mean there was nothing to exclude, and the page
must never upgrade the one into the other. Where the pass never listed the file's
pages, `Not established` is the honest line.

**Checklist item.** One row per item, in checklist order, both kinds colocated in
the area they belong to. Rows are separated by a 1px `border-bottom: var(--rule)`
hairline (omitted on the last item in a section), never a permanent coloured left
border on the item itself: a rail on every row, most of them neutral, reads as
decoration rather than a signal, and it collides with a nested finding card's own
border (see below). Status lives on a small square mark instead:

- `[inspect]`; a 20×20px `.item-mark` badge, filled with the status's `-tint`
  background and set in the status colour, holding the same glyph the rail's status
  marks use (`✓`/`●`/`▲`/`○`). It sits as a flex sibling of the item's text
  column, not absolutely positioned inside it: the item itself is `display: flex`.
- `[confirm]`; no mark; the real `<input type="checkbox">` is the leading control,
  plus a small-caps `Over to you` label above it. A checkbox that isn't rendered
  yet needs no separate status glyph.

An `[inspect]` item's mark comes from `itemStatus()` in `ARTIFACT-STATE.md`, mapped
onto the page's five display statuses. This mapping is the table; do not re-derive it
per build:

| `itemStatus`                                 | `data-status` | Glyph |
| -------------------------------------------- | ------------- | ----- |
| `passed`                                     | `done`        | `✓`   |
| `outstanding`, any open `blocker`/`ds`       | `blocked`     | `●`   |
| `outstanding`, open `advisory` only          | `attention`   | `▲`   |
| `resolved`; every finding dismissed or stale | `attention`   | `▲`   |
| `not-checked`; `reached: false`              | `not-checked` | `○`   |

**A resolved item is `attention`, not `done`.** Every finding on it is dismissed or
stale, so nothing is outstanding: but a plain `✓` would erase the distinction
between a line that passed on evidence and a line the designer decided did not apply
to their design. The card beneath it carries the record; the mark has to say there is
one to read.

That makes the item mark and the rail deliberately asymmetric: `ARTIFACT-STATE.md`'s
section rules let an all-dismissed section reach **Done**, while its items still show
`▲`. Both are right, because they answer different questions: the rail answers _is
there work left in this area_, and the item mark answers _is this line a clean pass_.
Do not "fix" either one to match the other.

```html
<div class="item" data-kind="inspect" data-status="done">
  <span class="item-mark" data-status="done">✓</span>
  <div class="item-body">
    <p class="item-line">No default layer names</p>
    <p class="item-evidence">0 authored, 14 inside library instances</p>
  </div>
</div>
```

A passed item is two lines inside `.item-body`, stacked, never a single flex row
with the mark: the item text on its own line, then `evidence` on the line beneath
it in `--ink-faint`, omitted where empty. `evidence` is often longer than the item
text and wraps on its own; laying the mark, text, and evidence out as flex
siblings of each other (rather than mark-vs-body) makes the wrapped evidence
collide with the item text instead of sitting cleanly beneath it: keep `.item-body`
a plain block, and put `display: flex` only on `.item` itself.

An unreached `[inspect]` item follows the same shape, `not-checked` mark and the
running text starting at the same indent as a passed item's:

```html
<span class="item-mark" data-status="not-checked">○</span>
<div class="item-body">
  <p class="item-line">Not checked; Colours use Design System variables</p>
</div>
```

Never a tick.

**Finding card**, nested under its item, background `--*-tint`, a 4px left-accent
border in the status colour, rounded only on the right (`border-radius: 0 8px 8px
0`) so the accent reads as a flat coloured spine rather than a boxed-in rule. In
order: the severity label on its own line, set in `--mono` and the status colour,
the detail text, then the layer link on its own line (prefixed `↳`), then the fix
on its own line in `--ink-faint`. A `ds` finding's label reads `Design System` and
its fix line names the Design System team as owner.

**Every link out of the page carries `target="_blank" rel="noopener"`**; the layer
links in a finding card and in the scope block, and the header's `Open in Figma`
alike. The artifact renders in a frame on claude.ai, and a designer clicking a layer
link mid-checklist must not lose the page they are working down.

This is a deliberate exception to the item's own rule against a permanent rail
(see **Checklist item** above): the item carries its status on `.item-mark`, not
on a rail, so there is nothing in the left-hand gutter for the finding card's
accent to compete with. The two only conflict when both use the same device in
the same place: one uses a mark, the other a rail, so both can stand.

```html
<article class="finding" data-severity="blocker" data-state="open">
  <p class="finding-label">Blocker</p>
  <p class="finding-detail"><code>#0a7d8c</code> on the background fill, on all 6 breakpoints</p>
  <p class="finding-link">
    <a href="https://www.figma.com/design/AbC123/Tenancy-flow?node-id=2145-8830"
      >Desktop / Header</a
    >
  </p>
  <p class="finding-fix">Fix: bind to <code>--colour-brand-primary</code></p>
  <details class="dismiss-details">
    <summary>Dismiss…</summary>
    <div class="dismiss-form"><!-- reason input + submit, below --></div>
  </details>
</article>
```

**Dismiss control.** The button reveals a small form: a required one-line reason
and a Dismiss submit: and submit stays disabled while the reason is empty. Say
what the reason is for in the label: _Why does this not apply to your design?_ A
reason box with a bare `Reason` label gets `n/a` typed into it.

Build the disclosure from a native `<details>`/`<summary>` pair, not a button
toggling a `hidden` attribute by hand. `<details>` without `open` never renders its
children: including a form styled `display: flex`; so there is no cascade to get
wrong, no JS to wire the toggle, and no `aria-expanded`/`aria-controls` bookkeeping
to keep in sync: the element carries that semantic natively. Style only `summary`,
never the disclosure triangle's role: suppress the default marker and draw your
own so it still communicates open/closed:

```html
<details class="dismiss-details">
  <summary>Dismiss…</summary>
  <div class="dismiss-form">
    <div>
      <label for="reason-f1">Why does this not apply to your design?</label>
      <input
        type="text"
        id="reason-f1"
        data-action="reason-input"
        data-finding="f1"
        placeholder="Reason"
      />
    </div>
    <button data-action="dismiss-submit" data-finding="f1" disabled>Dismiss</button>
  </div>
</details>
```

`summary` is not a link and should not read as one: leave its default underline-on-hover
un-set rather than adding one, and never wrap it in or style it like an `<a>`.

Wire the reason input and the submit button through the same `data-action` value
the rest of the page's event delegation uses: never a different attribute like
`data-role` for one and `data-action` for the other, as the markup above does. A
delegated listener that reads `event.target.dataset.action` sees nothing from an
element carrying `data-role` instead, so the input silently never fires and the
submit button never clears its `disabled` state, with no console error to point at
why:

```js
document.addEventListener("input", (e) => {
  if (e.target.dataset.action !== "reason-input") return;
  const submit = document.querySelector(
    '[data-action="dismiss-submit"][data-finding="' + e.target.dataset.finding + '"]',
  );
  submit.disabled = e.target.value.trim() === "";
});
```

A dismissed card keeps its place in the list, drops to `--surface`, strikes the
detail through, and shows the reason and date in `--ink-faint` beneath it, with a
`Reopen` button in place of `Dismiss`. Never hide it and never move it: its
presence is the record that the designer made a call here.

A `stale` card renders on `--surface` in `--ink-faint` with a `– Not detected this
pass` label, keeping its reason if it had one. No controls: only a pass changes this
state.

**Confirm item.** A real `<input type="checkbox">` with the item text as its
`<label>`, then an optional single-line note field beneath: placeholder _Add a note
for engineering (optional)_: that persists whether or not the box is ticked. Many
of these items need a specific answer rather than a yes, and the note is the part
that outlives the checklist, so give it room even when unticked.

**Save indicator.** One line at the foot of the rail, in `--ink-faint`, and it has
exactly four states. A page that saves silently gives a designer no reason to trust
that closing the tab is safe.

| When                              | Text                                         |
| --------------------------------- | -------------------------------------------- |
| Nothing to say (initial render)   | empty                                        |
| A publish is scheduled or running | `Saving…`                                    |
| The publish resolved              | `Saved 14:32`; local time, hours and minutes |
| `conflict`                        | `Not saved: updated elsewhere, reloading…`   |
| Any other rejection               | `Save failed: will retry on next change`     |

The conflict line takes `--attention` via `data-conflict="true"`; the rest stay
`--ink-faint`. Both failure strings say what happens next, because neither is
something the designer can act on directly: the conflict one is followed by a
reload, and the other by the next edit retrying. A bare `Save failed` leaves them
wondering whether to re-type the note.

It is the page's only live region, and it has to be in the document before the text
changes: a region inserted and populated in the same render announces nothing:

```html
<p class="save-indicator" id="save" role="status" aria-live="polite"></p>
```

Render the element unconditionally, empty when there is nothing to say, and write
only its `textContent` afterwards.

**Read-only banner.** Where `publish` is unavailable: no capability, or a viewer
without edit access: a strip above the scope block saying the checklist is
read-only because the viewer has view access, and that edit access is needed to tick
items. Render every control absent rather than disabled: a disabled checkbox invites
clicking it.

## Accessibility

Check each; the palette above does not make the page compliant on its own.

- **Contrast ≥ 4.5:1** for every text pairing in both themes, including status labels
  on their tints, and `--ink-faint` on `--sunk` as well as on `--surface`.
- **Contrast ≥ 3:1 for every control's edge**; `--control-border`, never `--rule`.
  This is the one that gets missed, because the text inside the control passes.
- **A status word and glyph beside every status colour**, per the palette section.
- **Sequential headings**; `h1` for the title, `h2` per area, `h3` only if an area
  genuinely subdivides. Never a heading tag for smaller type.
- **Real `<label>` for every checkbox and note field**, associated by `for`/`id`,
  not adjacent text. The item text is the checkbox's accessible name.
- **The dismiss disclosure** is a native `<details>`/`<summary>` pair, not a
  `<button>` toggling a sibling's visibility by hand.
- **Live status changes announced**; an `aria-live="polite"` region carrying the
  save indicator, so a screen-reader user learns the tick was saved.
- **Focus outline ≥ 2px** in `--link` via `:focus-visible`, on the rail's rows too.
- **Targets ≥ 44px for the two rows a designer works down**; rail rows and
  `[confirm]` checkbox rows, both held there by `min-height`. Inline controls inside a
  finding card sit at 34px: comfortably past the 24px WCAG 2.5.8 asks of them, and
  44px would make every dismissed card a bank of buttons.
- **Motion honours `prefers-reduced-motion`**; the only animation on the page is the
  disclosure marker's rotate, and the reset near the top of the stylesheet covers it.
- **`color-scheme`** declared per theme, so native checkboxes and scrollbars render
  correctly under a forced `data-theme`.
