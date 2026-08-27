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
- [ ] Confirm `@keyframes` definitions are outside the `@layer` wrapper
- [ ] If this component provides foundation styles for other components, use `elements.base` instead (rare — check with the team first)

```typescript
// ✅ Correct
export const ElMyContainer = styled.div`
  @layer elements.main {
    width: min-content;
    height: min-content;
  }
`;
```

### Migrating unlayered styles

When you encounter styles that are not yet layered, wrap them in `@layer elements.main`.

**Checklist:**

- [ ] Wrap all styles in `@layer elements.main { ... }`
- [ ] Confirm `@keyframes` definitions are outside the `@layer` wrapper
- [ ] Run tests to confirm no visual regression

### Storybook and documentation styles

Storybook stories, MDX pages, `__story__/` helpers, and Storybook-only `docs/` files may use plain `css` template literals without a layer wrapper. Consumers never load these styles, so the override guarantee that layering provides has no audience. Wrapping them in `@layer elements.main` adds a level of indentation that obscures the actual rules.

**Checklist:**

- [ ] File is a Storybook story, MDX page, `__story__/` helper, or Storybook-only `docs/` file
- [ ] Only Storybook consumes these styles
- [ ] Plain `css` template literals without a layer wrapper

Storybook and documentation files that do use `@layer` must use `elements.main`. Anonymous layers and other layer names remain forbidden.

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

### Nesting `@keyframes` inside `@layer`

wyw-in-js scopes `@keyframes` names by appending a suffix derived from the root class selector. Its Stylis plugin finds keyframe definitions by scanning siblings of the root element in the AST. When `@keyframes` is nested inside an `@layer` block, it becomes a child of the `@layer` node rather than a sibling of the root, so the plugin cannot match it. The `@keyframes` name is renamed but the `animation` property reference is not, producing a name mismatch that silently breaks the animation.

Keep the `animation` property inside the layer (so it respects layer ordering) and place the `@keyframes` definition outside.

```typescript
// ❌ Wrong: @keyframes inside @layer — wyw-in-js cannot scope the name correctly
export const elSpinner = css`
  @layer elements.main {
    animation: spin 1s linear infinite;

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;

// ✅ Correct: @keyframes outside @layer
export const elSpinner = css`
  @layer elements.main {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
```

## Review Checklist

When reviewing code that touches styles:

- [ ] All styles wrapped in `@layer elements.main` (or `elements.base` if justified)
- [ ] No anonymous `@layer {}` in non-deprecated code
- [ ] No styles left outside the layer (except `@keyframes` — see Common Mistakes)
- [ ] `@keyframes` definitions are outside the `@layer` wrapper
- [ ] Storybook and documentation files may skip layering, but must never use anonymous layers

## Reference

- [MDN: `@layer`](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) — cascade layers specification and behaviour
