import { Input } from './input'
import { useArgs } from 'storybook/preview-api'
import { useEffect, useRef } from 'react'

import type { ChangeEventHandler } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Input',
  component: Input,
  argTypes: {
    type: {
      control: 'text',
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
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-label': 'My input',
    disabled: false,
    name: 'myInput',
    readOnly: false,
    type: 'checkbox',
    value: 'Hello!',
  },
}

/**
 * Like any native input, the checkbox can be controlled or uncontrolled by consumers.
 */
export const Checkbox: Story = {
  args: {
    ...Example.args,
    type: 'checkbox',
  },
  render: (args) => {
    const [, setArgs] = useArgs()
    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setArgs({ checked: event.currentTarget.checked })
    }
    return <Input {...args} onChange={onChange} />
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
    ...Checkbox.args,
  },
  render: (args) => {
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = true
      }
    }, [])
    return <Input {...args} ref={inputRef} />
  },
}
