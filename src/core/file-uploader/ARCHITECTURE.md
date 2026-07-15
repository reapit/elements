# File Uploader Architecture

## Overview

The file-uploader family has four layers, each independently usable and independently testable:

- **`FileInput`** (`src/core/file-input/`) — the native primitive. Owns file selection mechanics only: a real `<input type="file">`, drag-and-drop, `accept`/`multiple`/`required`, custom size/count limits. No label, no help/error text, no upload orchestration, no item rendering.
- **`FileUploadQueue`** (`src/core/file-uploader/`) — an external store class that owns the upload lifecycle for a set of files: status, progress, retry, abort. No DOM knowledge, no rendering.
- **`FileCard` / `MediaCard`** (`src/core/file-card/`, `src/core/media-card/`) — presentational item rows. No knowledge of the queue; take plain props.
- **`FileUploader`** (`src/core/file-uploader/`) — the compound composition: `FormControl` chrome + `FileInput` + `FileUploadQueue` + item rendering.

This mirrors an existing pattern in this codebase: `Autocomplete` (primitive) vs. `AutocompleteControl` (primitive + `FormControl` + convenience wiring, e.g. auto-rendered `SelectionChips`). `FileInput` plays the role `Autocomplete` plays; `FileUploader` plays the role `AutocompleteControl` plays. `FileUploader` is deliberately **not** named `FileUploadControl` — that would overload this codebase's existing `*Control` meaning (primitive + `FormControl`) with a second, different meaning (queue/orchestration layering). `FileUploader` already matches the Figma component name and fills the `*Control` role without borrowing the suffix.

## Why the split

Each layer solves a problem the others don't need to know about:

- `FileInput` doesn't need to know an upload queue exists. It can be used alone for simple cases (e.g. a single-avatar-upload trigger with no progress UI).
- `FileUploadQueue` doesn't need to know a DOM input exists. It's testable with plain unit tests, no browser element required.
- `FileCard`/`MediaCard` don't need to know where their data came from. They're pure presentational components.
- `FileUploader.Input` is the **only** place allowed to know about both `FileInput` and `FileUploadQueue` — see "Wiring" below.

## `FileInput`

- Real `<input type="file">`, ref-forwarded. `value`/`defaultValue` are `File[]`, and `onChange` is a **literal native `ChangeEvent`**, forwarded as-is — same convention as `TextInput`. This is deliberate: it means RHF's `register()`/`Controller` and Formik's file-input handling work exactly as they would against a bare `<input type="file" multiple>`, with no bespoke event shape to design, document, or get wrong. See "Native form integration" below.
- Browsers only let script clear a file input's `.value` to `""`, never set it to a chosen file (security restriction) — a genuinely DOM-controlled file input doesn't exist. "Controlled" here means `FileInput`'s own derived `File[]` state is authoritative, not the DOM element; the native input is an event source, not something `FileInput` drives.
- Drag-and-drop is unified into the _same_ native `change` path rather than given a second, bespoke event shape: on `drop`, the dropped `DataTransfer`'s files are assigned onto the real input's `.files`, then a genuine `change` event is dispatched on that input. Browse and drop are indistinguishable downstream — one event, one contract.
- `accept`/`multiple`/`required` are native attributes, but **the browser does not enforce `accept`/`multiple` against drag-and-drop** — they only filter the OS picker dialog. `validateFiles` re-checks both on the drop path so behaviour doesn't differ by entry point.
- Custom constraints (`maxFileSize`/`maxFiles`/`maxTotalSize`) are surfaced via `setCustomValidity()`, matching `number-input`'s `useRangeValidation` (`src/core/number-input/use-range-validation.ts`) — so `reportValidity()`/native submit-blocking behaves consistently whether the violation is native or custom.
- A `children`-as-function render prop exposes `{ files, isDraggingOver, isFocused, disabled }`, letting a consumer fully replace the dropzone's rendered content (e.g. a future single-image-becomes-the-dropzone pattern, swapping the prompt for an image preview once a file is present) while still getting all of `FileInput`'s native mechanics for free. This is not yet a designed Figma pattern — it's a supported customisation, not a bespoke `SingleImageFileInput` component.

## `FileUploadQueue`

An external store class — same shape as the existing toaster store (`src/core/toaster/store.ts`: mutable state + pub/sub + `getSnapshot`/`subscribe` for `useSyncExternalStore`), but instantiated **per `FileUploader`**, not as a global singleton (uploads are scoped to one form instance, unlike toasts).

**Item lifecycle**: `queued → uploading (progress?: number) → processing? → uploaded`, with `error` reachable from `uploading` or `processing`. Validation-rejected files (from `validateFiles`) enter directly at `error` — same visual language as an upload failure, no separate rejection side-channel.

- `progress` is optional. Some `onUpload` implementations can't report it (`fetch` cannot report upload progress the way XHR's `upload.onprogress` can) — treat `undefined` as indeterminate. Which loading primitive renders (circular progress ring vs. spinner) is driven by whether `progress` is a number, not by which status the item is in.
- `processing` is optional and **consumer-driven**, not inferred — a helper the queue exposes that `onUpload` calls before resolving, for backends with a post-upload server-side step (virus scan, transcoding, etc.). Whether a given backend has this step is unknowable in advance, so the queue never guesses.
- Progress snapshots are throttled/coalesced — high-frequency XHR progress events would otherwise re-render every `useSyncExternalStore` subscriber excessively.
- A delayed-loading-indicator flag (`minLoadingIndicatorDelayMs`, default ~300ms) avoids indicator flash on fast operations: a per-item `isLoadingIndicatorVisible` boolean only flips true if the item is still `uploading`/`processing` after the delay elapses. `FileCard`/`MediaCard` just read this boolean — no timer logic in the presentational layer.
- `getFileId(result)` computes `item.fileId` once, at the moment `onUpload` resolves. `FileUploadQueue` also retains the raw `item.result`, for consumers who need to look up richer data by ID later (see "Native form integration").
- The queue is **externally creatable and injectable**: `FileUploader` accepts an optional `queue` prop (an instance created via `new FileUploadQueue(...)`), defaulting to creating one internally when omitted — same controlled/uncontrolled convention as every other input in this codebase, just applied to a store instance instead of a primitive value. This is what lets a consumer's submit handler read the same instance `FileUploader` is rendering from, entirely outside React's render cycle.

## `FileCard` / `MediaCard`

Two separate, independently-exported presentational components — not one component with a `variant` prop — matching the Figma subcomponent boundary directly (Figma lists "File card" and "Media card" as siblings, not variants of one wrapper). This avoids a discriminated-union rendering problem (compact row vs. thumbnail tile don't share much layout) and keeps each component small and single-purpose.

- `FileCard`: compact single-line row. Works for any file type — the safe universal default.
- `MediaCard`: thumbnail-forward tile, for images/video specifically.
- Both share small **internal, non-exported** pieces (circular progress ring, spinner, status label formatting, remove button) — implementation reuse, not a shared public interface.
- Both are usable completely standalone, with no `FileUploader`/dropzone involved — the read-only state (no remove button) exists specifically for this, e.g. a list of already-uploaded documents on a record.

## `FileUploader`

Compound API: `<FileUploader>` composes `FormControl` (label/help-text/error-text/required/size — reused directly, not reinvented) with `FileUploader.Input` and `FileUploader.Files`.

```
<FileUploader accept="image/*" onUpload={uploadToS3} getFileId={(result) => result.id}>
  <FileUploader.Input name="documents" multiple />
  <FileUploader.Files name="documentIds">
    {(items) => items.map((item) => (
      <FileCard key={item.id} status={item.status} progress={item.progress} onRemove={...} />
    ))}
  </FileUploader.Files>
</FileUploader>
```

- **`accept` lives on `FileUploader`, not `FileUploader.Input`**: `FileUploader.Files`'s default-component decision (below) needs `accept` to pick between `FileCard`/`MediaCard`, and `Files` has no sibling access to props set on `Input`. Hoisting `accept` to `FileUploader` gives both `Input` (which forwards it to the underlying `FileInput`) and `Files` a single shared source, instead of duplicating it on both elements or reaching across siblings.
- **`FileUploader.Files`**: default rendering (no `children`) maps queue items to `FileCard`. Defaults to `MediaCard` instead when `FileUploader`'s `accept` is exclusively image/video MIME types or extensions (`isMediaOnlyAccept` helper, co-located with `FileInput`'s `accept`-parsing) — a single uploader-level decision applied to every item, not a per-file inference. The check is deliberately conservative: anything ambiguous (mixed `accept`, unset, non-media types) falls back to `FileCard`, which is always correct even if less specific. The `children`-as-function escape hatch (`(items) => ReactNode`) always remains available for full per-item control, independent of this default.
- **`name` prop on `Files`**: when supplied, renders one `<input type="hidden" name={name} value={item.fileId}>` per successfully-uploaded item, alongside whichever row rendering is in use (default or custom `children`). This is native form participation with **zero JS form library required** — a plain `<form>` submit collects these via `FormData.getAll(name)`, the same mechanism grouped checkboxes already use for multi-value native fields. Removal is just React unmounting that item's hidden input; nothing needs to observe the DOM to keep `FormData` correct at submit time.
- **`onUpload`/`getFileId` live on `FileUploader`, not `Files`**: `getFileId` is conditionally required based on `onUpload`'s resolved type —
  ```ts
  type Props<TResult> = {
    onUpload: (file: File, helpers: UploadHelpers) => Promise<TResult>
  } & (TResult extends string
    ? { getFileId?: (result: TResult) => string }
    : { getFileId: (result: TResult) => string })
  ```
  This conditional-required pattern only typechecks when both props are generic over the same `TResult` on one component — it could not be enforced if `getFileId` lived on a separate `Files` element, since TypeScript can't constrain one JSX element's prop based on a sibling element's generic instantiation.

### Wiring (`FileUploader.Input`)

`FileUploader.Input` is the only place that knows about both `FileInput` and `FileUploadQueue`:

- Renders `<FileInput onChange={(e) => queue.addFiles(e.target.files)} />`.
- Runs an effect that resyncs `FileInput`'s native `.files` (via the same `DataTransfer` reassignment used for drag-and-drop) whenever the queue removes an item, so the raw input stays consistent with the queue's truth and re-selecting a previously-removed file fires `change` again.

`FileInput` and `FileUploadQueue` never reference each other directly.

## Native form integration

Two distinct mechanisms, deliberately kept separate:

1. **Plain native `<form>` submit, no JS library**: `Files`'s `name` prop, as above. Read at submit time from whatever hidden inputs currently exist in the DOM — no live-tracking needed.
2. **A consumer wants more than just the ID** (richer per-file data at submit time): look it up from the externally-injected `queue` by the ID collected from `FormData`, in the submit handler. This is why the queue must be externally creatable — the submit handler and `FileUploader`'s rendering need to read the _same_ instance.

**This library explicitly does not build RHF `useFieldArray` support.** `useFieldArray` exists for when the _form library_ owns list mutation (its own `append`/`remove`, re-keyed internally). Here, the **queue** owns add/remove — a file finishing upload, or a user clicking remove, is driven by the queue, not by RHF. A consumer wanting the array "live" in RHF's `watch`/`formState` (rather than just correct at native-submit time) uses a `useEffect` calling `setValue(name, ids, { shouldDirty: true })` when the queue's derived ID array changes. This treats the array as one atomic field value. `useFieldArray` would only be relevant if a consumer wants RHF to own something this library doesn't touch at all (e.g. structured per-file metadata RHF itself validates) — fully decoupled from the queue.

No RHF/Formik-specific code exists anywhere in this library. `FileInput`'s native `onChange` contract is sufficient on its own.

## Validation

`validateFiles(incoming, existing, rules)` (`src/core/file-input/validate-files.ts`) is a pure function returning `{ accepted, rejected: { file, reason }[] }`. Co-located with `file-input/` rather than `utils/`, matching `number-input`'s `validate-range.ts` precedent — it's scoped to this component's constraints, not a generic cross-cutting utility.

Rejected files enter the queue directly at `error` status, rendered through the same `FileCard`/`MediaCard` error state as a genuine upload failure. This gives one visual language for "why did this fail," whether the failure was validation (client-side, before upload) or a transport error (server-side, after upload started).

## Accessibility

No WAI-ARIA APG pattern exists for file-upload/dropzone widgets — checked against the APG pattern list; there's no "File Upload" or "Dropzone" entry, unlike Combobox/Listbox which do have one. This can't be solved by "follow pattern X"; it's composed from a few general, well-established principles instead:

- The click-to-browse trigger is a native `<label>` (or a `<button>` calling `.click()` on the input) — keyboard operability and correct accessible naming come free, no custom keydown handling.
- Drag-and-drop stays a pointer-only _enhancement_ over that native path — this satisfies WCAG 2.2's "Dragging Movements" equivalence requirement automatically, as long as the label/button path is fully equivalent, so drag-and-drop doesn't need its own ARIA story.
- A visually-hidden `aria-live="polite"` region announces status transitions (e.g. "Invoice.pdf uploaded", "Invoice.pdf failed to upload: file too large").
- Remove buttons carry an explicit accessible name ("Remove Invoice.pdf").

## `formatFileSize`

`src/utils/number-format/number-format.ts` (alongside `getIntlNumberFormat`/`getNumberAffix`/`getLocaleNumberSeparators`, not a new top-level util — it depends on `getIntlNumberFormat` for the numeric part). Picks a size tier (byte/kilobyte/megabyte) and formats it via `getIntlNumberFormat(locale, { style: 'unit', unit, unitDisplay: 'short', maximumFractionDigits: 2 })`, matching the Figma spec's `"3.6 MB"` in `en-GB`. Both the number and the unit are localised (e.g. `"3,6 Mo"` in `fr-FR`), since `Intl.NumberFormat`'s unit data already covers byte/kilobyte/megabyte correctly — there's no need to hand-roll a fixed suffix.

## Explicitly out of scope for v1

- **Single-image-becomes-the-dropzone.** Not a designed Figma pattern yet. Supportable later via `FileInput`'s `children`-as-function render prop without a bespoke component — see `FileInput` section above.
- **RHF `useFieldArray` integration.** Not needed — see "Native form integration" above.
- **Per-item custom form values beyond the file ID.** Consumers needing richer data look it up from the injected `queue` by ID in their submit handler, rather than `Files` supporting an arbitrary per-item value.

## Changesets

Most subtasks in this feature are internal building blocks with no independently consumable surface until later subtasks land — those use `yarn changeset --empty`. Real `Added:` changesets land only where something becomes independently importable and usable: `FileInput`, `FileCard`/`MediaCard` (if exported standalone ahead of `FileUploader`), and `FileUploader` itself.
