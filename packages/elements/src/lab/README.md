# Lab Components

## Overview

The `src/lab` directory contains experimental "lab" components. These components expose unstable APIs. We may change or remove them without notice.

## Guidelines

We welcome contributions under these constraints:

- Two or more products must need the component;
- The Design System team must approve the component for the lab;
- Until a core component replaces it, the contributing product bears responsibility for bug fixes and maintenance.

Core components must never depend on lab components internally.

## Styling Naming Conventions

To prevent naming conflicts with existing components in `src/deprecated`, `src/core`, and `src/utils`, lab components **MUST** use the the following prefixes.

These prefixes provide:

1. **Consistency**: Use the correct prefix for your styling approach
2. **Uniqueness**: Prefixes prevent conflicts with existing component styles
3. **Future-proofing**: Prefixes update to core conventions when promoting components
4. **Documentation**: Document experimental status clearly

### Styled Components

All styled components **MUST** use the `ElExperimental` prefix:

```typescript
// ✅ Correct
const ElExperimentalButton = styled.button`
  padding: var(--spacing-2);
  border-radius: var(--corner-md);
`;

const ElExperimentalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// ❌ Incorrect - missing ElExperimental prefix
const ElButton = styled.button`...`;
const MyButton = styled.button`...`;
```

### CSS Class Names

All CSS class names **MUST** use the `elExperimental` prefix:

```typescript
// ✅ Correct
const elExperimentalButton = css`
  padding: var(--spacing-2);
  border-radius: var(--corner-md);
`;

const elExperimentalContainer = css`
  display: flex;
  flex-direction: column;
`;

// ❌ Incorrect - missing elExperimental prefix
const elButton = css`...`;
const myButton = css`...`;
```

## Migration to Core

Migrate components in two ways:

1. **Deprecation + Replacement**: Deprecate the lab component, and build it's replacement in core. Both remain side-by-side and available to consumers. Appropriate when the lab component has heavy usage and breaking changes need to be avoided.
2. **Move lab component to core**: Move the lab component to core, updating it's name, documentation and package entry point. Appropriate when few consumers use the component and can migrate via a simple codemod.

When promoting a lab component to core:

- Remove `ElExperimental` prefixes from styled components (replace with `El`)
- Remove `elExperimental` prefixes from CSS classes (replace with `el`)
- Update all related documentation and stories
- Move the component from `src/lab` to `src/core`
- Update exports in index files
