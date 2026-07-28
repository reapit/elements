# ChipSelect Architecture

## Overview

ChipSelect is a styled checkbox group that supports both single-select and multi-select modes.
Each option is a native `<input type="checkbox">` wrapped in a `<label>`, so the component
participates in standard HTML form submission and is compatible with any form state management
library (Formik, React Hook Form, etc.).

## Component hierarchy

```
ChipSelect                  — container; owns context and the container ref
  └─ ChipSelectOption       — context-aware wrapper; owns group-level coordination
       └─ ChipSelectChip    — presentational styled checkbox; no group awareness
```

`ChipSelectChip` is a pure rendering primitive — it draws a styled checkbox and does not
coordinate with siblings. Group behaviour (deselecting other options when an exclusive chip is
checked, and stamping `data-exclusive` on the input so `determineNextControlledState` can read
it) lives in `ChipSelectOption`, the group-aware wrapper.

## Context

`ChipSelectContext` carries shared configuration that all options inherit:

| Field          | Purpose                                                     |
| -------------- | ----------------------------------------------------------- |
| `containerRef` | Ref to the container element, used to query sibling options |
| `form`         | Form ID forwarded to each `input[form]`                     |
| `multiple`     | Whether multi-select is enabled                             |
| `name`         | Shared `name` attribute for form submission grouping        |
| `required`     | Whether at least one option must remain selected            |
| `size`         | Visual size forwarded to each chip                          |

## Single-select mechanism

When `multiple={false}` (the default), selecting one option should deselect all others.
`ChipSelectOption` intercepts `onChange` and, when a chip has just been checked in non-multiple
mode, calls `deselectOtherOptions(container, currentTarget)` — which queries the container ref
for chip inputs (`input[data-exclusive="true"][type="checkbox"]`) and unchecks any that are
currently checked.

Because the query is scoped to the container element rather than a form, no form association or
shared `name` attribute is required for single-select to work. `ChipSelect` can be used anywhere
in the tree.

## Required enforcement

When `required={true}` on `ChipSelect`, at least one option must always remain selected.
`ChipSelectOption` intercepts `onChange`. When a chip is being unchecked and `groupRequired` is
true, it queries `containerRef` for other checked chip inputs. If none remain, it reverts the
toggle and returns early — the consumer's `onChange` is not called.

The guard reverts the DOM change by setting `event.currentTarget.checked = true` and returning
early, because `change` events on checkboxes are not cancellable per the HTML spec
(`cancelable: false`). jsdom deviates from the spec and honours `event.preventDefault()` on
checkbox `change` events, so approaches relying on it appear to work in tests but fail in real
browsers.

### Native form validation

The `required` attribute is applied imperatively by
`syncGroupRequired(container, groupRequired)`. Every chip carries `required` when the group is
required and no chip is currently checked:

```
chip.required = groupRequired && !anyChipChecked
```

When at least one chip is checked, no chip carries `required` — the group constraint is
satisfied.

The helper is invoked from two places:

- `ChipSelect`'s `useEffect` runs after every render, so initial state (including
  `defaultChecked` chips), controlled-state changes, and dynamic changes to the `required` prop
  all converge.
- `ChipSelectOption.handleChange` runs after each `change` event in uncontrolled mode, where
  React does not re-render.

### Controlled-mode guard

`ChipSelect.determineNextControlledState` provides a secondary guard: if `option.required` is
true and `currentValue.length === 1`, the current value is returned unchanged. This handles edge
cases where the consumer's controlled state is out of sync with the DOM.

### Why imperative

`required` is managed by direct DOM writes rather than a React prop because the value depends on
whether any chip is checked — state that an individual `ChipSelectOption` cannot observe at
render time. A declarative alternative (tracking `anyChecked` in `ChipSelect` state and
propagating it via context) would still need a post-mount DOM read to derive the initial value
and would re-render every option on each change. The imperative sync is contained to one helper
(`syncGroupRequired`) invoked from one effect.

SSR-rendered HTML carries incorrect `required` attributes until the client-side `useEffect`
runs. If SSR-correct form validation becomes a requirement, a different
design — such as a hidden sentinel input representing the group constraint — would be needed.

## Controlled vs uncontrolled

`ChipSelect.Option` wraps a native checkbox, so its checked state can be uncontrolled
(`defaultChecked`) or controlled (`checked` + `onChange`) like any other input.

For controlled usage, consumers use `ChipSelect.determineNextControlledState` to compute the
next state array from the current state and the changed option:

```ts
setState((state) => ChipSelect.determineNextControlledState(state, event.currentTarget));
```

The helper is self-contained: it reads `data-exclusive` from the input element rather than
accepting configuration parameters, keeping call sites minimal.

## Data attributes

| Attribute                        | Element          | Purpose                                            |
| -------------------------------- | ---------------- | -------------------------------------------------- |
| `data-exclusive="true/false"`    | input            | Marks the option as exclusive (single-select mode) |
| `data-size="small/medium/large"` | label            | Drives size CSS variants on the chip               |
| `data-overflow="truncate"`       | span             | Enables text truncation on the chip label          |
| `data-flow="wrap/nowrap"`        | `ChipSelect` div | Controls flex-wrap on the container                |
| `data-overflow="auto/visible"`   | `ChipSelect` div | Controls overflow on the container                 |
