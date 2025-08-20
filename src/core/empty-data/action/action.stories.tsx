import { EmptyDataAction } from './action'
import { EmptyDataActionButton } from './action-button'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/EmptyData/Action',
  component: EmptyDataAction,
  subcomponents: {
    EmptyDataActionButton: EmptyDataActionButton,
  },
  argTypes: {
    children: {
      control: 'text',
    },
    href: {
      control: false,
    },
  },
} satisfies Meta<typeof EmptyDataAction>

export default meta
type Story = StoryObj<typeof EmptyDataAction>

/**
 * In most cases, the action will navigate users to a page or drawer that allows them to create
 * the kind of entity for which the `EmptyData` component is currently communicating that none exist.
 * This is why the standard action is an `<a>` element.
 */
export const Example: Story = {
  args: {
    children: 'No things found',
    href: globalThis.top?.location.href!,
  },
}

/**
 * The `EmptyData.ActionButton` is a `<button>`-based version of `EmptyData.Action`. It can be used
 * in scenarios where the action needs to occur on click rather than a simple navigation.
 */
export const Button: StoryObj<typeof EmptyDataActionButton> = {
  args: {
    children: 'No things found',
  },
  render: (args) => <EmptyDataActionButton {...args} />,
}
