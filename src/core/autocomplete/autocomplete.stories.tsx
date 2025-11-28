import { Autocomplete } from './autocomplete'
import { useEffect, useId, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Autocomplete',
  component: Autocomplete,
  argTypes: {
    children: {
      control: false,
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Autocomplete>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Demonstrates a single-select autocomplete with dynamic options.
 */
export const Example: Story = {
  args: {
    children: null, // children are handled by the story's render function
    disabled: false,
    multiple: false,
    required: false,
    showValidity: false,
    size: 'medium',
  },
  parameters: { docs: { source: { type: 'code' } } },
  render: (args) => {
    // We control the search input's value with basic component state.
    const [searchText, setSearchText] = useState('')
    const { isLoading, data } = useFruitQuery(searchText)

    return (
      <Autocomplete {...args}>
        <Autocomplete.Button />
        <Autocomplete.Popup
          preserveSearchOnClose
          search={
            <Autocomplete.SearchInput
              aria-label="Search fruit"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          }
        >
          <Autocomplete.Listbox>
            {isLoading ? (
              <Autocomplete.Placeholder>Searching...</Autocomplete.Placeholder>
            ) : searchText && data.length === 0 ? (
              <Autocomplete.Placeholder>No results found</Autocomplete.Placeholder>
            ) : !searchText && data.length === 0 ? (
              <Autocomplete.Placeholder>Start typing to search</Autocomplete.Placeholder>
            ) : (
              data.map((option) => (
                <Autocomplete.Option key={option.value} value={option.value}>
                  {option.label}
                </Autocomplete.Option>
              ))
            )}
          </Autocomplete.Listbox>
        </Autocomplete.Popup>
      </Autocomplete>
    )
  },
}

/**
 * Demonstrates an autocomplete that lets users filter preloaded options by typing in the search input.
 */
export const Preloaded: Story = {
  args: {
    ...Example.args,
  },
  parameters: { docs: { source: { type: 'code' } } },
  render: (args) => {
    const [searchText, setSearchText] = useState('')

    const filteredOptions = filterFruit(searchText)

    return (
      <Autocomplete {...args}>
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
          <Autocomplete.Listbox>
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
      </Autocomplete>
    )
  },
}

/**
 * Options can be grouped using the `CompactSelect.Optgroup`. Groups should always be separated
 * by a `CompactSelect.Divider`.
 */
export const Groups: Story = {
  args: {
    ...Example.args,
    id: 'groups-example',
  },
  render: (args) => {
    return (
      <Autocomplete {...args}>
        <Autocomplete.Button placeholder="Filter fruit" />
        <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Filter produce" />}>
          <Autocomplete.Listbox>
            <Autocomplete.Optgroup label="Fruits">
              <Autocomplete.Option value="apple">Apple</Autocomplete.Option>
              <Autocomplete.Option value="banana">Banana</Autocomplete.Option>
              <Autocomplete.Option value="orange">Orange</Autocomplete.Option>
            </Autocomplete.Optgroup>
            <Autocomplete.Divider />
            <Autocomplete.Optgroup label="Vegetables">
              <Autocomplete.Option value="carrot">Carrot</Autocomplete.Option>
              <Autocomplete.Option value="broccoli">Broccoli</Autocomplete.Option>
              <Autocomplete.Option value="spinach">Spinach</Autocomplete.Option>
            </Autocomplete.Optgroup>
          </Autocomplete.Listbox>
        </Autocomplete.Popup>
      </Autocomplete>
    )
  },
}

/**
 * Demonstrates a multi-select autocomplete that lets users filter and select multiple preloaded options.
 */
export const MultiSelect: Story = {
  name: 'Multi-select',
  args: {
    ...Example.args,
    id: 'multi-select-example',
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
    const fallbackId = useId()
    const id = args.id ?? fallbackId
    const [searchText, setSearchText] = useState('')

    const filteredOptions = filterFruit(searchText)

    return (
      <>
        <Autocomplete {...args} id={id}>
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
            <Autocomplete.Listbox>
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
        </Autocomplete>
        <Autocomplete.SelectionChips listboxId={Autocomplete.getListboxId(id)} />
      </>
    )
  },
}

interface FruitOption {
  label: string
  value: string
}

/** Fake query hook that simulates a network request for fruit. */
function useFruitQuery(searchText: string) {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<FruitOption[]>([])

  useEffect(() => {
    if (!searchText) {
      setData([])
      return
    }

    setIsLoading(true)

    const timeout = setTimeout(() => {
      setData(filterFruit(searchText))
      setIsLoading(false)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [searchText])

  return { isLoading, data }
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
