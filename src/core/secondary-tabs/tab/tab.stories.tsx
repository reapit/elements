import { SecondaryTab } from './tab'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/SecondaryTabs/Tab',
  component: SecondaryTab,
} satisfies Meta<typeof SecondaryTab>

export default meta

type Story = StoryObj<typeof SecondaryTab>

export const Example: Story = {
  args: {
    'aria-current': false,
    children: 'Secondary tab',
    href: globalThis.top?.location.href!,
  },
}

/**
 * When the tab represents the current page, `aria-current="page"` should be supplied to communicate to
 * visual and accessible users that the tab is currently "selected". This shows the blue bottom border.
 */
export const Selected: Story = {
  args: {
    ...Example.args,
    'aria-current': 'page',
  },
}
