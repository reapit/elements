import { GalleryViewerDialogContent } from './content'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/GalleryViewer/Dialog/Content',
  component: GalleryViewerDialogContent,
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
      <div style={{ containerType: 'inline-size', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GalleryViewerDialogContent>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Content area',
  },
}

/**
 * The dialog content will adjust its layout and padding based on the available viewport width. This story
 * demonstrates the constraints within mock containers.
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
              boxSizing: 'border-box',
              border: '1px solid #FA00FF',
              margin: '0 auto',
              containerType: 'inline-size',
            }}
          >
            <Story />
          </div>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>SM–2XL</p>
          <div style={{ boxSizing: 'border-box', border: '1px solid #FA00FF', containerType: 'inline-size' }}>
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
}
