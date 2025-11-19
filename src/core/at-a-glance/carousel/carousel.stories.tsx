import { AtAGlance } from '../at-a-glance'
import { buildCards } from '../__story__/build-cards'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/AtAGlance/Carousel',
  component: AtAGlance.Carousel,
  argTypes: {
    children: { control: false },
    columns: { control: 'text' },
    gap: { control: 'text' },
  },
} satisfies Meta<typeof AtAGlance.Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: buildCards({ layout: 'horizontal', variant: 'with-link' }),
    columns: 'var(--size-60)',
    gap: undefined,
  },
}

/**
 * The carousel is only scrollable, and the next/previous buttons visible, when the cards
 * overflow its containing block.
 */
export const NoOverflow: Story = {
  args: {
    children: buildCards({ count: 2 }),
    columns: 'var(--size-60)',
  },
}
