import { FormControl } from './form-control'
import { Pattern } from '../drawer/__story__/Pattern'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChipSelect } from '../chip-select'

const meta = {
  title: 'Core/FormControl',
  component: FormControl,
  argTypes: {
    as: {
      control: false,
    },
    children: {
      control: false,
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: { summary: "'medium'" },
      },
    },
  },
} satisfies Meta<typeof FormControl>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    as: 'div',
    children: (
      <>
        <FormControl.Label htmlFor="my-control" isRequired>
          Label
        </FormControl.Label>
        <Pattern height="var(--size-8)" />
      </>
    ),
    size: 'medium',
  },
}

/**
 * When the form control is invalid, an error message will commonly be displayed beneath using
 * `FormControl.ErrorText` to describing why the form control's value is not valid.
 *
 * **Important:** Error messages should only be displayed when the form control is invalid and
 * either it has been touched (that is, focused then blurred by the user) or submission of the
 * form has been attempted. This behaviour is up to consumers to implement themselves.
 */
export const Invalid: Story = {
  args: {
    as: 'div',
    children: (
      <>
        <FormControl.Label htmlFor="my-control" isRequired>
          Label
        </FormControl.Label>
        <Pattern height="var(--size-8)" />
        <FormControl.ErrorText id="my-error-text">Error text</FormControl.ErrorText>
      </>
    ),
    size: 'medium',
  },
}

/**
 * Some form controls require additional information. This can be provided below the form control
 * using `FormControl.HelpText`.
 */
export const HelpText: Story = {
  args: {
    as: 'div',
    children: (
      <>
        <FormControl.Label htmlFor="my-control" isRequired>
          Label
        </FormControl.Label>
        <Pattern height="var(--size-8)" />
        <FormControl.HelpText id="my-help-text">Optional help text</FormControl.HelpText>
      </>
    ),
    size: 'medium',
  },
}

/**
 * In some cases, such as with checkbox groups, radio groups and chip selects, we need to enclose
 * the form control within a `<fieldset>`. In these cases, we can set `as="fieldset"` and use
 * `FormControl.Label` with the `as="legend"`.
 */
export const Fieldset: Story = {
  args: {
    as: 'fieldset',
    children: (
      <>
        <FormControl.Label as="legend" isRequired>
          Inspection type
        </FormControl.Label>
        <ChipSelect name="inspectionType" size="medium">
          <ChipSelect.Option defaultChecked value="ROUTINE">
            Routine
          </ChipSelect.Option>
          <ChipSelect.Option value="ENTRY">Entry</ChipSelect.Option>
          <ChipSelect.Option value="EXIT">Exit</ChipSelect.Option>
        </ChipSelect>
      </>
    ),
    size: 'medium',
  },
  decorators: [
    (Story) => (
      // NOTE: ChipSelect must be associated with a form for its single-select behaviour to work
      // in an uncontrolled usage like this story.
      <form>
        <Story />
      </form>
    ),
  ],
}
