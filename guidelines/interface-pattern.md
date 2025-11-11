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

- [ ] Pattern uses `ComponentName.Props` (not `ComponentNameProps`)
- [ ] Namespace name matches component name exactly
- [ ] Props interface lives inside namespace
- [ ] All props include JSDoc documentation
- [ ] No standalone interface definitions

### For Component Migrations

- [ ] Original `ComponentNameProps` converted to namespace
- [ ] Added deprecated type alias: `export type ComponentNameProps = ComponentName.Props`
- [ ] Component function signature uses `ComponentName.Props`
- [ ] Tests pass after migration

### For Compound Components

- [ ] Nested namespaces for subcomponents: `Parent.Child.Props`
- [ ] Static properties typed correctly
- [ ] Pattern applied to each subcomponent

### For Utility Functions

- [ ] Function name serves as namespace for input/output types
- [ ] Types defined as `utilityFunction.Input` and `utilityFunction.Output`

**Complete Example:**

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
- Interface name starts with `Base` prefix
- Include a code comment explaining the shared usage
- Two or more unrelated components extend the interface
- All properties include JSDoc documentation

**Example usage:**
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

## 🚫 Common Mistakes to Flag

```typescript
// ❌ Standalone interface
interface ButtonProps { }

// ❌ Wrong namespace name
export namespace ButtonComponent {
  export interface Props { }
}

// ❌ Missing JSDoc
export namespace Button {
  export interface Props {
    variant: string // No documentation
  }
}

// ❌ Props outside namespace
export interface Props { }
export namespace Button { }
```

## 🎯 Quick Fix Examples

**Before (wrong):**
```typescript
interface DialogProps {
  open: boolean
}

export function Dialog({ open }: DialogProps) {
  return <div>{open ? 'Open' : 'Closed'}</div>
}
```

**After (correct):**
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

- `src/deprecated/*/` - Legacy components (do not modify)
- `src/icons/*/` - Generated components
- `src/tokens/*/` - Generated tokens

All new components must follow the namespace interface pattern before merge.