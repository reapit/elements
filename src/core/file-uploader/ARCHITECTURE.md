# FileUploader Architecture

## Overview

The file-uploader family handles file selection, upload orchestration, and
per-file progress display. It comprises five layers: `FileInput` (native file
selection primitive), `FileUploadQueue` (upload lifecycle store), `FileCard`
and `MediaCard` (presentational item components), `FileUploader.File` (bridge
from queue item to presentational component), and `FileUploader` (compound
root that provides context).

## Component layers

**[`FileInput`](../../utils/file-input/ARCHITECTURE.md)** is the native file
selection primitive that every control in this family renders under the
hood. It is designed for use outside a `FileUploader` context too — for
example, a single-avatar-upload trigger with no progress UI — which is why it
lives in `src/utils/` rather than being private to `file-uploader/`.

**`FileUploadQueue`** (`src/core/file-uploader/`) is an external store class
that owns the upload lifecycle for a set of files: status, progress, and
abort. It has no DOM knowledge and no notion of validation constraints. One
instance is created per `FileUploader`, not shared globally, because uploads
are scoped to a single form instance.

**`FileUploader.FileCard`** and **`FileUploader.MediaCard`** are private
presentational components inside `src/core/file-uploader/`. They render
upload-status-specific UI (queued, uploading, processing, error, progress,
remove) and have no knowledge of `FileUploadQueue` or its items. They are not
exported because their upload-status behaviour is meaningless outside an active
queue.

**`FileUploader.File`** is the bridge between a raw queue item and the
presentational components. It picks `FileCard` or `MediaCard`, owns the
item's thumbnail object URL, resolves a validation error or upload error into
the error message those components render, and renders a hidden form input for
each successfully uploaded item.

**`FileUploader`** (`src/core/file-uploader/`) is the compound root. It
provides context — the queue instance, `disabled`, and `locale` — to its
descendants and renders no chrome of its own. Consumers arrange a control
(`FileUploader.ButtonControl` or `FileUploader.DropzoneControl`) and
`FileUploader.FileList` as siblings.

## Functional requirements

### 1. Invalid files do not block submission

An invalid file — one that fails a per-file constraint such as type or size —
is recorded in the queue with a validation error but does not affect whether
the form can be submitted. Only field-level validity, surfaced through
`FileInput`'s native constraint validation API, impacts submission.

This means a consumer can submit a form that contains invalid queued files.
Invalid files do not count towards field-level validity and are not included
in form data on submission: `FileUploader.File` renders no hidden input at
all for an invalid item, rather than one with an empty value.

### 2. Validation constraints belong with the control/input

Constraints such as `accept`, `multiple`, `required`, `minFiles`, `maxFiles`,
`maxFileSize`, and `maxTotalSize` are props on whichever control is rendered
— `FileUploader.ButtonControl`, `FileUploader.DropzoneControl`, or
`FileUploader.SingleSelectMediaControl` — not on `FileUploader` itself and
not shared via context.

The reason is that constraints are tightly coupled to which input is in use.
`multiple`, for example, is not valid for `FileUploader.SingleSelectMediaControl`.
If constraints lived on `FileUploader`, a consumer could pass `multiple={true}`
and compose in `FileUploader.SingleSelectMediaControl`, producing a
contradictory configuration the component cannot detect or reject. Placing
constraints on the control that renders the actual input makes contradictory
configurations impossible.

### 3. `FileUploadQueue` records validity; it does not enforce it

The queue does not run validation and has no knowledge of validation
constraints. A consumer runs validation against newly picked files and reports
the results to the queue. The queue records the outcome per item for two
purposes:

1. To prevent a queued, invalid file from starting to upload.
2. To give consumers a way to observe validation results outside the component
   — for example, by holding a reference to an externally-supplied queue
   instance and reading its state in a submit handler.

Per-file constraint violations (type mismatch, file too large) are stored as a
validation error on the affected item. Selection-level violations (too many
files, total size exceeded) are surfaced through `FileInput`'s own constraint
validation API and have no representation in the queue, because they are facts
about the accumulated selection, not about any individual file.

### 4. The queue is externally creatable

`FileUploader` creates a queue instance internally when none is supplied, but
also accepts an externally created instance via a prop. This follows the same
controlled/uncontrolled convention as every other input in this library,
applied to a store instance rather than a primitive value.

The reason is that a submit handler needs to read the same queue instance that
`FileUploader` renders from. An external instance makes that possible without
any bespoke integration code. The queue class itself is not exported as a
value; consumers create instances through a hook, which scopes construction
to a component mount and prevents accidentally sharing one instance across
multiple renders.

### 5. `ButtonControl` and `DropzoneControl` are two separate components

`FileUploader.ButtonControl` and `FileUploader.DropzoneControl` are distinct
components rather than one component with a `variant` prop. The `Button`
surface and the dropzone surface don't overlap enough to curate into a shared
prop subset without losing trigger-specific props — a consumer needing
`Button`'s `useLinkStyle`, for example, would have no way to reach it through
a unified interface. Two separate components, each composing `FormControl`
around its own trigger's full interface, avoid this trade-off entirely.

`FormControl` chrome (label, help text, error text) sits directly on the
control rather than on `FileUploader` itself, because help and error text must
render between the input and the file list — not after both. Splitting the
chrome into a control that is a sibling to `FileUploader.FileList` puts it in
exactly the right place while leaving `FileUploader`'s consumer-arranged
composition model untouched.

## Item lifecycle

A queue item moves through the following states:

```
queued → uploading → processing? → uploaded
                  ↘
                   error
```

`error` is reachable only from `uploading` or `processing` and represents a
failed upload attempt. `processing` is optional and consumer-driven, for
backends with a post-upload server-side step such as virus scanning or
transcoding. There is no retry: removing and re-adding the file starts a new
attempt.

Each item added to the queue gets its own generated ID, and the queue never
deduplicates by filename. Selecting the same file again after it errors adds
a second, independent item rather than replacing or retrying the first — the
original stays in the list in its `error` state until removed.

Validation-rejected files are not a lifecycle state. An item rejected by
validation remains `queued` with a `validationError` annotation; it does not
enter `error`. Files only transition to uploading when the consumer reports
them as valid to the queue.

## Single-select composition

Figma defines multi-select and single-select as two separate top-level
components, not one component with a variant. The single-select family
— `FileUploader.SingleSelectMediaInput` and
`FileUploader.SingleSelectMediaControl` — mirrors the multi-select family at
every layer and is not a mode of the multi-select controls. There is no
single-select `FileCard`; this pattern is media-only.

## Native form integration

Three mechanisms handle form integration, and they are kept separate:

1. **Hidden inputs per uploaded item.** `FileUploader.FileList`'s `name` prop
   causes `FileUploader.File` to render a hidden input for each successfully
   uploaded, currently valid item. The form's submit handler reads these from
   `FormData` in the normal way.

2. **External queue access.** A consumer who needs richer per-file data at
   submit time — beyond the IDs collected from `FormData` — holds an external
   queue reference and looks up items by ID in the submit handler.

3. **Native input attribute forwarding.** `FileUploader.File` forwards native
   input attributes onto its hidden input, so a form library's field props can
   be spread directly onto it without bespoke integration code.

## Accessibility

No WAI-ARIA Authoring Practices pattern exists for file upload or dropzone
widgets. The component composes from general, well-established principles:

- The click-to-browse trigger is a native `<button>` or `<label>`, so keyboard
  operability and accessible naming are provided by the platform.
- Drag-and-drop is a pointer-only enhancement over the native trigger path.
  This satisfies WCAG 2.2's dragging-movements equivalence requirement without
  any additional ARIA handling, as long as the trigger path is fully
  equivalent.
- A visually hidden live region announces status transitions — upload
  completion, failure, and single-select replacement — to assistive
  technology.
- Remove buttons carry explicit accessible names.
- Focus moves to an adjacent item's remove button, or to the upload trigger
  when the list becomes empty, when an item is removed.
