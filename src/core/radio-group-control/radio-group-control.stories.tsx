import preview from '#.storybook/preview'
import { RadioGroupControl } from './radio-group-control'

const meta = preview.meta({
  title: 'Input and selection/RadioGroupControl',
  component: RadioGroupControl,
  argTypes: {
    children: {
      control: false,
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    showValidity: {
      control: 'boolean',
    },
  },
})

/**
 * By default, the radio button group will stack each option vertically.
 */
export const Example = meta.story({
  args: {
    children: [
      <RadioGroupControl.Option key="option1" label="Option 1" value="option1" />,
      <RadioGroupControl.Option key="option2" label="Option 2" value="option2" />,
      <RadioGroupControl.Option key="option3" label="Option 3" value="option3" />,
    ],
    disabled: false,
    errorText: '',
    helpText: '',
    label: 'Group label',
    name: 'options',
    orientation: 'vertical',
    required: false,
    showValidity: undefined,
  },
})

/**
 * A horizontal orientation is also available. In this orientation, options should not have any
 * supplementary information. This orientation should only be used when there is a small number
 * of options available.
 */
export const Horizontal = Example.extend({
  args: {
    orientation: 'horizontal',
  },
})

/**
 * Help text can be provided to communicate additional context about the options.
 */
export const HelpText = Example.extend({
  args: {
    helpText: 'Help text',
  },
})

/**
 * All radio buttons in the group can be marked as required by setting the `required` prop on the group.
 * This ensures that one option must be selected for form submission to succeed.
 *
 * Hand-in-hand with this is `showValidity`, which can also be set for all radio buttons in the group. Typically,
 * when any radio button in the group is interacted with, the whole group should communicate its validity.
 *
 * These values can be overriden by individual options.
 */
export const Required = Example.extend({
  args: {
    required: true,
    showValidity: false,
  },
})

/**
 * When a validation constraint has not been met, an error message can be displayed. The error message
 * will replace any help text that may be present.
 *
 * If `showValidity` is not explicitly provided, the control will show validity based on the presence of
 * `errorText`.
 */
export const Invalid = Example.extend({
  args: {
    errorText: 'Error message',
    helpText: 'Help text',
    required: true,
    showValidity: true,
  },
})

/**
 * All radio buttons in the group can be disabled by setting the `disabled` prop on the group. This is useful
 * when you want to prevent user interaction with the entire group based on some application state.
 *
 * This can be overriden by individual options.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
})
