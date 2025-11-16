import { AtAGlanceCardLink } from './card-link'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof AtAGlanceCardLink> = {
  title: 'Core/AtAGlance/CardLink',
  component: AtAGlanceCardLink,
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    href: globalThis.top?.location.href!,
    children: '123',
  },
}
