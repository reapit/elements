import { RadioGroup } from './radio-group'
import { Radio } from '../radio'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Lab/RadioGroup',
  component: RadioGroup,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Defines the RadioGroup orientation',
    },
    label: {
      control: 'text',
      description: 'Defines the group label to be displayed',
    },
    isRequired: {
      control: 'boolean',
    },
    errorMessage: {
      control: 'text',
      description: 'Defines the error message to be displayed',
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The RadioGroup will accept the orientation prop which is by default `vertical`
 */
export const DefaultRadioGroup: Story = {
  args: {
    isRequired: false,
    label: 'Select options',
    errorMessage: '',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio label="Option 1" name="options" value="option1" />
      <Radio label="Option 2" name="options" value="option2" />
      <Radio label="Option 3" name="options" value="option3" />
    </RadioGroup>
  ),
}

/**
 * The RadioGroup only display Radio's supplementary info if the RadioGroup orientation is vertical
 */
export const RadioGroupWithSuplimentaryInfo: Story = {
  args: {
    ...DefaultRadioGroup.args,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio label="Option 1" name="options" value="option1" supplementaryInfo="Supplementary Info" />
      <Radio label="Option 2" name="options" value="option2" />
      <Radio label="Option 3" name="options" value="option3" />
    </RadioGroup>
  ),
}

/**
 * The RadioGroup Label UI can be set as required. This is just a UI implementation
 * this doesn't mean a validation is applied into the RadioGroup component
 */
export const RadioGroupWithRequiredLabel: Story = {
  args: {
    ...DefaultRadioGroup.args,
    isRequired: true,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio label="Option 1" name="options" value="option1" />
      <Radio label="Option 2" name="options" value="option2" />
      <Radio label="Option 3" name="options" value="option3" />
    </RadioGroup>
  ),
}

/**
 * The RadioGroup can display an error message when hasError is true
 */
export const RadioGroupError: Story = {
  args: {
    ...DefaultRadioGroup.args,
    errorMessage: 'Error Message',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio label="Option 1" name="options" value="option1" />
      <Radio label="Option 2" name="options" value="option2" />
      <Radio label="Option 3" name="options" value="option3" />
    </RadioGroup>
  ),
}

/**
 * The RadioGroup only display Radio's supplementary info if the RadioGroup orientation
 * is vertical. Below is the example for horizontal orientation
 */
export const HorizontalRadioGroup: Story = {
  args: {
    ...DefaultRadioGroup.args,
    orientation: 'horizontal',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio label="Option 1" name="options" value="option1" supplementaryInfo="This will be hidden" />
      <Radio label="Option 2" name="options" value="option2" />
      <Radio label="Option 3" name="options" value="option3" />
    </RadioGroup>
  ),
}
