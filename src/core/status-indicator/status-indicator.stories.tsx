import { StatusIndicator } from './status-indicator'

import type { Meta, StoryObj } from '@storybook/react-vite'

const variants = ['neutral', 'success', 'pending', 'warning', 'danger', 'inactive', 'accent1', 'accent2'] as const

const meta = {
  title: 'Core/StatusIndicator',
  component: StatusIndicator,
  argTypes: {
    children: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: variants,
    },
  },
} satisfies Meta<typeof StatusIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Status Indicator',
    variant: 'neutral',
  },
}

export const Variants: Story = {
  args: {
    ...Example.args,
  },
  argTypes: {
    children: {
      control: false,
    },
    variant: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render(args) {
    return (
      <>
        {variants.map((variant) => (
          <StatusIndicator {...args} key={variant} variant={variant} />
        ))}
      </>
    )
  },
}
