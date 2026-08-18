# TextInput Architecture

## Overview

TextInput is a styled `<input>` that supports leading and trailing icons,
prefix and suffix text, a busy spinner, and an optional formatted-value
overlay. It serves as the rendering primitive for higher-level inputs such as
NumberInput.

## Formatted-value overlay

### Problem

Some inputs need to display a value that differs from the raw string stored in
`input.value`. A currency input, for example, stores `1234567` but should
display `1,234,567` when the user is not editing. Rewriting `input.value` to
the formatted string would break round-tripping: the consumer's `onChange`
would receive locale-formatted text instead of a plain number.

### Solution

TextInput accepts a `formatValue` callback. When provided, a `<span>` overlay
is rendered in the same grid cell as the `<input>`. Two CSS rules coordinate
the display:

1. **`color: transparent`** on the `<input>` hides the raw text when the
   overlay is visible.
2. **`pointer-events: none`** on the overlay ensures clicks and selections
   pass through to the input beneath.

Both rules apply only when the container is `:not(:focus-within)`. On focus,
the overlay hides (`display: none`) and the input text becomes visible, so
the user edits the raw value directly.

The overlay element is only rendered into the DOM when the formatted text is
defined — that is, when `formatValue` is provided and has not thrown on all
evaluation paths. The CSS rules therefore only need to handle the
visible/hidden toggle; they never need to guard against a missing element.

### Accessibility

The overlay carries `aria-hidden="true"`. Screen readers therefore announce the
raw input value, not the formatted string. This is intentional: the raw value
is semantically correct and unambiguous, while the formatted string is a visual
convenience.

### Controlled vs uncontrolled

For controlled inputs (`value` prop set), the overlay text is derived on every
render from the current `value` prop.

For uncontrolled inputs (`defaultValue` or no value), TextInput maintains
internal state that is updated in three places:

- **On blur** — the overlay re-formats the current `input.value`.
- **When `formatValue` identity changes** — a `useEffect` re-syncs the overlay
  immediately, so a locale change in a parent component takes effect without
  waiting for the next blur.
- **On `input` while the field is unfocused** — a second `useEffect` catches
  value changes that do not trigger a blur: browser autofill and programmatic
  assignments followed by a dispatched `input` event. The owning form's `reset`
  event is also handled here; the resync is deferred one animation frame because
  the browser restores the input's value after the reset event fires.
