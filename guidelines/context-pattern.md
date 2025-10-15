# React Context Pattern Guidelines

React contexts in Reapit Elements follow a consistent pattern that ensures type safety, clear documentation, and proper error handling. This guide defines that standard pattern.

## Overview

All contexts must follow this established pattern for consistency and maintainability across the library.

## Required Pattern

### Basic Context Structure

```typescript
import { createContext, useContext } from 'react'

export namespace ComponentNameContext {
  export interface Value {
    /** JSDoc documentation for each property */
    property: string
    /** Optional properties should be marked as such */
    optionalProperty?: boolean
  }
}

/**
 * Brief description of what this context provides.
 * Include usage examples if helpful.
 */
export const ComponentNameContext = createContext<ComponentNameContext.Value | null>(null)

/**
 * Returns the current ComponentNameContext value.
 * @throws if context is undefined.
 */
export function useComponentNameContext(): ComponentNameContext.Value {
  const context = useContext(ComponentNameContext)
  if (!context) {
    throw new Error('useComponentNameContext requires a ComponentName ancestor')
  }
  return context
}
```

## Pattern Components

### 1. Namespace Declaration

- **MUST** use component name followed by `Context`
- **MUST** contain `Value` interface defining context shape when not a simple primitive
- **MUST** document all properties with JSDoc

```typescript
export namespace DialogContext {
  export interface Value {
    /** The ID used for accessibility labeling */
    titleId: string
  }
}
```

### 2. Context Creation

- **MUST** use `createContext` with correct type and initial value
- **MUST** use `null` for initial value unless a sensible default exists
- **MUST** initialize with `null` to enforce proper usage checking when a default value is not appropriate
- **MUST** include JSDoc explaining context purpose

```typescript
/**
 * Context available to Dialog descendants. Provides titleId
 * for proper accessibility labeling.
 */
export const DialogContext = createContext<DialogContext.Value | null>(null)
```

### 3. Custom Hook

- **MUST** provide custom hook named `useComponentNameContext`
- **MUST** return non-null context value
- **MUST** throw descriptive error if context is unavailable
- **MUST** include JSDoc documentation

```typescript
/**
 * Returns the current DialogContext value.
 * @throws if context is undefined.
 */
export function useDialogContext(): DialogContext.Value {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialogContext requires a Dialog ancestor')
  }
  return context
}
```

## Context Value Examples

### Simple State Context
```typescript
export namespace BottomBarContext {
  export interface Value {
    /** Whether the bottom bar is currently open */
    isOpen: boolean
  }
}
```

### Configuration Context
```typescript
export namespace ChipSelectContext {
  export interface Value {
    /** The ID of the form to associate chip select options with */
    form?: string
    /** Whether the chip select allows multiple selections */
    multiple: boolean
    /** The name each chip select option should have */
    name?: string
    /** The size of options in the chip select */
    size: ComponentProps<typeof ChipSelectChip>['size']
  }
}
```

### Complex State Context
```typescript
export namespace SplitButtonContext {
  export interface Value {
    /** Whether the main action button, menu button, or neither, is busy */
    busy: 'action' | 'menu-item' | undefined
    /** The size of the main action and menu buttons */
    size: ComponentProps<typeof SplitButton>['size']
    /** The variant used by the main action and menu buttons */
    variant: ComponentProps<typeof SplitButton>['variant']
  }
}
```

## Common Mistakes

### Wrong Naming
```typescript
// Use consistent naming
export namespace ButtonCtx { } // Wrong: use full "Context"
export namespace ButtonContextState { } // Wrong: avoid suffixes
```

### Missing Error Handling
```typescript
// Hook must throw on undefined context
export function useDialogContext(): DialogContext.Value | null {
  return useContext(DialogContext) // Wrong: should throw on null
}
```

### Generic Error Messages
```typescript
// Use specific error messages
throw new Error('Context not found') // Wrong: too generic

// Specify hook name and required ancestor
throw new Error('useDialogContext requires a Dialog ancestor')
```

### Missing Documentation
```typescript
export namespace DialogContext {
  export interface Value {
    titleId: string // Wrong: missing JSDoc
  }
}
```

## File Structure

Place each context in its own file within the component directory:

```
src/core/component-name/
├── index.ts
├── component-name.tsx
├── context.tsx        # Context implementation here
└── __tests__/
```

## Integration with Components

### Provider Usage
```typescript
// In the main component file
import { ComponentNameContext } from './context'

export function ComponentName({ children, ...props }: ComponentName.Props) {
  const contextValue: ComponentNameContext.Value = {
    // Initialize context values based on props/state
  }

  return (
    <ComponentNameContext.Provider value={contextValue}>
      {children}
    </ComponentNameContext.Provider>
  )
}
```

### Consumer Usage
```typescript
// In child components
import { useComponentNameContext } from '../context'

export function ChildComponent() {
  const { property } = useComponentNameContext()
  // Use context values
}
```

## Code Review Checklist

When reviewing context implementations:

- [ ] Namespace uses `ComponentNameContext` pattern
- [ ] Interface exports `Value` from namespace
- [ ] All properties include JSDoc
- [ ] Context uses `| null` union type and `null` initial value when no sensible default value exists
- [ ] Custom hook throws descriptive error on null context
- [ ] Error message specifies hook name and required ancestor
- [ ] Hook returns non-nullable context value
- [ ] File follows established directory structure

## Related Patterns

This context pattern works with:

- [Interface Pattern](./interface-pattern.md) - For component props
- Component composition patterns
- Accessibility patterns (e.g., `titleId` for ARIA labeling)

Following this pattern ensures consistency across all React contexts in the Reapit Elements library.
