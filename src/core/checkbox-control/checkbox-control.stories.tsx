import preview from '#.storybook/preview'
import { CheckboxControl } from './checkbox-control'
import { useArgs } from 'storybook/preview-api'

import type { ChangeEventHandler } from 'react'

const meta = preview.meta({
  title: 'Input and selection/CheckboxControl',
  component: CheckboxControl,
  argTypes: {
    checked: {
      control: 'boolean',
    },
    errorText: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    supplementaryInfo: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
  },
})

/**
 * A basic checkbox with a label. The CheckboxControl component wraps a Checkbox with FormControl
 * to provide support for error messages. For help text or additional context, use the `supplementaryInfo` prop.
 */
export const Example = meta.story({
  args: {
    checked: undefined,
    disabled: false,
    errorText: '',
    isIndeterminate: false,
    label: 'Label',
    name: 'myCheckbox',
    readOnly: false,
    required: false,
    showValidity: undefined,
    supplementaryInfo: 'Supplementary Info',
    value: '',
  },
  render: (args) => {
    const [, setArgs] = useArgs()
    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setArgs({ checked: event.currentTarget.checked })
    }
    return <CheckboxControl {...args} onChange={onChange} />
  },
})

/**
 * Checkboxes can be marked as required. When they are, a required indicator is automatically shown
 * as part of the checkbox's label.
 */
export const Required = Example.extend({
  args: {
    required: true,
  },
})

/**
 * When a validation constraint has not been met, an error message can be displayed.
 * The error message is displayed in addition to any `supplementaryInfo` that may be present.
 *
 * If `showValidity` is not explicitly provided, the control will show validity based on the presence of
 * `errorText`.
 */
export const Invalid = Required.extend({
  args: {
    errorText: 'Error message',
    showValidity: true,
  },
})

/**
 * Checkboxes can be disabled to prevent user interaction based on application state.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
})

/**
 * Checkboxes can be in an indeterminate state, typically used to represent a partially
 * selected state in a hierarchical list or when the checkbox controls other checkboxes.
 */
export const Indeterminate = Example.extend({
  args: {
    label: 'Select all items',
    isIndeterminate: true,
    supplementaryInfo: 'Some items are selected',
  },
})
