import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './switch'

const meta = {
  title: 'Core/Switch',
  component: Switch,
  argTypes: {
    defaultChecked: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
      description: 'Label text for the switch',
    },
    labelPlacement: {
      control: 'radio',
      options: ['start', 'end'],
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof Switch>

export const Example: Story = {
  args: {
    checked: undefined,
    defaultChecked: undefined,
    disabled: false,
    label: 'Label',
    labelPlacement: 'end',
  },
}

/**
 * When the visual label is omitted, it is important to still provide an accessible label using
 * `aria-label` or similar. You can also use `SwitchInput` directly if do not need a visual label.
 */
export const NoLabel: Story = {
  args: {
    'aria-label': 'Label',
  },
}

/**
 * The visual label can either be placed at the start or end of the control.
 */
export const LabelPlacement: Story = {
  args: {
    label: 'Label',
    labelPlacement: 'end',
  },
  argTypes: {
    labelPlacement: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <Switch {...args} labelPlacement="start" />
      <Switch {...args} labelPlacement="end" />
    </>
  ),
}

/**
 * The switch can be checked by default.
 */
export const Checked: Story = {
  args: {
    label: 'Label',
    defaultChecked: true,
  },
}

/**
 * Switches can be disabled. When disabled, they do not participate in form submission.
 */
export const Disabled: Story = {
  args: {
    label: 'Label',
    disabled: true,
  },
}
