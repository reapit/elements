import { Link } from './link'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Link',
  component: Link,
  args: {
    children: 'Example Link',
    href: '#',
  },
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<typeof meta>

/**
 * By default, links will use the primary variant and base size.
 */
export const Example: Story = {
  args: {
    children: 'This is a link',
    href: globalThis.top?.location.href!,
    isQuiet: false,
    size: 'base',
    variant: 'primary',
  },
}

/**
 * The secondary variant is used for less important actions.
 */
export const Secondary: Story = {
  args: {
    ...Example.args,
    variant: 'secondary',
  },
}

/**
 * The reversed variant is intended for use on dark backgrounds.
 */
export const Reversed: Story = {
  args: {
    ...Example.args,
    variant: 'reversed',
  },
  globals: {
    backgrounds: {
      value: 'dark',
    },
  },
}

/**
 * There's three sizes for the link: `base`, `sm` and `xs`.
 */
export const Size: Story = {
  args: {
    ...Example.args,
    size: 'xs',
  },
}

/**
 * Links can be displayed without a visible underline using the `isQuiet` prop.
 */
export const QuietLinks: Story = {
  args: {
    ...Example.args,
    children: 'I am a quiet link',
    isQuiet: true,
  },
}

/**
 * Link text that is too long to fit in the container will simply flow to a new line as normal.
 */
export const Overflow: Story = {
  args: {
    ...Example.args,
    children: 'This is a link that is too long to fit in the container',
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '200px' }}>
        <Story />
      </div>
    ),
  ],
}
