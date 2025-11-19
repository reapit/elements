import { Combobox } from './combobox'
import { Text } from '#src/core/text'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Combobox',
  component: Combobox,
  argTypes: {
    children: {
      control: false,
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
  },
}

/**
 * Demonstrates an autocomplete combobox that lets users filter options by typing.
 */
export const Autocomplete: Story = {
  args: {
    children: [
      <Combobox.AutocompleteButton key="button" />,
      <Combobox.Popup key="popup" variant="popover">
        <Combobox.SearchInput aria-label="Filter options" />
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
  },
}

/**
 * By default, the combobox popup will switch to a drawer experience on XS breakpoints. It can also be
 * pinned to a popover or drawer using the `variant` prop.
 */
export const Drawer: Story = {
  args: {
    children: [
      <Combobox.AutocompleteButton key="button" />,
      <Combobox.Popup key="popup" variant="drawer">
        <Combobox.SearchInput aria-label="Filter options" />
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
  },
}

/**
 * Demonstrates filtering preloaded options with a search input. To fetch options
 * dynamically, use the controlled search value in your request.
 */
export const Filtering: Story = {
  render: (args) => {
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
      <Combobox {...args}>
        <Combobox.AutocompleteButton />
        <Combobox.Popup variant="popover">
          <Combobox.SearchInput
            aria-label="Filter options"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Combobox.Listbox>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <Combobox.Option key={option.value} value={option.value}>
                  {option.label}
                </Combobox.Option>
              ))
            ) : (
              <Text colour="placeholder" style={{ padding: 'var(--spacing-2)' }}>
                No results found
              </Text>
            )}
          </Combobox.Listbox>
        </Combobox.Popup>
      </Combobox>
    )
  },
  args: {
    disabled: false,
    required: false,
    showValidity: false,
  },
}
