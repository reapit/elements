---
name: z-index-layering
description: Enforce correct z-index usage in Reapit Elements components. Use when adding z-index to a new component, reviewing a PR that touches z-index or stacking, or migrating hardcoded z-index values to semantic tokens.
---

# Z-Index Layering

## When to Use This Skill

Invoke this skill when:

- Adding z-index to a new component
- Reviewing a PR that introduces or modifies z-index values
- Migrating hardcoded z-index values to semantic tokens
- Deciding whether a component needs `isolation: isolate`
- Deciding whether to use z-index at all or a native browser API (e.g., `<dialog>`, `popover`)

## Required Pattern

All z-index usage in **new or modified, non-deprecated code** MUST follow these rules:

1. **Use semantic tokens** — do not introduce new hardcoded numeric `z-index` values; instead, reference the semantic tokens defined below
2. **Isolate stacking contexts** — apply `isolation: isolate` to any container whose children use `z-index`
3. **Handle legacy/deprecated code** — existing deprecated components may still use hardcoded numeric `z-index` values; you are not required to bulk-clean these up, but when you touch them, prefer migrating to semantic tokens where practical

### Tokens

Three tokens are defined in `src/styles/globals.ts`:

| Token                | Value | Purpose                                                                                           |
| -------------------- | ----- | ------------------------------------------------------------------------------------------------- |
| `--z-index-base`     | `0`   | Explicit base stacking level — use when an element must be overtly placed below elevated siblings |
| `--z-index-elevated` | `1`   | Internal component stacking (contained by isolation)                                              |
| `--z-index-sticky`   | `10`  | Sticky/fixed elements that must stay above scrolling content                                      |

Only three tokens exist because overlay components (`Dialog`, `Drawer`, `Menu`, `Tooltip`, `Combobox` popups) use native browser APIs (`<dialog>` or `popover`) that place content in the browser's top-layer — above all z-index stacking contexts — eliminating the need for high values.

## Process

### New component: internal stacking (e.g., active tab, focus ring)

**Checklist:**

- [ ] Apply `isolation: isolate` to the container element
- [ ] Apply `z-index: var(--z-index-elevated)` to the child element
- [ ] Confirm no hardcoded numeric z-index values

```typescript
// ✅ Correct
export const ElFolderTabs = styled.nav`
  isolation: isolate;
`

export const ElFolderTab = styled.a`
  &[aria-current='page'] {
    z-index: var(--z-index-elevated);
  }
`
```

### New component: multiple stacking levels within an isolated container

When a container has elements at different stacking levels (e.g., an `::after` overlay that must sit below interactive siblings), assign `--z-index-base` explicitly to the lower element. Do not rely on DOM order to determine the stacking result.

**Checklist:**

- [ ] Apply `isolation: isolate` to the container element
- [ ] Apply `z-index: var(--z-index-base)` to the element that must sit below
- [ ] Apply `z-index: var(--z-index-elevated)` to the elements that must sit above
- [ ] Confirm no hardcoded numeric z-index values

```typescript
// ✅ Correct: explicit base/elevated pairing removes reliance on DOM order
export const elTableBodyRow = css`
  isolation: isolate;
`

export const elTableRowPrimaryAction = css`
  z-index: var(--z-index-base); // ::after overlay sits at the base level

  &::after {
    content: '';
    position: absolute;
    inset: 0;
  }
`

export const elTableCellCheckbox = css`
  z-index: var(--z-index-elevated); // sits above the ::after overlay
`
```

### New component: sticky or fixed positioning

**Checklist:**

- [ ] Apply `z-index: var(--z-index-sticky)` to the element
- [ ] Confirm whether `isolation: isolate` is needed: typically not, but add it if this sticky/fixed element also contains children that use `z-index` for internal stacking
- [ ] Confirm no hardcoded numeric z-index values

```typescript
// ✅ Correct
export const elTopBar = css`
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
`
```

### New component: overlay (modal, drawer, menu, tooltip, popup)

**Checklist:**

- [ ] Use a native browser API — `<dialog>` element or `popover` attribute
- [ ] Confirm no z-index is applied — top-layer placement is automatic
- [ ] Remove any `position: fixed` with high z-index values

```tsx
// ✅ Correct — top-layer placement requires no z-index
export function Modal({ children }: Modal.Props) {
  return <dialog>{children}</dialog>
}
```

### Migrating hardcoded z-index values

**Checklist:**

- [ ] Identify the component's stacking purpose (internal, sticky, or overlay)
- [ ] Replace the hardcoded value with the appropriate token
- [ ] Add `isolation: isolate` to the container if the component uses internal stacking
- [ ] Run tests to confirm no visual regression

## Common Mistakes

### Missing isolation

```typescript
// ❌ Wrong: z-index escapes and overlaps other page elements
export const ElTabs = styled.div`
  display: flex;
`

export const ElTab = styled.a`
  &[aria-current='page'] {
    z-index: 1;
  }
`

// ✅ Correct: container isolates the stacking context
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

### Hardcoded z-index values

```typescript
// ❌ Wrong
z-index: 1;
z-index: 100;
z-index: 9999;

// ✅ Correct
z-index: var(--z-index-elevated);
z-index: var(--z-index-sticky);
```

### Using z-index for overlays

```tsx
// ❌ Wrong: position fixed with high z-index
export const ElModal = styled.div`
  position: fixed;
  z-index: 9999;
`

// ✅ Correct: native browser API handles top-layer placement
export function Modal({ children }: Modal.Props) {
  return <dialog>{children}</dialog>
}
```

## Review Checklist

When reviewing code that touches z-index or stacking:

- [ ] Container has `isolation: isolate` if any child uses z-index
- [ ] All z-index values use tokens, not hardcoded numbers
- [ ] Sticky/fixed elements use `--z-index-sticky`
- [ ] Internal stacking uses `--z-index-elevated`
- [ ] Elements that must sit below elevated siblings use `--z-index-base` explicitly (do not rely on DOM order)
- [ ] Overlay components use `<dialog>` or `popover` — no z-index applied

## Reference

See `guidelines/z-index-layering.md` for:

- How stacking context isolation works
- Container stacking behaviour (DOM order vs z-index)
- Complete list of components already using this pattern
