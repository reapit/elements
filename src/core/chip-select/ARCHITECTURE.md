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
| `required`     | Group-level required default forwarded to each option       |
| `size`         | Visual size forwarded to each chip                          |

## Single-select mechanism

When `multiple={false}` (the default), selecting one option should deselect all others.
`ChipSelectOption` intercepts `onChange` and, when an exclusive chip has just been checked,
calls `deselectOtherOptions(container, currentTarget)` — which queries the container ref for
chip inputs (`input[data-exclusive][type="checkbox"]`) and unchecks any that are currently
checked.

Because the query is scoped to the container element rather than a form, no form association or
shared `name` attribute is required for single-select to work. `ChipSelect` can be used anywhere
in the tree.

## Controlled vs uncontrolled

`ChipSelect.Option` wraps a native checkbox, so its checked state can be uncontrolled
(`defaultChecked`) or controlled (`checked` + `onChange`) like any other input.

For controlled usage, consumers use `ChipSelect.determineNextControlledState` to compute the
next state array from the current state and the changed option:

```ts
setState((state) => ChipSelect.determineNextControlledState(state, event.currentTarget))
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
