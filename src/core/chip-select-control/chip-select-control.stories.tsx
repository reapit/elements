import { ChipSelectControl } from './chip-select-control'
import { ChipSelect } from '#src/core/chip-select'
import { StarIcon } from '#src/icons/star'
import { useId } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/ChipSelectControl',
  component: ChipSelectControl,
  argTypes: {
    children: {
      control: false,
    },
    errorText: {
      control: 'text',
    },
    helpText: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    overflow: {
      control: 'radio',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  render: (args) => {
    const formId = args.form ? `${args.form}-${useId()}` : useId()
    return (
      <>
        <form id={formId} />
        <ChipSelectControl {...args} form={formId} />
      </>
    )
  },
} satisfies Meta<typeof ChipSelectControl>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: [
      <ChipSelect.Option key="1" icon={<StarIcon />} value="1">
        Apples
      </ChipSelect.Option>,
      <ChipSelect.Option key="2" defaultChecked icon={<StarIcon />} value="2">
        Bananas
      </ChipSelect.Option>,
      <ChipSelect.Option key="3" icon={<StarIcon />} value="3">
        Oranges
      </ChipSelect.Option>,
      <ChipSelect.Option key="4" icon={<StarIcon />} value="4">
        Peanuts
      </ChipSelect.Option>,
      <ChipSelect.Option key="5" icon={<StarIcon />} value="5">
        Strawberries
      </ChipSelect.Option>,
    ],
    errorText: '',
    flow: 'wrap',
    form: 'my-form',
    helpText: '',
    label: 'Favorite Fruit',
    multiple: false,
    name: 'fruit',
    overflow: 'visible',
    required: false,
    size: 'small',
  },
}

/**
 * Help text can be provided to give additional context about the chip select.
 */
export const HelpText: Story = {
  args: {
    ...Example.args,
    helpText: 'Choose your favorite fruit',
  },
}

/**
 * Chip selects can be marked as required. When they are, a required indicator is automatically shown
 * as part of the chip select's label.
 */
export const Required: Story = {
  args: {
    ...Example.args,
    required: true,
  },
}

/**
 * An error message can also be provided to explain why the current value is invalid.
 */
export const Invalid: Story = {
  args: {
    ...Required.args,
    errorText: 'Error message',
  },
}
