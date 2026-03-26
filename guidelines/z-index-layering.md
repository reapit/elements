# Z-Index Layering

Use this guide to manage z-index values consistently across Reapit Elements components and prevent unintended stacking conflicts.

## Overview

Components that use z-index for internal stacking (e.g., active tabs, focus rings) can unintentionally overlap other page elements during scrolling. This pattern solves the problem through:

1. **Semantic z-index tokens** — CSS custom properties for consistent values
2. **Stacking context isolation** — Contains z-index values within the parent component

## Z-Index Tokens

Three z-index tokens are defined in `src/styles/globals.ts`:

| Token                | Value | Purpose                                                                                           |
| -------------------- | ----- | ------------------------------------------------------------------------------------------------- |
| `--z-index-base`     | `0`   | Explicit base stacking level — use when an element must be overtly placed below elevated siblings |
| `--z-index-elevated` | `1`   | Internal component stacking (contained by isolation)                                              |
| `--z-index-sticky`   | `10`  | Sticky/fixed elements that must stay above scrolling content                                      |

### Why Only Three Tokens?

Overlay components (Dialog, Drawer, Menu, Tooltip, Combobox popups) use native browser APIs (`<dialog>` element or `popover` attribute) that place content in the browser's **top-layer**. The top-layer sits above all regular z-index stacking contexts, eliminating the need for high z-index values.

## Stacking Context Isolation

### How It Works

The CSS `isolation: isolate` property creates a new stacking context. Child z-index values become relative to that container rather than the page root.

```
Page (root stacking context)
├── TopBar (z-index: var(--z-index-sticky))
│   └── internal content
└── FolderTabs (isolation: isolate)
    └── Tab (z-index: var(--z-index-elevated)) ← Contained within FolderTabs
```

### Container Stacking Behaviour

When multiple elements create stacking contexts:

1. **Without z-index**: Later DOM elements appear above earlier ones
2. **With z-index**: The container's z-index determines stacking order, regardless of DOM order

Child z-index values are irrelevant for inter-container stacking. A child with `z-index: 9999` inside a container with `z-index: 0` will always appear below a sibling container with `z-index: 10`.

## Required Pattern

### Container Components (Internal Stacking)

Components that use z-index for internal visual effects must isolate their stacking context:

```typescript
// ✅ Correct: Isolation contains z-index within the component
export const ElFolderTabs = styled.nav`
  container-name: ${FOLDER_TABS_CSS_CONTAINER_NAME};
  container-type: inline-size;
  isolation: isolate;
`
```

```typescript
// ✅ Correct: Internal z-index uses token
export const ElFolderTab = styled.a`
  /* ... other styles ... */

  &[aria-current='page'] {
    z-index: var(--z-index-elevated);
  }
`
```

### Components With Multiple Stacking Levels

When a container has multiple children at different stacking levels, assign `--z-index-base` explicitly to the lower element rather than relying on DOM order. This makes the intended stacking contract readable in CSS without needing to know the DOM structure.

The table row is the canonical example: the primary action's `::after` pseudo-element covers the entire row, and interactive elements (checkbox, more-actions) must sit above it.

```typescript
// ✅ Correct: Explicit base stacking on the overlay element
export const elTableRowPrimaryAction = css`
  /* Explicitly base-level so interactive siblings at --z-index-elevated
   * are guaranteed above the ::after overlay, regardless of DOM order. */
  z-index: var(--z-index-base);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
  }
`

// ✅ Correct: Interactive elements explicitly elevated above the overlay
export const elTableCellCheckbox = css`
  z-index: var(--z-index-elevated);
`
```

### Sticky/Fixed Components

Components that must stay above scrolling content use the sticky token:

```typescript
// ✅ Correct: Sticky element with z-index token
export const elTopBar = css`
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
`
```

## Code Review Checklist

### For Components Using Z-Index

- [ ] Container component has `isolation: isolate` if children use z-index
- [ ] Z-index values use tokens (`--z-index-base`, `--z-index-elevated`, `--z-index-sticky`)
- [ ] Hardcoded z-index values removed (e.g., `z-index: 1`, `z-index: 100`)
- [ ] Sticky/fixed elements use `--z-index-sticky`
- [ ] Internal stacking uses `--z-index-elevated`
- [ ] Elements that must sit below elevated siblings use `--z-index-base` explicitly (do not rely on DOM order)

### For New Components

- [ ] Determine whether z-index serves internal stacking or page-level stacking
- [ ] Apply `isolation: isolate` to container if using internal z-index
- [ ] Use appropriate token based on stacking requirement

## Common Mistakes

### Missing Isolation

```typescript
// ❌ Wrong: Z-index escapes and overlaps other page elements
export const ElTabs = styled.div`
  display: flex;
`

export const ElTab = styled.a`
  &[aria-current='page'] {
    z-index: 1;
  }
`

// ✅ Correct: Container isolates the stacking context
export const ElTabs = styled.div`
  display: flex;
  isolation: isolate;
`

export const ElTab = styled.a`
  &[aria-current='page'] {
    z-index: var(--z-index-elevated);
  }
`
```

### Hardcoded Z-Index Values

```typescript
// ❌ Wrong: Hardcoded values
z-index: 1;
z-index: 100;
z-index: 9999;

// ✅ Correct: Semantic tokens
z-index: var(--z-index-elevated);
z-index: var(--z-index-sticky);
```

### Using Z-Index for Overlays

```tsx
// ❌ Wrong: Using z-index for modal/overlay components
export const ElModal = styled.div`
  position: fixed;
  z-index: 9999;
`

// ✅ Correct: Use native browser APIs
export function Modal({ children }: Modal.Props) {
  return <dialog>{children}</dialog> // Automatically in top-layer
}
```

## Components Using This Pattern

### Isolated Containers

These components use `isolation: isolate` to contain internal z-index:

- `FolderTabs` — Active tab elevation
- `SplitButton` — Button focus states
- `Table` (body row) — Interactive element stacking above the primary action
- `AtAGlance.Carousel` — Navigation buttons are permanently elevated above the scroll grid with `z-index: var(--z-index-elevated)`; visibility is managed via `pointer-events` and `opacity`, not z-index toggling

### Sticky Elements

These components use `--z-index-sticky` for page-level stacking:

- `FocusedLayout` — Top bar and bottom bar
- `FocusedExperience` — Top bar and bottom bar

### Top-Layer Components

These components use native browser APIs and require no z-index management:

- `Dialog` — Uses `<dialog>` element
- `Drawer` — Uses `<dialog>` element
- `Menu` — Uses `popover="auto"`
- `Tooltip` — Uses `popover="hint"`
- `Combobox` popup — Uses `<dialog>` element

## Related Patterns

- [Interface Pattern](./interface-pattern.md) — For component props
- [Context Pattern](./context-pattern.md) — For React contexts
