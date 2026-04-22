import preview from '#.storybook/preview'
import { Avatar } from '.'
import { ContactIcon } from '#src/icons/contact'

const meta = preview.meta({
  title: 'Core/Avatar',
  component: Avatar,
  args: {
    children: 'AD',
  },
})

/**
 * The simplest avatar is one that displays some letters, typically the initials of the user or
 * other entity represented by the avatar.
 */
export const Example = meta.story({
  args: {
    children: 'AB',
    colour: 'default',
    shape: 'circle',
    size: 'medium',
  },
})

/**
 * The avatar can also be used to display an icon, which is useful when representing an entity whose
 * details accompany the avatar.
 */
export const Icons = Example.extend({
  args: {
    children: <ContactIcon />,
  },
})

/**
 * There are two colours supported by the avatar: `default` and `purple`, which is shown here.
 */
export const Colour = Example.extend({
  args: {
    colour: 'primary',
  },
})

/**
 * When using an icon in a coloured avatar, the icon should inherit the colour of the avatar.
 */
export const ColouredIcons = Example.extend({
  args: {
    children: <ContactIcon />,
    colour: 'primary',
  },
})

/**
 * There are two shapes supported by the avatar: `circle` (the default) and `square`, which is shown here.
 */
export const Shape = Example.extend({
  args: {
    shape: 'square',
  },
})

/**
 * There are two sizes supported by the avatar: `medium` (the default) and `small`, which is shown here.
 */
export const Size = Example.extend({
  args: {
    size: 'small',
  },
})
