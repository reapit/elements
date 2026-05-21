---
name: cascade-layering
description: Enforce the cascade layering pattern for component styles. Use when adding styles to a new component, reviewing a PR that touches `@layer`, or deciding how styles should be layered.
---

# Cascade Layering

## When to Use This Skill

Invoke this skill when:

- Adding styles to a new component
- Reviewing a PR that introduces or modifies `@layer` usage
- Migrating unlayered styles to the layered approach

## Layer Architecture

The library declares two named layers in `src/styles/layer-order.css`:

```css
@layer elements.base, elements.main;
```

| Layer           | Purpose                                                 | Used by                              |
| --------------- | ------------------------------------------------------- | ------------------------------------ |
| `elements.base` | Foundation styles that other components layer on top of | `Popover`, `Button`, `CheckboxInput` |
| `elements.main` | All other component styles                              | Everything else                      |

Because `elements.base` is declared first, `elements.main` styles always win when both layers apply to the same element. This lets components like `Popover` provide base positioning that a consuming component can refine without specificity hacks.

### Why Named Over Anonymous

Anonymous `@layer {}` blocks each create a **separate** anonymous layer. Their relative ordering depends on when each block first appears in the stylesheet — unpredictable across independently loaded components. A named layer like `elements.main` merges all declarations into a **single** layer, giving one consistent, low-priority bucket across the entire library.

Named layers also give consumers a clear contract: all component styles live inside `elements.*` layers, and any unlayered styles win regardless of specificity or source order.

### Why Layer Everything

Selectively layering "overridable" styles while leaving "structural" styles unlayered requires a per-file audit that is subjective and error-prone. Layering everything is simpler, consistent, and covers the common case: consumers who override structural styles do so intentionally.

For how the layer order reaches the bundle in both Storybook and the production build, see [`src/styles/ARCHITECTURE.md`](../../../src/styles/ARCHITECTURE.md).

## Process

### New component

**Checklist:**

- [ ] Wrap all styles in `@layer elements.main { ... }`
- [ ] Confirm no anonymous `@layer {}` blocks
- [ ] If this component provides foundation styles for other components, use `elements.base` instead (rare — check with the team first)

```typescript
// ✅ Correct
export const ElMyContainer = styled.div`
  @layer elements.main {
    width: min-content;
    height: min-content;
  }
`
```

### Migrating unlayered styles

When you encounter styles that are not yet layered, wrap them in `@layer elements.main`.

**Checklist:**

- [ ] Wrap all styles in `@layer elements.main { ... }`
- [ ] Run tests to confirm no visual regression

## Common Mistakes

### Anonymous `@layer {}`

```typescript
// ❌ Wrong: anonymous layer — ordering is unpredictable across components
@layer {
  width: min-content;
}

// ✅ Correct: named layer — merges into one predictable bucket
@layer elements.main {
  width: min-content;
}
```

### Splitting styles across layered and unlayered

```typescript
// ❌ Wrong: selective layering — inconsistent and requires subjective judgement
@layer elements.main {
  color: var(--colour-text);
}
display: contents;

// ✅ Correct: layer everything
@layer elements.main {
  color: var(--colour-text);
  display: contents;
}
```

### Using the wrong layer name

```typescript
// ❌ Wrong: bare "base" is not a declared layer
@layer base {
  ...
}

// ✅ Correct: use the namespaced layer
@layer elements.main {
  ...
}
```

## Review Checklist

When reviewing code that touches styles:

- [ ] All styles wrapped in `@layer elements.main` (or `elements.base` if justified)
- [ ] No anonymous `@layer {}` in non-deprecated code
- [ ] No styles left outside the layer

## Reference

- [MDN: `@layer`](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) — cascade layers specification and behaviour
