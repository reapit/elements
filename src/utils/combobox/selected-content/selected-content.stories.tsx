import { ComboboxSelectedContent } from './selected-content'
import { Listbox } from '#src/utils/listbox'
import { Text } from '#src/utils/text'
import { useId, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Utils/Combobox/SelectedContent',
  component: ComboboxSelectedContent,
  argTypes: {
    listboxId: {
      control: 'text',
    },
  },
  decorators: [
    (Story, { args, parameters }) => {
      const listboxId = useId()
      const [searchValue, setSearchValue] = useState(parameters.initialFilter ?? '')

      const filteredOptions = allOptions.filter((option) =>
        option.label.toLowerCase().startsWith(searchValue.toLowerCase()),
      )

      const options = parameters.enableFiltering ? filteredOptions : allOptions

      return (
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
              defaultValue={args.defaultOptions?.map((option) => option.value)}
              id={listboxId}
              selectAction="select"
            >
              <Listbox.Option as={MyListboxOption} value="">
                Select an option
              </Listbox.Option>
              {options.map((option) => (
                <Listbox.Option as={MyListboxOption} key={option.value} value={option.value}>
                  {option.label}
                </Listbox.Option>
              ))}
            </Listbox>
          </div>

          <Story args={{ ...args, listboxId }} />
        </div>
      )
    },
  ],
} satisfies Meta<typeof ComboboxSelectedContent>

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
 * An initial state must be provided for selection chips to be displayed on first render
 * when the listbox options are not immediately present in the DOM, such as when filtering
 * is applied or the options are loaded asynchronously.
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
 * Selected content renders automatically without `children`. To customise how the content is rendered,
 * provide a `children` render-prop. This is useful when rendering the selected option as a card using
 * `Combobox.Card`.
 *
 * The default options specified in this example are also provided to the demo listbox.
 */
export const Children: Story = {
  args: {
    ...Example.args,
    children: (option) => {
      return (
        <Text colour="error" font="text-base/medium">
          {option.label}
        </Text>
      )
    },
    defaultOptions: [{ label: 'Orange', value: 'orange' }],
    listboxId: 'children-example',
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
