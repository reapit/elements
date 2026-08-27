# FileInput Architecture

## Overview

`FileInput` is a native file selection primitive. It owns file selection
mechanics: a real `<input type="file">`, drag-and-drop, `accept`, `multiple`,
`required`, and custom size and count constraints. It has no knowledge of
uploading files or rendering selected items.

`FileInput` lives in `src/utils/` rather than `src/core/` because it has no
Figma component of its own and is designed as a generic foundation for file
selection. This is the same reasoning as `HTMLDialog` (`src/utils/dialog/`),
which is a public native `<dialog>` primitive that `Dialog` and `Drawer`
build on.

## Functional requirements

### 1. Browse and drag-and-drop produce one event

Dropping files dispatches a genuine `change` event on the native input rather
than a separate drop event. Browse and drop are indistinguishable downstream:
both produce the same native `ChangeEvent`, and callers need no awareness of
which entry path was used.

### 2. `onChange` forwards a native `ChangeEvent`

`onChange` is a literal native `ChangeEvent`, forwarded as-is: the same
convention as `TextInput`. This means React Hook Form's `register()` and
`Controller`, and Formik's file-input handling, work exactly as they would
against a bare `<input type="file" multiple>`, with no bespoke event shape to
design, document, or get wrong.

### 3. `accept` and `multiple` are re-checked on drop

Browsers enforce `accept` and `multiple` against the OS picker dialog but not
against drag-and-drop. `FileInput` re-validates both on the drop path so
behaviour is consistent regardless of how files are selected. The trade-off
is dropped files that do not meet the `accept` constraint are excluded from
the selection with no user feedback. This may change in future.

### 4. `multiple` and `required` map to `minFiles`/`maxFiles` defaults

`validateFiles` operates on mechanical count and size constraints
(`minFiles`, `maxFiles`, `maxFileSize`, `maxTotalSize`, `accept`) and has no
notion of `multiple` or `required` directly. `FileInput` maps them: `multiple`
resolves to `maxFiles=Infinity` when `maxFiles` is unset (vs. `maxFiles=1`
when absent), and `required` resolves to `minFiles=1` when `minFiles` is unset
(vs. `minFiles=0` when absent). An explicit `minFiles` or `maxFiles` always
wins.

Both `multiple` and `required` are forwarded as native attributes in their own
right, for native form behaviour.

### 5. Custom constraints surface through the constraint validation API

Custom constraints (`minFiles`, `maxFiles`, `maxFileSize`, `maxTotalSize`)
are surfaced via `setCustomValidity()`. This is consistent with
`NumberInput`'s range validation, so `reportValidity()` and native
submit-blocking behave uniformly whether the violation is native or custom.

### 6. No wrapping `<label>`

`FileInput` renders no wrapping `<label>`. Like other input components, it is
up to consumers to provide an accessible name for the input, whether though
an outer `<label htmlFor>` or `aria-label`.

### 7. `children` render prop for custom dropzone content

`FileInput` accepts a `children` render prop that receives the input's live
state (current files, drag and focus state, `disabled`, and the picker-open
callback) and returns the rendered dropzone content. This lets a consumer
fully replace the dropzone's visual appearance while retaining all of
`FileInput`'s selection mechanics (drag-and-drop, validation, native event
contract) for free, without needing a bespoke wrapper component.

## `validateFiles`

`validateFiles` (`src/utils/file-input/validate-files.ts`) is a pure function
that checks a set of files against a given set of rules and returns which
files are accepted and which are rejected, with a reason code per rejection.

It is co-located with `file-input/` rather than promoted to a top-level
utility for the same reason `NumberInput`'s `validate-range.ts` lives
alongside `number-input/`: its rules are scoped to this component's
constraints and are not a general-purpose cross-cutting concern.
