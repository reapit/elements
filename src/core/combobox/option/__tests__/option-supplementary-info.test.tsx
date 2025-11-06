import { ComboboxOptionSupplementaryInfo } from '../option-supplementary-info'
import { render, screen } from '@testing-library/react'

test('renders as a span element', () => {
  const { container } = render(<ComboboxOptionSupplementaryInfo>Text</ComboboxOptionSupplementaryInfo>)
  const span = container.querySelector('span')
  expect(span?.tagName).toBe('SPAN')
  expect(span).toBeVisible()
})

test('can display supplementary info text', () => {
  render(<ComboboxOptionSupplementaryInfo>Supplementary text</ComboboxOptionSupplementaryInfo>)
  expect(screen.getByText('Supplementary text')).toBeVisible()
})

test('can display an icon', () => {
  render(<ComboboxOptionSupplementaryInfo icon="Icon">Text</ComboboxOptionSupplementaryInfo>)
  expect(screen.getByText('Icon')).toBeVisible()
})

test('can display a badge', () => {
  render(<ComboboxOptionSupplementaryInfo badge="Badge">Text</ComboboxOptionSupplementaryInfo>)
  expect(screen.getByText('Badge')).toBeVisible()
})

test('can display an icon, supplementary text and a badge', () => {
  render(
    <ComboboxOptionSupplementaryInfo icon="Icon" badge="Badge">
      Text
    </ComboboxOptionSupplementaryInfo>,
  )
  expect(screen.getByText('Icon')).toBeVisible()
  expect(screen.getByText('Text')).toBeVisible()
  expect(screen.getByText('Badge')).toBeVisible()
})

test('does not render icon container when icon is not provided', () => {
  const { container } = render(<ComboboxOptionSupplementaryInfo>Text</ComboboxOptionSupplementaryInfo>)

  const iconContainer = container.querySelector('.el-combobox-option-supplementary-info-icon-container')
  expect(iconContainer).toBeNull()
})

test('does not render badge container when badge is not provided', () => {
  const { container } = render(<ComboboxOptionSupplementaryInfo>Text</ComboboxOptionSupplementaryInfo>)

  const badgeContainer = container.querySelector('.el-combobox-option-badge-container')
  expect(badgeContainer).toBeNull()
})

test('forwards additional props to the span element', () => {
  render(<ComboboxOptionSupplementaryInfo data-testid="custom-info">Text</ComboboxOptionSupplementaryInfo>)
  expect(screen.getByTestId('custom-info')).toBeVisible()
})
