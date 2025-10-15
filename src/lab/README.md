# Lab Components - AGENTS.md

## Overview

The `src/lab` directory contains experimental components in development or testing. These components expose unstable APIs subject to change or removal.

## Styling Naming Conventions

To prevent naming conflicts with existing components in `src/deprecated`, `src/core`, and `src/utils`, lab components **MUST** follow these naming conventions:

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

1. **Consistency**: Use the correct prefix for your styling approach
2. **Uniqueness**: Prefixes prevent conflicts with existing component styles
3. **Future-proofing**: Prefixes update to core conventions when promoting components
4. **Documentation**: Document experimental status clearly

## Migration to Core

When promoting a lab component to core:

- Remove `ElExperimental` prefixes from styled components (replace with `El`)
- Remove `elExperimental` prefixes from CSS classes (replace with `el`)
- Update all related documentation and stories
- Move the component from `src/lab` to `src/core`
- Update exports in index files
