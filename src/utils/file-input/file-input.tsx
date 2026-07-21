import { ElFileInput, ElFileInputWrapper } from './styles'
import { forwardRef, useId, useState } from 'react'
import { getInputElement } from './get-input-element'
import { useFileDropzone } from './use-file-dropzone'
import { useFileInputValidity } from './use-file-input-validity'

import type { ChangeEvent, FocusEvent, InputHTMLAttributes, ReactNode } from 'react'

type AttributesToOmit = 'children' | 'defaultValue' | 'onChange' | 'type' | 'value'

export namespace FileInput {
  /** Selection and interaction state exposed to a custom `children` render function. */
  export interface RenderProps {
    /** The current selection. */
    files: File[]
    /** Whether a file is currently being dragged over the dropzone (the whole rendered area — the
     * native input plus `children`, if provided). */
    isDraggingOver: boolean
    /**
     * Whether the native input has focus. By default the native input is also where a keyboard
     * user's `Tab` lands on `FileInput` — see the doc comment on `tabIndex` on `Props`, below — so
     * a `children` render function can use this to draw its own focus indicator around custom
     * content, the same way a visually-hidden native checkbox/radio's sibling reflects its
     * `:focus-visible` state.
     */
    isFocused: boolean
    /** Whether the input is disabled. */
    disabled: boolean
    /**
     * Opens the native file picker, the same as clicking a default, unstyled `<input type="file">`.
     * `FileInput` renders no clickable wrapper of its own — wire this onto whichever element in
     * `children` should trigger browsing (e.g. a button), rather than the whole rendered content,
     * so nested controls that shouldn't open the picker (e.g. a remove button on an already-selected
     * file) aren't caught up in it. A no-op while `disabled`.
     *
     * If `children` renders its own separately-focusable trigger (e.g. a `Button` wired to this),
     * also pass `tabIndex={-1}` to `FileInput` — see the doc comment on `tabIndex`
     * on `Props`, below — so the hidden input doesn't become a second, indicator-less tab stop ahead
     * of it.
     */
    openFilePicker: () => void
  }

  export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, AttributesToOmit> {
    /**
     * The selected files. Passing this prop makes the component controlled: `FileInput` no longer
     * tracks the selection itself, and you're responsible for updating this value from `onChange`.
     */
    value?: File[]
    /** The initial selected files, for uncontrolled usage. Ignored once `value` is provided. */
    defaultValue?: File[]
    /**
     * Called with the literal native `change` event whenever the selection changes — the same
     * convention `TextInput` uses, so React Hook Form's `register()`/`Controller` and Formik's
     * file-input handling work exactly as they would against a bare `<input type="file" multiple>`.
     *
     * `event.target.files` reflects exactly this round's picks, unfiltered — matching native
     * `<input type="file">` behaviour. A pick that violates `maxFileSize`/`maxFiles`/`maxTotalSize`
     * below still lands here; it invalidates the input via `setCustomValidity` rather than being
     * silently dropped (see those props below). Files from an earlier round are not carried forward
     * either way: browsing again always replaces the current selection, matching plain
     * `<input type="file" multiple>` behaviour. A consumer that wants to accumulate a running
     * selection across rounds (and, necessarily, a way to remove from it — see `maxFiles` below)
     * owns that itself, either from a controlled `value` (appending in its own `onChange` handler)
     * or via `FileUploadQueue`/`FileUploader`, which pair accumulation with removal by construction
     * (see `src/core/file-uploader/ARCHITECTURE.md`).
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    /**
     * The maximum size, in bytes, allowed for any single file. A violation invalidates the input via
     * `setCustomValidity` rather than being silently dropped — the offending file still lands in
     * `event.target.files`/the selection; see `onChange` above.
     */
    maxFileSize?: number
    /**
     * The maximum number of files allowed in the current selection. Validated against whatever
     * `files`/controlled `value` currently holds — uncontrolled, `FileInput` never accumulates a
     * selection across browse rounds (see `onChange`), so this constrains one round of picks; a
     * running-total limit belongs to whatever owns accumulation and removal, e.g.
     * `FileUploadQueue`. Controlled, it constrains whatever selection the consumer passes as
     * `value`, including an accumulated one. A violation invalidates the input via
     * `setCustomValidity` rather than dropping the excess files.
     *
     * Implies `multiple` when `multiple` isn't explicitly set and this is greater than `1` — a
     * `maxFiles` above `1` is otherwise unsatisfiable, since a single-select input never has more
     * than one file to exceed it. Pass `multiple` explicitly to override.
     */
    maxFiles?: number
    /**
     * The maximum cumulative size, in bytes, allowed across the current selection. As with
     * `maxFiles`, this is validated against whatever `files`/controlled `value` currently holds —
     * uncontrolled, that's one round of picks; controlled, it's whatever selection the consumer
     * passes as `value`, including an accumulated one. A violation invalidates the input via
     * `setCustomValidity` rather than dropping files.
     */
    maxTotalSize?: number
    /**
     * Renders custom content in place of the default rendered content, given the current selection
     * and interaction state. The returned content still gets all of `FileInput`'s native mechanics —
     * validation, constraint reporting — for free; only the visible content, and what triggers
     * browsing, changes — see `openFilePicker` on `RenderProps`. `FileUploader`'s single-select
     * composition uses this to swap in its own `MediaCard` once a file has been selected (see
     * `src/core/file-uploader/ARCHITECTURE.md`). See `tabIndex` below for what stays unchanged on
     * the native input while `children` is provided.
     */
    children?: (props: FileInput.RenderProps) => ReactNode
    /**
     * Left as the native default (focusable, in tab order) even while `children` replaces the
     * input's visible content — a visually-hidden input is still a real, keyboard-operable one,
     * the same trick that underlies a custom checkbox/radio built on a hidden native input. This is what
     * lets a plain `<label htmlFor>` wrapping `FileInput` (as `FileUploader` does) delegate `Tab`
     * straight to it, and what makes `isFocused` on `RenderProps` reflect genuine keyboard focus
     * rather than only the brief, programmatic focus `openFilePicker`'s `.click()` produces.
     *
     * Pass `tabIndex={-1}` explicitly when `children` renders its own separately-focusable trigger
     * (e.g. a `Button` wired to `openFilePicker`, as in the `CustomTrigger` story) — otherwise the
     * hidden input becomes a second tab stop immediately before it, with nothing visible to show
     * for it.
     */
    tabIndex?: number
  }
}

/**
 * The native file-selection primitive: a real, ref-forwarded `<input type="file">`.
 * `accept`/`multiple`/`required` are native attributes; `maxFileSize`/`maxFiles`/`maxTotalSize` are
 * custom constraints validated via `validateFiles` and surfaced through `setCustomValidity`, so
 * `reportValidity()`/native submit-blocking behaves consistently for native and custom violations.
 *
 * "Controlled"/"uncontrolled" describes `FileInput`'s own derived `File[]` state, not the DOM
 * element — browsers only let script clear a file input's value, never set it to a chosen file, so
 * a genuinely DOM-controlled file input doesn't exist. The native input is an event source here, not
 * something `FileInput` drives.
 *
 * Renders no wrapping `<label>`, help/error text, or item list — see `FileUploader` for the
 * composed, form-ready experience built on top of this. Rendering no `<label>` of its own is
 * deliberate: it leaves a consumer free to associate its own external `<label htmlFor>` with the
 * input (`FileUploader` does exactly this) without ending up with two labels — a native input's
 * accessible name is the concatenation of every associated `<label>`'s text, so a second, implicit
 * one here would silently corrupt whichever external label a consumer adds. Pass `children` to
 * fully customise the visible content while keeping `FileInput`'s native mechanics; use
 * `openFilePicker` from `RenderProps` to wire up whichever element should trigger browsing.
 */
export const FileInput = forwardRef<HTMLInputElement, FileInput.Props>(
  (
    {
      accept,
      children,
      className,
      defaultValue,
      disabled,
      maxFileSize,
      maxFiles,
      maxTotalSize,
      multiple,
      onChange,
      style,
      value,
      ...rest
    },
    ref,
  ) => {
    const fallbackId = useId()
    const inputId = rest.id ?? fallbackId

    const isControlled = value !== undefined
    const [uncontrolledFiles, setUncontrolledFiles] = useState<File[]>(defaultValue ?? [])
    const files = isControlled ? value : uncontrolledFiles

    // A `maxFiles` above `1` is unsatisfiable under single-select — `validateFiles` rejects a
    // second file as a `multiple` violation before `maxFiles` is ever consulted — so infer
    // `multiple` from it when the consumer hasn't set `multiple` explicitly. `maxTotalSize` isn't
    // inferred the same way: with one file, "total selection size" and "that file's size" are the
    // same number, so it degrades to `maxFileSize` rather than going dead.
    const effectiveMultiple = multiple ?? (maxFiles !== undefined && maxFiles > 1)

    const [isFocused, setIsFocused] = useState(false)

    useFileInputValidity({
      inputId,
      files,
      accept,
      multiple: effectiveMultiple,
      maxFileSize,
      maxFiles,
      maxTotalSize,
    })

    const { isDraggingOver, dropzoneProps } = useFileDropzone({
      inputId,
      disabled: !!disabled,
      accept,
      multiple: effectiveMultiple,
    })

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      // Always replaces rather than accumulates onto the existing selection — matching plain
      // native `<input type="file" multiple>` behaviour, where re-opening the picker always
      // overwrites rather than appending. Accumulating without a way to remove from the result is
      // a worse experience than replacing, and a bare FileInput has no removal affordance; a
      // consumer that wants both owns accumulation itself (see `onChange`'s doc comment above).
      // `event.target.files` is left exactly as the browser set it — no filtering here;
      // `useFileInputValidity` is the single source of truth for validity. Dropping a file goes
      // through this exact same handler — `useFileDropzone` dispatches a genuine native `change`
      // event on the input rather than taking a separate path.
      if (!isControlled) setUncontrolledFiles(Array.from(event.currentTarget.files ?? []))
      onChange?.(event)
    }

    function handleFocus(event: FocusEvent<HTMLInputElement>) {
      setIsFocused(true)
      rest.onFocus?.(event)
    }

    function handleBlur(event: FocusEvent<HTMLInputElement>) {
      setIsFocused(false)
      rest.onBlur?.(event)
    }

    function openFilePicker() {
      if (disabled) return
      getInputElement(inputId)?.click()
    }

    return (
      <ElFileInputWrapper className={className} data-disabled={!!disabled} style={style} {...dropzoneProps}>
        <ElFileInput
          {...rest}
          accept={accept}
          data-visually-hidden={!!children}
          disabled={disabled}
          id={inputId}
          multiple={effectiveMultiple}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          ref={ref}
          type="file"
        />
        {children?.({ files, isDraggingOver, isFocused, disabled: !!disabled, openFilePicker })}
      </ElFileInputWrapper>
    )
  },
)

FileInput.displayName = 'FileInput'
