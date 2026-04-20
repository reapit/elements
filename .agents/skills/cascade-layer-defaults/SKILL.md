---
name: cascade-layer-defaults
description: Enforce the `@layer default` pattern for overridable component styles. Use when adding default styles that consumers should be able to override, reviewing a PR that touches `@layer`, or deciding whether styles should be layered.
---

# Cascade Layer Defaults

## When to Use This Skill

Invoke this skill when:

- Adding default or overridable styles to a new component
- Reviewing a PR that introduces or modifies `@layer` usage
- Deciding whether component styles should be layered or unlayered
- Migrating existing `:where()`-only patterns to the layered approach

## Required Pattern

All overridable default styles in **new or modified, non-deprecated code** MUST follow these rules:

1. **Use `@layer default`** (named) — never anonymous `@layer {}`
2. **Only layer overridable defaults** — layout sizing, resets, default colours, and other styles that consumers are expected to customise
3. **Do not layer structural or critical styles** — styles that must not be overridden (e.g. `display: contents` on a wrapper, accessibility-related styles, or core interactive behaviour)

### Why Named Over Anonymous

Anonymous `@layer {}` blocks each create a **separate** anonymous layer. Their relative ordering depends on when each block first appears in the stylesheet — unpredictable across independently loaded components. A named layer like `@layer default` merges all declarations into a **single** layer, giving one consistent, low-priority bucket across the entire library.

Named layers also give consumers a clear contract: all overridable defaults live in the `default` layer, and any unlayered styles win regardless of specificity or source order.

### How `@layer default` Interacts With `:where()`

`:where()` reduces specificity to zero but remains subject to source-order rules. If a consumer's selector also has zero specificity, whichever appears later in the stylesheet wins.

`@layer default` makes styles lose to **all** unlayered styles regardless of specificity or order.

The two techniques are complementary. Use `:where()` inside `@layer default` when you want both benefits — reduced specificity _and_ guaranteed layer-level subordination:

```typescript
// ✅ Correct: :where() inside @layer default
export const elHeading = css`
  @layer default {
    &:where(h1, h2, h3, h4, h5, h6) {
      margin: 0;
      padding: 0;
    }
  }

  ${generateElHeadingFontStyles()}
`
```

## Process

### New component with overridable defaults

**Checklist:**

- [ ] Wrap overridable defaults in `@layer default { ... }`
- [ ] Keep structural/critical styles outside the layer
- [ ] Add a comment explaining why the layer is used
- [ ] Confirm no anonymous `@layer {}` blocks

```typescript
// ✅ Correct
export const ElMyContainer = styled.div`
  /* We place these styles inside a layer to allow them to be easily overridden by a
   * consumer-supplied class that would otherwise have a lower specificity and therefore
   * have no effect or require the use of !important */
  @layer default {
    width: min-content;
    height: min-content;
  }
`
```

### Migrating `:where()`-only patterns

When you encounter overridable defaults protected only by `:where()`, wrap them in `@layer default` as well. Keep the `:where()` selector — removing it would be a separate change with different trade-offs.

**Checklist:**

- [ ] Wrap the existing `:where()` block in `@layer default { ... }`
- [ ] Preserve the `:where()` selector
- [ ] Add or update the explanatory comment
- [ ] Run tests to confirm no visual regression

## Common Mistakes

### Anonymous `@layer {}`

```typescript
// ❌ Wrong: anonymous layer — ordering is unpredictable across components
@layer {
  width: min-content;
}

// ✅ Correct: named layer — merges into one predictable bucket
@layer default {
  width: min-content;
}
```

### Layering styles that should not be overridable

```typescript
// ❌ Wrong: critical accessibility styles should not be in a layer
@layer default {
  &:focus-visible {
    outline: 2px solid var(--colour-focus);
  }
}

// ✅ Correct: keep critical styles unlayered
&:focus-visible {
  outline: 2px solid var(--colour-focus);
}
```

### Missing explanatory comment

Always include a comment before `@layer default` explaining its purpose so that contributors unfamiliar with cascade layers have sufficient context.

## Review Checklist

When reviewing code that touches `@layer` or overridable defaults:

- [ ] All overridable defaults wrapped in `@layer default`
- [ ] No anonymous `@layer {}` in non-deprecated code
- [ ] Structural and critical styles remain unlayered
- [ ] Comment present explaining why the layer is used
- [ ] Existing `:where()` selectors preserved when adding the layer

## Reference

- [MDN: `@layer`](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) — cascade layers specification and behaviour
- [MDN: `:where()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:where) — zero-specificity pseudo-class
