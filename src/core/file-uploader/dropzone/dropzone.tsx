import {
  elFileUploaderDropzoneFileInput,
  ElFileUploaderDropzone,
  ElFileUploaderDropzoneIcon,
  ElFileUploaderDropzoneText,
} from './styles'
import { FileInput } from '#src/utils/file-input'
import { useFileUploaderInput } from '../use-file-uploader-input'

import type { CSSProperties, FocusEventHandler, KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react'

type FileInputAttributesToOmit =
  | 'autoFocus'
  | 'children'
  | 'className'
  | 'defaultValue'
  | 'onBlur'
  | 'onClick'
  | 'onFocus'
  | 'onKeyDown'
  | 'style'
  | 'tabIndex'
  | 'value'

export namespace FileUploaderDropzoneInput {
  export interface Props extends Omit<FileInput.Props, FileInputAttributesToOmit> {
    autoFocus?: boolean
    className?: string
    /** The icon shown in the dropzone's icon badge. */
    icon?: ReactNode
    /** Called when the trigger is blurred. */
    onBlur?: FocusEventHandler<HTMLButtonElement>
    /** Called when the trigger is clicked, in addition to opening the file picker. */
    onClick?: MouseEventHandler<HTMLButtonElement>
    /** Called when the trigger is focused. */
    onFocus?: FocusEventHandler<HTMLButtonElement>
    /** Called on a key down event on the trigger. */
    onKeyDown?: KeyboardEventHandler<HTMLButtonElement>
    /** The dropzone's primary text. */
    children?: ReactNode
    /** Optional supporting line of text below the primary text (`children`), e.g. "Up to 10MB". Ignored for `variant="compact"` — Figma has no secondary line for it. */
    secondaryText?: ReactNode
    style?: CSSProperties
    tabIndex?: number
    /** The size of the dropzone. */
    variant?: 'compact' | 'large'
  }
}

/**
 * `FileUploader`'s `variant="compact"`/`variant="large"` trigger: a larger, custom-styled
 * dropzone surface, wired to a real, visually-hidden `<input type="file">` it owns internally.
 */
export function FileUploaderDropzoneInput({
  accept,
  autoFocus,
  capture,
  className,
  children,
  icon,
  maxFiles,
  maxFileSize,
  maxTotalSize,
  minFiles,
  multiple,
  onBlur,
  onChange,
  onClick,
  onFocus,
  onKeyDown,
  required,
  secondaryText,
  showValidity,
  style,
  tabIndex,
  variant = 'large',
  ...rest
}: FileUploaderDropzoneInput.Props) {
  const { files, handleChange } = useFileUploaderInput({ accept, maxFiles, maxFileSize, onChange })

  return (
    <FileInput
      {...rest}
      accept={accept}
      capture={capture}
      className={elFileUploaderDropzoneFileInput}
      maxFiles={maxFiles}
      maxFileSize={maxFileSize}
      maxTotalSize={maxTotalSize}
      minFiles={minFiles}
      multiple={multiple}
      onChange={handleChange}
      required={required}
      showValidity={showValidity}
      tabIndex={-1}
      value={files}
    >
      {({ disabled, isDraggingOver, openFilePicker }) => (
        <ElFileUploaderDropzone
          autoFocus={autoFocus}
          className={className}
          data-is-dragging-over={isDraggingOver}
          data-variant={variant}
          disabled={disabled}
          onBlur={onBlur}
          onClick={(event) => {
            openFilePicker()
            onClick?.(event)
          }}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          style={style}
          tabIndex={tabIndex}
          type="button"
        >
          {icon && <ElFileUploaderDropzoneIcon aria-hidden>{icon}</ElFileUploaderDropzoneIcon>}
          {<ElFileUploaderDropzoneText data-slot="primary">{children}</ElFileUploaderDropzoneText>}
          {secondaryText && variant === 'large' && (
            <ElFileUploaderDropzoneText data-slot="secondary">{secondaryText}</ElFileUploaderDropzoneText>
          )}
        </ElFileUploaderDropzone>
      )}
    </FileInput>
  )
}

FileUploaderDropzoneInput.displayName = 'FileUploader.DropzoneInput'
