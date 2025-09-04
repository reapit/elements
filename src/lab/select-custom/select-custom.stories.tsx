import type { Meta, StoryObj } from '@storybook/react-vite'
import { SelectCustom } from './select-custom'
import { StarIcon } from '#src/icons/star'
import { LabelText } from '#src/core/label-text'
import { Badge } from '#src/core/badge'

const meta: Meta<typeof SelectCustom> = {
  title: 'Lab/SelectCustom',
  component: SelectCustom,
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the select',
    },
    label: {
      control: 'text',
      description: 'Label for the select',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the select',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display below the select',
    },
    isClearable: {
      control: 'boolean',
      description: 'Allows the user to clear all selected options',
    },
    isMultiple: {
      control: 'boolean',
      description: 'Allows multiple options to be selected',
    },
    isRequired: {
      control: 'boolean',
      description: 'Marks the select as required and adds an asterisk to the label',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the select and prevents user interaction',
    },
    popoverMaxHeight: {
      control: 'text',
      description: 'Max height of the popover',
    },
    popoverPlacement: {
      control: 'select',
      description: 'Visual placement of the popover',
      options: [
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end',
      ],
    },
  },
}
export default meta

type Story = StoryObj<typeof SelectCustom>

/**
 * Basic usage of the SelectCustom component with three options.
 */
export const BasicUsage: Story = {
  args: {
    id: 'basic-select',
    label: 'Label',
    helperText: 'Optional helper text',
  },
  render: (args) => (
    <SelectCustom {...args}>
      <SelectCustom.Option value="option1" label="Option 1" />
      <SelectCustom.Option value="option2" label="Option 2" />
      <SelectCustom.Option value="option3" label="Option 3" />
    </SelectCustom>
  ),
}

/**
 * Custom usage of the SelectCustom component demonstrating additional info and badges for options.
 */
export const CustomUsage: Story = {
  args: {
    id: 'custom-select',
    label: 'Custom Select',
    helperText: 'Optional helper text',
  },
  render: (args) => (
    <SelectCustom {...args}>
      <SelectCustom.Option
        value="custom-1"
        label="Custom 1"
        badge="Badge"
        additionalInfo1={
          <>
            <StarIcon size="sm" color="primary" />
            <LabelText size="small">Additional Info 1</LabelText>
            <Badge colour="neutral">Badge</Badge>
          </>
        }
        additionalInfo2={
          <>
            <StarIcon size="sm" color="primary" />
            <LabelText size="small">Additional Info 2</LabelText>
            <Badge colour="neutral">Badge</Badge>
          </>
        }
      />
      <SelectCustom.Option value="custom-2" label="Custom 2" />
      <SelectCustom.Option value="custom-3" label="Custom 3" />
    </SelectCustom>
  ),
}

/**
 * The Select popover can contain one or more groups, separated by dividers. Each group may optionally include a title.
 */
export const SelectGroup: Story = {
  args: {
    id: 'group-select',
    label: 'Label',
    helperText: 'Optional helper text',
  },
  render: (args) => (
    <SelectCustom {...args}>
      <SelectCustom.Group label="Group 1">
        <SelectCustom.Option value="group-1-option1" label="Option 1" />
        <SelectCustom.Option value="group-1-option2" label="Option 2" />
      </SelectCustom.Group>
      <SelectCustom.Group>
        <SelectCustom.Option value="group-2-option3" label="Option 3" />
        <SelectCustom.Option value="group-2-option4" label="Option 4" />
      </SelectCustom.Group>
    </SelectCustom>
  ),
}

/**
 * The **multi-select** mode displays each selected value as a chip, allowing users to clear selections individually.
 */
export const MultiSelect: Story = {
  args: {
    id: 'multi-select',
    isMultiple: true,
    label: 'Label',
    helperText: 'Optional helper text',
  },
  render: (args) => (
    <SelectCustom {...args}>
      <SelectCustom.Option value="multi-1" label="Multi 1" selected />
      <SelectCustom.Option value="multi-2" label="Multi 2" selected />
      <SelectCustom.Option value="multi-3" label="Multi 3" />
    </SelectCustom>
  ),
}
