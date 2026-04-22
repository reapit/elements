import preview from '#.storybook/preview'
import { SelectControl } from './select-control'

const meta = preview.meta({
  title: 'Core/SelectControl',
  component: SelectControl,
  argTypes: {
    children: {
      control: false,
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
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
})

export const Example = meta.story({
  args: {
    children: [
      <SelectControl.Button key="button" />,
      <SelectControl.Popup key="popup">
        {/* Name is required for form submission example */}
        <SelectControl.Listbox name="fruit">
          <SelectControl.Option value="apple">Apple</SelectControl.Option>
          <SelectControl.Option value="apricot">Apricot</SelectControl.Option>
          <SelectControl.Option value="avocado">Avocado</SelectControl.Option>
          <SelectControl.Option value="banana">Banana</SelectControl.Option>
          <SelectControl.Option value="blueberry">Blueberry</SelectControl.Option>
          <SelectControl.Option value="cherry">Cherry</SelectControl.Option>
          <SelectControl.Option value="cantaloupe">Cantaloupe</SelectControl.Option>
          <SelectControl.Option value="grape">Grape</SelectControl.Option>
          <SelectControl.Option value="grapefruit">Grapefruit</SelectControl.Option>
        </SelectControl.Listbox>
      </SelectControl.Popup>,
    ],
    disabled: false,
    errorText: '',
    helpText: '',
    label: 'Label',
    multiple: false,
    required: false,
    showValidity: undefined,
    size: 'medium',
  },
})

/**
 * When the select has one or more options initially selected, the control must be provided with
 * `defaultOptions` that define the label text to use for those options.
 */
export const DefaultOptions = Example.extend({
  args: {
    defaultOptions: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ],

    multiple: true,
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
      <div style={{ display: 'flex', flexFlow: 'row nowrap', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],

  render: (args) => (
    <>
      <SelectControl {...args} size="small" />
      <SelectControl {...args} size="medium" />
      <SelectControl {...args} size="large" />
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
 * Like all form controls that visually communicate their validity, the select will display in an
 * invalid state when its value does not meet the validation constraints applied to it, such as being
 * required, and `showValidity` is true. Typically, `showValidity` will be true when the control has
 * been touched (interacted with).
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
 * Demonstrates a multi-select with the form control wrapper.
 */
export const MultiSelect = Example.extend({
  name: 'Multi-select',
  args: {
    multiple: true,
  },
})

/**
 * By default, the select control will fill its parent's width. This can be constrained by providing a `maxWidth`.
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

/**
 * Autocompletes can be used in forms. The name prop is required for the control to participate
 * in form submission.
 */
export const Forms = Example.extend({
  decorators: [
    (Story) => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          alert(JSON.stringify({ fruit: formData.getAll('fruit') }))
        }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 'var(--spacing-4)' }}
      >
        <button type="submit">Submit</button>
        <Story />
      </form>
    ),
  ],
})
