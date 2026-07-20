import preview from '#.storybook/preview'
import { FileUploaderFileCardLeadingElement } from './leading-element'
import { FilePdfIcon } from '#src/icons/file-pdf'

const meta = preview.meta({
  title: 'Input and selection/FileUploader/FileCard/LeadingElement',
  component: FileUploaderFileCardLeadingElement,
})

/**
 * A real thumbnail, used for image/video files that can be previewed.
 */
export const Image = meta.story({
  args: {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=80&h=80&fit=crop',
    alt: '',
  },
})

/**
 * A short text badge, used for recognised-but-non-previewable file types.
 */
export const FileType = meta.story({
  args: {
    type: 'file-type',
    label: 'PDF',
  },
})

/**
 * A generic file icon fallback, used for file types with no more specific representation.
 */
export const Icon = meta.story({
  args: {
    type: 'icon',
  },
})

/**
 * Consumers can supply their own `icon` component to render in place of the default `FileIcon`, for example to
 * reflect a recognised file type.
 */
export const CustomIcon = meta.story({
  args: {
    type: 'icon',
    icon: FilePdfIcon,
  },
})
