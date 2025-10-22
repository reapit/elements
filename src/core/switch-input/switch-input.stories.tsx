import { SwitchInput } from './switch-input'
import { useArgs } from 'storybook/preview-api'

import type { ChangeEventHandler } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/SwitchInput',
  component: SwitchInput,
  argTypes: {
    checked: {
      control: 'boolean',
    },
    defaultChecked: {
      control: 'boolean',
    },
    type: {
      control: false,
    },
  },
} satisfies Meta<typeof SwitchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-label': 'My switch',
    checked: undefined,
    defaultChecked: undefined,
    disabled: false,
    name: 'mySwitch',
    type: 'checkbox',
  },
  render: (args) => {
    const [, setArgs] = useArgs()
    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setArgs({ checked: event.currentTarget.checked })
    }
    return <SwitchInput {...args} onChange={onChange} />
  },
}

/**
 * The switch can be checked by default.
 */
export const Checked: Story = {
  args: {
    ...Example.args,
    defaultChecked: true,
  },
}

/**
 * Switches can be disabled. When disabled, they do not participate in form submission.
 */
export const Disabled: Story = {
  args: {
    ...Example.args,
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <SwitchInput {...args} />
      <SwitchInput {...args} checked />
    </>
  ),
}
