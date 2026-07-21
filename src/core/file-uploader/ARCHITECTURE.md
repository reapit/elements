# File Uploader Architecture

## Overview

The file-uploader family has four layers, each independently usable and independently testable:

- **`FileInput`** (`src/utils/file-input/`) — the native primitive. Owns file selection mechanics only: a real `<input type="file">`, drag-and-drop, `accept`/`multiple`/`required`, custom size/count limits. No label, no help/error text, no upload orchestration, no item rendering. Lives in `src/utils/`, not `src/core/`, since it has no Figma component of its own — unlike `FileCard`/`MediaCard`, which do have Figma frames but stay private to `FileUploader` for a different reason (their upload-status behaviour is meaningless outside an active queue). `FileInput` has no such coupling and is designed to be used standalone (e.g. a single-avatar-upload trigger with no progress UI), so it stays public — just not a `core` component, the same way `HTMLDialog` (`src/utils/dialog/`) is a public, Figma-less native-element primitive that `Dialog`/`Drawer` build on.
- **`FileUploadQueue`** (`src/core/file-uploader/`) — an external store class that owns the upload lifecycle for a set of files: status, progress, retry, abort. No DOM knowledge, no rendering.
- **`FileUploader.FileCard` / `FileUploader.MediaCard`** (private subcomponents inside `src/core/file-uploader/`, not separately exported) — presentational item rows. No knowledge of the queue; take plain props.
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
- Custom constraints (`maxFileSize`/`maxFiles`/`maxTotalSize`) are surfaced via `setCustomValidity()`, matching `number-input`'s `useRangeValidation` (`src/core/number-input/use-range-validation.ts`) — so `reportValidity()`/native submit-blocking behaves consistently whether the violation is native or custom. Validity is a pure function of the current `files`/`value`, independent of how it arrived — a browse round for uncontrolled usage, or a controlled consumer's own value. This is what lets a controlled `FileInput` reflect a source of truth it doesn't own (see "Wiring" below): no bespoke resync-and-revalidate logic is needed on the consumer's side, only handing in the current value.
- A `children`-as-function render prop exposes `{ files, isDraggingOver, isFocused, disabled, openFilePicker }`, letting a consumer fully replace the dropzone's rendered content while still getting all of `FileInput`'s native mechanics (drag-and-drop, validation) for free. `FileUploader`'s single-select-media composition exercises this for real — see "Single-select composition" below — and it remains available as a general escape hatch for any other bespoke dropzone content, without needing a bespoke component.
- `FileInput` renders **no wrapping `<label>`** — it's a bare, unlabelled native input plus whatever `children` returns. This is deliberate, not an oversight: a native input's accessible name is the concatenation of the text of _every_ `<label>` associated with it (implicit wrapping or explicit `htmlFor`), so if `FileInput` wrapped itself in a `<label>`, an outer, explicit `<label htmlFor>` supplied by a consumer (see "Wiring" below) would get its text silently concatenated with whatever `FileInput`'s own content says — corrupting the accessible name rather than cleanly labelling the field. `openFilePicker` (a plain `() => input.click()`, a no-op while `disabled`) replaces the wrapping `<label>`'s implicit forwarding: a consumer wires it onto whichever specific element should trigger browsing (e.g. a button), rather than the whole rendered subtree, so other interactive content in the same `children` output — a remove button on an already-selected file, the single-select `Replace` overlay's sibling controls — isn't accidentally caught up in opening the picker too.

## `FileUploadQueue`

An external store class — same shape as the existing toaster store (`src/core/toaster/store.ts`: mutable state + pub/sub + `getSnapshot`/`subscribe` for `useSyncExternalStore`), but instantiated **per `FileUploader`**, not as a global singleton (uploads are scoped to one form instance, unlike toasts).

**Item lifecycle**: `queued → uploading (progress?: number) → processing? → uploaded`, with `error` reachable from `uploading` or `processing`. Validation-rejected files (from `validateFiles`) enter directly at `error` — same visual language as an upload failure, no separate rejection side-channel.

- `progress` is optional. Some `onUpload` implementations can't report it (`fetch` cannot report upload progress the way XHR's `upload.onprogress` can) — treat `undefined` as indeterminate. Which loading primitive renders (circular progress ring vs. spinner) is driven by whether `progress` is a number, not by which status the item is in.
- `processing` is optional and **consumer-driven**, not inferred — a helper the queue exposes that `onUpload` calls before resolving, for backends with a post-upload server-side step (virus scan, transcoding, etc.). Whether a given backend has this step is unknowable in advance, so the queue never guesses.
- Progress snapshots are throttled/coalesced — high-frequency XHR progress events would otherwise re-render every `useSyncExternalStore` subscriber excessively.
- A delayed-loading-indicator flag (`minLoadingIndicatorDelayMs`, default ~300ms) avoids indicator flash on fast operations: a per-item `isLoadingIndicatorVisible` boolean only flips true if the item is still `uploading`/`processing` after the delay elapses. `FileCard`/`MediaCard` just read this boolean — no timer logic in the presentational layer.
- `getFileId(result)` computes `item.fileId` once, at the moment `onUpload` resolves. `FileUploadQueue` also retains the raw `item.result`, for consumers who need to look up richer data by ID later (see "Native form integration").
- The queue is **externally creatable and injectable**: `FileUploader` accepts an optional `queue` prop (an instance created via `new FileUploadQueue(...)`), defaulting to creating one internally when omitted — same controlled/uncontrolled convention as every other input in this codebase, just applied to a store instance instead of a primitive value. This is what lets a consumer's submit handler read the same instance `FileUploader` is rendering from, entirely outside React's render cycle.

## `FileUploader.FileCard` / `FileUploader.MediaCard`

Two separate subcomponents — not one component with a `variant` prop — matching the Figma subcomponent boundary directly (Figma lists "File card" and "Media card" as siblings, not variants of one wrapper). This avoids a discriminated-union rendering problem (compact row vs. thumbnail tile don't share much layout) and keeps each component small and single-purpose.

Neither is independently exported. Both render upload-status-specific state (queued/uploading/processing/error, progress, remove) that's meaningless without an active `FileUploadQueue` behind it — confirmed with design as uploader-specific behaviour, not general-purpose file-display UI. A read-only list of already-uploaded files (e.g. documents already attached to a record, with no active uploader present) is a different UI need entirely — a gallery/carousel for media, and a lighter-weight file-row variant for documents — not these components. That rules out the standalone-export path this doc originally proposed.

- `FileCard`: compact single-line row. Works for any file type — the safe universal default.
- `MediaCard`: thumbnail-forward tile, for images/video specifically.
- Both share small **internal, non-exported** status label formatting (`getFileUploaderItemStatus`) and a remove button (`FileUploaderRemoveButton`) — implementation reuse, not a shared public interface. These live directly under `src/core/file-uploader/`, since both are private to the same component family.
- The circular progress ring and spinner are **`MediaCard`-only** — they render on its thumbnail overlay; `FileCard` has no thumbnail and shows `getFileUploaderItemStatus`'s `statusText` as plain text instead. They live under `src/core/file-uploader/media-card/`.
- `MediaCard` itself has two Figma-driven variants, not one: a **list-item** variant (thumbnail tile + filename/size caption below — used inside `Files`'s list, for multi-select and for any single-select case that doesn't hit the swap-in-place default below) and a **single-select** variant (no caption, full-bleed thumbnail, a `Replace` overlay in place of a second remove affordance, states `Default`/`Hovered`/`Error`/`Focused`/`Disabled`). Figma has no single-select equivalent of `FileCard` — the swap-in-place pattern below is media-only. See "Single-select composition".

## `FileUploader`

Compound API: `<FileUploader>` composes `FormControl` (label/help-text/error-text/required/size — reused directly, not reinvented) with `FileUploader.Input` and `FileUploader.Files`.

```
<FileUploader accept="image/*" onUpload={uploadToS3} getFileId={(result) => result.id}>
  <FileUploader.Input name="documents" multiple />
  <FileUploader.Files name="documentIds" />
</FileUploader>
```

- **`accept` lives on `FileUploader`, not `FileUploader.Input`**: `FileUploader.Files`'s default-component decision (below) needs `accept` to pick between `FileCard`/`MediaCard`, and `Files` has no sibling access to props set on `Input`. Hoisting `accept` to `FileUploader` gives both `Input` (which forwards it to the underlying `FileInput`) and `Files` a single shared source, instead of duplicating it on both elements or reaching across siblings.
- **`FileUploader.Files`**: default rendering (no `children`) maps queue items to `FileCard`. Defaults to `MediaCard` instead when `FileUploader`'s `accept` is exclusively image/video MIME types or extensions (`isMediaOnlyAccept` helper, co-located with `FileInput`'s `accept`-parsing) — a single uploader-level decision applied to every item, not a per-file inference. The check is deliberately conservative: anything ambiguous (mixed `accept`, unset, non-media types) falls back to `FileCard`, which is always correct even if less specific. The `children`-as-function escape hatch (`(items) => ReactNode`) always remains available for full per-item custom rendering — since `FileCard`/`MediaCard` aren't exported, a custom `children` implementation renders its own row UI from `item.status`/`item.progress` rather than reusing them.
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

- Renders `FileInput` **controlled** by the queue's own snapshot, not uncontrolled: `<FileInput value={queue.getFiles()} maxFiles={...} maxFileSize={...} maxTotalSize={...} onChange={(e) => queue.addFiles(e.target.files)} />`.
- No bespoke resync effect is needed here. `FileInput`'s own effect (see "`FileInput`" above) already resyncs the native `.files` and recomputes `setCustomValidity` against whatever `value` currently is, as a pure function of that value — it doesn't care whether the value came from a browse round or a queue snapshot. Driving it with `value={queue.getFiles()}` means any change to the queue's file set — an addition or a removal — keeps the raw input's `.files` and validity in sync with the queue's true accumulated state, for free. This is simpler than, and supersedes, resyncing `.files` imperatively via a ref whenever the queue changes.
- Passing the same `maxFiles`/`maxFileSize`/`maxTotalSize` to both `FileInput` and the queue is intentional duplication, not redundancy: the queue owns the accept/reject decision for the running selection (`addFiles` runs its own `validateFiles` against its own accumulated items — see `FileUploadQueue` above); `FileInput` only reflects whether the _result_ is valid, driving native submit-blocking and any `:has(input:invalid)`-style error styling on `FileUploader.Input`'s own rendered content (matching `TextInput`'s existing `:has(input:invalid)` pattern).

`FileInput` and `FileUploadQueue` never reference each other directly.

### Labelling

`FileUploader` composes `FormControl` as a **plain `<label>`/`htmlFor`** pair, the same convention `TextControl`/`AutocompleteControl` use (`useId()` generates the input's `id`, `FormControl.Label` gets the matching `htmlFor`) — **not** the `as="fieldset"`/`as="legend"` pattern `CheckboxGroupControl`/`RadioGroupControl`/`ChipSelectControl` use. Those use `fieldset`/`legend` because they have _N_ real inputs under one group heading, with no single control a `<label for>` could target. `FileUploader` has exactly one `<input type="file">` — the same cardinality as `TextInput` — so, matching established file-upload UX (GOV.UK, USWDS both do this), clicking the field's label is expected to open the picker, which only a real `<label htmlFor>` gives you. This is also exactly why `FileInput` renders no `<label>` of its own (see "`FileInput`" above) — one input, one label, supplied by `FileUploader.Input`.

## Single-select composition

Figma splits `FileUploader` into two separate top-level components, not one component with a variant: **multi-select** (a persistent dropzone trigger above a separate list of item rows — the composition documented above) and **single-select** (one widget whose own content swaps between the empty drag-and-drop prompt and the filled single-select `MediaCard`, which itself carries the `Replace`/remove affordances). There is no single-select `FileCard` — this pattern is media-only.

- **Default rule**: `FileUploader.Input` renders the single-select `MediaCard` in place of the plain dropzone content (via its own use of `FileInput`'s `children`-as-function render prop) when both are true: `maxFiles === 1` and `isMediaOnlyAccept(accept)` — the same helper `FileUploader.Files` already uses to choose between `FileCard` and `MediaCard`. Otherwise `Input` renders only the persistent dropzone prompt and item display is left to `Files`, exactly as in the multi-select case. This covers `maxFiles === 1` with a non-media `accept` (e.g. a single PDF): plain dropzone + one `FileCard` in the list, matching that there's no single-select `FileCard` design.
- **`Files` is simply omitted** by the consumer in the single-select-media composition — `Input` already renders the one item that exists, so also including `<FileUploader.Files />` would double-render it. This is a documented composition convention, not something `Input`/`Files` coordinate on at runtime — the same "consumer controls which pieces are composed" model this compound API already uses everywhere else.
- **Replace, not reject**: selecting or dropping a new file while the single slot is already filled replaces the existing item — the queue removes the current item before adding the new one — rather than being rejected by `maxFiles` validation the way a second file would be in multi-select.
- **Escape hatch**: a consumer wanting a bespoke single-select experience (a non-media single-select flow, or custom swap-in-place UI) passes their own `children` to `FileUploader.Input`, overriding the default exactly as they'd override any other default in this API — no separate prop or bespoke component needed.

## Native form integration

Two distinct mechanisms, deliberately kept separate:

1. **Plain native `<form>` submit, no JS library**: `Files`'s `name` prop, as above. Read at submit time from whatever hidden inputs currently exist in the DOM — no live-tracking needed.
2. **A consumer wants more than just the ID** (richer per-file data at submit time): look it up from the externally-injected `queue` by the ID collected from `FormData`, in the submit handler. This is why the queue must be externally creatable — the submit handler and `FileUploader`'s rendering need to read the _same_ instance.

**This library explicitly does not build RHF `useFieldArray` support.** `useFieldArray` exists for when the _form library_ owns list mutation (its own `append`/`remove`, re-keyed internally). Here, the **queue** owns add/remove — a file finishing upload, or a user clicking remove, is driven by the queue, not by RHF. A consumer wanting the array "live" in RHF's `watch`/`formState` (rather than just correct at native-submit time) uses a `useEffect` calling `setValue(name, ids, { shouldDirty: true })` when the queue's derived ID array changes. This treats the array as one atomic field value. `useFieldArray` would only be relevant if a consumer wants RHF to own something this library doesn't touch at all (e.g. structured per-file metadata RHF itself validates) — fully decoupled from the queue.

No RHF/Formik-specific code exists anywhere in this library. `FileInput`'s native `onChange` contract is sufficient on its own.

## Validation

`validateFiles(incoming, existing, rules)` (`src/utils/file-input/validate-files.ts`) is a pure function returning `{ accepted, rejected: { file, reason }[] }`. Co-located with `file-input/` rather than promoted to a top-level, generic utility, matching `number-input`'s `validate-range.ts` precedent — it's scoped to this component's constraints, not a generic cross-cutting utility.

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

- **RHF `useFieldArray` integration.** Not needed — see "Native form integration" above.
- **Per-item custom form values beyond the file ID.** Consumers needing richer data look it up from the injected `queue` by ID in their submit handler, rather than `Files` supporting an arbitrary per-item value.

## Changesets

Most subtasks in this feature are internal building blocks with no independently consumable surface until later subtasks land — those use `yarn changeset --empty`. Real `Added:` changesets land only where something becomes independently importable and usable: `FileInput` and `FileUploader` itself. `FileCard`/`MediaCard` and the shared upload-status primitives are never independently exported, so their subtasks always use an empty changeset.
