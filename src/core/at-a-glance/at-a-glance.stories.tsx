import { AtAGlance } from './at-a-glance'
import { buildCards } from './__story__/build-cards'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/AtAGlance',
  component: AtAGlance,
  argTypes: {
    children: {
      control: 'select',
      options: ['Carousel', 'Grid', 'Listbox'],
      mapping: {
        Carousel: <AtAGlance.Carousel columns="200px">{buildCards({ variant: 'with-link' })}</AtAGlance.Carousel>,
        Grid: (
          <AtAGlance.Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))">
            {buildCards({ variant: 'simple' })}
          </AtAGlance.Grid>
        ),
      },
    },
  },
} satisfies Meta<typeof AtAGlance>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Carousel',
  },
}

export const Grid: Story = {
  args: {
    children: 'Grid',
  },
}
