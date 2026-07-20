import { ElFileUploaderFileCardLeadingElement, ElFileUploaderFileCardLeadingElementLabel } from './styles'
import { FileIcon } from '#src/icons/file'

import type { IconProps as ElIconProps } from '#src/icons/make-icon/make-icon'
import type { ComponentType } from 'react'

export namespace FileUploaderFileCardLeadingElement {
  /** A real thumbnail, for image/video files that can be previewed. */
  export interface ImageProps {
    type: 'image'
    src: string
    alt?: string
  }

  /** A short text badge (e.g. `"PDF"`), for recognised-but-non-previewable file types. */
  export interface FileTypeProps {
    type: 'file-type'
    label: string
  }

  /** A generic icon fallback, for file types with no more specific representation. */
  export interface IconProps {
    type: 'icon'
    /** The icon component to render. Defaults to `FileIcon`. */
    icon?: ComponentType<ElIconProps>
  }

  export type Props = ImageProps | FileTypeProps | IconProps
}

/**
 * The leading thumbnail/icon/badge for `FileUploader.FileCard`, matching Figma's `FileCardLeadingElement`
 * component. Not independently exported — see `FileUploader.FileCard`.
 */
export function FileUploaderFileCardLeadingElement(props: FileUploaderFileCardLeadingElement.Props) {
  switch (props.type) {
    case 'image':
      return (
        <ElFileUploaderFileCardLeadingElement data-type="image">
          <img alt={props.alt ?? ''} src={props.src} />
        </ElFileUploaderFileCardLeadingElement>
      )
    case 'file-type':
      return (
        <ElFileUploaderFileCardLeadingElement data-type="file-type">
          <ElFileUploaderFileCardLeadingElementLabel>{props.label}</ElFileUploaderFileCardLeadingElementLabel>
        </ElFileUploaderFileCardLeadingElement>
      )
    case 'icon': {
      const Icon = props.icon ?? FileIcon
      return (
        <ElFileUploaderFileCardLeadingElement data-type="icon">
          <Icon aria-hidden color="secondary" size="md" />
        </ElFileUploaderFileCardLeadingElement>
      )
    }
  }
}

FileUploaderFileCardLeadingElement.displayName = 'FileUploader.FileCardLeadingElement'
