import preview from '#.storybook/preview'
import { Checkbox } from './checkbox'
import { LabelText } from '../label-text'

const meta = preview.meta({
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
})

export const Example = meta.story({
  args: {
    label: 'Label',
    supplementaryInfo: 'Supplementary Info',
    disabled: false,
    isIndeterminate: false,
    required: false,
    showValidity: false,
  },
})

/**
 * A checkbox can be marked as required. This indicates that the checkbox must be checked for its related form
 * to be successfully submitted. Importantly, the visual "required indicator" (*) is not handled automatically
 * because it is only relevent to solitary checkboxes, not checkbox groups.
 */
export const Required = Example.extend({
  args: {
    label: <LabelText isRequired>Label</LabelText>,
    required: true,
  },
})

/**
 * Checkboxes can be set to an indeterminate state. When controlling `isIndeterminate`, it is important that
 * consumers also control the checked state appropriately.
 */
export const Indeterminate = Example.extend({
  args: {
    isIndeterminate: true,
  },
})

/**
 * Checkboxes can be disabled. When they are, they do not participate in form submission.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
})

/**
 * Like all form controls that visually communicate their validity, the checkbox will display in an
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
