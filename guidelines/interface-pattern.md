# Interface Pattern

> **Note:** When implementing or reviewing this pattern, use the `component-interface-pattern` skill (`.opencode/skills/component-interface-pattern.md`). This guideline serves as comprehensive reference documentation.

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
    formatted: formatter.format(input.amount / 100),
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

## Boolean Prop Naming

Boolean props fall into three categories, each with its own naming rule.

### State and presence booleans

Prefix with `is` or `has`. These describe what a component _is_ or _has_.

| Prefix | Use when                                           | Examples                                          |
| ------ | -------------------------------------------------- | ------------------------------------------------- |
| `is`   | The component is in a particular state             | `isOpen`, `isBusy`, `isDestructive`, `isSelected` |
| `has`  | The component has a particular feature or modifier | `hasBadge`, `hasNoPadding`, `hasError`            |

### Behavioural booleans

Use a bare verb describing what the component _does_. Do not add `is`, `has`, or `should` prefixes.

| Examples       | What they control                                  |
| -------------- | -------------------------------------------------- |
| `keepMounted`  | Whether the component stays in the DOM when hidden |
| `showValidity` | Whether the component displays validation feedback |
| `useLinkStyle` | Whether the component renders with link styling    |

The prefix makes state props immediately recognisable in JSX: `<Button isDestructive>` tells you the button _is_ something. `<Dialog keepMounted>` tells the dialog to _do_ something — the verb makes the intent clear without a prefix.

### Native HTML attributes

Keep the native name unchanged. Do not add a prefix.

| Native attribute | Used by          |
| ---------------- | ---------------- |
| `open`           | Accordion        |
| `disabled`       | Button, inputs   |
| `required`       | Inputs, Select   |
| `checked`        | Checkbox, Switch |
| `multiple`       | Select, Combobox |

Wrapping native attributes (e.g. `isDisabled` instead of `disabled`) breaks the principle of least surprise and prevents simple prop spreading.

### What not to do

```typescript
// ❌ "is" prefix on a behavioural prop — use a bare verb instead
interface Props {
  isKeepMounted?: boolean // ← wrong
  keepMounted?: boolean // ← correct
}

// ❌ "should" prefix — adds indirection
interface Props {
  shouldShow?: boolean // ← wrong
  showValidity?: boolean // ← correct
}

// ❌ Prefixing a native HTML attribute
interface Props {
  isDisabled?: boolean // ← wrong
  disabled?: boolean // ← correct
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
interface ButtonProps {}

// ❌ Wrong namespace name
export namespace ButtonComponent {
  export interface Props {}
}

// ❌ Missing JSDoc for interface properties
export namespace Button {
  export interface Props {
    variant: string
  }
}

// ❌ Props outside namespace
export interface Props {}
export namespace Button {}

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
