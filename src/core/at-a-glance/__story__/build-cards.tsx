import { AtAGlance } from '../at-a-glance'
import { SproutIcon } from '#src/icons/sprout'

export namespace buildCards {
  export interface Input {
    /** The number of cards to generate. */
    count?: 2 | 3 | 4 | 5 | 6 | 7 | 8
    /** The layout of the card content. */
    layout?: 'vertical' | 'compact' | 'horizontal'
    /** The kind of card to generate. */
    variant?: 'simple' | 'with-link' | 'selectable'
  }
}

export function buildCards({ count = 8, layout = 'vertical', variant = 'simple' }: buildCards.Input = {}) {
  return cards.slice(0, count).map((item, index) => {
    if (variant === 'simple') {
      return (
        <AtAGlance.GridItem key={item.label}>
          <AtAGlance.Card
            description={item.description}
            displayValue={item.value}
            icon={<SproutIcon />}
            label={item.label}
            layout={layout}
          />
        </AtAGlance.GridItem>
      )
    }

    if (variant === 'with-link') {
      return (
        <AtAGlance.GridItem key={item.label}>
          <AtAGlance.AnchorCard
            aria-current={index === 0 ? 'page' : undefined}
            description={item.description}
            displayValue={item.value}
            href={href}
            icon={<SproutIcon />}
            label={item.label}
            layout={layout}
          />
        </AtAGlance.GridItem>
      )
    }

    // variant === 'selectable'
    return (
      <AtAGlance.ListboxOption
        key={item.label}
        description={item.description}
        displayValue={item.value}
        icon={<SproutIcon />}
        label={item.label}
        layout={layout}
        value={item.label}
      />
    )
  })
}

const href = globalThis.top?.location.href!

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
