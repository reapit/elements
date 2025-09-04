import type { Meta, StoryObj } from '@storybook/react-vite'
import { Option } from '../option'
import { Group } from '../group'

const meta = {
  title: 'Lab/SelectCustom/Group',
  component: Group,
  argTypes: {
    label: {
      control: 'text',
      description: 'The label displayed for the option group.',
    },
    children: {
      control: false,
      description: 'The options contained within the group.',
    },
  },
} satisfies Meta<typeof Group>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Default story for the `Group` component.
 *
 * Displays a group labeled "Group 1" containing two options.
 */
export const Default: Story = {
  args: {
    label: 'Group 1',
    children: (
      <>
        <Option value="option1" label="Option 1" />
        <Option value="option2" label="Option 2" />
      </>
    ),
  },
}
