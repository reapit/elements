import { ChipSelect } from '../chip-select'
import { ChipSelectOption } from '../chip-select-option'
import { ChipSelectContext } from '../context'
import { fireEvent, render, screen } from '@testing-library/react'

import type { ReactNode } from 'react'

test('renders as checkbox element', () => {
  render(<ChipSelectOption value="test-value">Test Option</ChipSelectOption>, {
    wrapper: createWrapper({ containerRef: { current: null }, multiple: false, size: 'medium' }),
  })
  expect(screen.getByRole('checkbox')).toBeVisible()
})

test('passes context `form` prop to ChipSelectChip', () => {
  render(<ChipSelectOption value="test-value">Test Option</ChipSelectOption>, {
    wrapper: createWrapper({ containerRef: { current: null }, form: 'test-form', multiple: false, size: 'medium' }),
  })
  expect(screen.getByRole('checkbox')).toHaveAttribute('form', 'test-form')
})

test('passes context `name` prop to ChipSelectChip', () => {
  render(<ChipSelectOption value="test-value">Test Option</ChipSelectOption>, {
    wrapper: createWrapper({ containerRef: { current: null }, multiple: false, name: 'test-name', size: 'medium' }),
  })
  expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'test-name')
})

test('passes context `size` prop to ChipSelectChip', () => {
  const { container } = render(<ChipSelectOption value="test-value">Test Option</ChipSelectOption>, {
    wrapper: createWrapper({ containerRef: { current: null }, multiple: false, size: 'large' }),
  })
  expect(container.firstElementChild).toHaveAttribute('data-size', 'large')
})

test('`data-exclusive` is true when `multiple` is false', () => {
  render(<ChipSelectOption value="test-value">Option</ChipSelectOption>, {
    wrapper: createWrapper({ containerRef: { current: null }, multiple: false, name: 'test', size: 'medium' }),
  })
  expect(screen.getByRole('checkbox')).toHaveAttribute('data-exclusive', 'true')
})

test('`data-exclusive` is false when `multiple` is true', () => {
  render(<ChipSelectOption value="test-value">Option</ChipSelectOption>, {
    wrapper: createWrapper({ containerRef: { current: null }, multiple: true, name: 'test', size: 'medium' }),
  })
  expect(screen.getByRole('checkbox')).toHaveAttribute('data-exclusive', 'false')
})

test('forwards additional props to ChipSelectChip', () => {
  render(
    <ChipSelectOption data-testid="custom-option" value="test-value">
      Test Option
    </ChipSelectOption>,
    { wrapper: createWrapper({ containerRef: { current: null }, multiple: false, size: 'medium' }) },
  )
  expect(screen.getByRole('checkbox')).toHaveAttribute('data-testid', 'custom-option')
})

test('deselects other chips when selected in single-select mode without a form', () => {
  render(
    <ChipSelect name="test" size="small">
      <ChipSelectOption value="a">A</ChipSelectOption>
      <ChipSelectOption value="b">B</ChipSelectOption>
    </ChipSelect>,
  )

  fireEvent.click(screen.getByRole('checkbox', { name: 'A' }))
  expect(screen.getByRole('checkbox', { name: 'A' })).toBeChecked()
  expect(screen.getByRole('checkbox', { name: 'B' })).not.toBeChecked()

  fireEvent.click(screen.getByRole('checkbox', { name: 'B' }))
  expect(screen.getByRole('checkbox', { name: 'A' })).not.toBeChecked()
  expect(screen.getByRole('checkbox', { name: 'B' })).toBeChecked()
})

test('deselects other chips when selected in single-select mode without a form or name', () => {
  render(
    <ChipSelect size="small">
      <ChipSelectOption value="a">A</ChipSelectOption>
      <ChipSelectOption value="b">B</ChipSelectOption>
    </ChipSelect>,
  )

  fireEvent.click(screen.getByRole('checkbox', { name: 'A' }))
  expect(screen.getByRole('checkbox', { name: 'A' })).toBeChecked()
  expect(screen.getByRole('checkbox', { name: 'B' })).not.toBeChecked()

  fireEvent.click(screen.getByRole('checkbox', { name: 'B' }))
  expect(screen.getByRole('checkbox', { name: 'A' })).not.toBeChecked()
  expect(screen.getByRole('checkbox', { name: 'B' })).toBeChecked()
})

test('does not deselect other chips when selected in multi-select mode', () => {
  render(
    <ChipSelect multiple name="test" size="small">
      <ChipSelectOption value="a">A</ChipSelectOption>
      <ChipSelectOption value="b">B</ChipSelectOption>
    </ChipSelect>,
  )

  fireEvent.click(screen.getByRole('checkbox', { name: 'A' }))
  fireEvent.click(screen.getByRole('checkbox', { name: 'B' }))
  expect(screen.getByRole('checkbox', { name: 'A' })).toBeChecked()
  expect(screen.getByRole('checkbox', { name: 'B' })).toBeChecked()
})

function createWrapper(context: ChipSelectContext.Value) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <ChipSelectContext.Provider value={context}>{children}</ChipSelectContext.Provider>
  }
}
