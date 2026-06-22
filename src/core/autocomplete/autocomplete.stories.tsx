import preview from '#.storybook/preview'
import { Autocomplete } from './autocomplete'
import { SupplementaryInfo } from '../supplementary-info'
import { useEffect, useId, useState } from 'react'

const meta = preview.meta({
  title: 'Input and selection/Autocomplete',
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
})

/**
 * Demonstrates a single-select autocomplete with dynamic options.
 */
export const Example = meta.story({
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
})

/**
 * Demonstrates an autocomplete that lets users filter preloaded options by typing in the search input.
 */
export const Preloaded = Example.extend({
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
})

/**
 * Use `variant="borderless"` on `Autocomplete.Button` when embedding the autocomplete in a
 * surface that provides its own border or background, such as a card. This variant removes the
 * default border; when `showValidity` is enabled, validity is communicated via background colour
 * rather than a border.
 */
export const Borderless = Example.extend({
  globals: {
    backgrounds: {
      value: 'light',
    },
  },

  parameters: { docs: { source: { type: 'code' } } },

  render: (args) => {
    const [searchText, setSearchText] = useState('')
    const filteredOptions = filterFruit(searchText)

    return (
      <Autocomplete {...args}>
        <Autocomplete.Button variant="borderless" />
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
})

/**
 * Options can be grouped using the `CompactSelect.Optgroup`. Groups should always be separated
 * by a `CompactSelect.Divider`.
 */
export const Groups = Example.extend({
  args: {
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
})

/**
 * Demonstrates a multi-select autocomplete that lets users filter and select multiple preloaded options.
 */
export const MultiSelect = Example.extend({
  name: 'Multi-select',
  args: {
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
  render: (args, { parameters }) => {
    const fallbackId = useId()
    const id = args.id ?? fallbackId
    const [searchText, setSearchText] = useState('')

    const filteredOptions = filterFruit(searchText)

    return (
      <Autocomplete.DefaultOptionsContext.Provider value={parameters.defaultOptions ?? []}>
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
      </Autocomplete.DefaultOptionsContext.Provider>
    )
  },
})

/**
 * When the autocomplete has one or more initial selections, the label text for those options must
 * be provided to `Autocomplete.Button` (single-select), and `Autocomplete.SelectionChips` (multi-select).
 * The value of each option should also form the `value` or `defaultValue` of `Autocomplete.Listbox`.
 * This wire up can be done manually via the each component's prop interface or automatically through
 * `Autocomplete.DefaultOptionsContext`.
 */
export const DefaultOptions = MultiSelect.extend({
  name: 'Default options',
  args: {
    id: 'default-options-example',
  },
  parameters: {
    docs: { source: { type: 'code' } },
    defaultOptions: [
      { label: 'Banana', value: 'banana' },
      { label: 'Blueberry', value: 'blueberry' },
    ],
  },
})

/**
 * Single-select autocompletes can display a card with dynamic content by providing `selectionStyle="card"`
 * and a `children` render-prop to `Autocomplete.Button`.
 */
export const SelectionCard = Preloaded.extend({
  args: {
    id: 'selection-card-example',
  },
  parameters: {
    docs: { source: { type: 'code' } },
  },
  render: (args) => {
    return (
      <Autocomplete {...args}>
        <Autocomplete.Button
          defaultOptions={[{ label: 'Banana', value: 'banana' }]}
          placeholder="Select fruit"
          selectionStyle="card"
        >
          {(option) => (
            <Autocomplete.CardDefaultContent
              additionalInfo={
                <SupplementaryInfo colour="secondary">
                  <SupplementaryInfo.Item>{descriptions[option.value]}</SupplementaryInfo.Item>
                </SupplementaryInfo>
              }
            >
              {option.label}
            </Autocomplete.CardDefaultContent>
          )}
        </Autocomplete.Button>
        <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Filter fruit" />}>
          <Autocomplete.Listbox defaultValue={'banana'}>
            {allOptions.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value}>
                {option.label}
              </Autocomplete.Option>
            ))}
          </Autocomplete.Listbox>
        </Autocomplete.Popup>
      </Autocomplete>
    )
  },
})

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

const descriptions = {
  apple: 'Crunchy and juicy',
  apricot: 'Great with cream',
  avocado: 'Creamy and nutritious',
  banana: 'Soft and sweet',
  blueberry: 'Packed with goodness',
  cherry: 'Place on top',
  cantaloupe: 'Juicy and floral',
  grape: 'Berry winey',
  grapefruit: 'Acidic and juicy',
}
