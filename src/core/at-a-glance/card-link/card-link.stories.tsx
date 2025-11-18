import { AtAGlanceCardContent } from '../card-content'
import { AtAGlanceCardLink } from './card-link'
import { SproutIcon } from '#src/icons/sprout'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof AtAGlanceCardLink> = {
  title: 'Core/AtAGlance/CardLink',
  component: AtAGlanceCardLink,
  argTypes: {
    href: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const href = globalThis.top?.location.href!

export const Example: Story = {
  args: {
    href,
  },
  render: (args) => (
    <AtAGlanceCardLink {...args}>
      <AtAGlanceCardContent icon={<SproutIcon />} label="Total Sales" description="Last 30 days" value="$12,345" />
    </AtAGlanceCardLink>
  ),
}
