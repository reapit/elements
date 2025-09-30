import { CheckboxInput } from './checkbox-input'
import { useArgs } from 'storybook/preview-api'
import { useEffect, useRef } from 'react'

import type { ChangeEventHandler } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/CheckboxInput',
  component: CheckboxInput,
  argTypes: {
    value: {
      control: 'text',
      table: {
        type: {
          summary: 'string | number | readonly string[] | undefined',
        },
      },
    },
  },
} satisfies Meta<typeof CheckboxInput>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Like any native input, the checkbox can be controlled or uncontrolled by consumers.
 */
export const Example: Story = {
  args: {
    'aria-label': 'My checkbox',
    disabled: false,
    isTouched: false,
    name: 'myInput',
    readOnly: false,
    required: false,
    type: 'checkbox',
    value: 'Hello!',
  },
  render: (args) => {
    const [, setArgs] = useArgs()
    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setArgs({ checked: event.currentTarget.checked })
    }
    return <CheckboxInput {...args} onChange={onChange} />
  },
}

/**
 * While it does not support an indeterminate prop that can be controlled by consumers, the checkbox
 * does support an indeterminate state via the
 * [:indeterminate](https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate) CSS pseudo-class.
 * Like any native checkbox, this state can be activated by setting the input element's `indeterminate`
 * property programmatically.
 */
export const IndeterminateCheckbox: Story = {
  args: {
    ...Example.args,
  },
  render: (args) => {
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = true
      }
    }, [])
    return <CheckboxInput {...args} ref={inputRef} />
  },
}

/**
 * Like all form controls that visually communicate their validity, the checkbox will display in an
 * invalid state when it's value does not meet the validation constraints applied to it, such as being
 * required, and it has been "touched", meaning the control has been focused then blurred.
 */
export const Invalid: Story = {
  args: {
    ...Example.args,
    isTouched: true,
    required: true,
  },
}
