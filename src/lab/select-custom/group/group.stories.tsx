import type { Meta, StoryObj } from '@storybook/react-vite'
import { ExperimentalSelectCustomOption } from '../option'
import { ExperimentalSelectCustomOptionGroup } from '../group'

const meta = {
  title: 'Lab/SelectCustom/Group',
  component: ExperimentalSelectCustomOptionGroup,
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
} satisfies Meta<typeof ExperimentalSelectCustomOptionGroup>

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
        <ExperimentalSelectCustomOption value="option1" label="Option 1" />
        <ExperimentalSelectCustomOption value="option2" label="Option 2" />
      </>
    ),
  },
}
