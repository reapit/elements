import { Checkbox } from './checkbox'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Checkbox',
  component: Checkbox,
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
    isIndeterminate: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    label: 'Label',
    supplementaryInfo: 'Supplementary Info',
    disabled: false,
    isIndeterminate: false,
    required: false,
    showValidity: false,
  },
}

/**
 * The checkbox UI can be set as required.
 * It will be helpful when used in the form to restrict user to check the checkbox
 * For Example: Terms and Condition, Data Privacy Consent, etc..
 */
export const Required: Story = {
  args: {
    ...Example.args,
    required: true,
  },
}

/**
 * The checkbox can be Indeterminate when used in the nested checkbox workflow
 * where checkbox is Partially Selected
 */
export const Indeterminate: Story = {
  args: {
    ...Example.args,
    isIndeterminate: true,
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
