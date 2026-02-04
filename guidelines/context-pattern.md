# React Context Pattern

> **Note:** When implementing or reviewing this pattern, use the `react-context-pattern` skill (`.opencode/skills/react-context-pattern.md`). This guideline serves as comprehensive reference documentation.

React contexts follow a consistent pattern to ensure type safety, clear documentation, and error handling across the library.

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
 * Context that ComponentName provides to descendants.
 * Describe what values this context exposes and why.
 */
export const ComponentNameContext = createContext<ComponentNameContext.Value | null>(null)

/**
 * Returns ComponentNameContext.Value from the nearest ComponentName ancestor.
 * @throws Error when called outside a ComponentName component.
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
- **MUST** contain `Value` interface that defines the context shape
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

- **MUST** use `createContext<ComponentNameContext.Value | null>(null)`
- **MUST** initialize with `null` to enforce usage checking in the custom hook
- **MUST** include JSDoc that explains the context purpose

```typescript
/**
 * Context that Dialog provides to descendants. Exposes titleId
 * for accessibility labeling.
 */
export const DialogContext = createContext<DialogContext.Value | null>(null)
```

### 3. Custom Hook

- **MUST** provide custom hook named `useComponentNameContext`
- **MUST** return non-null context value
- **MUST** throw descriptive error when context is unavailable
- **MUST** include JSDoc documentation

```typescript
/**
 * Returns DialogContext.Value from the nearest Dialog ancestor.
 * @throws Error when called outside a Dialog component.
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
// Use full "Context" suffix
export namespace ButtonCtx {} // ❌ Wrong
export namespace ButtonContext {} // ✅ Correct

// No additional suffixes
export namespace ButtonContextState {} // ❌ Wrong
export namespace ButtonContext {} // ✅ Correct
```

### Missing Error Handling

```typescript
// Hook must throw when context is null
export function useDialogContext(): DialogContext.Value | null {
  return useContext(DialogContext) // ❌ Wrong: returns null
}

export function useDialogContext(): DialogContext.Value {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialogContext requires a Dialog ancestor')
  }
  return context // ✅ Correct: throws on null, returns non-null value
}
```

### Generic Error Messages

```typescript
// Specify hook name and required ancestor
throw new Error('Context not found') // ❌ Wrong: too generic
throw new Error('useDialogContext requires a Dialog ancestor') // ✅ Correct
```

### Missing Documentation

```typescript
export namespace DialogContext {
  export interface Value {
    titleId: string // ❌ Wrong: missing JSDoc
  }
}

export namespace DialogContext {
  export interface Value {
    /** The ID used for accessibility labeling */
    titleId: string // ✅ Correct: includes JSDoc
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
- [ ] Context uses `| null` union type with `null` initial value
- [ ] Custom hook throws descriptive error on null context
- [ ] Error message specifies hook name and required ancestor
- [ ] Hook returns non-nullable context value
- [ ] File follows directory structure

## Related Patterns

This context pattern works with:

- [Interface Pattern](./interface-pattern.md) - For component props
- Component composition patterns
- Accessibility patterns (e.g., `titleId` for ARIA labeling)

This pattern ensures consistency across all React contexts in Reapit Elements.
