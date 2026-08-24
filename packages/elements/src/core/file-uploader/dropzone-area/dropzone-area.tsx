import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import {
  ElFileUploaderDropzone,
  ElFileUploaderDropzoneIcon,
  ElFileUploaderDropzoneText,
} from "./styles";

export namespace FileUploaderDropzoneArea {
  export interface Props extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "type"
  > {
    /** The dropzone's primary text. */
    children?: ReactNode;
    /** The icon shown in the dropzone's icon badge. */
    icon?: ReactNode;
    /** Whether a dragged file is currently over the dropzone. */
    isDraggingOver?: boolean;
    /** Optional supporting line of text below the primary text (`children`). Ignored for `variant="compact"` — Figma has no secondary line for it. */
    secondaryText?: ReactNode;
    /** The size of the dropzone. */
    variant?: "compact" | "large";
  }
}

/**
 * The trigger button shared by `FileUploaderDropzoneInput` and `FileUploaderSingleSelectMediaInput`'s
 * empty state: an optional icon badge, primary text, and optional secondary text inside the dashed
 * drop area surface.
 */
export const FileUploaderDropzoneArea = forwardRef<
  HTMLButtonElement,
  FileUploaderDropzoneArea.Props
>(function FileUploaderDropzoneArea(
  { children, icon, isDraggingOver, secondaryText, variant = "large", ...rest },
  ref,
) {
  return (
    <ElFileUploaderDropzone
      {...rest}
      data-is-dragging-over={isDraggingOver}
      data-variant={variant}
      ref={ref}
      type="button"
    >
      {icon && <ElFileUploaderDropzoneIcon aria-hidden>{icon}</ElFileUploaderDropzoneIcon>}
      <ElFileUploaderDropzoneText data-slot="primary">{children}</ElFileUploaderDropzoneText>
      {secondaryText && variant === "large" && (
        <ElFileUploaderDropzoneText data-slot="secondary">
          {secondaryText}
        </ElFileUploaderDropzoneText>
      )}
    </ElFileUploaderDropzone>
  );
});

FileUploaderDropzoneArea.displayName = "FileUploader.DropzoneArea";
