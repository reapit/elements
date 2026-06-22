import preview from '#.storybook/preview'
import { SwitchInput } from './switch-input'
import { useArgs } from 'storybook/preview-api'

import type { ChangeEventHandler } from 'react'

const meta = preview.meta({
  title: 'Input and selection/SwitchInput',
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
})

export const Example = meta.story({
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
})

/**
 * The switch can be checked by default.
 */
export const Checked = Example.extend({
  args: {
    defaultChecked: true,
  },
})

/**
 * Switches can be disabled. When disabled, they do not participate in form submission.
 */
export const Disabled = Example.extend({
  args: {
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
})
