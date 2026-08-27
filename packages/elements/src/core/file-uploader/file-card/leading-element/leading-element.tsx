import type { ComponentType } from "react";

import { FileIcon } from "#src/icons/file";
import type { IconProps as ElIconProps } from "#src/icons/make-icon";
import { PhotoIcon } from "#src/icons/photo";
import { Image } from "#src/utils/image";

import {
  ElFileUploaderFileCardLeadingElement,
  ElFileUploaderFileCardLeadingElementLabel,
} from "./styles";

export namespace FileUploaderFileCardLeadingElement {
  /** A real thumbnail, for image/video files that can be previewed. */
  export interface ImageProps {
    type: "image";
    src: string;
    alt?: string;
  }

  /** A short text badge (e.g. `"PDF"`), for recognised-but-non-previewable file types. */
  export interface FileTypeProps {
    type: "file-type";
    label: string;
  }

  /** A generic icon fallback, for file types with no more specific representation. */
  export interface IconProps {
    type: "icon";
    /** The icon component to render. Defaults to `FileIcon`. */
    icon?: ComponentType<ElIconProps>;
  }

  export type Props = ImageProps | FileTypeProps | IconProps;
}

/**
 * The leading thumbnail/icon/badge for `FileUploader.FileCard`, matching Figma's `FileCardLeadingElement`
 * component. Not independently exported; see `FileUploader.FileCard`.
 */
export function FileUploaderFileCardLeadingElement(
  props: FileUploaderFileCardLeadingElement.Props,
) {
  switch (props.type) {
    case "image":
      return (
        <ElFileUploaderFileCardLeadingElement data-type="image">
          <Image
            alt={props.alt ?? ""}
            fallback={<Image.Fallback icon={<PhotoIcon size="md" />} />}
            objectFit="cover"
            src={props.src}
            width="100%"
            height="100%"
          />
        </ElFileUploaderFileCardLeadingElement>
      );
    case "file-type":
      return (
        <ElFileUploaderFileCardLeadingElement data-type="file-type">
          <ElFileUploaderFileCardLeadingElementLabel>
            {props.label}
          </ElFileUploaderFileCardLeadingElementLabel>
        </ElFileUploaderFileCardLeadingElement>
      );
    case "icon": {
      const Icon = props.icon ?? FileIcon;
      return (
        <ElFileUploaderFileCardLeadingElement data-type="icon">
          <Icon aria-hidden color="secondary" size="md" />
        </ElFileUploaderFileCardLeadingElement>
      );
    }
  }
}

FileUploaderFileCardLeadingElement.displayName = "FileUploader.FileCardLeadingElement";
