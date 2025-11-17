import { AtAGlanceCardContent } from '../card-content'
import { AtAGlanceCardLink } from '../card-link'
import { AtAGlanceGrid } from './grid'
import { AtAGlanceGridItem } from './grid-item'
import { SproutIcon } from '#src/icons/sprout'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Core/AtAGlance/Grid',
  component: AtAGlanceGrid,
  argTypes: {
    children: {
      control: false,
    },
    templateColumns: {
      control: 'text',
    },
  },
} satisfies Meta<typeof AtAGlanceGrid>

export default meta
type Story = StoryObj<typeof meta>

/**
 * By default, content is laid out in a grid whose columns are explicitly defined by `templateColumns`.
 */
export const Example: Story = {
  args: {
    children: buildCards(8, { layout: 'vertical', variant: 'with-link' }),
    templateColumns: '1fr 1fr 1fr 1fr',
    layout: 'template',
  },
}

/**
 * To layout content in a grid using implicitly created columns, use `layout="auto"` and `autoColumns`
 * instead. This allows, for example, content to be laid out in a single row with N columns.
 */
export const Layout: Story = {
  args: {
    autoColumns: 'minmax(200px, 1fr)',
    children: buildCards(8, { layout: 'vertical', variant: 'with-link' }),
    layout: 'auto',
  },
  decorators: [
    (Story) => (
      <div style={{ overflow: 'auto' }}>
        <Story />
      </div>
    ),
  ],
}

interface BuildCardsOptions {
  layout: AtAGlanceCardContent.Props['layout']
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
    <AtAGlanceGridItem key={item.label}>
      <AtAGlanceCardContent
        description={item.description}
        icon={<SproutIcon />}
        label={item.label}
        layout={layout}
        value={variant === 'simple' ? item.value : <AtAGlanceCardLink href={href}>{item.value}</AtAGlanceCardLink>}
      />
    </AtAGlanceGridItem>
  ))
}
