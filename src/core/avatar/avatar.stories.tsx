import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from '.'
import { DeprecatedIcon } from '../../deprecated/icon'

export default {
  title: 'Core/Avatar',
  component: Avatar,
  args: {
    children: 'AD',
  },
} as Meta<typeof Avatar>

type Story = StoryObj<typeof Avatar>

/**
 * The simplest avatar is one that displays some letters, typically the initials of the user or
 * other entity represented by the avatar.
 */
export const Example: Story = {
  args: {
    children: 'AB',
    colour: 'default',
    shape: 'circle',
    size: 'medium',
  },
}

/**
 * The avatar can also be used to display an icon, which is useful when representing an entity whose
 * details accompany the avatar.
 */
export const Icons: Story = {
  args: {
    ...Example.args,
    children: <DeprecatedIcon icon="contact" />,
  },
}

/**
 * There are two colours supported by the avatar: `default` and `purple`, which is shown here.
 */
export const Colour: Story = {
  args: {
    ...Example.args,
    colour: 'purple',
  },
}

/**
 * When using an icon in a coloured avatar, the icon should inherit the colour of the avatar.
 */
export const ColouredIcons: Story = {
  args: {
    ...Example.args,
    children: <DeprecatedIcon icon="contact" />,
    colour: 'purple',
  },
}

/**
 * There are two shapes supported by the avatar: `circle` (the default) and `square`, which is shown here.
 */
export const Shape: Story = {
  args: {
    ...Example.args,
    shape: 'square',
  },
}

/**
 * There are two sizes supported by the avatar: `medium` (the default) and `small`, which is shown here.
 */
export const Size: Story = {
  args: {
    ...Example.args,
    size: 'small',
  },
}
