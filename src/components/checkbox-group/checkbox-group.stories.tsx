import { CheckboxGroup } from './checkbox-group'
import { Checkbox } from '../checkbox'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Defines the CheckboxGroup orientation',
    },
  },
} satisfies Meta<typeof CheckboxGroup>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The CheckboxGroup will accept the orientation prop which is by default `vertical`
 */
export const BasicUsage: Story = {
  render: ({}) => (
    <CheckboxGroup>
      <CheckboxGroup.Label label="Select options" />
      <Checkbox label="Option 1" name="options" value="option1" />
      <Checkbox label="Option 2" name="options" value="option2" />
      <Checkbox label="Option 3" name="options" value="option3" />
    </CheckboxGroup>
  ),
  // Adding the parameters to display only one varient code in the source
  parameters: {
    docs: {
      source: {
        code: `
   <CheckboxGroup>
  <CheckboxGroup.Label label="Select options" />
  <Checkbox label="Option 1" name="options" value="option1" />
  <Checkbox label="Option 2" name="options" value="option2" />
  <Checkbox label="Option 3" name="options" value="option3" />
</CheckboxGroup>
          `,
      },
    },
  },
}

/**
 * The CheckboxGroup only display Checkbox's supplementary info if the CheckboxGroup orientation is vertical
 */
export const CheckboxGroupWithSuplimentaryInfo: Story = {
  render: ({}) => (
    <CheckboxGroup>
      <CheckboxGroup.Label isRequired label="Select options" />
      <Checkbox label="Option 1" name="options" value="option1" supplementaryInfo="Supplementary Info" />
      <Checkbox label="Option 2" name="options" value="option2" />
      <Checkbox label="Option 3" name="options" value="option3" />
    </CheckboxGroup>
  ),
  // Adding the parameters to display only one varient code in the source
  parameters: {
    docs: {
      source: {
        code: `
   <CheckboxGroup>
  <CheckboxGroup.Label isRequired label="Select options" />
  <Checkbox label="Option 1" name="options" value="option1" supplementaryInfo="Supplementary Info" />
  <Checkbox label="Option 2" name="options" value="option2" />
  <Checkbox label="Option 3" name="options" value="option3" />
</CheckboxGroup>
          `,
      },
    },
  },
}

/**
 * The CheckboxGroup Label UI can be set as required. This is just a UI implementation
 * this doesn't mean a validation is applied into the CheckboxGroup component
 */
export const CheckboxGroupWithRequiredLabel: Story = {
  render: ({}) => (
    <CheckboxGroup>
      <CheckboxGroup.Label isRequired label="Select options" />
      <Checkbox label="Option 1" name="options" value="option1" />
      <Checkbox label="Option 2" name="options" value="option2" />
      <Checkbox label="Option 3" name="options" value="option3" />
    </CheckboxGroup>
  ),
  // Adding the parameters to display only one varient code in the source
  parameters: {
    docs: {
      source: {
        code: `
   <CheckboxGroup>
  <CheckboxGroup.Label isRequired label="Select options" />
  <Checkbox label="Option 1" name="options" value="option1" />
  <Checkbox label="Option 2" name="options" value="option2" />
  <Checkbox label="Option 3" name="options" value="option3" />
</CheckboxGroup>
          `,
      },
    },
  },
}

/**
 * The CheckboxGroup only display Checkbox's supplementary info if the CheckboxGroup orientation
 * is vertical. Below is the example for horizontal orientation
 */
export const HorizontalCheckboxGroup: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (props) => (
    <CheckboxGroup orientation={props.orientation}>
      <CheckboxGroup.Label label="Select options" />
      <Checkbox label="Option 1" name="options" value="option1" supplementaryInfo="This will be hidden" />
      <Checkbox label="Option 2" name="options" value="option2" />
      <Checkbox label="Option 3" name="options" value="option3" />
    </CheckboxGroup>
  ),
  // Adding the parameters to display only one varient code in the source
  parameters: {
    docs: {
      source: {
        code: `
   <CheckboxGroup orientation="horizontal">
  <CheckboxGroup.Label label="Select options" />
  <Checkbox label="Option 1" name="options" value="option1" supplementaryInfo="This will be hidden" />
  <Checkbox label="Option 2" name="options" value="option2" />
  <Checkbox label="Option 3" name="options" value="option3" />
</CheckboxGroup>
          `,
      },
    },
  },
}
