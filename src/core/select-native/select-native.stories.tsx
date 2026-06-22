import preview from '#.storybook/preview'
import { SelectNative } from './select-native'

const meta = preview.meta({
  title: 'Input and selection/SelectNative',
  component: SelectNative,
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
    form: undefined,
    maxWidth: undefined,
    name: 'mySelect',
    required: false,
    showValidity: true,
    size: 'small',
    value: undefined,
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
 * The compact select supports three sizes: `small`, `medium`, and `large`.
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
      <SelectNative {...args} size="small" />
      <SelectNative {...args} size="medium" />
      <SelectNative {...args} size="large" />
    </>
  ),
})

/**
 * Like all form controls, the native select will display in an invalid state when it's value
 * does not meet the validation constraints applied to it, such as being required, and when
 * `showValidity` is set to true. Typically `showValidity` will be true when the control has been
 * touched (interacted with).
 */
export const Invalid = Example.extend({
  args: {
    required: true,
    showValidity: true,
  },
})

/**
 * The select also displays in an invalid state when `aria-invalid="true"` and `showValidity` is
 * true. This supports usage where the element is not natively invalid — for example, via custom
 * logic that does not use the browser's constraint validation API.
 */
export const AriaInvalid = Example.extend({
  name: 'Aria Invalid',
  args: {
    'aria-invalid': true,
    showValidity: true,
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
 * When the selected option is too long for the available space, it will truncate.
 */
export const Overflow = Example.extend({
  args: {
    defaultValue: 'other',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #FA00FF', maxWidth: '150px' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * The `maxWidth` prop can also be used to limit how wide the select will grow. This can be useful
 * when we don't want to allow the select to grow as wide as its container.
 */
export const MaxWidth = Overflow.extend({
  name: 'Max-width',
  args: {
    defaultValue: 'other',
    maxWidth: '100px',
  },
  decorators: Overflow.input.decorators,
})
