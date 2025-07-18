import { isWidthAtOrAbove } from '#src/utils/breakpoints'
import { MatchMedia } from './match-media'
import { Pattern } from '#src/core/drawer/__story__/Pattern'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Utils/MatchMedia',
  component: MatchMedia,
  argTypes: {
    condition: {
      control: 'text',
    },
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof MatchMedia>

export default meta
type Story = StoryObj<typeof MatchMedia>

/**
 * A common use case is when content rendered by a component should only be visible at certain screen sizes. In this
 * example, the pretty pattern will only be visible if your browser viewport is larger than the `MD` breakpoint.
 */
export const Example: Story = {
  args: {
    children: <Pattern height="100px" />,
    condition: isWidthAtOrAbove('MD'),
  },
}

/**
 * But any valid media query condition can be specified, whether it's `(prefers-color-scheme: light)` or
 * `(orientation: landscape)`. In this example, the content will only be visible if the user has `light` mode enabled
 * in their system preferences.
 */
export const OtherUses: Story = {
  args: {
    condition: '(prefers-color-scheme: light)',
    children: <Pattern height="100px" />,
  },
}
