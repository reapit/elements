import { AtAGlance } from '../at-a-glance'
import { buildCards } from '../__story__/build-cards'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/AtAGlance/Grid',
  component: AtAGlance.Grid,
  argTypes: {
    children: {
      control: false,
    },
    gap: {
      control: 'text',
    },
    templateColumns: {
      control: 'text',
    },
  },
} satisfies Meta<typeof AtAGlance.Grid>

export default meta
type Story = StoryObj<typeof meta>

/**
 * By default, content is laid out in a grid whose columns are explicitly defined by `templateColumns`.
 */
export const Example: Story = {
  args: {
    children: buildCards({ variant: 'with-link' }),
    gap: undefined,
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
    children: buildCards({ variant: 'with-link' }),
    layout: 'auto',
  },
}

/**
 * The gap between grid items can be adjusted using `gap`.
 */
export const Gap: Story = {
  args: {
    ...Example.args,
    gap: '--spacing-8',
  },
}
