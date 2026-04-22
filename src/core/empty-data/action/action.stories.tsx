import type { ComponentProps } from 'react'

import preview from '#.storybook/preview'
import { EmptyDataAction } from './action'
import { EmptyDataActionButton } from './action-button'

const meta = preview.meta({
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
})

/**
 * In most cases, the action will navigate users to a page or drawer that allows them to create
 * the kind of entity for which the `EmptyData` component is currently communicating that none exist.
 * This is why the standard action is an `<a>` element.
 */
export const Example = meta.story({
  args: {
    children: 'No things found',
    href: '#',
  },
})

/**
 * The `EmptyData.ActionButton` is a `<button>`-based version of `EmptyData.Action`. It can be used
 * in scenarios where the action needs to occur on click rather than a simple navigation.
 */
export const Button = Example.extend({
  args: {
    children: 'No things found',
    href: undefined,
  },
  render: ({ href: _href, ...args }) => (
    <EmptyDataActionButton {...(args as ComponentProps<typeof EmptyDataActionButton>)} />
  ),
})
