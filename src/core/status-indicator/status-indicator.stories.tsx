import preview from '#.storybook/preview'
import { StatusIndicator } from './status-indicator'

const variants = ['neutral', 'success', 'pending', 'warning', 'danger', 'inactive', 'accent_1', 'accent_2'] as const

const meta = preview.meta({
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
})

export const Example = meta.story({
  args: {
    children: 'Status Indicator',
    variant: 'neutral',
  },
})

export const Variants = Example.extend({
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
})
