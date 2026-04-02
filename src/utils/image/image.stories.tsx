import { Image } from './image'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Utils/Image',
  component: Image,
  argTypes: {
    objectFit: {
      control: 'select',
    },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof Image>

/**
 * By default, the image uses `object-fit: contain` so the entire image is visible
 * within the container without any cropping, regardless of the image's aspect ratio.
 */
export const Example: Story = {
  args: {
    src: 'https://picsum.photos/seed/ds-image/400/400',
    alt: 'A sample landscape photograph',
    objectFit: 'contain',
    width: '300px',
    height: '200px',
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
 * While the image accepts an explicit width and height, it is constrained to the size of its container.
 * This allows ancestors to control the size the image is displayed at.
 */
export const Sizing: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story) => (
      <div style={{ border: '1px solid #FA00FF', width: '120px', height: '80px' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * `objectFit` determines how the image is resized to fit its container. Here, `cover` is used to
 * size the image to fill its content box while maintaining its aspect ratio.
 */
export const ObjectFit: Story = {
  args: {
    ...Example.args,
    src: 'https://picsum.photos/seed/ds-image/400/400',
    objectFit: 'cover',
  },
}

/**
 * If the image fails to load, a default fallback UI is shown. If the image has alt text, this fallback
 * will be announced to assistive technologies, and the alt text will be included in the message. If the
 * image is decorative (`alt=""`), the fallback will not be announced.
 */
export const Fallback: Story = {
  args: {
    ...Example.args,
    alt: 'An image that fails to load',
    src: 'https://example.invalid/does-not-exist.jpg',
  },
}

/**
 * Use `fallback` to provide custom fallback content.
 */
export const CustomFallback: Story = {
  args: {
    ...Example.args,
    alt: 'An image that fails to load',
    src: 'https://example.invalid/does-not-exist.jpg',
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
