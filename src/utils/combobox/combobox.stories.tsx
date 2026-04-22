import preview from '#.storybook/preview'
import { Combobox } from './combobox'
import { ComboboxButton } from './button'
import { getComboboxListboxId } from './get-listbox-id'
import { SupplementaryInfo } from '#src/core/supplementary-info'
import { useComboboxButton } from './use-button'
import { useComboboxContext } from './context'
import { useState } from 'react'

const meta = preview.meta({
  title: 'Utils/Combobox',
  component: Combobox,
  argTypes: {
    'aria-invalid': {
      control: 'boolean',
    },
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
 * Demonstrates a basic combobox with static options using the low-level ComboboxButton primitive.
 */
export const Example = meta.story({
  args: {
    'aria-invalid': undefined,
    children: [
      <DemoButton key="button" />,
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
})

/**
 * Like all form controls that visually communicate their validity, the combobox will display in an
 * invalid state when it's value does not meet the validation constraints applied to it, such as being
 * required, and `showValidity` is true. Typically, `showValidity` will be true when the control has
 * been touched (interacted with).
 */
export const Invalid = meta.story({
  args: {
    children: [
      <DemoButton key="button" />,
      <Combobox.Popup key="popup" variant="popover">
        <Combobox.Listbox>
          <Combobox.Option value="option1">Option 1</Combobox.Option>
          <Combobox.Option value="option2">Option 2</Combobox.Option>
          <Combobox.Option value="option3">Option 3</Combobox.Option>
        </Combobox.Listbox>
      </Combobox.Popup>,
    ],
    disabled: false,
    required: true,
    showValidity: true,
    size: 'medium',
  },
})

/**
 * The combobox also displays in an invalid state when `aria-invalid="true"` and `showValidity` is true.
 * This supports usage where the element is not natively invalid — for example, via custom logic
 * that does not use the browser's constraint validation API.
 */
export const AriaInvalid = meta.story({
  name: 'Aria Invalid',
  args: {
    'aria-invalid': true,
    children: [
      <DemoButton key="button" />,
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
    showValidity: true,
    size: 'medium',
  },
})

/**
 * Demonstrates a searchable combobox that lets users filter options by typing. As the options
 * are dynamically rendered, and the combobox allows multiple selections, the selected options are
 * displayed using `Combobox.SelectionChips`.
 */
export const DynamicOptions = Example.extend({
  args: {
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
          <DemoButton placeholder="Search..." />
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
})

/**
 * By default, the combobox popup will switch to a drawer experience on XS breakpoints. It can also be
 * pinned to a popover or drawer using the `variant` prop.
 */
export const Drawer = Example.extend({
  args: {
    children: [
      <DemoButton key="button" />,
      <Combobox.Popup key="popup" search={<Combobox.SearchInput aria-label="Filter options" />} variant="drawer">
        <Combobox.Listbox>
          <Combobox.Option value="option1">Option 1</Combobox.Option>
          <Combobox.Option value="option2">Option 2</Combobox.Option>
          <Combobox.Option value="option3">Option 3</Combobox.Option>
        </Combobox.Listbox>
      </Combobox.Popup>,
    ],
  },
})

/**
 * Three sizes are supported: small, medium, and large. The size impacts both the combobox button and
 * the option labels.
 */
export const Sizes = Example.extend({
  args: {
    size: 'large',
  },
})

/**
 * `Combobox.Card` can be used to provide more details about the selected option in single-select
 * comboboxes. The card is equivalent to `Combobox.Button` and should be used with Combobox.useButton.
 * Unlike the standard combobox button, the card will not open the popup when clicked. It is a
 * low-level primitive that will typically be used within a higher-level component.
 *
 * See `Autocomplete.Button` and `Select.Button` for examples.
 */
export const Cards = Example.extend({
  args: {
    id: 'card-example',

    children: [
      <Combobox.Card aria-controls={Combobox.getListboxId('card-example')} aria-expanded={false} key="card">
        <Combobox.SelectedContent
          defaultOptions={[{ label: 'Option 1', value: 'option1' }]}
          listboxId={Combobox.getListboxId('card-example')}
        >
          {(option) => (
            <Combobox.CardDefaultContent
              additionalInfo={
                <SupplementaryInfo colour="secondary">
                  <SupplementaryInfo.Item>The default</SupplementaryInfo.Item>
                </SupplementaryInfo>
              }
            >
              {option.label}
            </Combobox.CardDefaultContent>
          )}
        </Combobox.SelectedContent>
      </Combobox.Card>,
      <Combobox.Popup key="popup" variant="popover">
        <Combobox.Listbox value="option1">
          <Combobox.Option value="option1">Option 1</Combobox.Option>
          <Combobox.Option value="option2">Option 2</Combobox.Option>
          <Combobox.Option value="option3">Option 3</Combobox.Option>
        </Combobox.Listbox>
      </Combobox.Popup>,
    ],
  },
})

/**
 * The combobox's value can be controlled like any other form control. The `Combobox.useState` hook is
 * available; it has the correct type baked-in. When responding to changes, `Combobox.getListboxValue`
 * can be used to retrieve the appropriate value from the DOM element.
 */
export const Controlled = Example.extend({
  render: (args) => {
    const [value, setValue] = Combobox.useState('')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', color: '#FA00FF' }}>
        {/* Some actions to control the combobox state outside of it's popup. */}
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          <button onClick={() => setValue('option1')}>Select Option 1</button>
          <button onClick={() => setValue('')}>Clear selection</button>
        </div>

        {/* Our controlled state */}
        <pre>{JSON.stringify(value)}</pre>

        <Combobox {...args}>
          <DemoButton key="button" />
          <Combobox.Popup key="popup">
            {/* We use our state to control the listbox's value. The Combobox.getListboxValue helps
             * get the value of the listbox; `e.currentTarget.value` will only give the first selected
             * value, not all of them. */}
            <Combobox.Listbox onChange={(e) => setValue(Combobox.getListboxValue(e.currentTarget))} value={value}>
              <Combobox.Option value="option1">Option 1</Combobox.Option>
              <Combobox.Option value="option2">Option 2</Combobox.Option>
              <Combobox.Option value="option3">Option 3</Combobox.Option>
            </Combobox.Listbox>
          </Combobox.Popup>
        </Combobox>
      </div>
    )
  },
})

/**
 * Three sizes are supported: small, medium, and large. The size impacts both the combobox button and
 * the option labels.
 */
export const Forms = DynamicOptions.extend({
  ...DynamicOptions.input,
  args: {
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
})

/**
 * Simple demo button for stories that uses ComboboxButton primitive.
 */
function DemoButton({ placeholder = 'Select an option' }: { placeholder?: string }) {
  const { size } = useComboboxContext()
  const buttonProps = useComboboxButton()

  return (
    <ComboboxButton {...buttonProps} placeholder={placeholder} size={size}>
      Click me!
    </ComboboxButton>
  )
}
