import preview from '#.storybook/preview'
import { Select } from './select'
import { SupplementaryInfo } from '../supplementary-info'
import { useId } from 'react'

const meta = preview.meta({
  title: 'Input and selection/Select',
  component: Select,
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
 * Demonstrates a single-select Select.
 */
export const Example = meta.story({
  args: {
    children: [
      <Select.Button key="button" />,
      <Select.Popup key="popup">
        <Select.Listbox>
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
    multiple: false,
    required: false,
    showValidity: false,
    size: 'medium',
  },
})

/**
 * Use `variant="borderless"` on `Select.Button` when embedding the select in a surface that
 * provides its own border or background, such as a table cell. This variant removes
 * border-based validity styling; when `showValidity` is enabled, validity may still be
 * reflected via background in accordance with the underlying `Combobox` styling.
 */
export const Borderless = Example.extend({
  args: {
    children: [
      <Select.Button key="button" variant="borderless" />,
      <Select.Popup key="popup">
        <Select.Listbox>
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
  },
})

/**
 * Options can be grouped using the `CompactSelect.Optgroup`. Groups should always be separated
 * by a `CompactSelect.Divider`.
 */
export const Groups = Example.extend({
  args: {
    children: [
      <Select.Button key="button" />,
      <Select.Popup key="popup">
        <Select.Listbox>
          <Select.Optgroup label="Fruits">
            <Select.Option value="apple">Apple</Select.Option>
            <Select.Option value="banana">Banana</Select.Option>
            <Select.Option value="orange">Orange</Select.Option>
          </Select.Optgroup>
          <Select.Divider />
          <Select.Optgroup label="Vegetables">
            <Select.Option value="carrot">Carrot</Select.Option>
            <Select.Option value="broccoli">Broccoli</Select.Option>
            <Select.Option value="spinach">Spinach</Select.Option>
          </Select.Optgroup>
        </Select.Listbox>
      </Select.Popup>,
    ],

    id: 'groups-example',
  },
})

/**
 * Demonstrates a multi-select that lets users choose multiple preloaded options.
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

    return (
      <Select.DefaultOptionsContext.Provider value={parameters.defaultOptions ?? []}>
        <Select {...args} id={id}>
          <Select.Button />
          <Select.Popup>
            <Select.Listbox>
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
          </Select.Popup>
        </Select>
        <Select.SelectionChips listboxId={Select.getListboxId(id)} />
      </Select.DefaultOptionsContext.Provider>
    )
  },
})

/**
 * When the select has one or more initial selections, the label text for those options must
 * be provided to `Select.Button` (single-select), and `Select.SelectionChips` (multi-select).
 * The value of each option should also form the `value` or `defaultValue` of `Select.Listbox`.
 * This wire up can be done manually via each component's prop interface or automatically through
 * `Select.DefaultOptionsContext`.
 */
export const DefaultOptions = MultiSelect.extend({
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
 * Single-select selects can display a card with dynamic content by providing `selectionStyle="card"`
 * and a `children` render-prop to `Select.Button`.
 */
export const SelectionCard = Example.extend({
  args: {
    id: 'selection-card-example',
  },
  parameters: {
    docs: { source: { type: 'code' } },
  },
  render: (args) => {
    return (
      <Select {...args}>
        <Select.Button
          defaultOptions={[{ label: 'Banana', value: 'banana' }]}
          placeholder="Select fruit"
          selectionStyle="card"
        >
          {(option) => (
            <Select.CardDefaultContent
              additionalInfo={
                <SupplementaryInfo colour="secondary">
                  <SupplementaryInfo.Item>{descriptions[option.value]}</SupplementaryInfo.Item>
                </SupplementaryInfo>
              }
            >
              {option.label}
            </Select.CardDefaultContent>
          )}
        </Select.Button>
        <Select.Popup>
          <Select.Listbox defaultValue={'banana'}>
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
        </Select.Popup>
      </Select>
    )
  },
})

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
