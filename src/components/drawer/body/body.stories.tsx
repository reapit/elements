import DrawerBody from './body'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Drawer/Body',
  component: DrawerBody,
  argTypes: {
    children: {
      control: 'select',
      mapping: {
        Detail: 'TODO: Detail drawer content',
        Form: 'TODO: Form drawer content',
        Empty: null,
      },
      options: ['Detail', 'Form', 'Empty'],
    },
  },
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
} satisfies Meta<typeof DrawerBody>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Content',
  },
}
