import { cx } from "@linaria/core";
import type {
  ComponentProps,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";

import { Button } from "#src/core/button";
import { FileInput } from "#src/utils/file-input";

import { useFileUploaderContext } from "../context";
import { useFileUploaderInput } from "../use-file-uploader-input";
import { elFileUploaderButtonInput } from "./styles";

type ButtonAttributesToForward =
  | "aria-disabled"
  | "children"
  | "className"
  | "hasNoPadding"
  | "iconLeft"
  | "iconRight"
  | "isBusy"
  | "isDestructive"
  | "size"
  | "style"
  | "useAIStyle"
  | "useLinkStyle"
  | "variant";

type FileInputAttributesToOmit =
  | "autoFocus"
  | "children"
  | "className"
  | "defaultValue"
  | "onBlur"
  | "onClick"
  | "onFocus"
  | "onKeyDown"
  | "size"
  | "style"
  | "tabIndex"
  | "value";

export namespace FileUploaderButtonInput {
  export interface Props
    extends
      Pick<ComponentProps<typeof Button>, ButtonAttributesToForward>,
      Omit<FileInput.Props, FileInputAttributesToOmit> {
    autoFocus?: boolean;
    onBlur?: FocusEventHandler<HTMLButtonElement>;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    onFocus?: FocusEventHandler<HTMLButtonElement>;
    onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
    tabIndex?: number;
  }
}

/**
 * `FileUploader`'s standard button trigger.
 */
export function FileUploaderButtonInput({
  "aria-disabled": ariaDisabled,
  accept,
  autoFocus,
  capture,
  children,
  className,
  hasNoPadding,
  iconLeft,
  iconRight,
  isBusy,
  isDestructive,
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
  showValidity,
  size = "medium",
  style,
  tabIndex,
  useAIStyle,
  useLinkStyle,
  variant = "secondary",
  ...rest
}: FileUploaderButtonInput.Props) {
  const { files, handleChange } = useFileUploaderInput({
    accept,
    maxFiles,
    maxFileSize,
    multiple,
    onChange,
  });
  const { triggerId } = useFileUploaderContext("FileUploader.ButtonInput");

  return (
    <FileInput
      {...rest}
      accept={accept}
      capture={capture}
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
        <Button
          aria-disabled={ariaDisabled}
          autoFocus={autoFocus}
          className={cx(elFileUploaderButtonInput, className)}
          data-is-dragging-over={isDraggingOver}
          disabled={disabled}
          hasNoPadding={hasNoPadding}
          iconLeft={iconLeft}
          iconRight={iconRight}
          id={triggerId}
          isBusy={isBusy}
          isDestructive={isDestructive}
          onBlur={onBlur}
          onClick={(event) => {
            openFilePicker();
            onClick?.(event);
          }}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          size={size}
          style={style}
          tabIndex={tabIndex}
          type="button"
          useAIStyle={useAIStyle}
          useLinkStyle={useLinkStyle}
          variant={variant}
        >
          {children}
        </Button>
      )}
    </FileInput>
  );
}

FileUploaderButtonInput.displayName = "FileUploader.ButtonInput";
