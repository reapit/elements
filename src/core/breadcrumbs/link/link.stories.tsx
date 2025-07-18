import { BreadcrumbLink } from './link'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Breadcrumbs/Link',
  component: BreadcrumbLink,
  argTypes: {
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof BreadcrumbLink>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Dashboard',
    href: globalThis.top?.location.href!,
  },
}

/**
 * Overflow should be avoided as much as possible. When space becomes limited, a link's text will truncate
 * with ellipses. This behaviour does depend on the parent element; in this example, the link is rendered within
 * an inline-grid container, which naturally forces the link to grow to the container's width, and no further.
 */
export const Overflow: Story = {
  args: {
    ...Example.args,
    children: 'Long breadcrumb link',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'inline-grid', boxSizing: 'content-box', border: '1px solid #FA00FF', width: '100px' }}>
        <Story />
      </div>
    ),
  ],
}
