import { RadioButton } from './radio-button'
import { LabelText } from '#src/core/label-text'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/RadioGroupControl/RadioButton',
  component: RadioButton,
  argTypes: {
    label: {
      control: 'text',
    },
    supplementaryInfo: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof RadioButton>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    label: 'Label',
    supplementaryInfo: 'Supplementary Info',
    disabled: false,
    required: false,
    showValidity: false,
    value: 'option1',
    name: 'example',
  },
}

/**
 * A radio button can be marked as required. This indicates that one of the radio buttons in the group
 * must be selected for its related form to be successfully submitted. The visual "required indicator" (*)
 * is typically shown on the group label, not individual radio buttons.
 */
export const Required: Story = {
  args: {
    ...Example.args,
    label: <LabelText isRequired>Label</LabelText>,
    required: true,
  },
}

/**
 * Radio buttons can be disabled. When they are, they do not participate in form submission.
 */
export const Disabled: Story = {
  args: {
    ...Example.args,
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
    required: true,
    showValidity: true,
  },
}
