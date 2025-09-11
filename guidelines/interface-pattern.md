# Interface Pattern Code Review Checklist

Quick reference for AI agents when reviewing or writing component code.

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

- [ ] Uses `ComponentName.Props` pattern (not `ComponentNameProps`)
- [ ] Namespace exported and matches component name exactly
- [ ] Props interface inside namespace
- [ ] All props have JSDoc documentation
- [ ] No standalone interface definitions

### For Component Migrations

- [ ] Original `ComponentNameProps` converted to namespace
- [ ] Deprecated type alias added: `export type ComponentNameProps = ComponentName.Props`
- [ ] Component function signature updated to use `ComponentName.Props`
- [ ] Tests still pass after migration

### For Compound Components

- [ ] Subcomponents use nested namespaces: `Parent.Child.Props`
- [ ] Static properties properly typed
- [ ] Each subcomponent follows same pattern

### For Utility Functions

- [ ] Input/output types use function name as namespace
- [ ] Example: `utilityFunction.Input` and `utilityFunction.Output`

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
