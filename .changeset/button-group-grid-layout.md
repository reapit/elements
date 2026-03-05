---
'@reapit/elements': minor
---

Add `autoFlow` and `justifyContent` props to `ButtonGroup`.

`ButtonGroup` now uses `display: grid` internally. Two new props control the grid layout:

- `autoFlow?: 'row' | 'column'` — maps to the CSS `grid-auto-flow` property.
- `justifyContent?: 'start' | 'end' | 'center' | 'stretch'` — maps to the CSS `justify-content` property.

The default grid layout (`grid-auto-flow: column`) preserves the existing horizontal button arrangement.
