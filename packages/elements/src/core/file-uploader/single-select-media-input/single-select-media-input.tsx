import { useEffect, useRef, useSyncExternalStore } from "react";
import type {
  CSSProperties,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from "react";

import { FileInput } from "#src/utils/file-input";

import { useFileUploaderContext } from "../context";
import { elFileUploaderDropzoneFileInput, FileUploaderDropzoneArea } from "../dropzone-area";
import type {
  FileUploaderTriggerAttributesToOmit,
  BaseFileUploaderTriggerProps,
} from "../file-uploader-trigger-props";
import { useFileUploaderInput } from "../use-file-uploader-input";
import { useObjectUrl } from "../use-object-url";
import { FileUploaderSingleSelectMediaCard } from "./media-card";

type FileInputAttributesToOmit =
  | FileUploaderTriggerAttributesToOmit
  | "maxFiles"
  | "minFiles"
  | "multiple";

export namespace FileUploaderSingleSelectMediaInput {
  // `onBlur`/`onClick`/`onFocus`/`onKeyDown` are redeclared below — rather than left to
  // `BaseFileUploaderTriggerProps`'s generic docs — because they're only wired to the empty
  // placeholder trigger; `FileUploaderSingleSelectMediaCard`'s filled state doesn't accept any of
  // them.
  export interface Props
    extends Omit<FileInput.Props, FileInputAttributesToOmit>, BaseFileUploaderTriggerProps {
    /** Alt text for the filled state's thumbnail image. Defaults to an empty string, since the filename already labels the item. */
    alt?: string;
    /**
     * The aspect ratio of the empty dropzone and the selected file's thumbnail.
     * @default '4 / 3'
     */
    aspectRatio?: string;
    className?: string;
    /** The icon shown in the empty state's icon badge. */
    icon?: ReactNode;
    /** The empty state's primary text. */
    children?: ReactNode;
    /** Called when the empty placeholder trigger is blurred. No-op once a file is selected — see `FileUploaderSingleSelectMediaCard` for the filled state's own focus handling. */
    onBlur?: FocusEventHandler<HTMLButtonElement>;
    /** Called when the empty placeholder trigger is clicked, in addition to opening the file picker. */
    onClick?: MouseEventHandler<HTMLButtonElement>;
    /** Called when the empty placeholder trigger is focused. */
    onFocus?: FocusEventHandler<HTMLButtonElement>;
    /** Called on a key down event on the empty placeholder trigger. */
    onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
    /** Optional supporting line of text below the primary text (`children`), shown only in the empty state. */
    secondaryText?: ReactNode;
    style?: CSSProperties;
  }
}

/**
 * `FileUploader`'s single-select media trigger: swaps between the empty drag-and-drop prompt (styled the same
 * as `FileUploaderDropzoneInput`'s `variant="large"`) and, once a file is selected, a full-bleed
 * `FileUploaderSingleSelectMediaCard` in its place — whose whole surface re-opens the picker to replace the
 * file, alongside its own remove button. Built directly on `FileInput`'s `children` render prop, with
 * `maxFiles` fixed at `1` — see "Single-select composition" in `ARCHITECTURE.md`.
 */
export function FileUploaderSingleSelectMediaInput({
  accept,
  alt,
  aspectRatio = "4 / 3",
  autoFocus,
  capture,
  children,
  className,
  icon,
  maxFileSize,
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
  ...rest
}: FileUploaderSingleSelectMediaInput.Props) {
  const { queue, triggerId } = useFileUploaderContext("FileUploader.SingleSelectMediaInput");
  const { files, handleChange } = useFileUploaderInput({
    accept,
    maxFiles: 1,
    maxFileSize,
    onChange,
  });
  const items = useSyncExternalStore(queue.subscribe, queue.getItemsSnapshot);
  const item = items[0];

  const objectUrl = useObjectUrl(item?.file, true);

  // Restores focus to the empty placeholder trigger whenever the filled card — which the remove button
  // that had focus lives inside of — unmounts and swaps back to it, since a removed element takes browser
  // focus with it (back to the document body) rather than leaving it anywhere meaningful.
  const emptyTriggerRef = useRef<HTMLButtonElement>(null);
  const hadItemRef = useRef(!!item);
  useEffect(() => {
    if (hadItemRef.current && !item) emptyTriggerRef.current?.focus();
    hadItemRef.current = !!item;
  }, [item]);

  return (
    <FileInput
      {...rest}
      accept={accept}
      capture={capture}
      className={elFileUploaderDropzoneFileInput}
      maxFileSize={maxFileSize}
      maxFiles={1}
      onChange={handleChange}
      required={required}
      showValidity={showValidity}
      tabIndex={-1}
      value={files}
    >
      {({ disabled, isDraggingOver, openFilePicker }) =>
        item ? (
          <FileUploaderSingleSelectMediaCard
            alt={alt}
            disabled={disabled}
            fileName={item.file.name}
            isDraggingOver={isDraggingOver}
            onRemove={() => queue.removeItem(item.id)}
            onReplace={openFilePicker}
            progress={item.status === "uploading" ? item.progress : undefined}
            src={objectUrl ?? ""}
            status={item.status}
          />
        ) : (
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
            ref={emptyTriggerRef}
            secondaryText={secondaryText}
            style={{ ...style, aspectRatio }}
            tabIndex={tabIndex}
            variant="large"
          >
            {children}
          </FileUploaderDropzoneArea>
        )
      }
    </FileInput>
  );
}

FileUploaderSingleSelectMediaInput.displayName = "FileUploader.SingleSelectMediaInput";
