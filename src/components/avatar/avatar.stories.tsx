import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '.'
import { Icon } from '../icon'

export default {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    children: 'AD',
  },
} as Meta<typeof Avatar>

type Story = StoryObj<typeof Avatar>

/**
 * An avatar component to be used typically with a `Card` or `Nav` component.
 * The default variant renders a circle with children.
 *
 * There are multiple variants that can be used by utilizing the `data-` props
 * such as `size`, `colour`, and `shape` (see the HTML version of each version).
 * In addition to text, it also accepts an Icon as a child.
 */
export const Default: Story = {}

export const AvatarWithIcon: Story = {
  render: (props) => (
    <Avatar {...props}>
      <Icon icon="contact" />
    </Avatar>
  ),
}

export const AvatarColour: Story = {
  args: {
    colour: 'purple',
  },
}

export const AvatarShape: Story = {
  args: {
    shape: 'square',
  },
}

export const AvatarSize: Story = {
  args: {
    size: 'small',
  },
}
