---
name: react-context-pattern
description: Enforce the React context pattern for type safety and error handling. Use when creating React contexts, reviewing context implementations, or ensuring consistent error handling in context-based components.
---

# React Context Pattern

## When to Use This Skill

Invoke this skill when:

- Creating a new React context for a component
- Reviewing PR that adds or modifies context implementations
- Migrating existing context to follow the standard pattern
- Ensuring contexts have proper error handling and type safety

## Required Pattern

All React contexts **MUST** follow this structure. The custom hook **throws by default**; see [Optional context hook](#optional-context-hook) for when a nullable return is appropriate instead.

```typescript
import { createContext, useContext } from "react";

export namespace ComponentNameContext {
  export interface Value {
    /** JSDoc documentation for each property */
    property: string;
    /** Optional properties should be marked as such */
    optionalProperty?: boolean;
  }
}

/**
 * Context that ComponentName provides to descendants.
 * Describe what values this context exposes and why.
 */
export const ComponentNameContext = createContext<ComponentNameContext.Value | null>(null);

/**
 * Returns ComponentNameContext.Value from the nearest ComponentName ancestor.
 * @throws Error when called outside a ComponentName component.
 */
export function useComponentNameContext(): ComponentNameContext.Value {
  const context = useContext(ComponentNameContext);
  if (!context) {
    throw new Error("useComponentNameContext requires a ComponentName ancestor");
  }
  return context;
}
```

## Pattern Components

### 1. Namespace Declaration

**Checklist:**

- [ ] Namespace uses component name followed by `Context`
- [ ] Contains `Value` interface defining context shape
- [ ] All properties documented with JSDoc
- [ ] Optional properties marked with `?`

**Example:**

```typescript
export namespace DialogContext {
  export interface Value {
    /** The ID used for accessibility labelling */
    titleId: string;
    /** Whether the dialog is currently open */
    isOpen?: boolean;
  }
}
```

**Common mistakes:**

```typescript
// ❌ Wrong: Missing "Context" suffix
export namespace Dialog {}

// ❌ Wrong: Wrong suffix
export namespace DialogCtx {}

// ❌ Wrong: Extra suffix
export namespace DialogContextState {}

// ✅ Correct
export namespace DialogContext {}
```

### 2. Context Creation

**Checklist:**

- [ ] Use `createContext<ComponentNameContext.Value | null>(null)`
- [ ] Initialize with `null` to enforce usage checking
- [ ] Include JSDoc explaining the context purpose
- [ ] Document what values the context exposes and why

**Example:**

```typescript
/**
 * Context that Dialog provides to descendants. Exposes titleId
 * for accessibility labelling and isOpen state for child components.
 */
export const DialogContext = createContext<DialogContext.Value | null>(null);
```

**Common mistakes:**

```typescript
// ❌ Wrong: Not nullable (bypasses error checking)
export const DialogContext = createContext<DialogContext.Value>({} as DialogContext.Value);

// ❌ Wrong: Missing JSDoc
export const DialogContext = createContext<DialogContext.Value | null>(null);

// ✅ Correct
/**
 * Context that Dialog provides to descendants.
 */
export const DialogContext = createContext<DialogContext.Value | null>(null);
```

### 3. Custom Hook

The hook should throw by default. Only return a nullable value when the context is intentionally optional — see [Optional context hook](#optional-context-hook).

**Checklist (required context — default):**

- [ ] Hook named `useComponentNameContext`
- [ ] Returns non-null context value (not nullable)
- [ ] Throws descriptive error when context is unavailable
- [ ] Error message specifies hook name and required ancestor
- [ ] Includes JSDoc documentation with `@throws` tag

**Example:**

```typescript
/**
 * Returns DialogContext.Value from the nearest Dialog ancestor.
 * @throws Error when called outside a Dialog component.
 */
export function useDialogContext(): DialogContext.Value {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext requires a Dialog ancestor");
  }
  return context;
}
```

**Common mistakes (required context):**

```typescript
// ❌ Wrong: Returns nullable for a required context (forces null checks everywhere)
export function useDialogContext(): DialogContext.Value | null {
  return useContext(DialogContext);
}

// ❌ Wrong: Generic error message
export function useDialogContext(): DialogContext.Value {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Context not found");
  }
  return context;
}

// ❌ Wrong: Missing error handling
export function useDialogContext(): DialogContext.Value {
  return useContext(DialogContext)!;
}

// ✅ Correct
export function useDialogContext(): DialogContext.Value {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext requires a Dialog ancestor");
  }
  return context;
}
```

### Optional context hook

Use a nullable return when a component can render meaningfully without a parent provider. This is appropriate when a child component is designed to work both standalone and nested — for example, a header component that can render inside or outside a drawer.

**Checklist (optional context):**

- [ ] Hook named `useComponentNameContext`
- [ ] Returns `ComponentNameContext.Value | null`
- [ ] Does **not** throw when context is absent
- [ ] JSDoc states the hook returns `null` when no ancestor provides the context
- [ ] Consumers handle the `null` case explicitly (e.g. `useDrawerContext() ?? {}`)

**Example:**

```typescript
/**
 * Returns the current DrawerContext value, or null if no Drawer ancestor
 * provides the context.
 */
export function useDrawerContext(): DrawerContext.Value | null {
  return useContext(DrawerContext);
}
```

**Consumer pattern:**

```typescript
// The consumer handles the null case explicitly
const { titleId } = useDrawerContext() ?? {};
```

## Context Value Examples

### Simple State Context

```typescript
export namespace BottomBarContext {
  export interface Value {
    /** Whether the bottom bar is currently open */
    isOpen: boolean;
  }
}
```

### Configuration Context

```typescript
export namespace ChipSelectContext {
  export interface Value {
    /** The ID of the form to associate chip select options with */
    form?: string;
    /** Whether the chip select allows multiple selections */
    multiple: boolean;
    /** The name each chip select option should have */
    name?: string;
    /** The size of options in the chip select */
    size: ComponentProps<typeof ChipSelectChip>["size"];
  }
}
```

### Complex State Context

```typescript
export namespace SplitButtonContext {
  export interface Value {
    /** Whether the main action button, menu button, or neither, is busy */
    busy: "action" | "menu-item" | undefined;
    /** The size of the main action and menu buttons */
    size: ComponentProps<typeof SplitButton>["size"];
    /** The variant used by the main action and menu buttons */
    variant: ComponentProps<typeof SplitButton>["variant"];
  }
}
```

## File Structure

**Checklist:**

- [ ] Context placed in own file: `context.tsx`
- [ ] File located in component directory
- [ ] Context exported from component's `index.ts`

**Example structure:**

```
src/core/component-name/
├── index.ts                # Exports component and context
├── component-name.tsx      # Main component
├── context.tsx             # Context implementation
└── __tests__/
    └── component-name.test.ts
```

## Integration with Components

### Provider Usage

**Checklist:**

- [ ] Import context from `./context`
- [ ] Define context value with correct type
- [ ] Wrap children with Provider
- [ ] Pass context value to Provider

**Example:**

```typescript
// In the main component file
import { ComponentNameContext } from './context'

export function ComponentName({ children, ...props }: ComponentName.Props) {
  const contextValue: ComponentNameContext.Value = {
    // Initialize context values based on props/state
    property: props.property,
  }

  return (
    <ComponentNameContext.Provider value={contextValue}>
      {children}
    </ComponentNameContext.Provider>
  )
}
```

### Consumer Usage

**Checklist:**

- [ ] Import custom hook (not raw context)
- [ ] Destructure needed values from hook
- [ ] Handle error appropriately if component might render outside provider

**Example:**

```typescript
// In child components
import { useComponentNameContext } from '../context'

export function ChildComponent() {
  const { property } = useComponentNameContext()

  return <div>{property}</div>
}
```

## Process

### Creating New Context

1. [ ] Create `context.tsx` file in component directory
2. [ ] Define namespace with `Value` interface
3. [ ] Document all properties with JSDoc
4. [ ] Create context with `| null` union type
5. [ ] Write custom hook — throwing (default) or nullable (optional context)
6. [ ] Export from component's `index.ts`
7. [ ] Use context in main component file
8. [ ] Write tests: error case for required contexts; no-provider case for optional contexts

### Reviewing Existing Context

1. [ ] Verify namespace follows `ComponentNameContext` pattern
2. [ ] Check `Value` interface has JSDoc for all properties
3. [ ] Verify context initialises with `null`
4. [ ] Determine whether context is required or optional
5. [ ] For required contexts: hook throws a descriptive error; error message specifies hook and required ancestor; hook returns non-nullable type
6. [ ] For optional contexts: hook returns `ComponentNameContext.Value | null`; consumers handle the `null` case explicitly
7. [ ] Check file structure matches pattern

### Migrating Context

1. [ ] Identify existing context pattern
2. [ ] Create namespace if missing
3. [ ] Move/create `Value` interface in namespace
4. [ ] Update context type to `Value | null`
5. [ ] Determine whether context is required or optional
6. [ ] Create/update custom hook accordingly (throwing for required; nullable for optional)
7. [ ] Update all consumers to use custom hook
8. [ ] Update imports throughout codebase
9. [ ] Add tests: error case for required contexts; no-provider case for optional contexts
10. [ ] Verify all tests pass

## Testing Context

### Test error handling (required context)

```typescript
test('throws error when rendered outside context', () => {
  expect(() => {
    render(<ComponentRequiringContext />)
  }).toThrow('useComponentContext requires a Component ancestor')
})
```

### Test no-provider rendering (optional context)

```typescript
test('renders without a provider', () => {
  expect(() => {
    render(<ComponentWithOptionalContext />)
  }).not.toThrow()
})
```

### Test Context Values

```typescript
test('provides correct context values', () => {
  const { container } = render(
    <ComponentNameContext.Provider value={{ property: 'test' }}>
      <ChildComponent />
    </ComponentNameContext.Provider>
  )
  expect(container).toHaveTextContent('test')
})
```

## Code Review Checklist

When reviewing context implementations:

- [ ] Namespace uses `ComponentNameContext` pattern
- [ ] Interface exports `Value` from namespace
- [ ] All properties include JSDoc
- [ ] Context uses `| null` union type with `null` initial value
- [ ] Hook intent is clear: required (throws) or optional (nullable)
- [ ] Required context: hook throws a descriptive error; error message specifies hook name and required ancestor; hook returns non-nullable type
- [ ] Optional context: hook returns `ComponentNameContext.Value | null`; consumers handle `null` explicitly
- [ ] File follows directory structure (`context.tsx`)
- [ ] Context exported from `index.ts`
- [ ] Tests cover error case (required) or no-provider case (optional)

## Common Mistakes

### Wrong Namespace Name

```typescript
// ❌ Wrong
export namespace Button {}
export namespace ButtonCtx {}

// ✅ Correct
export namespace ButtonContext {}
```

### Missing Error Handling

For required contexts, returning the raw `useContext` result without a null check is wrong — it silently passes `null` to consumers.

```typescript
// ❌ Wrong: No null check for a required context
export function useDialogContext() {
  return useContext(DialogContext);
}

// ✅ Correct: Throws descriptive error for a required context
export function useDialogContext(): DialogContext.Value {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext requires a Dialog ancestor");
  }
  return context;
}

// ✅ Also correct: Nullable return for an optional context
export function useDrawerContext(): DrawerContext.Value | null {
  return useContext(DrawerContext);
}
```

### Generic Error Messages

```typescript
// ❌ Wrong: Too generic
throw new Error("Context not found");
throw new Error("Invalid context");

// ✅ Correct: Specific to hook and component
throw new Error("useDialogContext requires a Dialog ancestor");
```

### Missing Documentation

```typescript
// ❌ Wrong: No JSDoc
export namespace DialogContext {
  export interface Value {
    titleId: string;
  }
}

// ✅ Correct: Documented properties
export namespace DialogContext {
  export interface Value {
    /** The ID used for accessibility labelling */
    titleId: string;
  }
}
```

## Reference

See `guidelines/context-pattern.md` for:

- Additional examples
- More integration patterns
- Historical context
- Related patterns
