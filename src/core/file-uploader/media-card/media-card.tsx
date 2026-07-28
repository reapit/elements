import type { HTMLAttributes, MouseEventHandler } from "react";

import { SeparatorDotIcon } from "#src/icons/separator-dot";

import { getFileUploaderItemStatus } from "../get-file-uploader-item-status";
import { FileUploaderMediaThumbnail } from "../media-thumbnail/media-thumbnail";
import { FileUploaderRemoveButton } from "../remove-button/remove-button";
import {
  ElFileUploaderMediaCard,
  ElFileUploaderMediaCardContent,
  ElFileUploaderMediaCardFileName,
  ElFileUploaderMediaCardSecondaryInfo,
  ElFileUploaderMediaCardStatusText,
} from "./styles";

export namespace FileUploaderMediaCard {
  export type Status = FileUploaderMediaThumbnail.Status;

  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Aspect ratio of the media thumbnail. Useful when you want the height to scale proportionally to the width. */
    aspectRatio?: string;
    /** The file's name, rendered with end-truncation. */
    fileName: string;
    /** The file's size in bytes. Omit to skip rendering a size. */
    fileSize?: number;
    /** The item's lifecycle status. */
    status: Status;
    /**
     * Upload progress as a percentage between `0` and `100`. Only meaningful while `status` is `'uploading'`.
     * Omit to render an indeterminate spinner while uploading.
     */
    progress?: number;
    /** The error message to surface. Only meaningful while `status` is `'error'`. */
    errorMessage?: string;
    /** The thumbnail image URL. */
    src: string;
    /** Alt text for the thumbnail image. Defaults to an empty string, since the filename already labels the item. */
    alt?: string;
    /**
     * A formatted duration (e.g. `"15:39"`), shown as an overlay badge on the thumbnail. Only meaningful for video
     * files — omit for images.
     */
    duration?: string;
    /**
     * BCP 47 locale tag. Use to format the file size and upload percentage. Defaults to the runtime locale
     * when omitted.
     */
    locale?: string;
    /** Called when the remove button is clicked. Omit to render a read-only card with no remove button. */
    onRemove?: MouseEventHandler<HTMLButtonElement>;
  }
}

/**
 * A thumbnail-forward card for `FileUploader` for media files, used within a multi-select file list. Use via
 * `FileUploader.File`.
 */
export function FileUploaderMediaCard({
  aspectRatio = "4 / 3",
  fileName,
  fileSize,
  status,
  progress,
  errorMessage,
  src,
  alt,
  duration,
  onRemove,
  locale,
  ...rest
}: FileUploaderMediaCard.Props) {
  const { sizeText, statusText, isError } = getFileUploaderItemStatus({
    status,
    progress,
    fileSize,
    errorMessage,
    locale,
  });

  return (
    <ElFileUploaderMediaCard {...rest}>
      <FileUploaderMediaThumbnail
        action={
          onRemove ? (
            <FileUploaderRemoveButton aria-label={`Remove ${fileName}`} onClick={onRemove} />
          ) : undefined
        }
        alt={alt}
        aspectRatio={aspectRatio}
        duration={duration}
        progress={progress}
        src={src}
        status={status}
      />
      <ElFileUploaderMediaCardContent>
        <ElFileUploaderMediaCardFileName title={fileName}>
          {fileName}
        </ElFileUploaderMediaCardFileName>
        <ElFileUploaderMediaCardSecondaryInfo data-wrap={isError || undefined}>
          {sizeText && (
            <>
              <ElFileUploaderMediaCardStatusText>{sizeText}</ElFileUploaderMediaCardStatusText>
              <SeparatorDotIcon aria-hidden color="secondary" size="xs" />
            </>
          )}
          <ElFileUploaderMediaCardStatusText data-error={isError || undefined}>
            {statusText}
          </ElFileUploaderMediaCardStatusText>
        </ElFileUploaderMediaCardSecondaryInfo>
      </ElFileUploaderMediaCardContent>
    </ElFileUploaderMediaCard>
  );
}
