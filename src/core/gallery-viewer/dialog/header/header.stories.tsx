import { GalleryViewerDialogContext } from '../context'
import { GalleryViewerDialogHeader } from './header'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/GalleryViewer/Dialog/Header',
  component: GalleryViewerDialogHeader,
  argTypes: {
    children: {
      control: 'text',
    },
  },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
  decorators: [
    (Story) => (
      <GalleryViewerDialogContext.Provider value={{ titleId: 'story-title-id' }}>
        <Story />
      </GalleryViewerDialogContext.Provider>
    ),
  ],
} satisfies Meta<typeof GalleryViewerDialogHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: '10 High Street, Great Horwood, Buckinghamshire, MK17 0QL',
  },
}

/**
 * When the title text is very long and the container is constrained, the text will truncate with an ellipsis.
 */
export const Truncation: Story = {
  args: {
    ...Example.args,
    children: '10 High Street, Great Horwood, Buckinghamshire, MK17 0QL, London, UK, Earth, Solar System',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          containerType: 'inline-size',
          boxSizing: 'border-box',
          border: '1px solid #FA00FF',
          width: '320px',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

/**
 * The dialog header will adjust its layout based on the inline-size of the gallery viewer dialog. This story demonstrates
 * the layout changes (e.g. padding adjustments) within containers that mimic different breakpoints.
 */
export const DynamicLayout: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          color: '#FA00FF',
          gridAutoFlow: 'column',
          gridTemplateColumns: '320px 800px',
          justifyContent: 'start',
          gap: 'var(--spacing-6)',
          width: 'min-content',
        }}
      >
        <div>
          <p style={{ textAlign: 'center' }}>XS</p>
          <div
            style={{
              containerType: 'inline-size',
              boxSizing: 'content-box',
              border: '1px solid #FA00FF',
              margin: '0 auto',
            }}
          >
            <Story />
          </div>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>SM–2XL</p>
          <div
            style={{
              containerType: 'inline-size',
              boxSizing: 'content-box',
              border: '1px solid #FA00FF',
            }}
          >
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
}
