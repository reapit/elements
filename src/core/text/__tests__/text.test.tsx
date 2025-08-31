import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import { Text } from '../text'

test('renders as a <span> by default', () => {
  render(<Text>Some text</Text>)
  const el = screen.getByText('Some text')
  expect(el.tagName).toBe('SPAN')
})

test('renders as the specified HTML element', () => {
  render(<Text as="strong">Strong text</Text>)
  const el = screen.getByText('Strong text')
  expect(el.tagName).toBe('STRONG')
})

test('applies data attributes for colour, overflow, size, and weight', () => {
  render(
    <Text as="em" colour="secondary" font="text-xl/bold" overflow="truncate">
      Styled text
    </Text>,
  )
  const el = screen.getByText('Styled text')
  expect(el).toHaveAttribute('data-colour', 'secondary')
  expect(el).toHaveAttribute('data-font-size', 'xl')
  expect(el).toHaveAttribute('data-font-weight', 'bold')
  expect(el).toHaveAttribute('data-overflow', 'truncate')
})

test('defaults to text-base/regular when no font, size or weight props are provided', () => {
  render(<Text>Styled text</Text>)
  const el = screen.getByText('Styled text')
  expect(el).toHaveAttribute('data-font-size', 'base')
  expect(el).toHaveAttribute('data-font-weight', 'regular')
})

test('uses deprecated size/weight props when at least one is specified and font is not', () => {
  render(<Text size="md">Styled text</Text>)
  const el = screen.getByText('Styled text')
  expect(el).toHaveAttribute('data-font-size', 'md')
  expect(el).toHaveAttribute('data-font-weight', 'regular')
})

test('uses font size/weight when specified when deprecated size/weight are also specified', () => {
  render(
    <Text font="text-3xl/bold" size="md" weight="medium">
      Styled text
    </Text>,
  )
  const el = screen.getByText('Styled text')
  expect(el).toHaveAttribute('data-font-size', '3xl')
  expect(el).toHaveAttribute('data-font-weight', 'bold')
})

test('uses font size/weight when specified and deprecated size/weight are not', () => {
  render(<Text font="text-3xl/bold">Styled text</Text>)
  const el = screen.getByText('Styled text')
  expect(el).toHaveAttribute('data-font-size', '3xl')
  expect(el).toHaveAttribute('data-font-weight', 'bold')
})

test('forwards additional props to the rendered element', () => {
  render(
    <Text as="abbr" title="Abbreviation">
      HTML
    </Text>,
  )
  const el = screen.getByText('HTML')
  expect(el).toHaveAttribute('title', 'Abbreviation')
})
