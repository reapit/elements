# Interface Pattern

This guide defines the standard pattern for component and utility function type definitions in Reapit Elements.

## ✅ Required Pattern

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

## 🔍 Code Review Checklist

### For New Components

- [ ] Use `ComponentName.Props` (not `ComponentNameProps`)
- [ ] Match namespace name to component name exactly
- [ ] Place Props interface inside namespace
- [ ] Include JSDoc documentation for all props
- [ ] Place all API-related interfaces (props, data types) inside namespaces

### For Component Migrations

- [ ] Convert `ComponentNameProps` to namespace pattern
- [ ] Add deprecated type alias: `export type ComponentNameProps = ComponentName.Props`
- [ ] Update component function signature to use `ComponentName.Props`
- [ ] Verify tests pass after migration

### For Compound Components

- [ ] Give each subcomponent its own namespace with `Props` interface
- [ ] Re-export subcomponent prop interfaces in parent namespace (e.g., `export interface ChildProps extends Child.Props`)
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
  // implementation
}

export namespace Combobox {
  export interface Props {
    /** Combobox children */
    children?: React.ReactNode
  }
  
  export interface SelectButtonProps extends ComboboxSelectButton.Props {}
}

export function Combobox({ children }: Combobox.Props) {
  // implementation
}

Combobox.SelectButton = ComboboxSelectButton
```

**Why this pattern works:**
- Users reference `Combobox.SelectButtonProps` instead of `ComboboxSelectButton.Props`
- Unifies API surface under parent namespace
- Makes compound components more intuitive

### For Utility Functions

- [ ] Use function name as namespace for input/output types
- [ ] Define types as `utilityFunction.Input` and `utilityFunction.Output`

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
    formatted: formatter.format(input.amount / 100)
  }
}
```

## Data Types in Namespaces

Data types that are part of a component or function's API surface should be included in the namespace:

```typescript
// ✅ Correct: Data type in namespace
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
  // Returns array of data objects
}
```

**Benefits:**
- **Consistency**: One rule - all interfaces go in namespaces
- **Discoverability**: Types appear in IDE autocomplete alongside the function/component
- **Clear ownership**: Obvious which component/function owns the type
- **Reduced naming collisions**: Can use simpler names within namespaces

**When to namespace data types:**
- Type is returned by a function
- Type is accepted as a parameter
- Type is used primarily with one component/function
- Type is part of the public API surface

## ⚖️ Exceptions to the Pattern

### Shared Base Interfaces

Multiple unrelated components may extend a single base interface:

```typescript
// ✅ Acceptable: Shared base interface extended by multiple components
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

**Usage:**
```typescript
export namespace ComboboxPopupDrawer {
  export interface Props extends BaseComboboxPopupProps {
    children: ReactNode
  }
}

export namespace ComboboxPopupPopover {
  export interface Props extends BaseComboboxPopupProps {
    children: ReactNode
    maxWidth?: string
  }
}
```

## 🚫 Common Mistakes

```typescript
// ❌ Standalone props interface (should be in namespace)
interface ButtonProps { }

// ❌ Wrong namespace name
export namespace ButtonComponent {
  export interface Props { }
}

// ❌ Missing JSDoc for interface properties
export namespace Button {
  export interface Props {
    variant: string
  }
}

// ❌ Props outside namespace
export interface Props { }
export namespace Button { }

// ❌ Standalone data type that's part of API surface (should be in namespace)
export interface ComboboxSelectedOption {
  label: string
  value: string
}

export function useComboboxSelectedOptions(): readonly ComboboxSelectedOption[] {
  // Should be useComboboxSelectedOptions.Option instead
}
```

## 🎯 Quick Fix Examples

**Before:**
```typescript
interface DialogProps {
  open: boolean
}

export function Dialog({ open }: DialogProps) {
  return <div>{open ? 'Open' : 'Closed'}</div>
}
```

**After:**
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

## 📋 Review Guidelines

Check these locations when reviewing code:

- `src/core/*/` - All core components
- `src/utils/*/` - All utility components  
- `src/lab/*/` - Lab components (must follow pattern)

Skip these locations:

- `src/deprecated/*/` - Legacy components (leave unchanged)
- `src/icons/*/` - Generated components
- `src/tokens/*/` - Generated tokens

All new components must follow the namespace interface pattern before merge.
