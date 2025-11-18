import { AtAGlanceCardContent } from '../card-content'
import { AtAGlanceCardLink } from '../card-link'
import { AtAGlanceCarousel } from './carousel'
import { SproutIcon } from '#src/icons/sprout'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Core/AtAGlance/Carousel',
  component: AtAGlanceCarousel,
  argTypes: {
    children: { control: false },
    columns: { control: 'text' },
  },
} satisfies Meta<typeof AtAGlanceCarousel>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: buildCards(8, { layout: 'horizontal', variant: 'with-link' }),
    columns: 'var(--size-60)',
  },
}

/**
 * The carousel is only scrollable, and the next/previous buttons visible, when the cards
 * overflow its containing block.
 */
export const NoOverflow: Story = {
  args: {
    children: buildCards(2, { layout: 'vertical', variant: 'simple' }),
    columns: 'var(--size-60)',
  },
}

interface BuildCardsOptions {
  layout: 'horizontal' | 'vertical'
  variant: 'simple' | 'with-link'
}

function buildCards(count: 2 | 3 | 4 | 5 | 6 | 7 | 8, { layout, variant }: BuildCardsOptions) {
  const cards = [
    {
      label: 'Apple',
      description: 'Crunchy and juicy',
      value: '32',
    },
    {
      label: 'Banana',
      description: 'Soft and flavourless',
      value: '25',
    },
    {
      label: 'Grape',
      description: 'Nice and winey',
      value: '0',
    },
    {
      label: 'Kiwi',
      description: 'Full of Vitamin C',
      value: '6',
    },
    {
      label: 'Lemon',
      description: 'Sour as they come',
      value: '10',
    },
    {
      label: 'Strawberry',
      description: 'Red and sweet',
      value: '35',
    },
    {
      label: 'Watermelon',
      description: 'Refreshing and hydrating',
      value: '17',
    },
    {
      label: 'Orange',
      description: 'Citrusy goodness',
      value: '51',
    },
  ] as const

  return cards.slice(0, count).map((item) => (
    <AtAGlanceCarousel.Item key={item.label}>
      <AtAGlanceCardContent
        description={item.description}
        icon={<SproutIcon />}
        label={item.label}
        layout={layout}
        value={variant === 'simple' ? item.value : <AtAGlanceCardLink href={href}>{item.value}</AtAGlanceCardLink>}
      />
    </AtAGlanceCarousel.Item>
  ))
}
