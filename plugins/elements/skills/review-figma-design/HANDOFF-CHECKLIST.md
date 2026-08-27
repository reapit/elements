# Handoff checklist

The enumeration behind [`SKILL.md`](SKILL.md) step 4. Ten areas, each item marked
`[inspect]` or `[confirm]` per that file's definition.

The report's checklist mirrors this file: the same areas in the same order, one
line per `[inspect]` item, findings nested beneath the item they belong to. Keep an
item's wording so reviews stay comparable across files and across re-runs.

## 1. File hygiene

- [inspect] No default layer names: `Frame 47`, `Rectangle 12`, `Group 5`.
- [inspect] Layers grouped logically, by component, section, or screen.
- [inspect] Hidden layers are either removed or named so the reason is obvious.
- [inspect] No dead nodes: zero-size, off-canvas, or stray outside any frame.
- [inspect] File and page names describe the project, not `Untitled`.
- [inspect] Page and frame order follows the user journey or navigation structure.
- [confirm] Abandoned exploration frames and old versions have been cleared out.
  Superseded work looks identical to current work from the structure alone.

Judge the layer-name, hidden-layer, and dead-node items on designer-authored layers
only, and check each hit's ancestry before reporting it. A library instance brings
its component's own internals with it: `Line 3` and `Frame 2` layers the library
author named, hidden nodes that are component toggles (a `Divider` switched off, an
optional `Button`) and zero-height `LINE` nodes, where a 1px rule reports height 0.
All are passes. Script 1 in [`PLUGIN-API-SCRIPTS.md`](PLUGIN-API-SCRIPTS.md) tags
each hit `[AUTHORED]` or `[in instance]` for exactly this call. Where a survey of
hundreds of nodes yields only in-instance hits, the finding is that the file is
clean, and the report says so with the counts and the reason.

## 2. Components and consistency

- [inspect] Reusable elements are components, not repeated hand-built groups.
  Repeated identical child structures across frames are the signal.
- [inspect] Instances resolve to the current library. Detached instances render as
  a known component while typing as a plain frame or group.
- [inspect] Subscribed libraries are `Elements DS` plus sanctioned libraries only.
  Community UI kits admit non-Reapit components.
- [inspect] New or modified components are flagged for Design System review.
  Reapit designers mark these in the layer name, e.g. `[not in Elements]`.
- [inspect] Icons come from the shared icon library, not one-off vectors or
  rasterised images. Reference code exposing raw path data or an image asset where
  an icon belongs is the signal.

## 3. Colour, type, and spacing

Read each of these off a node's bound variables and its reference code together,
per the reference-code signal in `SKILL.md`.

- [inspect] Colours use Design System variables, not literal hex.
- [inspect] Text uses Design System type styles, with no overridden size, weight,
  or line height.
- [inspect] Spacing uses Design System variables, not literal pixel values.
- [inspect] Corner radius and borders use Design System variables.
- [inspect] Shadows and effects use Design System styles.

Recurring literals belong in one finding against the component, not one per
instance.

## 4. Layout and responsiveness

- [inspect] Auto layout is used, so frames resize predictably. Reference code
  showing absolute positioning where a flow layout belongs is the signal.
- [inspect] Breakpoint layouts exist for the relevant sizes. Read the set the file
  itself uses from its frame names, then check for gaps in that set rather than
  against a remembered list. Reapit designers also mark breakpoint-scoped
  components in the layer name, e.g. `Main container [MD-2XL]`.
- [confirm] Constraints set correctly, so pin and scale behaviour matches the
  intended responsiveness.
- [confirm] Min and max widths, and content overflow behaviour, applied where they
  matter.

## 5. States and edge cases

Variant-property counts carry the drawn-state items, and screenshots the rest, per
`SKILL.md` step 4. Structure alone carries neither.

Judge a state by whether engineering has to guess it, not by whether it was drawn.
An Elements component's own variant set defines its interaction states and the
code implements them, so those states are specified whether or not this file draws
them: a hover drawn on an Elements Button is redundant, and a hover that
contradicts the library is the finding. That leaves two kinds of real gap.

- [inspect] Interactive elements from outside Elements (unaccounted components and
  ones flagged as non-Elements) have every state drawn: default, hover, focus,
  selected, disabled. Nothing else specifies these, so an absent state is a
  blocker.
- [inspect] State the library cannot decide is drawn or annotated: which control is
  disabled and when, which tab or accordion panel opens on load where that is not
  the one drawn, and what the page shows on its loading, empty, error, and
  zero-result paths. Ask this of the page, not of a component's variant list; a
  component that defines no empty variant is a question for the Design System
  team, whereas a page that never says what it shows when the data is missing is
  this file's blocker.
- [inspect] Long text and overflow scenarios shown: long names, large numbers.
- [inspect] Forms show validation states: error messages, success confirmation,
  inline hints.
- [confirm] Edge cases called out: zero items, single item, maximum items,
  pagination, no results.

A library variant the file never uses is not a gap; engineering builds what is
drawn. It becomes one only where the flow implies the variant is reachable, or
where content sits behind a state drawn nowhere: an accordion collapsed in every
frame leaves its own contents unspecified.

## 6. Interactions and motion

Judge motion by the same rule as states in area 5: whether engineering has to guess
it, not by whether the file documents it. An Elements component's transitions are
implemented in the library's own code: easing, duration, and trigger included,
so an Elements instance needs no motion annotation to specify what it already does.
Motion that contradicts the library is the finding; motion that matches it,
undocumented, is not. That leaves the real gap on components outside Elements.

- [inspect] Transitions and animations on interactive elements from outside
  Elements (unaccounted components and ones flagged as non-Elements) are
  documented with easing, duration, and trigger, in an inspectable form rather than
  prose alone.
- [inspect] Prototype links or a click-through flow set up for key user paths.
  Script 4 in [`PLUGIN-API-SCRIPTS.md`](PLUGIN-API-SCRIPTS.md) separates flows and
  reactions authored in the file from the ones instances inherit.
- [confirm] Micro-interactions annotated where a static frame cannot convey them,
  for elements outside Elements.
- [confirm] Gestures (swipe, drag, long-press) called out for touch interfaces,
  for elements outside Elements.

## 7. Content and copy

- [inspect] Real content, not `Lorem ipsum` or placeholder strings.
- [confirm] Character limits noted where truncation or wrapping matters.
- [confirm] Microcopy finalised and proofread: button labels, tooltips, error
  messages.
- [confirm] Dynamic content sources identified, e.g. pulled from user profile,
  API-driven.

## 8. Assets

- [inspect] Illustrations are vector, and photographs are appropriately sized
  raster. A rasterised image where a vector belongs is the finding.
- [confirm] Export settings match engineering's needs: scale factors, format.
- [confirm] Licensing and usage rights confirmed for stock or third-party assets.

## 9. Annotations and specs

Dev Mode annotations are readable through the Plugin API capability: script 3 in
[`PLUGIN-API-SCRIPTS.md`](PLUGIN-API-SCRIPTS.md), so read them rather than assuming
their absence. A file with no annotations at all fails most of
this area, and that is a finding in its own right.

Figma's default annotation categories map onto these items directly: Interaction
covers behaviour, Accessibility covers focus and labelling, Content covers copy and
data sources, Development covers implementation notes.

- [inspect] Anything non-obvious in spacing, sizing, or alignment is explained
  somewhere reachable: an annotation, a note layer, a description, or a
  documentation link.
- [inspect] Colour pairings meet WCAG AA contrast: 4.5:1 for body text, 3:1 for
  large text and non-text. No capability returns a ratio, so read the resolved hex
  values off the bound variables and compute it yourself. Quote the ratio you
  computed, and say so where a pairing could not be resolved. A pairing whose two
  colours are both library tokens is a Design System finding, per `SKILL.md` step 5.
- [inspect] Behaviour notes exist, for elements outside Elements, for what a
  static frame cannot show, e.g. this list scrolls independently, this modal
  closes on outside click. An Elements component's own behaviour is already
  specified by the library, per area 5 and area 6's rule; a note against one is a
  finding only where it contradicts that behaviour, not where it is simply absent.
- [inspect] Conditional logic explained, e.g. show this field only if X is
  selected. This is a page-level judgment regardless of which bucket the
  component sits in.
- [inspect] Accessibility notes where needed, for elements outside Elements:
  focus order, alt text, ARIA roles and labels. An Elements component implements
  its own accessibility semantics in code.

Judge the content of an annotation, not just its presence. An annotation carrying
no more than a component's own name adds nothing engineering could not already
read off the layer.

A file carrying no annotations at all is one blocker against this area, naming the
conditional logic engineering would have to guess, plus the behaviour and
accessibility detail on any component outside Elements. Moving these items under
**Over to you** instead leaves the report silent on a gap you established.

## 10. Cross-team alignment

None of this is reachable through the Figma MCP. Report all four under **Over to
you**, and give the area no checklist heading.

- [confirm] Design reviewed and approved by the relevant stakeholders.
- [confirm] Engineering has access at the right permission level: inspect rather
  than edit, unless edit is intended.
- [confirm] Relevant tickets or stories linked to the file.
- [confirm] A walkthrough or handoff session scheduled, for a complex feature.
