import preview from '#.storybook/preview'
import { FileUploaderSpinner } from './spinner'

const meta = preview.meta({
  title: 'Input and selection/FileUploader/MediaThumbnail/Spinner',
  component: FileUploaderSpinner,
  globals: {
    backgrounds: {
      value: 'dark',
    },
  },
})

/**
 * The dark background mimics `FileUploaderMediaThumbnail`'s overlay, the only context this component is
 * used in — its white stroke is otherwise invisible on a light background.
 */
export const Example = meta.story({})
