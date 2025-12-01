import { AtAGlance } from '../at-a-glance'
import { buildCards } from '../__story__/build-cards'
import { Text } from '#src/core/text'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/AtAGlance/Listbox',
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
} satisfies Meta<typeof AtAGlance.Listbox>

export default meta
type Story = StoryObj<typeof meta>

/**
 * A listbox allows users to select from a set of options. This example uses a carousel layout
 * for horizontal scrolling with navigation buttons.
 */
export const Example: Story = {
  args: {
    name: 'fruit',
    // @ts-expect-error -- TS doesn't know about the mapping we do
    as: 'Carousel',
    children: 'Carousel',
    columns: '200px',
  },
}

/**
 * A listbox can also use a grid layout for responsive card display.
 */
export const Grid: Story = {
  args: {
    name: 'fruit',
    // @ts-expect-error -- TS doesn't know about the mapping we do
    as: 'Grid',
    children: 'Grid',
    templateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  },
}

/**
 * Controlled listbox with state management. Selection is managed externally via `value` and `onChange`.
 */
export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<readonly string[]>(['Apple'])

    return (
      <>
        <Text>Selected: {selected.join(', ') || 'None'}</Text>
        <br />
        <br />
        <AtAGlance.Listbox
          as={AtAGlance.Carousel}
          columns="200px"
          id="my-fruit"
          name="fruit"
          onChange={() => setSelected(AtAGlance.Listbox.getValue('my-fruit'))}
          value={selected}
        >
          {buildCards({ variant: 'selectable' })}
        </AtAGlance.Listbox>
      </>
    )
  },
}
