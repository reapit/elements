import type { CSSProperties, ReactNode } from "react";

import { FileInput } from "#src/utils/file-input";

import { useFileUploaderContext } from "../context";
import { elFileUploaderDropzoneFileInput, FileUploaderDropzoneArea } from "../dropzone-area";
import type {
  FileUploaderTriggerAttributesToOmit,
  BaseFileUploaderTriggerProps,
} from "../file-uploader-trigger-props";
import { useFileUploaderInput } from "../use-file-uploader-input";

export namespace FileUploaderDropzoneInput {
  export interface Props
    extends
      Omit<FileInput.Props, FileUploaderTriggerAttributesToOmit>,
      BaseFileUploaderTriggerProps {
    className?: string;
    /** The icon shown in the dropzone's icon badge. */
    icon?: ReactNode;
    /** The dropzone's primary text. */
    children?: ReactNode;
    /** Optional supporting line of text below the primary text (`children`), e.g. "Up to 10MB". Ignored for `variant="compact"`: Figma has no secondary line for it. */
    secondaryText?: ReactNode;
    style?: CSSProperties;
    /** The size of the dropzone. */
    variant?: "compact" | "large";
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
  variant = "large",
  ...rest
}: FileUploaderDropzoneInput.Props) {
  const { files, handleChange } = useFileUploaderInput({
    accept,
    maxFiles,
    maxFileSize,
    multiple,
    onChange,
  });
  const { triggerId } = useFileUploaderContext("FileUploader.DropzoneInput");

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
        <FileUploaderDropzoneArea
          autoFocus={autoFocus}
          className={className}
          disabled={disabled}
          icon={icon}
          id={triggerId}
          isDraggingOver={isDraggingOver}
          onBlur={onBlur}
          onClick={(event) => {
            openFilePicker();
            onClick?.(event);
          }}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          secondaryText={secondaryText}
          style={style}
          tabIndex={tabIndex}
          variant={variant}
        >
          {children}
        </FileUploaderDropzoneArea>
      )}
    </FileInput>
  );
}

FileUploaderDropzoneInput.displayName = "FileUploader.DropzoneInput";
