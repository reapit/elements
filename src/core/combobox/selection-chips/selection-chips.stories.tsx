import { ComboboxSelectionChips } from './selection-chips'
import { Listbox } from '#src/utils/listbox'
import { Text } from '#src/core/text'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Combobox/SelectionChips',
  component: ComboboxSelectionChips,
  argTypes: {
    listboxId: {
      control: 'text',
    },
  },
  decorators: [
    (Story, { args, parameters }) => {
      const [searchValue, setSearchValue] = useState('')

      const filteredOptions = allOptions.filter((option) =>
        option.label.toLowerCase().startsWith(searchValue.toLowerCase()),
      )

      const options = parameters.enableFiltering ? filteredOptions : allOptions

      return parameters.hideListbox ? (
        <Story />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          <Text style={{ color: '#FA00FF' }}>Listbox</Text>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #FA00FF',
              gap: 'var(--spacing-2)',
              padding: 'var(--spacing-2)',
            }}
          >
            {parameters.enableFiltering && (
              <label>
                <Text font="text-base/regular">Filter:&nbsp;</Text>
                <input type="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
              </label>
            )}
            <Listbox
              aria-multiselectable
              defaultValue={args.defaultOptions?.map((option) => option.value)}
              id={args.listboxId}
              selectAction="select"
            >
              {options.map((option) => (
                <Listbox.Option as={MyListboxOption} key={option.value} value={option.value}>
                  {option.label}
                </Listbox.Option>
              ))}
            </Listbox>
          </div>

          <Story />
        </div>
      )
    },
  ],
} satisfies Meta<typeof ComboboxSelectionChips>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Displays selection chips for selected options in a listbox. These examples use `Listbox` directly
 * rather than `Combobox` for simplicity.
 */
export const Example: Story = {
  args: {
    defaultOptions: undefined,
    listboxId: 'listbox-id',
  },
}

/**
 * All selection chips can be disabled using `disabled`. This will typically occur when
 * the combobox itself is disabled.
 */
export const Disabled: Story = {
  args: {
    ...Example.args,
    disabled: true,
    defaultOptions: [
      { label: 'Apple', value: 'apple' },
      { label: 'Orange', value: 'orange' },
    ],
    listboxId: 'disabled-example',
  },
  parameters: {
    hideListbox: true,
  },
}

/**
 * An initial state must be provided for selection chips to be displayed on first render
 * when the listbox options are not immediately present in the DOM, such as when filtering
 * may be applied or the options are loaded asynchronously.
 */
export const DefaultOptions: Story = {
  name: 'Default options',
  args: {
    ...Example.args,
    defaultOptions: [{ label: 'Orange', value: 'orange' }],
    listboxId: 'default-options-example',
  },
  parameters: {
    enableFiltering: true,
    initialFilter: 'Apple',
  },
}

/**
 * The selection chips are a standard `ChipGroup` and will, by default, allow selection chips
 * to wrap when there is not enough space to display. This behaviour can be adjusted using
 * `flow` and `overflow`.
 */
export const Wrapping: Story = {
  args: {
    ...Example.args,
    defaultOptions: [
      { label: 'Apple', value: 'apple' },
      { label: 'Apricot', value: 'apricot' },
      { label: 'Banana', value: 'banana' },
      { label: 'Blueberry', value: 'blueberry' },
    ],
    listboxId: 'wrapping-example',
  },
  decorators: [
    (Story) => (
      <div style={{ border: '1px solid #FA00FF', width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    enableFiltering: true,
  },
}

/** Simple custom listbox option component */
function MyListboxOption(props: Listbox.OptionProps) {
  const isSelected = props['aria-checked'] || props['aria-selected']
  return <button {...props} style={{ fontWeight: isSelected ? 'bold' : 'normal' }} />
}

const allOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Apricot', value: 'apricot' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grape', value: 'grape' },
  { label: 'Orange', value: 'orange' },
  { label: 'Strawberry', value: 'strawberry' },
]
