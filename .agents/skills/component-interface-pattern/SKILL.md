---
name: component-interface-pattern
description: Enforce the namespace interface pattern for components and utilities. Use when creating new components, migrating existing components, or reviewing component type definitions.
---

# Component Interface Pattern

## When to Use This Skill

Invoke this skill when:

- Creating a new React component
- Creating a new utility function with input/output types
- Migrating a component to use the namespace pattern
- Reviewing PRs that add or modify component interfaces
- Reviewing PRs with compound components (e.g., `Table.Row`, `Menu.Item`)

## Required Pattern

All components and utilities **MUST** follow the namespace interface pattern:

```typescript
export function ComponentName({ prop }: ComponentName.Props) {
  // implementation
}

export namespace ComponentName {
  export interface Props {
    /** JSDoc for each prop */
    prop: string
  }
}
```

## Process

### For New Components

**Checklist:**

- [ ] Create namespace matching component name exactly
- [ ] Define `Props` interface inside namespace
- [ ] Add JSDoc documentation for all props (including optional ones)
- [ ] Use `ComponentName.Props` in function signature
- [ ] Place all API-related interfaces (props, data types) inside namespace
- [ ] Verify namespace is exported
- [ ] Follow [boolean prop naming conventions](../../../guidelines/interface-pattern.md#boolean-prop-naming) for boolean props

**Example:**

```typescript
export namespace Button {
  export interface Props {
    /** The button variant style */
    variant: 'primary' | 'secondary'
    /** Whether the button is disabled */
    disabled?: boolean
  }
}

export function Button({ variant, disabled }: Button.Props) {
  return <button data-variant={variant} disabled={disabled}>Click</button>
}
```

### For Migrating Existing Components

**Checklist:**

- [ ] Identify standalone interface (e.g., `ComponentNameProps`)
- [ ] Create namespace with exact component name
- [ ] Move interface into namespace as `Props`
- [ ] Add deprecated type alias: `export type ComponentNameProps = ComponentName.Props`
- [ ] Update component function signature to use `ComponentName.Props`
- [ ] Run tests to verify no breakage
- [ ] Check for any imports of the old interface name

**Example Migration:**

Before:

```typescript
interface DialogProps {
  open: boolean
}

export function Dialog({ open }: DialogProps) {
  return <div>{open ? 'Open' : 'Closed'}</div>
}
```

After:

```typescript
export namespace Dialog {
  export interface Props {
    /** Whether the dialog is open */
    open: boolean
  }
}

/**
 * @deprecated Use `Dialog.Props` instead.
 */
export type DialogProps = Dialog.Props

export function Dialog({ open }: Dialog.Props) {
  return <div>{open ? 'Open' : 'Closed'}</div>
}
```

### For Compound Components

Compound components (e.g., `Table.Row`, `Menu.Item`) require special handling:

**Checklist:**

- [ ] Give each subcomponent its own namespace with `Props` interface
- [ ] Re-export subcomponent props in parent namespace (e.g., `ChildProps`)
- [ ] Type static properties correctly
- [ ] Apply pattern to all subcomponents

**Example:**

```typescript
export namespace ComboboxSelectButton {
  export interface Props {
    /** Placeholder text */
    placeholder?: string
  }
}

export function ComboboxSelectButton({ placeholder }: ComboboxSelectButton.Props) {
  return <button>{placeholder}</button>
}

export namespace Combobox {
  export interface Props {
    /** Combobox children */
    children?: React.ReactNode
  }

  // Re-export for easier access
  export interface SelectButtonProps extends ComboboxSelectButton.Props {}
}

export function Combobox({ children }: Combobox.Props) {
  return <div>{children}</div>
}

// Attach subcomponent
Combobox.SelectButton = ComboboxSelectButton
```

**Why this pattern works:**

- Users reference `Combobox.SelectButtonProps` instead of `ComboboxSelectButton.Props`
- Unifies API surface under parent namespace
- Makes compound components more intuitive

### For Utility Functions

Utility functions follow a similar pattern using `Input` and `Output` interfaces:

**Checklist:**

- [ ] Create namespace matching function name exactly
- [ ] Define `Input` interface for parameters
- [ ] Define `Output` interface for return values
- [ ] Document all interface properties
- [ ] Use namespace types in function signature

**Example:**

```typescript
export namespace formatCurrency {
  export interface Input {
    /** Amount in cents */
    amount: number
    /** ISO 4217 currency code */
    currency: string
  }

  export interface Output {
    /** Formatted currency string */
    formatted: string
  }
}

export function formatCurrency(input: formatCurrency.Input): formatCurrency.Output {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: input.currency,
  })

  return {
    formatted: formatter.format(input.amount / 100),
  }
}
```

### For Data Types in Namespaces

Data types that are part of a component or function's API surface should be included in the namespace:

**Checklist:**

- [ ] Place return types in the namespace
- [ ] Place parameter types in the namespace
- [ ] Place types used primarily with one component/function in the namespace
- [ ] Document all properties with JSDoc

**Example:**

```typescript
export namespace useComboboxSelectedOptions {
  /** Represents a selected option with its label and value. */
  export interface Option {
    /** The option's label text */
    label: string
    /** The option's value */
    value: string
  }
}

export function useComboboxSelectedOptions(
  listboxId: string,
  defaultOptions: readonly useComboboxSelectedOptions.Option[] = [],
): readonly useComboboxSelectedOptions.Option[] {
  // Implementation
}
```

## Common Mistakes to Catch

### ❌ Wrong Naming

```typescript
// Wrong suffix
export namespace ButtonComponent {}

// Missing 'Context' suffix
export namespace ButtonCtx {}

// Extra suffixes
export namespace ButtonContextState {}
```

### ❌ Missing Documentation

```typescript
export namespace Dialog {
  export interface Props {
    open: boolean // Missing JSDoc
  }
}
```

### ❌ Props Outside Namespace

```typescript
// Wrong
export interface Props {}
export namespace Button {}

// Correct
export namespace Button {
  export interface Props {}
}
```

### ❌ Standalone Data Types

```typescript
// Wrong - data type not in namespace
export interface ComboboxSelectedOption {
  label: string
  value: string
}

export function useComboboxSelectedOptions(): readonly ComboboxSelectedOption[] {
  // ...
}

// Correct - data type in namespace
export namespace useComboboxSelectedOptions {
  export interface Option {
    label: string
    value: string
  }
}

export function useComboboxSelectedOptions(): readonly useComboboxSelectedOptions.Option[] {
  // ...
}
```

### ❌ Wrong Boolean Prop Naming

Three categories, each with its own naming rule:

- **State/presence** (`is`/`has` prefix) — what a component _is_ or _has_: `isOpen`, `isBusy`, `hasBadge`
- **Behavioural** (bare verb) — what a component _does_: `keepMounted`, `showValidity`, `useLinkStyle`
- **Native HTML attributes** — keep unchanged: `disabled`, `open`, `required`

```typescript
// Wrong: "is" prefix on a behavioural prop
export namespace Dialog {
  export interface Props {
    isKeepMounted?: boolean
  }
}

// Correct: bare verb for behavioural booleans
export namespace Dialog {
  export interface Props {
    /** Whether to keep the dialog mounted when closed */
    keepMounted?: boolean
  }
}

// Wrong: wrapping a native HTML attribute
export namespace Button {
  export interface Props {
    isDisabled?: boolean
  }
}

// Correct: native attribute name unchanged
export namespace Button {
  export interface Props {
    /** Whether the button is disabled */
    disabled?: boolean
  }
}
```

See [`guidelines/interface-pattern.md#boolean-prop-naming`](../../../guidelines/interface-pattern.md#boolean-prop-naming) for the full convention.

## Exceptions

### Shared Base Interfaces

Multiple unrelated components may extend a single base interface:

```typescript
// Acceptable: Shared base interface
/** Base props for combobox popup components. */
export interface BaseComboboxPopupProps extends HTMLAttributes<HTMLElement> {
  /** ID of the element that labels the popup. */
  'aria-labelledby': string
  /** ID of the popup element. */
  id: string
}
```

**Requirements for this exception:**

- Start interface name with `Base` prefix
- Explain shared usage in code comment
- Extend interface in two or more unrelated components
- Include JSDoc documentation for all properties

## Review Checklist

When reviewing code with this skill:

**For all components:**

- [ ] Namespace name matches component name exactly
- [ ] `Props` interface is inside namespace
- [ ] All props have JSDoc documentation
- [ ] Function signature uses `ComponentName.Props`
- [ ] No standalone interfaces that should be in namespace

**For migrations:**

- [ ] Deprecated type alias added for backwards compatibility
- [ ] Tests still pass after migration

**For compound components:**

- [ ] Each subcomponent has its own namespace
- [ ] Parent namespace re-exports child props as `ChildNameProps`
- [ ] Static properties are correctly typed

**For utilities:**

- [ ] Uses `Input` and `Output` interfaces (not `Props`)
- [ ] All interfaces documented

## Directories to Check

**Apply this pattern in:**

- `src/core/` - All core components
- `src/utils/` - All utility components
- `src/lab/` - Lab components (must follow pattern)

**Skip:**

- `src/deprecated/` - Legacy components (leave unchanged)
- `src/icons/` - Generated components
- `src/tokens/` - Generated tokens

## Reference

See `guidelines/interface-pattern.md` for:

- Additional examples
- Complete edge case coverage
- Historical context
- More common mistakes
