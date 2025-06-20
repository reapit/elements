import { Checkbox } from './checkbox'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Checkbox',
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

export const DefaulfCheckbox: Story = {
  args: {
    label: 'Label',
    supplementaryInfo: 'Supplementary Info',
    disabled: false,
    isIndeterminate: false,
    required: false,
  },
}

/**
 * The checkbox UI can be set as required.
 * It will be helpful when used in the form to restrict user to check the checkbox
 * For Example: Terms and Condition, Data Privacy Consent, etc..
 */
export const RequiredCheckbox: Story = {
  args: {
    ...DefaulfCheckbox.args,
    required: true,
  },
}

/**
 * The checkbox can be Indeterminate when used in the nested checkbox workflow
 * where checkbox is Partially Selected
 */
export const IndeterminateCheckbox: Story = {
  args: {
    ...DefaulfCheckbox.args,
    isIndeterminate: true,
  },
}

/**
 * The checkbox can be disabled. A disabled checkbox is rendered as un-interactable,
 * preventing user selection or deselection. Visually, it typically appears
 * grayed out, indicating its inactive state.
 */
export const DisabledCheckbox: Story = {
  args: {
    ...DefaulfCheckbox.args,
    disabled: true,
  },
}
