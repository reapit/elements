import preview from '#.storybook/preview'
import { RadioButton } from './radio-button'
import { LabelText } from '#src/core/label-text'

const meta = preview.meta({
  title: 'Input and selection/RadioGroupControl/RadioButton',
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
})

export const Example = meta.story({
  args: {
    label: 'Label',
    supplementaryInfo: 'Supplementary Info',
    disabled: false,
    required: false,
    showValidity: false,
    value: 'option1',
    name: 'example',
  },
})

/**
 * A radio button can be marked as required. This indicates that one of the radio buttons in the group
 * must be selected for its related form to be successfully submitted. The visual "required indicator" (*)
 * is typically shown on the group label, not individual radio buttons.
 */
export const Required = Example.extend({
  args: {
    label: <LabelText isRequired>Label</LabelText>,
    required: true,
  },
})

/**
 * Radio buttons can be disabled. When they are, they do not participate in form submission.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
})

/**
 * Like all form controls that visually communicate their validity, the radio button will display in an
 * invalid state when it's value does not meet the validation constraints applied to it, such as being
 * required, and the `showValidity` prop is set to true. Typically, `showValidity` will be true when the
 * control has been touched (interacted with).
 */
export const Invalid = Example.extend({
  args: {
    required: true,
    showValidity: true,
  },
})
