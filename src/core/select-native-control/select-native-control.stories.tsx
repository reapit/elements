import preview from '#.storybook/preview'
import { SelectNativeControl } from './select-native-control'

const meta = preview.meta({
  title: 'Core/SelectNativeControl',
  component: SelectNativeControl,
  argTypes: {
    children: {
      control: 'radio',
      options: ['Simple', 'With Groups'],
      mapping: {
        Simple: (
          <>
            <option value="">Select an option</option>
            <option value="commercial">Commercial</option>
            <option value="residential">Residential</option>
            <option value="other">Some other option with a long name</option>
          </>
        ),
        'With Groups': (
          <>
            <option value="">Select portfolio</option>
            <optgroup label="Preferred Portfolios">
              <option value="portfolio1">Portfolio 1</option>
              <option value="portfolio2">Portfolio 2</option>
            </optgroup>
            <optgroup label="Other Portfolios">
              <option value="portfolio3">Portfolio 3</option>
              <option value="portfolio4">Portfolio 4</option>
              <option value="portfolio5">Portfolio 5</option>
            </optgroup>
          </>
        ),
      },
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
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
  },
})

export const Example = meta.story({
  args: {
    autoComplete: 'off',
    children: 'Simple',
    defaultValue: undefined,
    disabled: false,
    errorText: '',
    form: undefined,
    helpText: '',
    label: 'Label',
    maxWidth: undefined,
    name: 'mySelect',
    required: false,
    showValidity: undefined,
    size: 'medium',
    value: undefined,
  },
})

/**
 * There are three sizes available: `small`, `medium` and `large`.
 */
export const Sizes = Example.extend({
  argTypes: {
    size: {
      control: false,
    },
  },

  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)', alignItems: 'start' }}>
        <Story />
      </div>
    ),
  ],

  render: (args) => (
    <>
      <SelectNativeControl {...args} size="small" />
      <SelectNativeControl {...args} size="medium" />
      <SelectNativeControl {...args} size="large" />
    </>
  ),
})

/**
 * Optional help text can be provided to give more context about the select.
 */
export const HelpText = Example.extend({
  args: {
    helpText: 'Optional help text',
  },
})

/**
 * Options for the select can be grouped using the native `optgroup` element.
 */
export const OptionGroups = Example.extend({
  args: {
    children: 'With Groups',
  },
})

/**
 * Like all form controls, the select will display in an invalid state when it's value
 * does not meet the validation constraints applied to it, such as being required, and when
 * `showValidity` is set to true. Typically `showValidity` will be true when the control has been
 * touched (interacted with).
 *
 * If `showValidity` is not explicitly provided, the control will show validity based on the presence of
 * `errorText`.
 */
export const Invalid = Example.extend({
  args: {
    errorText: 'Error message',
    required: true,
    showValidity: true,
  },
})

/**
 * Selects can be disabled. A disabled select will not receive the `click` event, and are not submitted
 * with the form they're associated with.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
})

/**
 * The initial value of the select, when it's value is not controlled, can be provided using `defaultValue`.
 */
export const DefaultValue = Example.extend({
  name: 'Default value',
  args: {
    defaultValue: 'residential',
  },
})

/**
 * The value of the select can be controlled by providing an explicit `value`. In this example, the select's value is
 * pinned to "Commercial" and, because that controlled value is not updated when another option is selected, it does
 * not change.
 */
export const ControlledValue = Example.extend({
  name: 'Controlled value',
  args: {
    value: 'commercial',
  },
})

/**
 * By default, selects will fill their parent's width. This can be constrained by providing a `maxWidth`.
 */
export const MaxWidth = Example.extend({
  name: 'Max-width',
  args: {
    maxWidth: 'var(--size-64)',
  },
})

/**
 * The label, help text and error text will all wrap naturally when the form control does not have sufficient
 * space available for them.
 */
export const Wrapping = MaxWidth.extend({
  args: {
    label: "This is a long label that won't fit on a single line",
    helpText: "This is a long optional help text that won't fit on a single line",
  },
})
