---
description: Migrates deprecated Input and InputGroup components to modern TextControl, DateTimeControl, TextareaControl, Checkbox, and RadioGroupControl components
---

# Migrate Deprecated Input Components

This guide covers migrating from the deprecated `Input`, `InputGroup`, `InputAddOn`, `InputError`, and `ElInputGroupLabel` components to their modern replacements in Reapit Elements v5. Unlike other entries in the `codemods/` directory, this migration has no automated AST transform. The variety of usage patterns and the structural differences between the old and new APIs make agent-assisted migration more reliable than a mechanical codemod.

## How to use this guide

### With an AI coding agent

Give this file to your agent as context — paste it into the chat, attach it as a file, or point the agent at this path. Specify the scope of the migration (which files or directories to process) and whether the project uses a facade package (see below). The migration rules, decision tree, and before/after examples are written for the agent to follow directly.

A suggested prompt:

> Using the migration guide I have shared, migrate all deprecated `Input` and `InputGroup` usage in `src/` to the modern Reapit Elements v5 components. Follow the decision tree to choose the correct target component for each case. Preserve existing behaviour and props as closely as possible, and leave a `// TODO:` comment for any case that cannot be handled with confidence.

Review every change the agent produces before accepting it, and run your tests after each batch of changes.

### As a manual reference

This guide can also be followed manually. The migration rules, prop mapping tables, and before/after examples apply regardless of whether a human or an agent performs the migration.

### Facade package support

Many projects consume Reapit Elements through an internal facade package — a workspace or package in their monorepo that re-exports some or all Elements components under a different name (e.g. `@company/ui`, `@company/design-system/elements`).

When a facade package is present, the rule is: **rename identifiers, but preserve import paths pointing to the facade package**.

```tsx
// Before (imports from facade package)
import { InputGroup } from '@company/ui'

// After — identifier renamed, import path unchanged
import { TextControl } from '@company/ui'
```

The import path `'@company/ui'` stays the same because the facade package controls which identifiers it re-exports. Do not rewrite facade import paths to `@reapit/elements/core/text-control` or any other Elements subpath.

**Critical**: The facade package itself must also be updated to re-export the new component names from Elements. That is a separate task from migrating consumer code. Update the facade (or add the new exports alongside existing ones) before or immediately after migrating consumer code so that imports resolve correctly.

**Subpath matching**: A facade package name matches all its subpaths. If the facade is `@company/ui`, it also matches `@company/ui/elements`, `@company/ui/core`, and so on. Treat all subpaths of the facade as facade imports.

If the project has multiple facade packages, perform the migration once per facade package.

## Background

**Target audience**: Projects importing `Input`, `InputGroup`, `InputAddOn`, or `InputError` from `@reapit/elements` (or a facade package) that are ready to migrate to the v5 component architecture. This guide covers the full family of deprecated input components and all common usage patterns.

**Version context**: The deprecated input components are marked `@deprecated` and are scheduled for removal in a future major version. The modern replacements — `TextControl`, `DateTimeControl`, `TextareaControl`, `CheckboxControl`, `RadioGroupControl`, and their constituent parts — were introduced in v5 and are the supported path forward.

**Architecture shift**: The deprecated `Input` was a thin styled wrapper around a native `<input>` element. The deprecated `InputGroup` was a monolithic form control that combined the input, label, error message, icon, and add-on text into a single component via props. The modern architecture separates these concerns across three tiers:

- **Raw inputs** (`TextInput`, `DateTimeInput`, `Textarea`, `CheckboxInput`, `RadioInput`) — styled native inputs, no labels or error text.
- **Labelled compounds** (`Checkbox`, `RadioButton`) — input plus label, for selection controls.
- **Controls** (`TextControl`, `DateTimeControl`, `TextareaControl`, `CheckboxControl`, `RadioGroupControl`) — full form field compositions that include the label, help text, and error text, with accessibility wiring (ARIA attributes, ID linking) built in.

For most `InputGroup` usages, the correct migration target is a **Control** — the direct architectural successor.

## Migration Decision Tree

### Step 1 — Identify deprecated usage

Search for imports of the following from `@reapit/elements`, any subpath, or the project's facade package:

- `Input`, `InputProps`, `InputWrapped`, `ElInput`, `elHasInputError`
- `InputGroup`, `InputGroupProps`, `InputGroupWrapped`, `ElInputGroup`, `ElInputGroupLabel`
- `InputAddOn`, `InputAddOnProps`, `ElInputAddOn`
- `InputError`, `InputErrorInterface`, `ElInputError`

These may be imported from the root barrel (`@reapit/elements`), from deprecated subpaths (`@reapit/elements/deprecated/input`, `@reapit/elements/deprecated/input-group`, etc.), or from a facade package.

### Step 2 — Classify each `<InputGroup>` usage

For each `<InputGroup>` in the codebase, determine which mode it uses:

- **Shorthand mode**: No `children` prop. All configuration is passed as props (`label`, `type`, `errorMessage`, `icon`, `inputAddOnText`, etc.). The component renders the `<Input>`, label, icon, add-on, and error message internally.
- **Composition mode**: Has `children`. The consumer renders `<Input>`, `<ElInputGroupLabel>`, `<InputAddOn>`, and `<InputError>` as explicit children inside `<InputGroup>`.

The two modes have different migration strategies.

### Step 3 — Apply the appropriate rule

---

## Migration Rules

### Rule 1: `<InputGroup>` in shorthand mode — text inputs

**When**: `<InputGroup>` has no `children`, and `type` is `text`, `email`, `password`, `tel`, `url`, or `search`, or `type` is absent (defaults to `text`).

**Target**: `<TextControl>`

**Prop mapping**:

| `InputGroup` prop               | `TextControl` prop | Notes                                                                                                                                                                                                                                                             |
| ------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`                         | `label`            | Direct mapping. `TextControl` accepts `ReactNode`; string values work unchanged.                                                                                                                                                                                  |
| `errorMessage`                  | `errorText`        | Rename only. Providing `errorText` automatically sets `aria-invalid` and `showValidity`.                                                                                                                                                                          |
| `hasError`                      | _(remove)_         | Error styling is driven by `errorText` presence. If `hasError` was set without an `errorMessage`, add a descriptive `errorText` value.                                                                                                                            |
| `icon`                          | `leadingIcon`      | The deprecated `icon` was positioned to the left. Use `leadingIcon` as the default; use `trailingIcon` if the icon was intentionally trailing (check the visual design).                                                                                          |
| `inputAddOnText`                | `suffix`           | The deprecated add-on was appended to the right. Map to `suffix`. The value changes from a string to a `ReactNode` — strings are valid `ReactNode` and pass through unchanged.                                                                                    |
| `intent`                        | _(remove)_         | No equivalent. The `intent` prop coloured the icon and add-on; this is no longer supported. Error state is driven by `errorText`. If `intent` was used for decorative colouring, implement the styling manually using CSS.                                        |
| `id`                            | `id`               | Preserve an existing `id` so that label and ARIA wiring remains stable. If no `id` was set, omit it and `TextControl` will auto-generate one via `useId()`.                                                                                                       |
| `className`                     | `className`        | Passed through to the `FormControl` wrapper `<div>`.                                                                                                                                                                                                              |
| `type`                          | `type`             | Passed through. Valid values for `TextControl`: `text`, `email`, `password`, `search`, `tel`, `url`.                                                                                                                                                              |
| All other HTML input attributes | (pass through)     | `TextControl` extends `TextInput.Props`, which extends `InputHTMLAttributes`. Standard attributes (`name`, `value`, `defaultValue`, `onChange`, `onBlur`, `placeholder`, `disabled`, `required`, `readOnly`, `autoComplete`, `ref`, etc.) pass through unchanged. |

**Import change (direct Elements import)**:

```tsx
// Before
import { InputGroup } from '@reapit/elements/deprecated/input-group'
// or
import { InputGroup } from '@reapit/elements'

// After
import { TextControl } from '@reapit/elements/core/text-control'
```

**Import change (facade package)** — identifier renamed, path unchanged:

```tsx
// Before
import { InputGroup } from '@company/ui'

// After
import { TextControl } from '@company/ui'
```

---

### Rule 2: `<InputGroup>` in shorthand mode — date and time inputs

**When**: `<InputGroup>` has no `children`, and `type` is `date`, `time`, or `datetime-local`.

**Target**: `<DateTimeControl>`

Apply the same prop mapping as Rule 1. Pass the `type` prop through (`date`, `time`, or `datetime-local`).

`DateTimeControl` renders a native date/time input with a picker button (calendar icon for `date`/`datetime-local`, clock icon for `time`). It does not accept `icon`, `leadingIcon`, or `trailingIcon` — remove those props. The picker button replaces any icon that was used alongside a date input in the deprecated code.

**Import change (direct Elements import)**:

```tsx
// Before
import { InputGroup } from '@reapit/elements/deprecated/input-group'

// After
import { DateTimeControl } from '@reapit/elements/core/date-time-control'
```

---

### Rule 3: `<InputGroup>` in shorthand mode — checkboxes

**When**: `<InputGroup>` has no `children` and `type="checkbox"`.

**Target**: `<CheckboxControl>` for a single checkbox; `<CheckboxGroupControl>` with `<CheckboxGroupControl.Option>` children for a group of related checkboxes.

**Single checkbox — prop mapping**:

| `InputGroup` prop | `CheckboxControl` prop | Notes                                                                                                                                                   |
| ----------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`           | `label`                | **Required** on `CheckboxControl`. If `label` was absent on the deprecated usage, add a descriptive label — a visually hidden label may be appropriate. |
| `errorMessage`    | `errorText`            | Rename only.                                                                                                                                            |
| `hasError`        | _(remove)_             | Driven by `errorText` presence.                                                                                                                         |
| `name`            | `name`                 | Pass through.                                                                                                                                           |
| `value`           | `value`                | Pass through.                                                                                                                                           |
| `checked`         | `checked`              | Pass through (controlled usage).                                                                                                                        |
| `defaultChecked`  | `defaultChecked`       | Pass through (uncontrolled usage).                                                                                                                      |
| `disabled`        | `disabled`             | Pass through.                                                                                                                                           |
| `onChange`        | `onChange`             | Pass through. Note: `onChange` receives a `React.ChangeEvent<HTMLInputElement>`, same as before.                                                        |
| `icon`            | _(remove)_             | No equivalent for checkboxes. Icons are not part of the `CheckboxControl` API.                                                                          |
| `inputAddOnText`  | `supplementaryInfo`    | Contextual description text shown beneath the label. Accepts `ReactNode`.                                                                               |
| `intent`          | _(remove)_             | No equivalent.                                                                                                                                          |
| `className`       | `className`            | Passed through to the `FormControl` wrapper.                                                                                                            |

**Import change (direct Elements import)**:

````tsx
// Before
import { InputGroup } from '@reapit/elements/deprecated/input-group'

// After
import { CheckboxControl } from '@reapit/elements/core/checkbox-control': If multiple `<InputGroup type="checkbox">` elements share a `name` and represent a logical group, migrate to `<CheckboxGroupControl>`:

```tsx
// Before
<InputGroup type="checkbox" name="interests" value="sport" label="Sport" />
<InputGroup type="checkbox" name="interests" value="music" label="Music" />
<InputGroup type="checkbox" name="interests" value="travel" label="Travel" />

// After
import { CheckboxGroupControl } from '@reapit/elements/core/checkbox-group-control'

<CheckboxGroupControl label="Interests" name="interests">
  <CheckboxGroupControl.Option value="sport" label="Sport" />
  <CheckboxGroupControl.Option value="music" label="Music" />
  <CheckboxGroupControl.Option value="travel" label="Travel" />
</CheckboxGroupControl>
````

---

### Rule 4: `<InputGroup>` in shorthand mode — radio buttons

**When**: `<InputGroup>` has no `children` and `type="radio"`.

**Target**: `<RadioGroupControl>` with `<RadioGroupControl.Option>` children. Radio buttons are not semantically meaningful in isolation — always migrate to the group component, even for a single option.

**Prop mapping** — set these on `<RadioGroupControl>`:

| `InputGroup` prop (shared across options) | `RadioGroupControl` prop | Notes                                    |
| ----------------------------------------- | ------------------------ | ---------------------------------------- |
| `name`                                    | `name`                   | Set once on the group.                   |
| `disabled`                                | `disabled`               | Set on the group to disable all options. |
| `errorMessage`                            | `errorText`              | Set on the group.                        |

**Prop mapping** — set these on each `<RadioGroupControl.Option>`:

| `InputGroup` prop (per option) | `RadioGroupControl.Option` prop | Notes                                                                  |
| ------------------------------ | ------------------------------- | ---------------------------------------------------------------------- |
| `label`                        | `label`                         | **Required** on each option.                                           |
| `value`                        | `value`                         | Pass through.                                                          |
| `checked`                      | `checked`                       | Pass through (controlled usage).                                       |
| `defaultChecked`               | `defaultChecked`                | Pass through (uncontrolled usage).                                     |
| `disabled`                     | `disabled`                      | Per-option override. Takes precedence over the group-level `disabled`. |
| `onChange`                     | `onChange`                      | Per-option event handler.                                              |
| `inputAddOnText`               | `supplementaryInfo`             | Contextual description shown beneath the label.                        |

**Import change (direct Elements import)**:

```tsx
// Before
import { InputGroup } from '@reapit/elements/deprecated/input-group'

// After
import { RadioGroupControl } from '@reapit/elements/core/radio-group-control'
```

---

### Rule 5: `<InputGroup>` in shorthand mode — other input types

**When**: `<InputGroup>` has no `children` and `type` is `number` or `file`.

**Target**: native `<input>` + `<FormControl>` assembled manually. No dedicated Control component exists for these types, and `TextInput`'s `type` prop does not include `number` or `file`. Produce a `<FormControl>` wrapping a native `<input>`, with `<FormControl.Label>` and `<FormControl.ErrorText>` as appropriate. Leave a `// TODO:` comment noting that no direct Control equivalent exists and that styling may need to be applied manually.

```tsx
// TODO: No dedicated Control exists for type="number". Review this migration manually and apply styling as needed.
import { FormControl } from '@reapit/elements/core/form-control'
;<FormControl>
  <FormControl.Label htmlFor="qty">Quantity</FormControl.Label>
  <input id="qty" type="number" min={0} max={100} />
</FormControl>
```

---

### Rule 6: `<InputGroup>` in composition mode

**When**: `<InputGroup>` has `children` (explicit children rather than shorthand props).

The composition-mode `<InputGroup>` was used as a layout wrapper. Migrate based on what children it contains:

**Replace the `<InputGroup>` wrapper**:

- Wrapping a text or date input → `<FormControl>`
- Wrapping a `<Textarea>` that needs a full form-field treatment → `<TextareaControl>` (collapse children back to props — see Rule 7)
- Wrapping a `<DeprecatedSelect>` or `<MultiSelectInput>` → leave a `// TODO:` comment; those have separate migration paths

**Replace each child element**:

| Child element         | Replacement                                                                                                             | Notes                                                                                                                                                                                                                    |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<Input>`             | Apply the standalone `<Input>` rules (Rule 8) to determine the target. The resulting input sits inside `<FormControl>`. |                                                                                                                                                                                                                          |
| `<ElInputGroupLabel>` | `<FormControl.Label htmlFor="...">`                                                                                     | Set `htmlFor` to the `id` of the migrated input element.                                                                                                                                                                 |
| `<InputAddOn>`        | `suffix` or `prefix` prop on `<TextInput>`                                                                              | Move the add-on text from a sibling element to a prop on the input.                                                                                                                                                      |
| `<InputError>`        | `<FormControl.ErrorText id="...">`                                                                                      | Place inside `<FormControl>`. Ensure the input has `aria-errormessage` pointing to this element's `id`. For simple cases, switch to `<TextControl>` and pass `errorText` instead — it handles ARIA wiring automatically. |
| `<Textarea>`          | `<Textarea>` (unchanged component)                                                                                      | The `Textarea` from `@reapit/elements/core/textarea` requires a `fieldSizing` prop (`'content'` or `'fixed'`). Add `fieldSizing="content"` if absent.                                                                    |
| `<DeprecatedSelect>`  | _(leave `// TODO:` comment)_                                                                                            | Out of scope for this migration.                                                                                                                                                                                         |
| `<MultiSelectInput>`  | _(leave `// TODO:` comment)_                                                                                            | Out of scope for this migration.                                                                                                                                                                                         |

**Import change (direct Elements import)**:

```tsx
// Before
import { InputGroup, ElInputGroupLabel, InputAddOn, InputError } from '@reapit/elements/deprecated/input-group'

// After
import { FormControl } from '@reapit/elements/core/form-control'
import { TextInput } from '@reapit/elements/core/text-input'
```

---

### Rule 7: `<InputGroup>` wrapping a `<Textarea>`

**When**: `<InputGroup>` (in composition mode) contains a `<Textarea>` child.

**Target**: `<TextareaControl>` — collapse the composition back to a single component with props.

| Composition child / `InputGroup` prop              | `TextareaControl` prop | Notes                                                                            |
| -------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------- |
| `<ElInputGroupLabel>` content                      | `label`                | Extract the label text and pass as the `label` prop.                             |
| `<InputError message="...">` / `errorMessage` prop | `errorText`            | Rename only.                                                                     |
| `<Textarea fieldSizing="...">` attrs               | Pass through           | `fieldSizing` is required. Carry over `fieldSizing`, `placeholder`, `rows`, etc. |

**Import change (direct Elements import)**:

```tsx
// Before
import { InputGroup, ElInputGroupLabel } from '@reapit/elements/deprecated/input-group'
import { Textarea } from '@reapit/elements/core/textarea'

// After
import { TextareaControl } from '@reapit/elements/core/textarea-control'
```

---

### Rule 8: Standalone `<Input>` (without `<InputGroup>`)

**When**: A bare `<Input>` is used outside of any `<InputGroup>`.

Choose the target based on `type`:

| `type` value                                                    | Target component | Import path                             | Notes                                                                                                                                                              |
| --------------------------------------------------------------- | ---------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `text`, `email`, `password`, `tel`, `url`, `search` (or absent) | `TextInput`      | `@reapit/elements/core/text-input`      | `hasError` → `showValidity={true}` + `aria-invalid="true"`.                                                                                                        |
| `date`, `time`, `datetime-local`                                | `DateTimeInput`  | `@reapit/elements/core/date-time-input` | `hasError` → `showValidity={true}` + `aria-invalid="true"`.                                                                                                        |
| `checkbox`                                                      | `CheckboxInput`  | `@reapit/elements/core/checkbox-input`  | If the bare checkbox has a sibling `<label>` and supplementary text, use `Checkbox` instead.                                                                       |
| `radio`                                                         | `RadioInput`     | `@reapit/elements/core/radio-input`     | If the bare radio has a sibling `<label>`, use `RadioButton` instead.                                                                                              |
| `number`, `file`                                                | native `<input>` | N/A                                     | `TextInput`'s `type` prop does not include these values. Use a native `<input>` wrapped in `<FormControl>` and apply styling manually. Leave a `// TODO:` comment. |

**`hasError` → validity props** (applies to all input types):

The deprecated `hasError` prop applied error styling directly. The modern components use an opt-in validity system:

```tsx
// Before
<Input type="text" hasError />

// After
<TextInput type="text" showValidity aria-invalid="true" />
```

If `hasError` was driven by a variable (e.g. `hasError={!!errors.email}`), carry the expression through:

```tsx
// Before
<Input type="text" hasError={!!errors.email} />

// After
<TextInput type="text" showValidity={!!errors.email} aria-invalid={!!errors.email || undefined} />
```

---

### Rule 9: Type references and styled components

**Type references** — rename as follows:

| Old type              | New type            | Import path                          |
| --------------------- | ------------------- | ------------------------------------ |
| `InputProps`          | `TextInput.Props`   | `@reapit/elements/core/text-input`   |
| `InputGroupProps`     | `TextControl.Props` | `@reapit/elements/core/text-control` |
| `InputGroupWrapped`   | _(remove)_          | Not part of the public API in v5.    |
| `InputWrapped`        | _(remove)_          | Not part of the public API in v5.    |
| `InputErrorInterface` | _(remove)_          | Not part of the public API in v5.    |
| `InputAddOnProps`     | _(remove)_          | Not part of the public API in v5.    |

**Styled components used directly** (`ElInput`, `ElInputGroup`, `ElInputGroupLabel`, `ElInputAddOn`, `ElInputError`) — these are internal implementation details with no equivalent exports in the modern components. If a consumer imports them directly, this requires manual migration to the relevant Control component. Leave a `// TODO:` comment and rebuild the customisation using the modern component API.

**`styled(Input)` or `styled(InputGroup)` in Linaria** — if a consumer has extended a deprecated component via `styled()`, this requires manual migration. The styled extension relies on internal CSS class structure that has changed. Leave a `// TODO:` comment and rebuild the customisation against the modern component.

---

## Before and After Examples

### Example 1: Simple text input

**Before:**

```tsx
import { InputGroup } from '@reapit/elements'

export const AddressField = () => (
  <InputGroup label="Property address" name="address" placeholder="Start typing an address..." />
)
```

**After:**

```tsx
import { TextControl } from '@reapit/elements/core/text-control'

export const AddressField = () => (
  <TextControl label="Property address" name="address" placeholder="Start typing an address..." />
)
```

---

### Example 2: Text input with error, icon, and add-on

**Before:**

```tsx
import { InputGroup } from '@reapit/elements'

export const EmailField = ({ error }: { error?: string }) => (
  <InputGroup
    type="email"
    label="Email address"
    name="email"
    placeholder="name@example.com"
    icon={<EmailIcon size="sm" />}
    inputAddOnText="Required"
    errorMessage={error}
    hasError={!!error}
    intent="danger"
  />
)
```

**After:**

```tsx
import { TextControl } from '@reapit/elements/core/text-control'

export const EmailField = ({ error }: { error?: string }) => (
  <TextControl
    type="email"
    label="Email address"
    name="email"
    placeholder="name@example.com"
    leadingIcon={<EmailIcon size="sm" />}
    suffix="Required"
    errorText={error}
  />
)
```

## Note: `hasError` and `intent` are removed — `errorText` drives error state automatically.

### Example 3: Date input

**Before:**

```tsx
import { InputGroup } from '@reapit/elements'

export const DobField = () => (
  <InputGroup type="date" label="Date of birth" name="dob" icon={<CalendarIcon size="sm" />} />
)
```

**After:**

```tsx
import { DateTimeControl } from '@reapit/elements/core/date-time-control'

export const DobField = () => <DateTimeControl type="date" label="Date of birth" name="dob" />
```

Note: `icon` is removed — `DateTimeControl` provides its own picker button.

---

### Example 4: Controlled text input

**Before:**

```tsx
import { InputGroup } from '@reapit/elements'

export const SearchField = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <InputGroup type="text" label="Search" value={value} onChange={(e) => onChange(e.target.value)} />
)
```

**After:**

```tsx
import { TextControl } from '@reapit/elements/core/text-control'

export const SearchField = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <TextControl type="text" label="Search" value={value} onChange={(e) => onChange(e.target.value)} />
)
```

---

### Example 5: Checkbox

**Before:**

```tsx
import { InputGroup } from '@reapit/elements'

export const AgreeField = () => (
  <InputGroup
    type="checkbox"
    name="agree"
    value="yes"
    label="I agree to the terms and conditions"
    inputAddOnText="Required to proceed"
  />
)
```

**After:**

```tsx
import { CheckboxControl } from '@reapit/elements/core/checkbox-control'

export const AgreeField = () => (
  <CheckboxControl
    name="agree"
    value="yes"
    label="I agree to the terms and conditions"
    supplementaryInfo="Required to proceed"
  />
)
```

---

### Example 6: Group of radio buttons

**Before:**

```tsx
import { InputGroup } from '@reapit/elements'

export const StatusField = () => (
  <>
    <InputGroup type="radio" name="status" value="active" label="Active" defaultChecked />
    <InputGroup type="radio" name="status" value="inactive" label="Inactive" />
    <InputGroup type="radio" name="status" value="archived" label="Archived" />
  </>
)
```

**After:**

```tsx
import { RadioGroupControl } from '@reapit/elements/core/radio-group-control'

export const StatusField = () => (
  <RadioGroupControl label="Status" name="status">
    <RadioGroupControl.Option value="active" label="Active" defaultChecked />
    <RadioGroupControl.Option value="inactive" label="Inactive" />
    <RadioGroupControl.Option value="archived" label="Archived" />
  </RadioGroupControl>
)
```

Note: `RadioGroupControl` requires a group label. Choose a descriptive label (here `"Status"`). If the deprecated code had no group label, add one — an unlabelled radio group is inaccessible.

---

### Example 7: Composition mode — input with label and add-on

**Before:**

```tsx
import { InputGroup, ElInputGroupLabel, InputAddOn } from '@reapit/elements'
import { Input } from '@reapit/elements'

export const UsernameField = () => (
  <InputGroup>
    <Input id="username" type="text" />
    <UserIcon size="sm" />
    <ElInputGroupLabel htmlFor="username">Username</ElInputGroupLabel>
    <InputAddOn>Required</InputAddOn>
  </InputGroup>
)
```

**After:**

```tsx
import { TextControl } from '@reapit/elements/core/text-control'

export const UsernameField = () => (
  <TextControl id="username" type="text" label="Username" leadingIcon={<UserIcon size="sm" />} suffix="Required" />
)
```

Composition mode collapses back to the shorthand Control API when children map cleanly to Control props.

---

### Example 8: Composition mode — textarea with label

**Before:**

```tsx
import { InputGroup, ElInputGroupLabel } from '@reapit/elements'
import { Textarea } from '@reapit/elements/core/textarea'

export const NotesField = () => (
  <InputGroup>
    <ElInputGroupLabel>Notes</ElInputGroupLabel>
    <Textarea fieldSizing="content" placeholder="Add notes here..." />
  </InputGroup>
)
```

**After:**

```tsx
import { TextareaControl } from '@reapit/elements/core/textarea-control'

export const NotesField = () => <TextareaControl fieldSizing="content" label="Notes" placeholder="Add notes here..." />
```

---

### Example 9: Standalone `<Input>` — bare text input

**Before:**

```tsx
import { Input } from '@reapit/elements'

export const InlineSearch = () => <Input type="search" placeholder="Search..." hasError={false} />
```

**After:**

```tsx
import { TextInput } from '@reapit/elements/core/text-input'

export const InlineSearch = () => <TextInput type="search" placeholder="Search..." />
```

`hasError={false}` is removed — `showValidity` defaults to `false`, so no error styling appears.

---

### Example 10: Standalone `<Input>` — checkbox in a table

**Before:**

```tsx
import { Input } from '@reapit/elements'

export const SelectionCell = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <td>
    <Input type="checkbox" checked={checked} onChange={onChange} aria-label="Select row" />
  </td>
)
```

**After:**

```tsx
import { CheckboxInput } from '@reapit/elements/core/checkbox-input'

export const SelectionCell = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <td>
    <CheckboxInput checked={checked} onChange={onChange} aria-label="Select row" />
  </td>
)
```

---

### Example 11: Facade package — identifiers renamed, paths unchanged

**Before:**

```tsx
import { InputGroup, InputError } from '@company/ui'

export const PostcodeField = ({ error }: { error?: string }) => (
  <InputGroup label="Postcode" name="postcode" errorMessage={error} />
)
```

**After:**

```tsx
import { TextControl } from '@company/ui'

export const PostcodeField = ({ error }: { error?: string }) => (
  <TextControl label="Postcode" name="postcode" errorText={error} />
)
```

The import path `'@company/ui'` is unchanged. Only the identifier changes (`InputGroup` → `TextControl`).

---

## Import Reference

### Modern component import paths (direct `@reapit/elements` usage)

| Component               | Import path                                    |
| ----------------------- | ---------------------------------------------- |
| `TextControl`           | `@reapit/elements/core/text-control`           |
| `TextInput`             | `@reapit/elements/core/text-input`             |
| `TextareaControl`       | `@reapit/elements/core/textarea-control`       |
| `Textarea`              | `@reapit/elements/core/textarea`               |
| `DateTimeControl`       | `@reapit/elements/core/date-time-control`      |
| `DateTimeInput`         | `@reapit/elements/core/date-time-input`        |
| `FormControl`           | `@reapit/elements/core/form-control`           |
| `FormControl.Label`     | `@reapit/elements/core/form-control`           |
| `FormControl.ErrorText` | `@reapit/elements/core/form-control`           |
| `FormControl.HelpText`  | `@reapit/elements/core/form-control`           |
| `CheckboxControl`       | `@reapit/elements/core/checkbox-control`       |
| `CheckboxGroupControl`  | `@reapit/elements/core/checkbox-group-control` |
| `CheckboxInput`         | `@reapit/elements/core/checkbox-input`         |
| `Checkbox`              | `@reapit/elements/core/checkbox`               |
| `RadioGroupControl`     | `@reapit/elements/core/radio-group-control`    |
| `RadioInput`            | `@reapit/elements/core/radio-input`            |
| `RadioButton`           | `@reapit/elements/core/radio-group-control`    |

All components are also available from the root barrel (`@reapit/elements`), but subpath imports are preferred for tree-shaking.

### Deprecated component import paths (for reference when searching)

| Component        | Deprecated import path                     |
| ---------------- | ------------------------------------------ |
| `Input`          | `@reapit/elements/deprecated/input`        |
| `InputGroup`     | `@reapit/elements/deprecated/input-group`  |
| `InputAddOn`     | `@reapit/elements/deprecated/input-add-on` |
| `InputError`     | `@reapit/elements/deprecated/input-error`  |
| Any of the above | `@reapit/elements` (root barrel)           |

---

## Edge Cases and Limitations

### Dynamic `type` prop

If `type` is set via a variable or expression (e.g. `type={inputType}` or `type={isDate ? 'date' : 'text'}`), the correct target component cannot be determined at analysis time. Leave the usage in place and add a `// TODO: Dynamic type prop — determine whether this should be TextControl or DateTimeControl and migrate manually.` comment.

### `intent` prop with no error context

The `intent` prop coloured the icon and add-on for non-error purposes (e.g. `intent="primary"` for emphasis). The modern API has no equivalent. Remove `intent` and accept the loss of that colour differentiation, or implement the styling manually using CSS.

### `inputAddOnText` mapping to `prefix` vs `suffix`

Map `inputAddOnText` to `suffix` by default — the deprecated add-on was appended to the right. If the design intent was a prefix (text on the left), use `prefix` instead. Examine the surrounding context or design to make the correct call; when uncertain, use `suffix` and leave a comment.

### Radio buttons without a group label

`RadioGroupControl` renders a `<fieldset>` with a `<legend>` automatically. Pass a `label` prop to provide the visible group label. If no visible label is appropriate, pass `aria-label` instead — an unlabelled `<fieldset>` is inaccessible. If the deprecated code had no group label, add a descriptive one.

### `InputGroup` wrapping `DeprecatedSelect` or `MultiSelectInput`

This guide does not cover `DeprecatedSelect` or `MultiSelectInput`. If `InputGroup` (in composition mode) wraps one of these, leave the inner element unchanged and add a `// TODO:` comment. Migrate the select or multi-select component separately when guidance is available.

### `styled(Input)` and Linaria extensions

If a consumer file uses `styled(Input)` or `styled(InputGroup)` to create a Linaria-extended component, manual migration is required. The styled extension relies on the internal CSS class structure of the deprecated component, which has changed. Leave a `// TODO:` comment and rebuild the customisation against the modern component using the `className` prop or CSS custom properties (design tokens).

### Styled components used directly as JSX (`<ElInputGroup>`, `<ElInputGroupLabel>`, `<ElInput>`, etc.)

These are internal implementation details of the deprecated components. No modern component exports them. Leave a `// TODO:` comment on each usage noting that the internal styled component has no equivalent and must be rebuilt using the modern component API.

### `week` and `month` input types

`type="week"` and `type="month"` have poor cross-browser support and are not recommended. Do not migrate to `<TextInput type="week">` or `<TextInput type="month">`. Instead, use `<DateTimeControl type="date">` to let the user pick a date, or `<TextControl>` with a plain text input. Add a `// TODO:` comment explaining the change.

### `file` input type

No dedicated file input component exists. Use `<TextInput type="file">`, wrap in `<FormControl>` manually, and leave a `// TODO:` comment.

---

## Working in a Monorepo with a Facade Package

This section applies when the codebase uses a facade package — an internal package that re-exports Elements components under a different name.

### How to detect a facade package

Look for a workspace or package in the monorepo that:

- Has `@reapit/elements` as a dependency in its `package.json`.
- Has an `index.ts` (or similar) containing `export { ... } from '@reapit/elements'` statements.
- Is imported by consumer packages using the internal package name rather than `@reapit/elements` directly.

### The two-phase migration

When a facade package is present, the migration has two phases:

**Phase 1 — Consumer code** (this guide applies):

Update every file that imports from the facade package. Rename identifiers (`InputGroup` → `TextControl`, etc.) but leave the import path pointing to the facade. Do not rewrite `import { InputGroup } from '@company/ui'` to `import { TextControl } from '@reapit/elements/core/text-control'`.

**Phase 2 — Facade package itself** (separate task):

Update the facade package to export the new component names from Elements, following the existing conventions of the facade package.

Phase 2 is out of scope for this guide but must be completed before the migrated consumer code works correctly.

### Partial facade re-exports

Some facade packages re-export only a curated subset of Elements components. If a modern replacement (e.g. `TextControl`) is not yet exported by the facade, import it directly from `@reapit/elements/core/text-control`, bypassing the facade. The facade owner should add the export as a follow-up.

### Tracing re-export chains

If the facade re-exports components under different names (e.g. `export { InputGroup as FormInput } from '@reapit/elements/deprecated/input-group'`), search for usages of the aliased name (`FormInput`) in consumer code, not the canonical Elements name (`InputGroup`).

---

## Migration Checklist

- [ ] Identify all files importing deprecated input components (`Input`, `InputGroup`, `InputAddOn`, `InputError`, `ElInputGroupLabel`)
- [ ] Confirm whether a facade package is in use; if so, identify its package name
- [ ] If a facade package is in use, agree with the team on the two-phase plan (consumer code first, then facade update)
- [ ] For each file, apply the appropriate migration rule based on the `type` prop and usage mode
- [ ] Remove `hasError`, `intent`, and `id` props from migrated components
- [ ] Map `errorMessage` to `errorText` on all Control components
- [ ] Map `icon` to `leadingIcon` (or `trailingIcon` where appropriate)
- [ ] Map `inputAddOnText` to `suffix` (or `prefix` where appropriate)
- [ ] For radio buttons, add a descriptive group `label` to each `RadioGroupControl`
- [ ] For checkboxes, ensure each `CheckboxControl` has a `label`
- [ ] Search for `// TODO:` comments added during migration and review each one
- [ ] Update imports to modern subpath specifiers (or keep facade paths unchanged)
- [ ] Remove unused deprecated imports
- [ ] Run your test suite
- [ ] Visually inspect affected forms in the application
- [ ] If using a facade package, update the facade re-exports (Phase 2)

## Key API Differences

| Aspect                 | Deprecated (`InputGroup`)                              | Modern (`TextControl` etc.)                                                            |
| ---------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| **Architecture**       | Monolithic — one component handles input, label, error | Three-tier — raw input, labelled compound, full control                                |
| **Error handling**     | `hasError` + `errorMessage` props                      | `errorText` prop; error state is derived automatically                                 |
| **Accessibility**      | Auto-generated `aria-label` on the input               | Full ARIA wiring: `aria-invalid`, `aria-errormessage`, `aria-describedby` linked by ID |
| **Labels**             | `label` string prop or `ElInputGroupLabel` child       | `label` ReactNode prop on Control; `FormControl.Label` for manual composition          |
| **Icons**              | `icon` ReactNode prop                                  | `leadingIcon` and `trailingIcon` props on `TextInput`                                  |
| **Add-on text**        | `inputAddOnText` string prop                           | `prefix` and `suffix` ReactNode props on `TextInput`                                   |
| **Intent / colouring** | `intent` prop (primary, danger, neutral, etc.)         | No equivalent; styling is token-based and state-driven                                 |
| **Checkbox / radio**   | `<Input type="checkbox">` / `<Input type="radio">`     | Separate component families: `Checkbox`, `CheckboxControl`, `RadioGroupControl`        |
| **Date inputs**        | `<InputGroup type="date">` (CSS-only, no picker UI)    | `DateTimeControl` with a native picker button                                          |
| **Composition**        | Composition mode with explicit children                | `FormControl` with children, or use a Control component                                |
| **Type safety**        | Single `InputProps` extending `InputHTMLAttributes`    | Separate typed interfaces per component; namespace pattern                             |
