# Combobox Architecture

## Overview

`Combobox` is a compound component that wires a trigger button, a popup dialog, and a `Listbox`
together into the ARIA combobox pattern. It owns no visible UI itself — it delegates all
rendering to subcomponents. Shared state (IDs, disabled, multiple, required) flows down via
`ComboboxContext`.

`Select` is a thin wrapper around `Combobox` that removes search-related props and applies
select-specific defaults.

`Autocomplete` composes `Combobox` with `Combobox.SearchInput`, providing a filterable combobox
whose options are narrowed as the user types.

## Component hierarchy

```
Combobox                          — context provider; no visible UI
  ├─ Combobox.Button              — trigger button; opens/closes the popup
  │    ├─ Combobox.ClearButton    — clears the selection
  │    └─ Combobox.OpenPopupButton — chevron button that opens the popup
  └─ Combobox.Popup               — popup shell (delegates to ComboboxPopupDialog)
       ├─ Combobox.SearchInput    — (optional) search input for filtering
       └─ Combobox.Listbox        — the option list; built on the Listbox util
            ├─ Combobox.Option
            ├─ Combobox.Optgroup
            └─ Combobox.Divider
```

## Focus ownership

Which element holds DOM focus during an open popup depends on whether a `SearchInput` is
present.

| Configuration            | Focus owner                  | `aria-activedescendant` owner |
| ------------------------ | ---------------------------- | ----------------------------- |
| No search input (Select) | `Combobox.Listbox` container | Listbox container             |
| With search input        | `Combobox.SearchInput`       | Search `<input>` element      |

### Without a search input

The listbox container is `tabIndex={0}` and holds focus using the standard
`aria-activedescendant` pattern (see Listbox architecture). `useActiveDescendant` (built into
`Listbox`) handles keyboard navigation, focus/blur lifecycle, focus-retention on click, and
option activation on click.

### With a search input

The `<input>` holds focus throughout the popup's lifetime. The listbox is `tabIndex={-1}` to
remove it from the tab sequence — Tab should jump from the input directly to the next focusable
element outside the popup.

Clicking inside the listbox — on an option or in the whitespace between them — would normally
transfer DOM focus away from the search input, breaking the ability to continue typing.
`useActiveDescendant`'s `onMouseDown` handler prevents that (see the `onMouseDown` comment on
`Listbox` for the mechanism); its focus-retention follow-up is skipped when `tabIndex={-1}`,
leaving focus on the search input.

`ComboboxSearchInput` drives navigation directly via `aria-activedescendant` on the input
element, bypassing the listbox container's own keyboard handlers:

| Key       | Action                                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| ArrowDown | Activates the next option, or the selected/first option if none is active yet                                                  |
| ArrowUp   | Activates the previous option, or the selected/**last** option if none is active yet; stays put at the first option once there |
| Home      | Activates the first option                                                                                                     |
| End       | Activates the last option                                                                                                      |
| Enter     | Clicks the active option                                                                                                       |

ArrowUp's initial landing spot (the end of the list, not the start) and its no-wraparound stop at
the boundary mirror the standalone listbox — see the Listbox architecture doc's Active-descendant
helpers section for why.

`ComboboxSearchInput` intercepts only navigation keys; all other keystrokes reach the input's
default text handling.

When a user types and the active option is filtered out of the DOM, a `useEffect` in
`ComboboxSearchInput` detects the stale `aria-activedescendant` ID after the next commit and
clears the active state (see that `useEffect`'s comment for why this can't happen synchronously
in `onChange`).

## Popup dialog

`ComboboxPopupDialog` is a native `<dialog>` shown as a modal. It supports three layout
variants:

| Variant     | Behaviour                                       |
| ----------- | ----------------------------------------------- |
| `'auto'`    | Drawer on XS viewport, popover on SM and above  |
| `'popover'` | Always a popover anchored to the trigger button |
| `'drawer'`  | Always a full-screen drawer (modal)             |

Anchor positioning for the popover layout uses the CSS Anchor Positioning API via
`AnchorPositioning`, which co-locates the positioning stylesheet with the dialog element so
it is removed from the DOM when the dialog closes.

### Close on selection

`maybeCloseOnSelection` fires on every click inside the dialog and decides whether to close
the popup:

- `'never'` — never closes on selection
- `'always'` — always closes on selection
- `'auto'` — closes only when `aria-multiselectable` is `"false"` (single-select)

The handler uses `event.defaultPrevented` as an opt-out: an option can call
`event.preventDefault()` on its click event to block the popup from closing.

Keyboard selection (Enter on an active option) calls `clickOption`, which invokes `.click()` on
the option element, so `maybeCloseOnSelection` closes the popup for keyboard-driven selection in
the same cases as mouse-driven selection (see the comment above its `defaultPrevented` check for
why it doesn't gate on `event.isTrusted`).

### Search input on close

When the popup closes, `clearSearchInputOnClose` empties the search input unless
`preserveSearchOnClose` is set. It finds the input by querying for the first `<input>`
within the dialog.

## Context

| Context                         | Fields                                                                                                                |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `ComboboxContext`               | `comboboxId`, `disabled`, `listboxId`, `multiple`, `popupId`, `required`, `searchInputId`, `size`, ARIA relationships |
| `ComboboxPopupDialogContext`    | `hasSearch`, `variant` — consumed by `ComboboxListbox` and `ComboboxSearchInput`                                      |
| `ComboboxDefaultOptionsContext` | Pre-selected option definitions for controlled default-value scenarios                                                |

## Contexts — inherited by ComboboxListbox

`ComboboxListbox` reads from `ComboboxContext` to fill the props it pins (`id`,
`aria-disabled`, `aria-multiselectable`, `aria-required`), and from
`ComboboxPopupDialogContext` to determine `hasSearch`. This keeps the consumer API minimal —
consumers do not need to pass these through manually.
