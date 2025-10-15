# Interface Pattern Code Review Checklist

Reference guide for reviewing and writing component code.

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
- [ ] Export namespace matching component name exactly
- [ ] Place Props interface inside namespace
- [ ] Document all props with JSDoc
- [ ] Avoid standalone interface definitions

### For Component Migrations

- [ ] Convert original `ComponentNameProps` to namespace
- [ ] Add deprecated type alias: `export type ComponentNameProps = ComponentName.Props`
- [ ] Update component function signature to use `ComponentName.Props`
- [ ] Verify tests pass after migration

### For Compound Components

- [ ] Use nested namespaces for subcomponents: `Parent.Child.Props`
- [ ] Type static properties properly
- [ ] Apply pattern to each subcomponent

### For Utility Functions

- [ ] Use function name as namespace for input/output types
- [ ] Define types as `utilityFunction.Input` and `utilityFunction.Output`

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

When reviewing code, check these locations:

- `src/core/*/` - All core components
- `src/utils/*/` - All utility components  
- `src/lab/*/` - Lab components (should follow pattern)

Skip these locations:

- `src/deprecated/*/` - Legacy components (don't modify)
- `src/icons/*/` - Generated components
- `src/tokens/*/` - Generated tokens

All new components must follow the namespace interface pattern before merging.
