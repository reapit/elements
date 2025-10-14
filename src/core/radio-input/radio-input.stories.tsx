import { RadioInput } from './radio-input'
import { useArgs } from 'storybook/preview-api'

import type { ChangeEventHandler } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/RadioInput',
  component: RadioInput,
  argTypes: {
    checked: {
      control: 'boolean',
    },
    value: {
      control: 'text',
      table: {
        type: {
          summary: 'string | number | readonly string[] | undefined',
        },
      },
    },
  },
} satisfies Meta<typeof RadioInput>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Like any native input, the radio button can be controlled or uncontrolled by consumers.
 */
export const Example: Story = {
  args: {
    'aria-label': 'My radio button',
    checked: undefined,
    disabled: false,
    name: 'myInput',
    readOnly: false,
    required: false,
    showValidity: false,
    type: 'radio',
    value: 'option1',
  },
  render: (args) => {
    const [, setArgs] = useArgs()
    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setArgs({ checked: event.currentTarget.checked })
    }
    return <RadioInput {...args} onChange={onChange} />
  },
}

/**
 * Radio buttons can be disabled. When they are, they do not participate in form submission.
 */
export const Disabled: Story = {
  args: {
    ...Example.args,
    name: 'myInput-2',
    disabled: true,
  },
}

/**
 * Like all form controls that visually communicate their validity, the radio button will display in an
 * invalid state when it's value does not meet the validation constraints applied to it, such as being
 * required, and the `showValidity` prop is set to true. Typically, `showValidity` will be true when the
 * control has been touched (interacted with).
 */
export const Invalid: Story = {
  args: {
    ...Example.args,
    name: 'myInput-3',
    required: true,
    showValidity: true,
  },
}
