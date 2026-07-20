import preview from '#.storybook/preview'
import { FileUploaderSpinner } from './spinner'

const meta = preview.meta({
  title: 'Input and selection/FileUploader/MediaCard/Spinner',
  component: FileUploaderSpinner,
  globals: {
    backgrounds: {
      value: 'dark',
    },
  },
})

/**
 * The dark background mimics `FileUploader.MediaCard`'s thumbnail overlay, the only context this component is
 * used in — its white stroke is otherwise invisible on a light background.
 */
export const Example = meta.story({})
