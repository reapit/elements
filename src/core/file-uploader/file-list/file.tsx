import { forwardRef, useRef } from "react";
import type { InputHTMLAttributes, MouseEventHandler } from "react";

import { useFileUploaderContext } from "../context";
import { FileUploaderFileCard } from "../file-card/file-card";
import { FileUploaderFileCardLeadingElement } from "../file-card/leading-element/leading-element";
import type { FileUploadQueue } from "../file-upload-queue";
import { FileUploaderMediaCard } from "../media-card/media-card";
import { useObjectUrl } from "../use-object-url";
import { useFileUploaderFileListContext } from "./context";
import { ElFileUploaderFileListItem } from "./styles";
import { transferFocusAfterRemoval } from "./transfer-focus-after-removal";

export namespace FileUploaderFile {
  export interface Props extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "children" | "type" | "value"
  > {
    /**
     * Aspect ratio of media thumbnails. Only applies to the file list's media variant
     * @default '4 / 3'
     */
    aspectRatio?: string;
    /** The error text to display on the file card. */
    errorText?: string;
    /** The item to render — typically one yielded by `FileUploader.FileList`'s `children` render prop. */
    item: FileUploadQueue.Item;
    /**
     * Called when the remove button is clicked, in addition to the built-in removal behaviour
     * (`queue.removeItem` + focus transfer). Call `event.preventDefault()` to suppress both the
     * built-in removal and focus transfer — for example, to show a confirmation dialogue before
     * deciding whether to remove the item.
     */
    onRemove?: MouseEventHandler<HTMLButtonElement>;
  }
}

/**
 * Renders one queue item as a `FileCard` row or, when the parent `FileUploader.FileList`'s
 * `variant` is `'media'`, a `MediaCard` tile — including its own thumbnail object URL lifecycle.
 * Must be rendered inside a `FileUploader.FileList`, which it reads `variant`/`name` from, and a
 * `FileUploader`, which it reads `locale` from.
 *
 * Also renders its own hidden `<input type="hidden">`, valued at the item's `fileId`, whenever a
 * `name` is available, the item is a successfully-uploaded, currently-valid one, and it actually has
 * a `fileId`. If a `fileId` is not provided (e.g. the `FileUploader`'s `getFileId` fails), the item
 * still counts as uploaded but contributes nothing to `FormData`. The rest of the input's attributes
 * are forwarded onto the hidden input to allow integration with form libraries.
 */
export const FileUploaderFile = forwardRef<HTMLInputElement, FileUploaderFile.Props>(
  function FileUploaderFile(
    { aspectRatio = "4 / 3", errorText: errorMessage, item, name, onRemove, style, ...inputProps },
    ref,
  ) {
    const { locale, queue, triggerId } = useFileUploaderContext("FileUploader.File");
    const {
      name: contextName,
      variant,
      listRef,
    } = useFileUploaderFileListContext("FileUploader.File");
    const isMedia = variant === "media";
    const isImage = item.file.type.startsWith("image/");
    const objectUrl = useObjectUrl(item.file, isMedia || isImage);

    const listItemRef = useRef<HTMLLIElement>(null);

    const inputName = name ?? contextName;
    const hiddenInput =
      inputName && item.status === "uploaded" && !item.validationError && item.fileId ? (
        <input {...inputProps} ref={ref} name={inputName} type="hidden" value={item.fileId} />
      ) : null;

    const handleRemove: MouseEventHandler<HTMLButtonElement> = (event) => {
      onRemove?.(event);
      if (event.defaultPrevented) return;
      queue.removeItem(item.id);
      transferFocusAfterRemoval(listRef, listItemRef, triggerId);
    };

    if (isMedia) {
      return (
        <ElFileUploaderFileListItem ref={listItemRef}>
          {hiddenInput}
          <FileUploaderMediaCard
            aspectRatio={aspectRatio}
            errorMessage={errorMessage}
            fileName={item.file.name}
            fileSize={item.file.size}
            locale={locale}
            onRemove={handleRemove}
            progress={item.status === "uploading" ? item.progress : undefined}
            src={objectUrl ?? ""}
            status={item.status}
            style={style}
          />
        </ElFileUploaderFileListItem>
      );
    }

    return (
      <li ref={listItemRef}>
        {hiddenInput}
        <FileUploaderFileCard
          errorMessage={errorMessage}
          fileName={item.file.name}
          fileSize={item.file.size}
          leadingElement={
            isImage ? (
              <FileUploaderFileCardLeadingElement src={objectUrl ?? ""} type="image" />
            ) : (
              <FileUploaderFileCardLeadingElement type="icon" />
            )
          }
          locale={locale}
          onRemove={handleRemove}
          progress={item.status === "uploading" ? item.progress : undefined}
          status={item.status}
        />
      </li>
    );
  },
);

FileUploaderFile.displayName = "FileUploader.File";
