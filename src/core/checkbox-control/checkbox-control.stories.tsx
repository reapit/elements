import { CheckboxControl } from './checkbox-control'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/CheckboxControl',
  component: CheckboxControl,
  argTypes: {
    errorText: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    supplementaryInfo: {
      control: 'text',
    },
  },
} satisfies Meta<typeof CheckboxControl>

export default meta

type Story = StoryObj<typeof meta>

/**
 * A basic checkbox with a label. The CheckboxControl component wraps a Checkbox with FormControl
 * to provide support for error messages. For help text or additional context, use the `supplementaryInfo` prop.
 */
export const Example: Story = {
  args: {
    disabled: false,
    errorText: '',
    isIndeterminate: false,
    label: 'Label',
    required: false,
    supplementaryInfo: 'Supplementary Info',
  },
}

/**
 * Checkboxes can be marked as required. When they are, a required indicator is automatically shown
 * as part of the checkbox's label.
 */
export const Required: Story = {
  args: {
    ...Example.args,
    required: true,
  },
}

/**
 * When a validation constraint has not been met, an error message can be displayed.
 * The error message is displayed in addition to any supplementaryInfo that may be present.
 */
export const Invalid: Story = {
  args: {
    ...Required.args,
    errorText: 'Error message',
  },
}

/**
 * Checkboxes can be disabled to prevent user interaction based on application state.
 */
export const Disabled: Story = {
  args: {
    ...Example.args,
    disabled: true,
  },
}

/**
 * Checkboxes can be in an indeterminate state, typically used to represent a partially
 * selected state in a hierarchical list or when the checkbox controls other checkboxes.
 */
export const Indeterminate: Story = {
  args: {
    ...Example.args,
    label: 'Select all items',
    isIndeterminate: true,
    supplementaryInfo: 'Some items are selected',
  },
}
