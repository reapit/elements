import preview from '#.storybook/preview'
import { AtAGlance } from '../at-a-glance'
import { Badge } from '#src/core/badge'
import { buildCards } from '../__story__/build-cards'
import { Text } from '#src/utils/text'
import { useState } from 'react'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

const meta = preview.meta({
  title: 'Content display/AtAGlance/Listbox',
  component: AtAGlance.Listbox,
  argTypes: {
    children: {
      control: 'select',
      options: ['Carousel', 'Grid'],
      mapping: {
        Carousel: buildCards({ variant: 'selectable' }),
        Grid: buildCards({ variant: 'selectable' }),
      },
    },
    as: {
      control: 'select',
      options: ['Carousel', 'Grid'],
      mapping: {
        Carousel: AtAGlance.Carousel,
        Grid: AtAGlance.Grid,
      },
    },
  },
})

/**
 * A listbox allows users to select from a set of options. This example uses a carousel layout
 * for horizontal scrolling with navigation buttons.
 */
export const Example = meta.story({
  args: {
    name: 'fruit',
    // @ts-expect-error -- TS doesn't know about the mapping we do
    as: 'Carousel',
    children: 'Carousel',
    columns: '200px',
  },
})

/**
 * A listbox can also use a grid layout for responsive card display.
 */
export const Grid = meta.story({
  args: {
    name: 'fruit',
    // @ts-expect-error -- TS doesn't know about the mapping we do
    as: 'Grid',
    children: 'Grid',
    templateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  },
})

/**
 * Controlled listbox with state management. Selection is managed externally via `value` and `onChange`.
 */
export const Controlled = Example.extend({
  args: {
    id: 'my-fruit',
  },
  render: (args) => {
    const [selected, setSelected] = useState<string | readonly string[]>(['Apple'])

    return (
      <>
        <Text>Selected: {(Array.isArray(selected) ? selected.join(', ') : selected) || 'None'}</Text>
        <br />
        <br />
        <AtAGlance.Listbox
          {...args}
          onChange={() => setSelected(AtAGlance.Listbox.getValue('my-fruit'))}
          value={selected}
        >
          {buildCards({ variant: 'selectable' })}
        </AtAGlance.Listbox>
      </>
    )
  },
})

/**
 * Listbox options can render as a custom card by using `as`. The custom component must
 * extend the standard HTML button element prop interface and must render as a button element.
 *
 * In this example, each option renders as the `MyCustomCardOption` component, which supports
 * a `label`, `value` and `trend`: the first two use the built-in `AtAGlance.CardLabel` and
 * `AtAGlance.CardValue` subcomponents, while the last one uses the `Badge` component with some
 * custom styles.
 */
export const Polymorphism = Example.extend({
  args: {
    id: 'my-polymorphed-fruit',
  },
  render: (args) => {
    const [selected, setSelected] = useState<string | readonly string[]>(['Apple'])

    return (
      <>
        <Text>Selected: {(Array.isArray(selected) ? selected.join(', ') : selected) || 'None'}</Text>
        <br />
        <br />
        <AtAGlance.Listbox
          {...args}
          onChange={() => setSelected(AtAGlance.Listbox.getValue('my-polymorphed-fruit'))}
          value={selected}
        >
          <AtAGlance.ListboxOption as={MyCustomCardOption} displayValue="30" label="Apple" trend={2} value="Apple" />
          <AtAGlance.ListboxOption as={MyCustomCardOption} displayValue="22" label="Banana" trend={10} value="Banana" />
          <AtAGlance.ListboxOption as={MyCustomCardOption} displayValue="40" label="Cherry" trend={5} value="Cherry" />
        </AtAGlance.Listbox>
      </>
    )
  },
})

namespace MyCustomCardOption {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    displayValue: ReactNode
    label: ReactNode
    trend: number
  }
}

function MyCustomCardOption({ displayValue, label, trend, ...rest }: MyCustomCardOption.Props) {
  return (
    <AtAGlance.Card
      {...rest}
      as="button"
      grid="'label value trend' auto / 1fr auto auto"
      maxWidth="300px"
      style={{ alignItems: 'center' }}
    >
      <AtAGlance.CardLabel>{label}</AtAGlance.CardLabel>
      <AtAGlance.CardValue>{displayValue}</AtAGlance.CardValue>
      <Badge
        colour="success"
        style={{ gridArea: 'trend', alignSelf: 'center', marginInlineStart: 'var(--spacing-2)' }}
        variant="reversed"
      >
        {trend}%
      </Badge>
    </AtAGlance.Card>
  )
}
