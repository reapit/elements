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
    },
    label: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    clearable: {
      control: 'boolean',
    },
    multiple: {
      control: 'boolean',
    },
    isRequired: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
}
export default meta

type Story = StoryObj<typeof SelectCustom>

export const BasicUsage: Story = {
  args: {
    id: 'basic-select',
  },
  render: (args) => (
    <SelectCustom {...args}>
      <SelectCustom.Option value="option1" label="Option 1" />
      <SelectCustom.Option value="option2" label="Option 2" />
      <SelectCustom.Option value="option3" label="Option 3" />
    </SelectCustom>
  ),
}

export const CustomUsage: Story = {
  args: {
    id: 'custom-select',
    label: 'Custom Select',
    helperText: 'Choose your options',
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
            <LabelText size="small">Additional Info 1</LabelText>
            <Badge colour="neutral">Badge</Badge>
          </>
        }
      />
      <SelectCustom.Option value="custom-2" label="Custom 2" />
      <SelectCustom.Option value="custom-3" label="Custom 3" />
    </SelectCustom>
  ),
}

export const SelectGroup: Story = {
  args: {
    id: 'group-select',
  },
  render: (args) => (
    <SelectCustom {...args}>
      <SelectCustom.Group label="Group 1">
        <SelectCustom.Option value="group-1-option1" label="Option 1" />
        <SelectCustom.Option value="group-1-option2" label="Option 2" />
      </SelectCustom.Group>
      <SelectCustom.Group label="Group 2">
        <SelectCustom.Option value="group-2-option3" label="Option 3" />
        <SelectCustom.Option value="group-2-option4" label="Option 4" />
      </SelectCustom.Group>
    </SelectCustom>
  ),
}

export const MultiSelect: Story = {
  args: {
    id: 'multi-select',
    multiple: true,
  },
  render: (args) => (
    <SelectCustom {...args}>
      <SelectCustom.Option value="multi-1" label="Multi 1" selected />
      <SelectCustom.Option value="multi-2" label="Multi 2" selected />
      <SelectCustom.Option value="multi-3" label="Multi 3" />
    </SelectCustom>
  ),
}
