import { Radio } from './radio'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Lab/Radio',
  component: Radio,
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
    isRequired: {
      control: 'boolean',
    },
    hasError: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Radio>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultRadio: Story = {
  args: {
    label: 'I am a radio',
    supplementaryInfo: 'Supplementary Info',
    disabled: false,
    isRequired: false,
    hasError: false,
  },
}

/**
 * Example of a required radio, useful in forms
 * such as types of contact.
 */
export const RequiredRadio: Story = {
  args: {
    ...DefaultRadio.args,
    isRequired: true,
  },
}

/**
 * Radio in an error state, typically shown
 * when form validation fails.
 */
export const RadioError: Story = {
  args: {
    ...DefaultRadio.args,
    hasError: true,
  },
}

/**
 * The radio can be disabled. A disabled radio is rendered as un-interactable,
 * preventing user selection or deselection. Visually, it typically appears
 * grayed out, indicating its inactive state.
 */
export const DisabledRadio: Story = {
  args: {
    ...DefaultRadio.args,
    disabled: true,
  },
}
