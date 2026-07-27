import preview from '#.storybook/preview'
import { FileUploaderSingleSelectMediaCard } from './media-card'

const meta = preview.meta({
  title: 'Input and selection/FileUploader/SingleSelectMediaCard',
  component: FileUploaderSingleSelectMediaCard,
})

/**
 * The whole card is a single trigger for replacing the file — hover, focus, or drag a file over it to reveal
 * the "Replace" affordance.
 */
export const Example = meta.story({
  args: {
    fileName: 'Property-photo.jpg',
    src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=272&fit=crop',
    status: 'uploaded' as const,
    onRemove: () => {},
    onReplace: () => {},
  },
  // Fills its container's width/height by design, so we constrain it here to avoid it taking up the entire
  // Storybook canvas.
  decorators: [
    (Story) => (
      <div style={{ width: '200px', height: '180px' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * `isDraggingOver` reveals the "Replace" affordance the same way hover/focus does — wired up by
 * `FileUploaderSingleSelectMediaInput` from `FileInput`'s `isDraggingOver` render prop while a file is
 * dragged over the trigger.
 */
export const DraggingOver = Example.extend({
  name: 'Dragging over',
  args: {
    isDraggingOver: true,
  },
})

/**
 * A `duration` shows an overlay badge on the thumbnail, for video files.
 */
export const Video = Example.extend({
  args: {
    duration: '15:39',
    fileName: 'Property-tour.mp4',
  },
})

/**
 * An `error` status shows a red border and centred error icon, matching `FileUploader.MediaCard`. The
 * "Replace" affordance is suppressed — removing the errored file is still available.
 */
export const Error = Example.extend({
  args: {
    status: 'error',
  },
})

/**
 * `disabled` suppresses both the replace and remove affordances without hiding the selected file.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
})
