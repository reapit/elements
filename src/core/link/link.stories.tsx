import preview from '#.storybook/preview'
import { Link } from './link'

const meta = preview.meta({
  title: 'Navigation/Link',
  component: Link,
  args: {
    children: 'Example Link',
    href: '#',
  },
})

/**
 * By default, links will use the primary variant and base size.
 */
export const Example = meta.story({
  args: {
    children: 'This is a link',
    href: '#',
    isQuiet: false,
    size: 'base',
    variant: 'primary',
  },
})

/**
 * The secondary variant is used for less important actions.
 */
export const Secondary = Example.extend({
  args: {
    variant: 'secondary',
  },
})

/**
 * The reversed variant is intended for use on dark backgrounds.
 */
export const Reversed = Example.extend({
  args: {
    variant: 'reversed',
  },
  globals: {
    backgrounds: {
      value: 'dark',
    },
  },
})

/**
 * There's three sizes for the link: `base`, `sm` and `xs`.
 */
export const Size = Example.extend({
  args: {
    size: 'xs',
  },
})

/**
 * Links can be displayed without a visible underline using the `isQuiet` prop.
 */
export const QuietLinks = Example.extend({
  args: {
    children: 'I am a quiet link',
    isQuiet: true,
  },
})

/**
 * Link text that is too long to fit in the container will simply flow to a new line as normal.
 */
export const Overflow = Example.extend({
  args: {
    children: 'This is a link that is too long to fit in the container',
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '200px' }}>
        <Story />
      </div>
    ),
  ],
})
