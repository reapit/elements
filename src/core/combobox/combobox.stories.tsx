import { Combobox } from './combobox'
import { getComboboxListboxId } from './get-listbox-id'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Combobox',
  component: Combobox,
  argTypes: {
    children: {
      control: false,
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Combobox>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Demonstrates a basic combobox with static options.
 */
export const Example: Story = {
  args: {
    children: [
      <Combobox.SelectButton key="button" />,
      <Combobox.Popup key="popup" variant="popover">
        <Combobox.Listbox>
          <Combobox.Option value="option1">Option 1</Combobox.Option>
          <Combobox.Option value="option2">Option 2</Combobox.Option>
          <Combobox.Option value="option3">Option 3</Combobox.Option>
        </Combobox.Listbox>
      </Combobox.Popup>,
    ],
    disabled: false,
    required: false,
    showValidity: false,
    size: 'medium',
  },
}

/**
 * Demonstrates a searchable combobox that lets users filter options by typing. As the options
 * are dynamically rendered, and the combobox allows multiple selections, the selected options are
 * displayed using `Combobox.SelectionChips`.
 */
export const DynamicOptions: Story = {
  args: {
    ...Example.args,
    id: 'dynamic-options',
    multiple: true,
  },
  parameters: { docs: { source: { type: 'code' } } },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexFlow: 'column', gap: 'var(--spacing-2)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    // We control the search input's value with basic component state.
    const [searchValue, setSearchValue] = useState('')

    const allOptions = [
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

    const filteredOptions = allOptions.filter((option) =>
      option.label.toLowerCase().startsWith(searchValue.toLowerCase()),
    )

    return (
      <>
        <Combobox {...args}>
          <Combobox.AutocompleteButton />
          <Combobox.Popup
            search={
              <Combobox.SearchInput
                aria-label="Filter options"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            }
          >
            <Combobox.Listbox defaultValue={['banana']} name="fruit">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <Combobox.Option key={option.value} value={option.value}>
                    {option.label}
                  </Combobox.Option>
                ))
              ) : (
                <Combobox.ListboxPlaceholder>No results found</Combobox.ListboxPlaceholder>
              )}
            </Combobox.Listbox>
          </Combobox.Popup>
        </Combobox>

        <Combobox.SelectionChips
          defaultOptions={[allOptions.find((option) => option.value === 'banana')!]}
          listboxId={getComboboxListboxId(args.id!)}
        />
      </>
    )
  },
}

/**
 * By default, the combobox popup will switch to a drawer experience on XS breakpoints. It can also be
 * pinned to a popover or drawer using the `variant` prop.
 */
export const Drawer: Story = {
  args: {
    ...Example.args,
    children: [
      <Combobox.SelectButton key="button" />,
      <Combobox.Popup key="popup" search={<Combobox.SearchInput aria-label="Filter options" />} variant="drawer">
        <Combobox.Listbox>
          <Combobox.Option value="option1">Option 1</Combobox.Option>
          <Combobox.Option value="option2">Option 2</Combobox.Option>
          <Combobox.Option value="option3">Option 3</Combobox.Option>
        </Combobox.Listbox>
      </Combobox.Popup>,
    ],
  },
}

/**
 * Three sizes are supported: small, medium, and large. The size impacts both the combobox button and
 * the option labels.
 */
export const Sizes: Story = {
  args: {
    ...Example.args,
    size: 'large',
  },
}

/**
 * Three sizes are supported: small, medium, and large. The size impacts both the combobox button and
 * the option labels.
 */
export const Forms: Story = {
  ...DynamicOptions,
  args: {
    ...DynamicOptions.args,
    id: 'form-example',
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
