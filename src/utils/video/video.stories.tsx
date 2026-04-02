import { Video } from './video'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Utils/Video',
  component: Video,
  argTypes: {
    objectFit: {
      control: 'select',
    },
    src: { control: 'text' },
  },
} satisfies Meta<typeof Video>

export default meta
type Story = StoryObj<typeof Video>

/**
 * By default, the video uses `object-fit: contain` so the entire video is visible
 * within the container without any cropping, regardless of the video's aspect ratio.
 */
export const Example: Story = {
  args: {
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    controls: true,
    objectFit: 'contain',
    width: '400px',
    height: '300px',
  },
  decorators: [
    (Story) => (
      <div style={{ border: '1px solid #FA00FF', width: 'fit-content' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * While the video accepts an explicit width and height, it is constrained to the size of its container.
 * This allows ancestors to control the size the video is displayed at.
 */
export const Sizing: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story) => (
      <div style={{ border: '1px solid #FA00FF', width: '200px', height: '150px' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * `objectFit` determines how the video is resized to fit its container. Here, `cover` is used to
 * size the video to fill its content box while maintaining its aspect ratio.
 */
export const ObjectFit: Story = {
  args: {
    ...Example.args,
    objectFit: 'cover',
  },
}

/**
 * Pass `<source>` elements as `children` to let the browser select the most suitable format.
 * The error fallback is shown when all sources have been exhausted.
 * Note: `src` is optional when `<source>` children are used.
 */
export const Sources: Story = {
  args: {
    controls: true,
    objectFit: 'contain',
    width: '400px',
    height: '300px',
    children: (
      <>
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ border: '1px solid #FA00FF', width: 'fit-content' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * If the video fails to load, a default fallback UI is shown. The fallback uses
 * `aria-live="polite"` and `role="status"` so assistive technology announces
 * the error state.
 */
export const Fallback: Story = {
  args: {
    ...Sources.args,
    children: (
      <>
        <source src="https://example.invalid/does-not-exist.webm" type="video/webm" />
        <source src="https://example.invalid/does-not-exist.mp4" type="video/mp4" />
      </>
    ),
  },
}

/**
 * Use `fallback` to provide custom fallback content.
 */
export const CustomFallback: Story = {
  args: {
    ...Example.args,
    src: 'https://example.invalid/does-not-exist.mp4',
    fallback: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'var(--colour-fill-neutral-light)',
          borderRadius: 'var(--border-radius-l)',
          color: 'var(--colour-text-placeholder)',
        }}
      >
        Custom fallback content
      </div>
    ),
  },
}
