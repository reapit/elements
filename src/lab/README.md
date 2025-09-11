# Lab Components - AGENTS.md

## Overview

The `src/lab` directory contains experimental components that are in development or testing phases. These components may have unstable APIs and are subject to change or removal.

## Styling Naming Conventions

To prevent naming conflicts with existing components in `src/deprecated`, `src/core`, and `src/utils`, all styled components and CSS class names in lab components **MUST** follow these strict naming conventions:

### Styled Components

All styled components **MUST** use the `ElExperimental` prefix:

```typescript
// ✅ Correct
const ElExperimentalButton = styled.button`
  padding: var(--spacing-2);
  border-radius: var(--corner-md);
`

const ElExperimentalContainer = styled.div`
  display: flex;
  flex-direction: column;
`

// ❌ Incorrect - missing ElExperimental prefix
const ElButton = styled.button`...`
const MyButton = styled.button`...`
```

### CSS Class Names

All CSS class names **MUST** use the `elExperimental` prefix:

```typescript
// ✅ Correct
const elExperimentalButton = css`
  padding: var(--spacing-2);
  border-radius: var(--corner-md);
`

const elExperimentalContainer = css`
  display: flex;
  flex-direction: column;
`

// ❌ Incorrect - missing elExperimental prefix
const elButton = css`...`
const myButton = css`...`
```

## Guidelines

1. **Consistency**: Always use the appropriate prefix for your styling approach
2. **Uniqueness**: The prefixes help ensure no conflicts with existing component styles
3. **Future-proofing**: When promoting lab components to core, the prefixes will be updated to match core conventions
4. **Documentation**: Include clear documentation for experimental components, noting their experimental status

## Migration to Core

When a lab component is promoted to core:

- Remove `ElExperimental` prefixes from styled components (replace with `El`)
- Remove `elExperimental` prefixes from CSS classes (replace with `el`)
- Update all related documentation and stories
- Move the component from `src/lab` to `src/core`
- Update exports in index files
