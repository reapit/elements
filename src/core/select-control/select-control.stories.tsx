import { SelectControl } from './select-control'
import { Select } from '#src/core/select'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
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
} satisfies Meta<typeof SelectControl>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: [
      <Select.Button key="button" />,
      <Select.Popup key="popup">
        {/* Name is required for form submission example */}
        <Select.Listbox name="fruit">
          <Select.Option value="apple">Apple</Select.Option>
          <Select.Option value="apricot">Apricot</Select.Option>
          <Select.Option value="avocado">Avocado</Select.Option>
          <Select.Option value="banana">Banana</Select.Option>
          <Select.Option value="blueberry">Blueberry</Select.Option>
          <Select.Option value="cherry">Cherry</Select.Option>
          <Select.Option value="cantaloupe">Cantaloupe</Select.Option>
          <Select.Option value="grape">Grape</Select.Option>
          <Select.Option value="grapefruit">Grapefruit</Select.Option>
        </Select.Listbox>
      </Select.Popup>,
    ],
    disabled: false,
    errorText: '',
    helpText: '',
    label: 'Label',
    multiple: false,
    required: false,
    showValidity: false,
    size: 'medium',
  },
}

/**
 * When the select has one or more options initially selected, the control must be provided with
 * `defaultOptions` that define the label text to use for those options.
 */
export const DefaultOptions: Story = {
  args: {
    ...Example.args,
    defaultOptions: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ],
    multiple: true,
  },
}

/**
 * There are three sizes available: `small`, `medium` and `large`.
 */
export const Sizes: Story = {
  args: {
    ...Example.args,
  },
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
}

/**
 * Optional help text can be provided to give more context about the select.
 */
export const HelpText: Story = {
  args: {
    ...Example.args,
    helpText: 'Optional help text',
  },
}

/**
 * Like all form controls that visually communicate their validity, the select will display in an
 * invalid state when its value does not meet the validation constraints applied to it, such as being
 * required, and `showValidity` is true. Typically, `showValidity` will be true when the control has
 * been touched (interacted with).
 */
export const Invalid: Story = {
  args: {
    ...Example.args,
    errorText: 'Error message',
    required: true,
    showValidity: true,
  },
}

/**
 * Selects can be disabled. A disabled select will not receive the `click` event, and are not submitted
 * with the form they're associated with.
 */
export const Disabled: Story = {
  args: {
    ...Example.args,
    disabled: true,
  },
}

/**
 * Demonstrates a multi-select with the form control wrapper.
 */
export const MultiSelect: Story = {
  name: 'Multi-select',
  args: {
    ...Example.args,
    multiple: true,
  },
}

/**
 * By default, the select control will fill its parent's width. This can be constrained by providing a `maxWidth`.
 */
export const MaxWidth: Story = {
  name: 'Max-width',
  args: {
    ...Example.args,
    maxWidth: 'var(--size-64)',
  },
}

/**
 * The label, help text and error text will all wrap naturally when the form control does not have sufficient
 * space available for them.
 */
export const Wrapping: Story = {
  args: {
    ...MaxWidth.args,
    label: "This is a long label that won't fit on a single line",
    helpText: "This is a long optional help text that won't fit on a single line",
  },
}

/**
 * Autocompletes can be used in forms. The name prop is required for the control to participate
 * in form submission.
 */
export const Forms: Story = {
  args: {
    ...Example.args,
  },
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
}
