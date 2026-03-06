import { CheckboxInput } from './checkbox-input'
import { useArgs } from 'storybook/preview-api'
import { useEffect, useRef } from 'react'

import type { ChangeEventHandler } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/CheckboxInput',
  component: CheckboxInput,
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
    name: 'myInput',
    readOnly: false,
    required: false,
    showValidity: false,
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
export const Indeterminate: Story = {
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
 * Checkboxes can be disabled. When they are, they do not participate in form submission.
 */
export const Disabled: Story = {
  args: {
    ...Example.args,
    disabled: true,
  },
}

/**
 * Like all form controls that visually communicate their validity, the checkbox will display in an
 * invalid state when it's value does not meet the validation constraints applied to it, such as being
 * required, and the `showValidity` prop is set to true. Typically, `showValidity` will be true when the
 * control has been touched (interacted with).
 */
export const Invalid: Story = {
  args: {
    ...Example.args,
    required: true,
    showValidity: true,
  },
}

/**
 * The checkbox also displays in an invalid state when `aria-invalid="true"` and `showValidity` is
 * true. This supports usage where the element is not natively invalid — for example, via custom
 * logic that does not use the browser's constraint validation API.
 */
export const AriaInvalid: Story = {
  name: 'Aria Invalid',
  args: {
    ...Example.args,
    'aria-invalid': true,
    showValidity: true,
  },
}
