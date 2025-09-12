# React Context Pattern Guidelines

This document outlines the standard pattern for implementing React contexts in Reapit Elements components.

## Overview

React contexts in this codebase follow a consistent namespace pattern that provides type safety, clear documentation, and proper error handling. All contexts should follow this established pattern for consistency and maintainability.

## ✅ Required Pattern

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
 * @throws an error if the context is not defined.
 */
export function useComponentNameContext(): ComponentNameContext.Value {
  const context = useContext(ComponentNameContext)
  if (!context) {
    throw new Error('useComponentNameContext must be used within a ComponentName')
  }
  return context
}
```

## 🔍 Pattern Elements

### 1. Namespace Declaration

- **MUST** use the component name followed by `Context`
- **MUST** contain a `Value` interface that defines the context shape
- **MUST** document all properties with JSDoc comments

```typescript
export namespace DialogContext {
  export interface Value {
    /** The ID used for accessibility labeling */
    titleId: string
  }
}
```

### 2. Context Creation

- **MUST** use `createContext` with the namespace type union: `ComponentNameContext.Value | null`
- **MUST** initialize with `null` to enforce proper usage checking
- **SHOULD** include JSDoc documentation explaining the context's purpose

```typescript
/**
 * The context available to a Dialog's descendants. Provides access to titleId
 * for proper accessibility labeling.
 */
export const DialogContext = createContext<DialogContext.Value | null>(null)
```

### 3. Custom Hook

- **MUST** provide a custom hook named `useComponentNameContext`
- **MUST** throw a descriptive error if context is not available
- **MUST** return the non-null context value
- **SHOULD** include JSDoc documentation

```typescript
/**
 * Returns the current DialogContext value.
 * @throws an error if the context is not defined.
 */
export function useDialogContext(): DialogContext.Value {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('DialogContext not defined: useDialogContext can only be used in a child of DialogContext')
  }
  return context
}
```

## 📋 Context Value Examples

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

## 🚫 Common Mistakes to Avoid

### ❌ Wrong Naming
```typescript
// Don't use inconsistent naming
export namespace ButtonCtx { } // Wrong: use full "Context"
export namespace ButtonContextState { } // Wrong: don't add suffixes
```

### ❌ Missing Error Handling
```typescript
// Don't return nullable values from hook
export function useDialogContext(): DialogContext.Value | null {
  return useContext(DialogContext) // Wrong: should throw on null
}
```

### ❌ Inconsistent Error Messages
```typescript
// Don't use generic error messages
throw new Error('Context not found') // Wrong: be specific

// Use descriptive, component-specific messages
throw new Error('useDialogContext can only be used in a child of DialogContext')
```

### ❌ Missing Documentation
```typescript
export namespace DialogContext {
  export interface Value {
    titleId: string // Wrong: missing JSDoc
  }
}
```

## 🎯 File Structure

Each context should be in its own file within the component directory:

```
src/core/component-name/
├── index.ts
├── component-name.tsx
├── context.tsx        # Context implementation here
└── __tests__/
```

## 📝 Integration with Components

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

## 🔍 Code Review Checklist

When reviewing context implementations:

- [ ] Namespace follows `ComponentNameContext` pattern
- [ ] Interface is named `Value` and exported from namespace
- [ ] All properties have JSDoc documentation
- [ ] Context created with `| null` union type
- [ ] Custom hook throws descriptive error on null context
- [ ] Error message mentions both hook name and required parent component
- [ ] Hook returns non-nullable context value
- [ ] File follows established directory structure

## 📚 Related Patterns

This context pattern works in conjunction with:

- [Interface Pattern](./interface-pattern.md) - For component props
- Component composition patterns
- Accessibility patterns (e.g., `titleId` for ARIA labeling)

Following this pattern ensures consistency across all React contexts in the Reapit Elements library.