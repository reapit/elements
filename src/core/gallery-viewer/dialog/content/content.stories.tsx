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
