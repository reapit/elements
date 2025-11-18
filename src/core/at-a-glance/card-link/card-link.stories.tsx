import { AtAGlanceCardContent } from '../card-content'
import { AtAGlanceCardLink } from './card-link'
import { SproutIcon } from '#src/icons/sprout'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof AtAGlanceCardLink> = {
  title: 'Core/AtAGlance/CardLink',
  component: AtAGlanceCardLink,
  argTypes: {
    children: {
      control: false,
    },
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
    'aria-current': false,
    children: <AtAGlanceCardContent icon={<SproutIcon />} label="Apples" description="Crunchy and juicy" value="42" />,
    href,
  },
}

/**
 * If the link represents the current page, `aria-current` should be provided.
 */
export const Selected: Story = {
  args: {
    ...Example.args,
    'aria-current': true,
  },
}
