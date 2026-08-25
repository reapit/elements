# Artifact state

The authoritative schema for a stateful handoff-review Artifact, plus the rules for
carrying one forward across passes. Reached from [`SKILL.md`](SKILL.md) step 7,
which owns the decision about whether this pass publishes an artifact at all.

Match this schema exactly. A re-run reads its own previous output back through it,
so a renamed field or an invented state loses the designer's dismissals silently —
they read as an empty checklist rather than as an error.

## Why the page holds state at all

The chat report is spent once the designer works through it. The artifact is the
opposite: a live checklist worked over days, where what accumulates is the
designer's own decisions — which findings they dismissed and why, which `[confirm]`
items they have answered. Those decisions are the asset. Everything below exists to
keep them across re-runs of the review.

The page persists them with the `artifact` runtime capability: `capabilities:
{artifact: {}}` at publish, `await claude.use("artifact")` in the page, and
`artifact.publish(html)` to save a new version. Load the `artifact-capabilities`
skill before writing any of that code — it is authoritative for the call contract
over anything restated here.

## The state document

One JSON object, embedded in the published HTML as
`<script type="application/json" id="review-state">`. The page renders itself from
it and never reads state out of the DOM.

```json
{
  "schema": 1,
  "file": {
    "name": "Tenancy flow",
    "key": "AbC123",
    "url": "https://www.figma.com/design/AbC123/Tenancy-flow"
  },
  "passes": [
    {
      "id": "p1",
      "date": "2026-08-25",
      "scope": {
        "pages": ["Desktop", "Mobile"],
        "pagesInFile": ["Desktop", "Mobile", "Explorations"],
        "frames": [{ "name": "Desktop / Checkout", "nodeId": "2145:8830" }],
        "excluded": "Explorations page, at the designer's request"
      }
    }
  ],
  "sections": [
    {
      "id": 1,
      "name": "File hygiene",
      "items": [
        {
          "id": "1.1",
          "text": "No default layer names",
          "kind": "inspect",
          "reached": true,
          "evidence": "0 authored, 14 inside library instances",
          "lastPass": "p1",
          "findings": []
        },
        {
          "id": "1.7",
          "text": "Abandoned exploration frames and old versions cleared out",
          "kind": "confirm",
          "state": "pending",
          "note": "",
          "lastPass": "p1"
        }
      ]
    }
  ]
}
```

A finding, in the `findings` array of an `[inspect]` item:

```json
{
  "id": "f1",
  "severity": "blocker",
  "detail": "#0a7d8c on the background fill, on all 6 breakpoints",
  "frame": "Desktop / Header",
  "nodeId": "2145:8830",
  "fix": "bind to --colour-brand-primary",
  "state": "open",
  "dismissal": null,
  "firstPass": "p1",
  "lastPass": "p1"
}
```

### Fields

`file.key` is the segment after `/design/` in the Figma URL. It is the only
identifier that survives page renames and frame refactors, so it — with
`scope.pages`, per `SKILL.md` — is what a later pass matches on. The file name never
is.

`passes` is append-only, oldest first. Each pass records what was in scope when it
ran; nothing later rewrites an earlier entry. `passes[passes.length - 1]` is the
current pass, and every item touched by it carries that `id` in `lastPass`.

`scope.pages` is what this pass covered. `scope.pagesInFile` is every page the file
holds, whether reviewed or not, as listed in step 1 — the two together are what let
the page state its own coverage instead of assuming it. It must come from the Plugin
API's `figma.root.children`: the metadata capability's page listing reports only the
pages the editor has loaded, and a short list here reads as a small file rather than
as a partial answer. Omit `pagesInFile` only where the pass genuinely never listed
them, which the scope block then says.

`scope.frames` is only for a pass scoped narrower than a page: the frames step 1
named, each with its node ID. Omit it for a page- or file-scoped pass rather than
writing an empty array, which reads as a pass that found no frames.

`scope.excluded` is prose, and only for an exclusion someone decided on: a page the
designer ruled out, a flow deferred. It is not the list of pages this pass did not
reach — that is derived. Leave it empty when nobody decided anything, and never write
it to reassure a reader.

`sections` holds all ten areas of [`HANDOFF-CHECKLIST.md`](HANDOFF-CHECKLIST.md), in
its order, each with its own number and name. Every area gets a section, area 10
included — unlike the chat report, the artifact gives it a heading like any other,
because the rail needs a row for it.

`items` holds both kinds in checklist order, colocated. `kind` is `inspect` or
`confirm`, matching the checklist's own marking, and it decides which fields the
item carries: `reached`/`evidence`/`findings` for `inspect`, `state`/`note` for
`confirm`. An item never carries both sets.

`id` on an item is its checklist coordinate — area number, then position within the
area (`1.1`, `3.4`, `10.2`). It comes from `HANDOFF-CHECKLIST.md` and never from the
Figma file, which is what lets a designer's answer survive any amount of
refactoring. Keep these stable when the checklist changes: append a new item rather
than renumbering the ones after an insertion, or every prior artifact's state
misaligns on its next pass.

`evidence` is the count or reason that makes a pass credible — the same thing the
chat report puts on the ticked line. Empty string where the pass needs no
qualifier.

`reached` is `false` for an `[inspect]` item the pass could not inspect, with the
reason in `evidence`. Never a pass and never a finding, exactly as in step 5.

`severity` is `blocker`, `advisory`, or `ds` — the last being step 5's Design System
finding, which the page labels as owned by the Design System team rather than by the
designer.

`nodeId` is the shallowest node ID that isolates the finding, in `2145:8830` form.
The page builds the layer link from `file.url` and this, converting the colon to a
hyphen, per step 6's linking rule. Store the raw ID; do not store a built URL.

## Three state machines

Each is independent, and none of them ever deletes anything.

**A finding** — `open` → `dismissed`, and `open`/`dismissed` → `stale`.

- `open`: detected and outstanding. Counts toward the verdict.
- `dismissed`: the designer judged it inapplicable to their design. Requires a
  non-empty `dismissal.reason`; the page refuses to dismiss without one, because an
  unreasoned dismissal is indistinguishable from a mis-click a week later. Stays
  visible, struck through, with the reason shown inline. Reversible — reopening
  clears `dismissal` and returns the finding to `open`.
- `stale`: a later pass no longer detects it. Shown greyed, labelled _not detected
  this pass_, dismissal reason preserved if it had one. Only a pass sets or clears
  this state, never the designer.

`dismissal` is `{ "reason": "...", "at": "2026-08-26" }` or `null`.

**A `[confirm]` item** — `pending` → `confirmed`, reversibly. `note` is an optional
short answer the designer types, kept whether or not the box is ticked. Many of
these items need a specific answer rather than a yes, so the note is where that
answer lives — and it is the part engineering reads afterwards.

**An `[inspect]` item** has no designer-editable state. It is derived: passed when
`reached` and no findings, resolved when every finding is `dismissed` or `stale`,
outstanding when any finding is `open` or when `reached` is `false`.

```js
function itemStatus(item) {
  if (!item.reached) return "not-checked"; // or "outstanding", per the caller's needs
  var findings = item.findings || [];
  if (findings.length === 0) return "passed";
  var open = findings.filter(function (f) {
    return f.state === "open";
  });
  if (open.length > 0) return "outstanding";
  return "resolved"; // every finding is dismissed and/or stale — none open
}
```

Branch on `findings.length === 0` for "passed", never on "no open and no stale
findings" — an item whose only findings are all `dismissed` has zero open and zero
stale findings too, and reads as falsely passed under that test. The render path
must follow the same branch: only the `findings.length === 0` case skips calling
`renderFinding()`. A dismissed or stale finding still has to render — struck
through, with its reason and a Reopen control — under both "resolved" and
"outstanding". Collapsing "resolved" into the same render branch as "passed" is
what makes a dismissed finding disappear along with its Reopen control, with no
way back to reopen it.

## Deriving status

The rail's marks and the header's verdict pill both read off the same derivation. Compute it live from
state on every render, never store it — a stored status goes stale the moment a
designer ticks something.

Per section, the first matching rule wins:

1. **Not checked** — no item in the section has ever been reached or answered. The
   section was out of scope for every pass. Neutral, and explicitly not a pass.
2. **Blocked** — any open finding of severity `blocker` or `ds`.
3. **Attention** — any open `advisory`, any `pending` confirm item, any `[inspect]`
   item with `reached: false`, or any `stale` finding.
4. **Done** — everything else.

`stale` holds a section at Attention on purpose. A finding that stopped being
detected between passes was either fixed or displaced by a refactor, and nothing in
the file distinguishes those two. Letting it fall through to Done would let a
refactor launder a blocker into a green section.

The overall verdict follows step 6's rule, reading dismissed findings as resolved.
That is what the designer asked for by dismissing them — but it must never be
silent: where any finding is `dismissed`, the count of them is displayed alongside
the verdict, so a reader of the handed-over artifact can see the verdict rests partly
on the designer's judgment rather than on evidence.

It sits beside the pill as its own item in the header's meta row — _3 dismissed by
the designer_ — and never inside the pill's own text. `ARTIFACT-STYLE.md` owns that
row's contents and order; this file owns only the rule that the count cannot be
omitted when it is non-zero.

## Carrying a prior artifact forward

Step 7 hands you the previous artifact's HTML. Parse its `#review-state` JSON,
append a pass, then reconcile item by item. The prior state wins on everything the
designer authored; the new pass wins on everything it observed.

**`[confirm]` items** carry forward whole — `state`, `note`, and all. Their IDs are
checklist coordinates, so nothing about the Figma file can invalidate them. A pass
never resets one; only the designer changes it.

**Findings** reconcile by matching each newly detected finding against the item's
existing ones, on the same checklist item only:

1. Same `nodeId` → the same finding. Update `detail`, `fix` and `lastPass`; keep
   `id`, `state`, `dismissal`, and `firstPass` untouched.
2. No `nodeId` match, but the normalised `detail` matches — lowercased, whitespace
   collapsed, node IDs and counts stripped → treat as the same finding and update
   its `nodeId` too. This fallback is a guess: it is how a finding survives its
   node being recreated by a refactor, and it will occasionally join two findings
   that were never the same one. Say so in the report where it fired.
3. No match → a new finding, `state: "open"`, `firstPass` and `lastPass` both the
   current pass.

Any existing finding the new pass did not match becomes `stale`, whatever state it
was in. Never drop it.

**Items outside this pass's scope** keep their existing `findings`, `evidence`, and
`lastPass` exactly as they were. Do not mark their findings `stale` — the pass did
not fail to detect them, it did not look. The section's status derives from state
that a prior pass established, and the item shows the date of the pass that last
reached it, so nothing reads as freshly verified when it is not.

**Scope narrower than a prior pass** is the ordinary case: a designer reviewing one
frame today after a whole-file pass last week. One artifact per file holds both,
which is why `scope` lives on the pass rather than on the document.

## Publishing from inside the page

The page has to reproduce itself: emit a complete document whose embedded state is
the new state, and whose markup and behaviour are unchanged. Build that document
from the page's own parts, never by serialising the live DOM — the DOM holds
rendered output, and serialising it compounds a copy of the rendered checklist into
every subsequent version.

Keep three elements in the body, each addressable by ID, and let the app emit a
document containing exactly those three plus an empty mount point. Order matters:
`<div id="root">` must appear before `<script id="app">` in the document, because
a non-deferred script runs the instant the parser reaches it — placing the mount
point after the script leaves `document.getElementById("root")` null on first
render, which throws setting `innerHTML`.

- `<style id="css">` — the whole stylesheet
- `<div id="root">` — rendered into on load, emitted empty
- `<script type="application/json" id="review-state">` — the state
- `<script id="app">` — all behaviour

```js
// Per SKILL.md step 7: "Handoff review — <file name> · <pages> (<scope key>)".
function scopeWords(state) {
  return coversWholeFile(state) ? "whole file" : currentPass(state).scope.pages.join(", ");
}

function scopeKey(state) {
  if (coversWholeFile(state)) return state.file.key + "/all";
  return state.file.key + "/" + currentPass(state).scope.pages.map(slug).sort().join("+");
}

function title(state) {
  return (
    "Handoff review — " + state.file.name + " · " + scopeWords(state) + " (" + scopeKey(state) + ")"
  );
}

function serialise(state) {
  const json = JSON.stringify(state).replace(/</g, "\\u003c");
  const css = document.getElementById("css").textContent;
  const app = document.getElementById("app").textContent;
  const close = "<\/" + "script>";
  return (
    '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    "<title>" +
    title(state) +
    "</title>" +
    '<style id="css">' +
    css +
    '</style></head><body><div id="root"></div>' +
    '<script type="application/json" id="review-state">' +
    json +
    close +
    '<script id="app">' +
    app +
    close +
    "</body></html>"
  );
}
```

Escaping `<` in the JSON is what stops a dismissal reason containing `</script>`
from breaking the document it is stored in.

**Derive every part of the title from state, and freeze none of it as a literal in
the app script** — the file name, the scope words, and the scope key alike. The
`<title>` tag is what names the artifact and the scope key is what the next pass
matches on, so a hard-coded copy reverts on the designer's next tick whenever a pass
had changed either: the artifact ends up named after a Figma file that no longer goes
by that name, or claiming a scope the pass has since widened. State is the single
source of truth for the title, in the page as much as in the pass.

The same rule governs the `h1`, which is `<file name> — <scope words>` per
`ARTIFACT-STYLE.md`, and reads its scope from the same derivation rather than from a
second constant. `coversWholeFile` is true where `scope.pages` covers every entry in
`scope.pagesInFile` — and also where `scope.pages` is empty, which is the only
honest reading of a pass that recorded no page list.

The file you write with the Write tool differs from what `serialise` emits, and only
here: the Artifact tool wraps a published file in its own `<!doctype html>`, `<head>`
and `<body>`, so the source file carries no doctype and no `<html>`/`<head>`/`<body>`
tags — just a `<title>`, then those four elements. Runtime publishes emit the full
document because `artifact.publish` takes one. Keeping all four elements in the body
is what makes both forms produce the same page.

Put the `<title>` first in the source file. Only its first 8KB is scanned for one,
and the stylesheet is longer than that.

### Publish discipline

Publish only in response to a designer action — never on load, which would
overwrite whatever the last pass wrote with a re-render of it. Update state, then
serialise, then publish, then let the reload render it.

Batch a burst of edits into one publish. Ticking four boxes in ten seconds should
produce one version, not four; debounce a second or so after the last change, and
show the pending state optimistically in the meantime.

Debouncing when a publish is _scheduled_ is not enough on its own — it does
nothing to stop two publishes from being _in flight_ at once. A debounce timer
only coalesces edits that land inside one window; an edit arriving just after the
timer fires (while that publish's promise is still pending) starts a second timer
that, 900ms later, calls `artifact.publish` again before the first call has
resolved. Two in-flight publishes race, and because each one serialises whatever
`state` holds _at the moment it fires_ — not a snapshot from when it was
scheduled — the one that resolves last wins the version regardless of which was
started first. If it started first, it wins with a HTML string that is missing
whatever the second one had already been given to include, and that edit is
gone. Guard with a `publishing` flag plus a `dirty` flag, so a second edit while a
publish is in flight schedules nothing until the in-flight one settles, and the
in-flight one's own `.then`/`.catch` starts the next publish if `dirty` is still
true:

```js
var saveTimer = null,
  publishing = false,
  dirty = false;

function scheduleSave() {
  dirty = true;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(doPublish, 900);
}

function doPublish() {
  saveTimer = null;
  if (!artifact || publishing || !dirty) return;
  dirty = false;
  publishing = true;
  artifact
    .publish(serialise(state))
    .then(function () {
      publishing = false;
      if (dirty) scheduleSave(); // more edits arrived while this publish was in flight
    })
    .catch(function (err) {
      publishing = false;
      if (err && err.code === "conflict") {
        /* reload wins, do not retry */ return;
      }
      if (dirty) scheduleSave();
    });
}
```

`conflict` means someone else published first, and every view — this one included —
reloads to their version, dropping this edit. Do not retry: say plainly that the
change was not saved because the page was updated elsewhere, and let the reload
carry the designer to the current state.

`publish` rejects with `not_granted` or `not_writer` for a viewer without edit
access. Render the whole page read-only in that case: no checkboxes, no dismiss
controls, and a line at the top saying the checklist is read-only because the
viewer has view access. A designer who can tick nothing needs to know that is a
permission, not a bug.

`claude.use("artifact")` resolving `null` means the capability is unavailable in
this view. Same treatment — the page is a static report, and says so.
