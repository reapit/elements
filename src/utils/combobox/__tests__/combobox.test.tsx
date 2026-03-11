import { Combobox } from '../combobox'
import { render, screen } from '@testing-library/react'
import { ComboboxContext } from '../context'

test('renders children', () => {
  render(
    <Combobox>
      <div>Test content</div>
    </Combobox>,
  )
  expect(screen.getByText('Test content')).toBeVisible()
})

test('provides IDs and other values over ComboboxContext', () => {
  expect.assertions(1)
  render(
    <Combobox disabled multiple required size="large">
      <ComboboxContext.Consumer>
        {(value) => {
          expect(value).toMatchInlineSnapshot(
            {
              comboboxId: expect.any(String),
              listboxId: expect.any(String),
              popupId: expect.any(String),
            },
            `
            {
              "ariaDescribedBy": undefined,
              "ariaErrorMessage": undefined,
              "ariaInvalid": undefined,
              "ariaLabelledBy": undefined,
              "comboboxId": Any<String>,
              "disabled": true,
              "listboxId": Any<String>,
              "multiple": true,
              "popupId": Any<String>,
              "required": true,
              "size": "large",
            }
          `,
          )
          return null
        }}
      </ComboboxContext.Consumer>
    </Combobox>,
  )
})

test('applies maxWidth via CSS variable', () => {
  const { container } = render(
    <Combobox maxWidth="300px">
      <div>Content</div>
    </Combobox>,
  )
  const combobox = container.firstChild as HTMLElement
  expect(combobox.style.getPropertyValue('--combobox-max-width')).toBe('300px')
})

test('merges custom style with CSS variable style', () => {
  const { container } = render(
    <Combobox maxWidth="400px" style={{ color: 'red' }}>
      <div>Content</div>
    </Combobox>,
  )
  const combobox = container.firstChild as HTMLElement
  expect(combobox.style.getPropertyValue('--combobox-max-width')).toBe('400px')
  expect(combobox.style.color).toBe('red')
})

test('sets data-show-validity attribute when showValidity is true', () => {
  const { container } = render(
    <Combobox showValidity>
      <div>Content</div>
    </Combobox>,
  )
  expect(container.firstChild).toHaveAttribute('data-show-validity', 'true')
})

test('does not set data-show-validity attribute when showValidity is false', () => {
  const { container } = render(
    <Combobox showValidity={false}>
      <div>Content</div>
    </Combobox>,
  )
  expect(container.firstChild).toHaveAttribute('data-show-validity', 'false')
})

test('defaults showValidity to false', () => {
  const { container } = render(
    <Combobox>
      <div>Content</div>
    </Combobox>,
  )
  expect(container.firstChild).toHaveAttribute('data-show-validity', 'false')
})

test('forwards additional props to the underlying element', () => {
  const { container } = render(
    <Combobox data-testid="my-combobox">
      <div>Content</div>
    </Combobox>,
  )
  expect(container.firstChild).toHaveAttribute('data-testid', 'my-combobox')
})

test('exposes Button', () => {
  expect(Combobox.Button).toBeDefined()
})

test('exposes Card', () => {
  expect(Combobox.Card).toBeDefined()
})

test('exposes Popup', () => {
  expect(Combobox.Popup).toBeDefined()
})

test('exposes Listbox', () => {
  expect(Combobox.Listbox).toBeDefined()
})

test('exposes Option', () => {
  expect(Combobox.Option).toBeDefined()
})

test('exposes Optgroup', () => {
  expect(Combobox.Optgroup).toBeDefined()
})

test('exposes OptionAdditionalInfo', () => {
  expect(Combobox.OptionAdditionalInfo).toBeDefined()
})

test('exposes Divider', () => {
  expect(Combobox.Divider).toBeDefined()
})

test('exposes SearchInput', () => {
  expect(Combobox.SearchInput).toBeDefined()
})

test('exposes SelectedContent', () => {
  expect(Combobox.SelectedContent).toBeDefined()
})

test('exposes SelectionChips', () => {
  expect(Combobox.SelectionChips).toBeDefined()
})

test('exposes getOptionLabel utility', () => {
  expect(Combobox.getOptionLabel).toBeDefined()
  expect(typeof Combobox.getOptionLabel).toBe('function')
})

test('exposes getListboxValue utility', () => {
  expect(Combobox.getListboxValue).toBeDefined()
  expect(typeof Combobox.getListboxValue).toBe('function')
})
