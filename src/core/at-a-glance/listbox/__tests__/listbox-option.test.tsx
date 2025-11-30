import { AtAGlanceListboxOption } from '../listbox-option'
import { Listbox } from '#src/utils/listbox'
import { render, screen } from '@testing-library/react'

test('renders as an option', () => {
  render(
    <Listbox name="test">
      <AtAGlanceListboxOption value="test-value" label="Test Label" displayValue="Test Value" />
    </Listbox>,
  )
  expect(screen.getByRole('option', { name: 'Test Label' })).toBeVisible()
})

test('applies aria-selected when selected in single-select mode', () => {
  render(
    <Listbox name="test" value={['option1']}>
      <AtAGlanceListboxOption value="option1" label="Option 1" displayValue="Value 1" />
      <AtAGlanceListboxOption value="option2" label="Option 2" displayValue="Value 2" />
    </Listbox>,
  )

  const options = screen.getAllByRole('option')
  expect(options[0]).toHaveAttribute('aria-selected', 'true')
  expect(options[1]).not.toHaveAttribute('aria-selected', 'true')
})

test('applies aria-checked when selected in multi-select mode', () => {
  render(
    <Listbox name="test" value={['option1', 'option2']} aria-multiselectable>
      <AtAGlanceListboxOption value="option1" label="Option 1" displayValue="Value 1" />
      <AtAGlanceListboxOption value="option2" label="Option 2" displayValue="Value 2" />
      <AtAGlanceListboxOption value="option3" label="Option 3" displayValue="Value 3" />
    </Listbox>,
  )

  const options = screen.getAllByRole('option')
  expect(options[0]).toHaveAttribute('aria-checked', 'true')
  expect(options[1]).toHaveAttribute('aria-checked', 'true')
  expect(options[2]).not.toHaveAttribute('aria-checked', 'true')
})

test('applies max-width when specified', () => {
  render(
    <Listbox name="test">
      <AtAGlanceListboxOption value="test-value" label="Test Label" displayValue="Test Value" maxWidth="300px" />
    </Listbox>,
  )
  expect(screen.getByRole('option')).toHaveStyle({ maxWidth: '300px' })
})

test('applies min-width when specified', () => {
  render(
    <Listbox name="test">
      <AtAGlanceListboxOption value="test-value" label="Test Label" displayValue="Test Value" minWidth="200px" />
    </Listbox>,
  )
  expect(screen.getByRole('option')).toHaveStyle({ minWidth: '200px' })
})

test('applies elAtAGlanceListboxOption className', () => {
  render(
    <Listbox name="test">
      <AtAGlanceListboxOption value="test-value" label="Test Label" displayValue="Test Value" minWidth="200px" />
    </Listbox>,
  )
  expect(screen.getByRole('option')).toHaveClass('el-at-aglance-listbox-option')
})

test('applies custom className when supplied', () => {
  render(
    <Listbox name="test">
      <AtAGlanceListboxOption
        className="custom-class"
        value="test-value"
        label="Test Label"
        displayValue="Test Value"
        minWidth="200px"
      />
    </Listbox>,
  )
  expect(screen.getByRole('option')).toHaveClass('el-at-aglance-listbox-option custom-class')
})
