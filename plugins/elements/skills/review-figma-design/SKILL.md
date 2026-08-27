---
name: review-figma-design
description: Review a Figma design for engineering-handoff readiness against the Reapit Design System, reporting blockers and advisories. Use before marking a design Ready for Dev, when checking a design's use of Elements components and variables, or when a shareable handoff checklist is wanted: each triggers the same full review.
argument-hint: [Figma file, page, or frame URL]
compatibility: requires a connected Figma MCP server with read access to the file under review
---

# Review a Figma Design

Produce a handoff readiness report for a Figma design: what engineering can build
as-is, what needs the designer's attention first, and what only the designer can
confirm.

The review reports; the designer decides and edits. Leave the file exactly as you
found it: no renamed layers, no rebound variables, no annotations added. That
constrains what a script does, not which tool runs it: the capability that executes
Plugin API scripts is a write tool, and several checks below have no other route,
so use it for reads and write nothing.

Every item this review checks is one of two kinds, and `HANDOFF-CHECKLIST.md` marks
each accordingly:

- **`[inspect]`** — reachable through a capability below. Give it a verdict.
- **`[confirm]`** — reachable only by asking the designer. It is never a pass and
  never a blocker, and it is reported under step 6's **Over to you** section.

## What the Figma MCP gives you

Discover the tool names from the server itself; they change between versions, so
work from capabilities rather than a remembered list. A connected Figma MCP
exposes some or all of:

- **Structure** for a node or page: child names, node types, geometry, and a
  visibility flag per node. Scales to a frame, not a page. Some servers write an
  oversized result to a file and return the path; read it from disk where that
  happens, but step 2 does not depend on it.
- **Bound variables** for a node: the Design System variables a node's
  properties actually resolve to.
- **Generated reference code** for a node: the strongest signal for values that
  bypass variables, since unbound properties appear as literals (`#0a7d8c`,
  `13px`) where bound ones appear as variable or token references. This also
  reveals auto layout, and resolves Code Connect mappings to Elements components.
- **Subscribed libraries** for the file.
- **Motion data** for a node: keyframes, easing, duration.
- **Screenshots** of a node.
- **Plugin API execution**: arbitrary read-only scripts against the file. This is
  the only route to a node's Dev Mode annotations and to the file's annotation
  categories, which by default are Development, Interaction, Accessibility, and
  Content. It is also the only route to prototype data, to an instance's main
  component, and to a trustworthy list of the file's pages. Where it is unavailable,
  every annotation check in the checklist falls back to `[confirm]`.

  A script must `return` its result. Anything logged to the console is discarded,
  and the run reports no return value; an audit written with `console.log` is lost
  in full. [`PLUGIN-API-SCRIPTS.md`](PLUGIN-API-SCRIPTS.md) in this skill's
  directory holds a script per survey, ready to adapt: the page list, inventory and
  hygiene, variant states, annotations, prototype, and placeholder copy.

Three capabilities carry the review. The Plugin API gives breadth, because a script
can walk the whole page and return a tally where a response carrying the nodes
themselves would overflow; it also holds annotations, prototypes, and component
identity, which nothing else reaches. Generated reference code gives depth, one
instance at a time. Structure sits between them, for a single frame.

Resolve a component's identity through the Plugin API; an instance's main
component, then whether that component is remote, rather than by searching the
design system. Design-system search matches fuzzily, and returns confident,
unrelated components for an exact component name, which populates the unaccounted
bucket in step 3 with names that were never unaccounted.

Every capability above exists on a current server. If you cannot find the tool for
one, search the available tools by what it does before concluding it is missing;
one failed guess at a tool name is not evidence of absence. A check stays
inspectable regardless; downgrading it to `[confirm]` because you could not find
the tool reports a gap in your search as a gap in the design.

## Step 1 — Fix the scope

Scope is whatever the designer names: a whole file, one page of it, or a single
frame. All three are ordinary requests, and a review of one frame is not a lesser
review; it checks the same items against less of the file. What changes is only
what the report says was excluded.

List the file's pages and **keep the whole list, not just the part you review**.
Steps 6 and 7 both need it: what a review excluded is the pages it did not cover, and
that is a fact about the file, not about the URL you were handed. A node-specific link
names one frame and says nothing about its siblings, so a review scoped from one link
knows its own scope and nothing else unless you go and look.

Get that list from the Plugin API: `figma.root.children`, returning each page's `id`
and `name`, not from the metadata capability's page listing. Figma loads pages
lazily, and the metadata listing reports only the pages the editor has loaded, so a
file opened on one page answers "one page" for a file that has five. The Plugin API
lists every page regardless; a page it reports with zero children is unloaded, not
empty. This is the difference between a review that says what it skipped and one that
claims the whole file:

```js
return figma.root.children.map(function (p) {
  return { id: p.id, name: p.name };
});
```

Where more than one page or more than one flow exists, ask the designer which pages or
frames are in scope rather than reviewing everything. A file holding exactly one page
needs no question; review all of it, and say in the report that the file has one page
and the scope was all of it.

Ask for a node-specific link per frame in scope while you are asking. Every later
step addresses frames by node ID, and a link is the cheapest way to get one.

Keep three things for the whole review:

- **The file URL**: everything up to the `?`. Step 6 builds every layer link from
  it, and reconstructing it later from a node ID is not possible.
- **The file key**: the segment after `/design/`, `AbC123` in
  `https://www.figma.com/design/AbC123/Tenancy-flow`. It identifies the file across
  page renames and frame refactors, and step 7 matches a prior artifact on it.
- **The file's full page list**: every page name, in file order, alongside the
  subset in scope. It goes into the artifact as `scope.pagesInFile`.

**Done when** you hold a named list of top-level frames to review with a node ID
for each, the file's full page list beside it, and the designer has confirmed the
scope. Carry both into the report verbatim; a reader must be able to tell what you
never looked at.

## Step 2 — Survey structure

A whole page's structure overflows any response limit; a six-breakpoint page runs
to thousands of nodes, and you cannot file a response after the fact: it is a tool
result, and it arrives whole or truncated. So get breadth by returning less, not by
asking for everything and hoping the response survives.

Reduce inside the Plugin API script. It runs against the live file, so walk the
page there: every node, every frame, and return the tally rather than the tree:
counts per component name, the names that matched a default-name pattern, the ID
and name of each hidden node, each zero-size node with its type and whether it sits
inside a library instance. A page of thousands of nodes answers every bullet below
in a few hundred characters this way, and the survey is exhaustive rather than
sampled. Script 1 in [`PLUGIN-API-SCRIPTS.md`](PLUGIN-API-SCRIPTS.md) does exactly
this, and resolves step 3's buckets in the same pass.

Where you need the raw nodes and not a tally, take them in slices the script bounds
itself: one top-level frame, or a fixed number of children from a known index,
and write each slice to a scratchpad file as it returns. What you are building is
a searchable local copy of the page, assembled deliberately. Where the server
happens to save an oversized response to a file itself, you have that copy for
free; read it from disk and skip the slicing.

Descend into a frame's children only where a later check needs that detail.

When a request overflows anyway, narrow it and move on: go a level deeper, to a
child frame or a single instance. Re-requesting the same node, or asking for it in
another format, overflows again.

Record, from the survey:

- **Default layer names**: `Frame 47`, `Rectangle 12`, `Group 5`, `Ellipse 3`.
- **Hidden nodes**, and whether each name explains why it was kept.
- **Zero-size or stray nodes** sitting outside any frame.
- **Every distinct component name used**, with an instance count.
- **Which breakpoints exist**, from the frame names.

**Done when** every frame on the scope list has been surveyed and every distinct
component name in the file appears in your inventory.

## Step 3 — Classify every component

Read the file's subscribed libraries. Expect `Elements DS`, plus any library the
designer names as sanctioned. Community UI kits (Material, iOS, Simple Design
System) are a finding: they let non-Reapit components in.

Sort every main component in your inventory into one of exactly three buckets. Sort
main components, not instance names: one component wears every name a designer typed
over it, and two unrelated components can share one. There is no
fourth. "Custom", "bespoke", and "project-specific" are the unaccounted bucket
under a friendlier name, and renaming it hides the finding.

- **Elements**: its main component is remote and comes from `Elements DS` or the
  shared icon library.
- **Flagged as non-Elements**: the designer has already marked it, and Reapit
  designers do this in the layer name, e.g. `Heading [not in Elements]`. Honour
  the existing marking; report it for Design System review rather than as a
  defect.
- **Unaccounted**: neither of the above. These are the real finding: a detached
  instance, a deprecated component, or a one-off built by hand. A node that is a
  plain frame or group but renders as a recognisable Elements component is a
  detached instance.

Give an instance count per component, summed across every frame in scope. Where you
sampled rather than counted, write the count as not established; an extrapolated
number reads as evidence and is not.

**Done when** no component is left in the unaccounted bucket without a stated reason.

## Step 4 — Check variables, layout, states, and motion

Work through `HANDOFF-CHECKLIST.md` in this skill's directory. It enumerates what
to check across all ten handoff areas and marks each item as one you inspect or
one only the designer can confirm.

Sample rather than exhaust. Request reference code at the level of a single
component instance, one per distinct component plus each unaccounted node, not
once per instance where a list item repeats a hundred times, and never for a whole
breakpoint frame, which overflows as reliably as a page does.

Literal values recurring across every instance of one component are one finding
against that component, not one per instance.

Address an instance by the shallowest node ID that still isolates it. Deeply nested
instance IDs (the long semicolon-separated form) are rejected by some
capabilities; fall back to the nearest ancestor that resolves.

Settle the states area by enumerating variant properties, not by looking. Script 2
in [`PLUGIN-API-SCRIPTS.md`](PLUGIN-API-SCRIPTS.md) counts every VARIANT value of
`componentProperties` per component: `State` resolving to `Default` on all 174
instances that carry it establishes which states the file draws as a counted fact,
not just something a screenshot can only suggest. The same tally settles `Expanded`,
`Truncated`, and any property naming a content volume.

Match each tallied component to its step 3 bucket, then judge the result against
`HANDOFF-CHECKLIST.md` section 5, which owns the rule for reading a tally into a
pass or a blocker.

Scripts 3, 4 and 5 cover the annotation, prototype and placeholder-copy items in
the checklist.

Use screenshots for what only rendering shows: whether empty and error states
exist, whether long content overflows, and rendered copy. A screenshot reads text
a text sweep misses, and it is the check that catches placeholder copy in three
forms: Latin filler beyond the words `lorem ipsum` itself, a field whose value
repeats its own label, and a real value sitting in the wrong slot, such as an email
address where its neighbours carry a phone number.

**Done when** every inspectable item in the checklist has a verdict, and every
verdict that is not a pass has a location and a fix.

## Step 5 — Classify each finding

**Blocker**: engineering must guess to proceed. A literal value where a Design
System variable exists, an unaccounted component, a missing breakpoint, a state no
library defines, behaviour a static frame cannot convey and no annotation
explains.

**Advisory**: engineering can build it, but the file costs more to maintain.
Default layer names, illogical grouping, an unlabelled hidden layer, page order
that does not follow the flow.

Assign a blocker only where you inspected the evidence. An item you could not
inspect is `[confirm]`, never a pass and never a blocker.

**Design System finding**: a defect the designer cannot clear from this file,
because it originates in the library. A contrast failure between two library tokens
is the common case: no rebinding inside the file fixes it, and where the
alternative variant fails too, switching variant is not a fix either. Report it as
an advisory that names the Design System team as the owner, and say which
alternatives you checked. Where the file's own choice of a variant or token causes
the failure and a passing option exists, it is an ordinary blocker against the
designer.

Something the designer has already flagged for Design System review is not a
defect. Report it under the inventory as awaiting review, and let the verdict turn
on whether engineering can build the rest.

**Done when** every finding carries one of the two labels, and each blocker names
the specific guess engineering would otherwise have to make.

## Step 6 — Report

The reader is the designer, and most of the report is a worklist they will act on
and discard. Write it in the conversation, where they can work through it against
the open file.

Report against the checklist itself, tick by tick. Keep to this order and this
shape: the format is fixed on purpose. A designer reads several of these, for
different files and for successive passes on one file, and a checklist that looks
the same every time is scannable in a way a set of tables is not. Step 7's artifact
rearranges one thing and nothing else: it colocates each `[confirm]` item in its own
area rather than gathering them into **Over to you**.

1. **Title**: `Handoff review — <file name>`, with the review date.
2. **Verdict**: exactly one of **Ready for Dev** (no blockers, nothing left with
   the designer), **Ready with caveats** (no blockers, advisories or designer
   items outstanding), **Not ready** (one or more blockers).
3. **Scope**: pages and frames inspected, and what was excluded. Name the pages you
   did not review, from step 1's full list. "Whole file reviewed" is a claim about
   every page in the file, so write it only where the list bears it out.
4. **Checklist**: the ten areas of `HANDOFF-CHECKLIST.md`, in that order, holding
   every `[inspect]` item with a verdict.
5. **Over to you**: the items only the designer can settle.
6. **Component inventory**: each component, its instance count, and its bucket
   from step 3.

### The checklist

An `##`-level heading per area, under the area's own name and number, then one
line per `[inspect]` item in the checklist's order. Shorten an item's wording,
but do not reword it: the format earns its keep only if a designer recognises the
line from the last review.

Two states, and no third:

- `- [x]`: passed. One line, nothing beneath it. Where a count is what makes the
  pass credible, put it in the line itself: `- [x] No default layer names — 0
authored, 14 inside library instances`.
- `- [ ] ⚠️`: one or more findings. Every finding for that item is an indented
  bullet beneath it, and nothing else in the report repeats it.

Each nested finding is a single bullet in this shape, with **Advisory** in place
of **Blocker** per step 5:

`- **Blocker**: <what is wrong> · [<frame path>](<layer link>) · Fix: <the fix>`

The label leads because the designer triages on it. Where one finding covers many
instances of one component, say so in the finding rather than repeating the bullet.

Every area gets its heading, including one where everything passed; ticked lines
are how a designer tells a clean area from a skipped one. An area with no
`[inspect]` items at all, which is area 10, appears only under **Over to you**.

An area comes out looking like this:

```markdown
## 3. Colour, type, and spacing

- [ ] ⚠️ Colours use Design System variables, not literal hex
  - **Blocker**: `#0a7d8c` on the background fill, on all 6 breakpoints ·
    [Desktop / Header](https://www.figma.com/design/AbC123/Tenancy-flow?node-id=2145-8830)
    · Fix: bind to `--colour-brand-primary`
- [x] Text uses Design System type styles; 41 text nodes, all bound
- [x] Spacing uses Design System variables
- [ ] ⚠️ Corner radius and borders use Design System variables
  - **Advisory**: literal `6px` radius on the summary card ·
    [Mobile / Summary](https://www.figma.com/design/AbC123/Tenancy-flow?node-id=2151-104)
    · Fix: bind to `--radius-md`
- [x] Shadows and effects use Design System styles
```

### Linking to a layer

A bare node ID is not actionable: Figma has nothing to paste it into. Give a deep
link, built from the file URL you kept in step 1 and the node ID with its colon
replaced by a hyphen:

`<file URL>?node-id=<node-id>`

Node `2145:8830` in `https://www.figma.com/design/AbC123/Tenancy-flow` becomes
`https://www.figma.com/design/AbC123/Tenancy-flow?node-id=2145-8830`. Use the
frame path as the link text, so the line reads as a place and still clicks through
to the layer.

Deeply nested instance IDs (the long semicolon-separated form) do not resolve as
links. Link the shallowest ancestor that does, and let the frame path carry the
rest of the way.

### Over to you

The designer's action items, grouped under the same area names as unchecked
boxes. Two things belong here and nothing else:

- Every `[confirm]` item across the areas in scope. Areas 9 and 10 contribute most
  of them.
- Any `[inspect]` item you could not reach, with the reason it was unreachable; it
  is never a tick and never a finding.

Where an item needs a specific answer rather than a yes, ask for it: name the
frame, or the field, or the flow the designer has to describe.

### Deriving the verdict

Read the verdict off the sections below it, not off an overall impression, and
check it against them before you write it:

- Any blocker, or any component still unaccounted: **Not ready**.
- Otherwise, any advisory or any unchecked box under **Over to you**: **Ready
  with caveats**.
- **Ready for Dev** only when every checklist item is ticked _and_ every item
  under **Over to you** has come back from the designer; unchecked boxes are
  outstanding by definition, so a first-pass review cannot reach this verdict.

### Keeping ticks and findings honest

A tick is a claim you inspected the item and it passed. `- [ ] ⚠️` with no bullets
beneath it, or a bullet whose fix reads "none required", is a tick written the
wrong way round; decide which it is.

Reconcile the checklist against what step 2 recorded. Every default name, hidden
node, stray node, and missing breakpoint you logged either becomes a finding bullet
or is accounted for on the item's own ticked line, naming the reason; those are the
only two places it can go.

"None identified" is honest only where the survey found nothing to identify.
Written over a survey that recorded 26 hidden layers, it reports the review's
silence as the file's cleanliness. Likewise, where a fact was given to you as
established, evidence can overturn it; an absence of checking cannot. Ticking
"hidden layers are named so the reason is obvious" having inspected no name is a
pass on no grounds.

State counts you actually derived: "26 hidden layers across 6 breakpoint frames"
beats "several hidden layers". Where the fix is a specific Elements component or
variable, name it.

The six sections above are the whole report. A closing summary restates what the
checklist already carries, and drifts from it as it does.

**Done when** every `[inspect]` item in scope carries a tick or a warning, every
warning has at least one finding bullet with a label, a link, and a fix, and the
verdict follows from them.

## Step 7 — Publish an artifact

Publish one by default. Stay in the conversation alone in two cases: the designer
asked for that or the review came to **no blockers and three or fewer outstanding
items**, counting advisories, `[confirm]` items, and items you could not reach
together.

That threshold is the whole test, and it is why this step comes after the report
rather than before it; the count is not knowable until step 6 is written. A review
with a couple of loose ends gets worked through in one sitting, and a link the
designer will act on once is overhead. Everything larger is a worklist spanning
days, which is the thing an artifact is for.

Write the conversation report either way. The artifact is where the same findings go
to be worked on; it never replaces the report the designer is reading now.

The checklist is spent once the designer works through it. What an artifact adds is
that the designer's own decisions are not:

- **It is stateful.** The designer ticks `[confirm]` items and dismisses findings
  that do not apply, and the page keeps both across sessions. The dismissals exist
  nowhere else; the conversation has no way to hold which findings were judged
  inapplicable, or why.
- **A contents rail shows every area's live status**, so a designer returning days later
  reads what is left without re-reading a finding they already settled.
- **`[confirm]` items sit inside their own area** rather than in a separate **Over
  to you** section, so everything about one area is in one place. Their answers are
  what engineering reads afterwards, alongside the component inventory's
  non-Elements buckets: an input to the Design System team rather than a designer
  to-do.

[`ARTIFACT-STATE.md`](ARTIFACT-STATE.md) holds the state schema, the state machines,
the status derivation, and the self-republishing recipe. Match it exactly; a later
pass reads its own previous output back through it.
[`ARTIFACT-STYLE.md`](ARTIFACT-STYLE.md) holds the palette, type, and components.
Read both before writing any HTML, along with the `artifact-capabilities` skill,
which is authoritative for the runtime calls.

### Find the prior artifact first

One artifact per **reviewed scope**, never one per pass. Successive passes over the
same pages share one artifact; two pages reviewed as separate pieces of work get one
each. A designer re-checking the Details page must not end up with two artifacts
holding divergent dismissals and neither being the record; equally, a review of
the Search page must not overwrite the Details page's dismissals because both live in
one Figma file.

The scope key is the file key plus the pages covered, slugged so it can be matched
from a title alone:

- `zAFViz…/details-page`: one page.
- `zAFViz…/desktop+mobile`: several, page names slugged and sorted, joined with `+`.
- `zAFViz…/all`: every page in the file, which is a different unit of work from any
  one page and gets its own artifact.

A frame-scoped review keys to the page holding those frames: a designer reviewing
three frames today and the rest of that page next month means one worklist; the
page is the smallest unit they organise by. Scope narrower than a page lives on the
pass, inside the artifact.

So before publishing anything, find out whether this scope already has one:

1. List the user's artifacts and match on the whole scope key, in the title's
   parenthesised suffix. A file-key match with a different page slug is **not** a
   match: it is a sibling review, and joining them would merge two designers'
   worklists.
2. Read the match, parse its `#review-state`, and carry it forward per
   `ARTIFACT-STATE.md`. Republish to that same URL.
3. **No match.** Publish a fresh one, and say in your reply that this link is now
   the record for these pages; a first review of a scope should not be held up by a
   question with one plausible answer. Where the file has siblings in the listing, name
   them, so the designer sees this file has one worklist per page rather than one
   overall.

   Ask first only where something points at an earlier review: the designer
   mentioned one, referred to findings they have already dismissed, or asked for
   this pass as a re-check. Then a link exists that the listing cannot see: an
   artifact owned by someone else, or one from a session whose listing has aged out,
   and publishing fresh would lose every dismissal and answer on it. Say that is
   why you are asking.

An artifact owned by someone else can be read but not updated. Carry its state
forward into a new artifact the user owns, then say which link is now the live one;
the old one keeps its own state and will diverge from this point.

Title the artifact `Handoff review — <file name> · <pages> (<scope key>)`, where
`<pages>` is the page names as a reader would say them and `<scope key>` is the slug
above: `Handoff review — Tenancy flow · Details page (zAFViz…/details-page)`. Use
`whole file` for `<pages>` where the scope key ends `/all`. The scope key is the part
that must never change; it is how the next pass finds this artifact.

Two more publish arguments are fixed across every review, for the same reason the
palette is. `favicon` is `📋`, never varied per file or per verdict; it is the family
mark that makes a handoff review recognisable in a gallery tab strip, and the title
is what distinguishes one from another. `description` is one sentence naming the file
and the pages: _Handoff readiness review of Tenancy flow, Details page._ It becomes
the gallery card's subtitle, so it says what the page covers rather than what the
verdict was, which goes stale on the next pass.

The names are not. Where the key matches but the file name has changed, the designer
renamed their Figma file; keys are unique, so there is nothing else it can be.
Update `file.name` in the state and let the title follow, without asking: matching
is on the key, so the rename cannot orphan anything, and an artifact still named
after a file the designer has since renamed is the harder one to find. Say you did
it in your reply. Bring a title predating this convention onto it the same way,
adding the key rather than leaving it unmatched next time.

A page rename is the one case that does break matching, because the page slug is part
of the key. Where the file key matches, the page slug does not, and the pages now in
the file account for the difference; say so and ask before publishing rather than
opening a second worklist for the same page under its new name.

### What a refactor costs

Say this to the designer when they ask why something came back, rather than leaving
them to work it out:

- **Answers to `[confirm]` items always survive.** They are keyed to the checklist,
  not to the file, so no amount of renaming or re-organising touches them.
- **Dismissed findings are keyed to a node ID and may not.** Where a pass no longer
  detects a finding, it is marked _not detected this pass_ rather than dropped;
  either the designer fixed it, or a refactor moved it, and the file cannot tell you
  which. The marked entry is the trail.
- Where the fallback match in `ARTIFACT-STATE.md` reconnected a finding to a
  recreated node, say so. It is a good guess, not a certainty.

### Tell them about edit access

Only the artifact's owner and editors can save to it. A designer holding a view-only
link sees the checklist and can tick nothing; the page renders read-only and says
so, but the person who needs to know is the one sharing the link. So on publishing,
say in your reply, not in the page: the designer needs edit access for the checklist
to work, and state is shared rather than per-viewer, so two designers on one
artifact overwrite each other's ticks.

**Done when** the threshold above has been applied to this pass's actual counts;
and where it called for an artifact, every checklist item in the conversation report
appears in it under its own area, every prior dismissal and answer you found has
been carried forward or explicitly marked not detected, the rail's ten status marks
follow from the state, the scope block names the pages this pass did not cover, and the designer has the URL and knows they need edit access.

## When the Figma MCP is not connected

Say which file you cannot reach and stop. A handoff review restates the checklist
without it, which is worse than no review; it reads as a verdict while resting
on nothing.

## Looking up Elements

For whether a component exists, what it is called, or which variable to
recommend, use the Reapit Design System MCP servers if connected: one covers
usage guidance, the other the component API. Otherwise the published
documentation is at <https://design.reapit.cloud>.
