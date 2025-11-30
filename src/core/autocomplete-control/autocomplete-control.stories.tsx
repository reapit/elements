import { Autocomplete } from '#src/core/autocomplete'
import { AutocompleteControl } from './autocomplete-control'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/AutocompleteControl',
  component: AutocompleteControl,
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
  render: (args) => {
    // NOTE: We initialise value from the story's `defaultOptions` to maintain state consistency.
    const [value, setValue] = Autocomplete.useState(args.defaultOptions?.map((o) => o.value) ?? [])
    const [searchText, setSearchText] = useState('')

    const filteredOptions = filterFruit(searchText)

    return (
      <AutocompleteControl {...args}>
        <Autocomplete.Button />
        <Autocomplete.Popup
          search={
            <Autocomplete.SearchInput
              aria-label="Filter fruit"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          }
        >
          <Autocomplete.Listbox
            // Name prop is required for the form submission example
            name="fruit"
            onChange={(e) => setValue(Autocomplete.getValue(e.currentTarget))}
            value={value}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <Autocomplete.Option key={option.value} value={option.value}>
                  {option.label}
                </Autocomplete.Option>
              ))
            ) : (
              <Autocomplete.Placeholder>No results found</Autocomplete.Placeholder>
            )}
          </Autocomplete.Listbox>
        </Autocomplete.Popup>
      </AutocompleteControl>
    )
  },
} satisfies Meta<typeof AutocompleteControl>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Demonstrates a basic autocomplete with label and form control wrapper.
 */
export const Example: Story = {
  args: {
    children: null, // handled by meta.render function
    disabled: false,
    errorText: '',
    helpText: '',
    label: 'Select a fruit',
    maxWidth: undefined,
    multiple: false,
    required: false,
    showValidity: false,
    size: 'medium',
  },
  parameters: { docs: { source: { type: 'code' } } },
}

/**
 * When the autocomplete has one or more options initially selected, the control must be provided with
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
    (Story, { args }) => (
      <div style={{ display: 'flex', flexFlow: 'row nowrap', gap: 'var(--spacing-6)' }}>
        <Story args={{ ...args, size: 'small' }} />
        <Story args={{ ...args, size: 'medium' }} />
        <Story args={{ ...args, size: 'large' }} />
      </div>
    ),
  ],
}

/**
 * Optional help text can be provided to give more context about the autocomplete.
 */
export const HelpText: Story = {
  args: {
    ...Example.args,
    helpText: 'Choose your favorite fruit',
  },
}

/**
 * Like all form controls that visually communicate their validity, the autocomplete will display in an
 * invalid state when its value does not meet the validation constraints applied to it, such as being
 * required, and `showValidity` is true. Typically, `showValidity` will be true when the control has
 * been touched (interacted with).
 */
export const Invalid: Story = {
  args: {
    ...Example.args,
    errorText: 'Please select a fruit',
    required: true,
    showValidity: true,
  },
}

/**
 * Autocompletes can be disabled. A disabled autocomplete will not receive interaction events.
 */
export const Disabled: Story = {
  args: {
    ...Example.args,
    disabled: true,
  },
}

/**
 * By default, autocompletes will fill their parent's width. This can be constrained by providing a `maxWidth`.
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
    label: 'This is a long label that will not fit on a single line',
    helpText: 'This is a long optional help text that will not fit on a single line',
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

interface FruitOption {
  label: string
  value: string
}

/** Filter fruit options based on the search text. */
function filterFruit(searchText: string) {
  return allOptions.filter((option) => option.label.toLowerCase().startsWith(searchText.toLowerCase()))
}

const allOptions: FruitOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Apricot', value: 'apricot' },
  { label: 'Avocado', value: 'avocado' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Cantaloupe', value: 'cantaloupe' },
  { label: 'Grape', value: 'grape' },
  { label: 'Grapefruit', value: 'grapefruit' },
]
