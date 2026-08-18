# Listbox Architecture

## Overview

`Listbox` is the foundational selection widget. It renders options twice — once in a hidden
native `<select>` for form integration and once in a custom `<div role="listbox">` for styled
presentation. The two trees stay in sync through a shared selection state held in
`useListboxSelectState`.

Keyboard navigation uses the `aria-activedescendant` pattern: the listbox container holds real
DOM focus throughout, while a `data-is-active` attribute on the current option drives visual
state and `aria-activedescendant` on the container guides screen readers. Individual option
elements are never focused directly (`tabIndex={-1}` on every option).

`Listbox` also supports the ARIA [tree pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview)
as an alternative container role, via the `role` prop (`'listbox'` default, or `'tree'`) — see
[Tree mode](#tree-mode).

## Component hierarchy

```
Listbox                         — container; owns focus, selection state, and form sync
  ├─ ListboxSelect (hidden)     — native <select> for form submission and onBlur/onChange/onFocus
  └─ (custom UI children)
       ├─ Listbox.Option        — dual-rendering option (button in UI, <option> in native select)
       ├─ Listbox.Optgroup      — dual-rendering group (<optgroup> in native, styled div in UI)
       └─ Listbox.Divider       — renders as <hr> in both contexts
```

## Dual-render pattern

`Listbox` renders children into two separate React trees:

1. **Native context** (`ListboxRenderContext = "native"`) — rendered inside `<ListboxSelect>`.
   `Listbox.Option` outputs an unselected `<option>` element (`ListboxSelect` writes selected
   options directly to avoid duplicates). `Listbox.Optgroup` outputs `<optgroup>`.
2. **Custom context** (`ListboxRenderContext = "custom"`) — rendered in the visible listbox UI.
   `Listbox.Option` outputs a `<button>` (or a polymorphic element via the `as` prop).
   `Listbox.Optgroup` outputs a styled container.

`Listbox.Divider` renders as `<hr>` in both contexts.

## Focus management

`useActiveDescendant` returns five event handlers (`onFocus`, `onBlur`, `onKeyDown`,
`onMouseDown`, `onClick`) that are spread onto the listbox container. It is the single
integration point for all active-descendant management.

Keyboard navigation itself is dispatched by `navigateActiveDescendant`, a plain DOM function
(not a hook). `useActiveDescendant`'s `onKeyDown` calls it for the listbox container's own
keyboard handling, and `ComboboxSearchInput` calls it directly for the same purpose when a
search input — not the listbox — owns focus (see Combobox architecture).

### Why aria-activedescendant instead of roving tabindex

The roving-tabindex pattern moves `tabIndex=0` between option elements so the browser tracks
focus natively. This works, but forces every option into the tab sequence unless carefully
managed. The `aria-activedescendant` pattern keeps a single focusable element (the listbox
container), sets `aria-activedescendant` to the active option's ID, and uses `data-is-active`
for visual state. This is simpler to maintain and avoids focus-restoration bugs when options
are added or removed.

### Focus entry (onFocus)

When focus enters from outside (detected via `relatedTarget`), `onFocus` dispatches a synthetic
`focusin` on the hidden `<select>` so that `onFocus` callbacks fire for form library
integration, regardless of whether focus arrived via keyboard or mouse.

If that entry was also via keyboard (detected via `:focus-visible`):

1. The first selected option is activated (or the first option if none is selected).
2. When `selectionFollowsFocus` is `true` and the activated option is not already selected, it
   is clicked programmatically.

### Focus exit (onBlur)

When focus moves outside the listbox, `clearActiveOption` removes `data-is-active` from all
options and removes `aria-activedescendant` from the container. `onBlur` dispatches a synthetic
`focusout` on the hidden `<select>` so that `onBlur` callbacks fire.

### Focus retention on mouse click (onMouseDown)

`onMouseDown` blocks the browser from transferring DOM focus to a clicked option or the
whitespace between options, then explicitly focuses the listbox container when it isn't already
focused and `tabIndex >= 0` (see the `onMouseDown` comment on `Listbox` for the mechanism). When
`tabIndex={-1}` (e.g. a combobox with a search input), that focus call is skipped so the search
input retains focus.

### Option activation on click (onClick)

Clicking an option calls `activateOption` to set `data-is-active` on that option. This ensures
the active state tracks both keyboard and mouse interactions — clicking an option is equivalent
to navigating to it with the keyboard.

### Keyboard interaction

| Key           | Action                                                                               |
| ------------- | ------------------------------------------------------------------------------------ |
| ArrowDown     | Activates the next option, or the selected/first option if none is active yet        |
| ArrowUp       | Activates the previous option, or the selected/**last** option if none is active yet |
| ArrowRight    | Next option (horizontal orientation); same "none active yet" fallback as ArrowDown   |
| ArrowLeft     | Previous option (horizontal orientation); same "none active yet" fallback as ArrowUp |
| Home          | Activates the first option                                                           |
| End           | Activates the last option                                                            |
| Enter / Space | Clicks the active option                                                             |

In **tree mode** (`role="tree"`), ArrowRight/ArrowLeft are repurposed for hierarchy instead of
horizontal movement — see [Hierarchical navigation](#hierarchical-navigation).

## Tree mode

Tree mode is selected via the `role` prop (`'listbox'` default, or `'tree'`) and is used by
`OfficeSwitcher`, whose office groups need expand/collapse semantics. Setting `role="tree"`:

- Sets `role="tree"` on the listbox container instead of `role="listbox"`.
- Makes `Listbox.Option` render `role="treeitem"` instead of `role="option"`, by reading `role`
  off `ListboxContext`.

Groups are not built with `Listbox.Optgroup` in tree mode — they use plain `<details>`/`<summary>`
directly, with the summary given `role="treeitem"` by the consumer (see
`OfficeSwitcherOfficeGroup`). Because `role="treeitem"` on `<summary>` overrides the element's
implicit ARIA semantics per HTML-AAM §5.1, the consumer must also manage `aria-expanded` itself —
native `<details>` no longer exposes it automatically once the role is overridden.

### Hierarchical navigation

`navigateActiveDescendant` checks `listboxElement.getAttribute('role') === 'tree'` to enable
tree-only handling of ArrowRight/ArrowLeft (vertical orientation only — a horizontal tree is not
supported, since the horizontal branch takes priority in the `ariaOrientation === 'horizontal'`
check):

| Key        | On a group summary                                                  | On a leaf item                     |
| ---------- | ------------------------------------------------------------------- | ---------------------------------- |
| ArrowRight | Expands the group if collapsed; otherwise activates its first child | No effect                          |
| ArrowLeft  | Collapses the group if expanded                                     | Activates the parent group summary |

ArrowDown/ArrowUp, Home, End, and Enter/Space need no tree-specific logic: `getVisibleOptions`
already excludes items inside a closed `<details>`, so collapsed groups are transparently skipped
during linear traversal.

### Selectors

Tree mode introduces a second option role (`treeitem`) and a second container role (`tree`), so
`src/utils/listbox/dom-helpers/selectors.ts` exports three selector constants for different jobs —
don't reach for the wrong one:

| Constant                     | Matches                                                                        | Used for                                                                                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OPTION_SELECTOR`            | `button[role="option"]`, `button[role="treeitem"]`, `summary[role="treeitem"]` | `querySelectorAll` traversal (e.g. `getVisibleOptions`) — tag-specific so it only matches real option/summary elements                                       |
| `OPTION_ROLE_SELECTOR`       | `[role="option"]`, `[role="treeitem"]`                                         | `Element.closest()` lookups (e.g. `getOptionElement` in Combobox) — tag-agnostic so it matches regardless of the element's tag                               |
| `LISTBOX_CONTAINER_SELECTOR` | `[role="listbox"]`, `[role="tree"]`                                            | `Element.closest()` lookups for the owning container (e.g. `findListboxElement`'s fallback when an option has no `data-listbox-id`, such as a group summary) |

## Active-descendant helpers (`use-active-descendant`)

Pure DOM functions and the `useActiveDescendant` hook. None of them hold React state — they
operate on the live DOM directly, which avoids a render cycle per keystroke.

### Why data-is-active is DOM-imperative

`data-is-active` is set via `el.dataset.isActive = 'true'`, bypassing React's render cycle
(see `useActiveDescendant`'s JSDoc for why). Use CSS `[data-is-active='true']` for styling; React
components cannot read it as a prop.

### Helper functions

| Function                        | Purpose                                                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `activateOption`                | Sets `data-is-active`, scrolls into view, sets `aria-activedescendant` on `ariaOwner`                                           |
| `clearActiveOption`             | Removes `data-is-active` from all options, removes `aria-activedescendant`                                                      |
| `clickOption`                   | Calls `.click()` on the option element                                                                                          |
| `getActiveOption`               | Returns the element with `data-is-active="true"`                                                                                |
| `getInitialActiveOption`        | Returns the selected option, falling back to the first option                                                                   |
| `getInitialActiveOptionFromEnd` | Mirrors `getInitialActiveOption`, but falls back to the **last** option — used for ArrowUp/ArrowLeft when nothing is active yet |
| `getNextOption`                 | Returns the next visible option; `null` at the last option (no wraparound)                                                      |
| `getPrevOption`                 | Returns the previous visible option; `null` at the first option (no wraparound)                                                 |
| `getFirstOption`                | Returns the first visible option                                                                                                |
| `getLastOption`                 | Returns the last visible option                                                                                                 |
| `getVisibleOptions`             | Returns all options not hidden inside a closed `<details>` element                                                              |

`getNextOption`/`getPrevOption` deliberately don't wrap around at the list boundaries — see the
comment on `getNextOption` for why.

The `ariaOwner` parameter for `activateOption` and `clearActiveOption` is the element that
receives the `aria-activedescendant` attribute. For a standalone listbox this is the listbox
container; for a combobox with a search input it would be the search `<input>` (see Combobox
architecture).

## Selection state

`Listbox.Option` uses different ARIA attributes depending on the listbox's multi-select mode:

- **Single-select**: `aria-selected="true"` on the selected option, `aria-selected="false"` on
  others.
- **Multi-select**: `aria-checked="true"` on selected options, `aria-checked="false"` on
  others. `aria-selected` is not used because it implies exclusivity.

## Selection actions

`selectAction` controls what happens when an option is clicked:

| Value      | Behaviour                                           |
| ---------- | --------------------------------------------------- |
| `'auto'`   | Selects for single-select; toggles for multi-select |
| `'select'` | Always selects (replaces the current value)         |
| `'toggle'` | Always toggles the option's selected state          |

## Form integration

The hidden `<select>` is the authoritative form control. It carries `name`, `required`,
`disabled`, and the currently selected values. `selectRef` exposes it to form libraries
(e.g. React Hook Form).

`Listbox` wires `onBlur`, `onChange`, and `onFocus` to the hidden `<select>`, not the listbox
container, so form libraries see standard select element events.

## Context

| Context                | Fields                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `ListboxContext`       | `disabled`, `listboxId`, `multiple`, `role` (`'listbox'` \| `'tree'`), `selectAction`, `selectValue` |
| `ListboxRenderContext` | `"native"` or `"custom"` — controls which elements `Option` and `Optgroup` render                    |

## Data attributes

| Attribute                      | Element                           | Purpose                                                                       |
| ------------------------------ | --------------------------------- | ----------------------------------------------------------------------------- |
| `data-is-active="true"`        | Option                            | Drives active-option visual state (set imperatively via DOM, not React state) |
| `data-listbox-id`              | Option                            | Links option back to its owning listbox for event handlers                    |
| `data-select-action`           | Option                            | Propagates `selectAction` to the click handler                                |
| `data-selection-follows-focus` | Listbox container                 | Signals whether arrow keys auto-select                                        |
| `aria-activedescendant`        | Listbox container or search input | Points to the ID of the active option                                         |
