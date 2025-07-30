import { applyCSSAnchorPositioningPolyfill } from '#src/polyfills/css-anchor-positioning'
import { Popover } from '../popover'
import { render, screen } from '@testing-library/react'

import type { CSSProperties } from 'react'

// Mock CSS anchor positioning polyfill since it's not necessary during test.
vi.mock('#src/polyfills/css-anchor-positioning/polyfill')
vi.mocked(applyCSSAnchorPositioningPolyfill).mockResolvedValue(undefined)

const requiredProps = {
  anchorId: 'anchor-element',
  id: 'popover-element',
  placement: 'bottom',
} as const

test('renders a div element with popover="auto" by default', () => {
  render(<Popover {...requiredProps}>Popover content</Popover>)
  expect(screen.getByText('Popover content')).toBeInTheDocument()
})

test('renders a style element as the first child of the popover', () => {
  render(<Popover {...requiredProps}>Popover content</Popover>)

  const popover = screen.getByText('Popover content')
  expect(popover.firstChild).toBeInstanceOf(HTMLStyleElement)
})

test('has popover="auto" by default', () => {
  render(<Popover {...requiredProps}>Popover content</Popover>)
  expect(screen.getByText('Popover content')).toHaveAttribute('popover', 'auto')
})

test('can override the default popover value', () => {
  render(
    <Popover {...requiredProps} popover="manual">
      Popover content
    </Popover>,
  )
  expect(screen.getByText('Popover content')).toHaveAttribute('popover', 'manual')
})

test('has data-elevation="none" attribute by default', () => {
  render(<Popover {...requiredProps}>Popover content</Popover>)
  expect(screen.getByText('Popover content')).toHaveAttribute('data-elevation', 'none')
})

test('can override the default elevation', () => {
  render(
    <Popover {...requiredProps} elevation="xl">
      Popover content
    </Popover>,
  )
  expect(screen.getByText('Popover content')).toHaveAttribute('data-elevation', 'xl')
})

test('provides custom CSS property for maxWidth when specified', () => {
  render(
    <Popover {...requiredProps} maxWidth="300px">
      Popover content
    </Popover>,
  )
  expect(screen.getByText('Popover content')).toHaveStyle('--popover-max-width: 300px')
})

test('provides custom CSS property for maxHeight when specified', () => {
  render(
    <Popover {...requiredProps} maxHeight="200px">
      Popover content
    </Popover>,
  )
  expect(screen.getByText('Popover content')).toHaveStyle('--popover-max-height: 200px')
})

test('provides custom CSS properties for both maxWidth and maxHeight when specified', () => {
  render(
    <Popover {...requiredProps} maxWidth="300px" maxHeight="200px">
      Popover content
    </Popover>,
  )
  const popover = screen.getByText('Popover content')
  expect(popover).toHaveStyle('--popover-max-width: 300px')
  expect(popover).toHaveStyle('--popover-max-height: 200px')
})

test('allows other inline styles to be provided', () => {
  render(
    <Popover {...requiredProps} style={{ backgroundColor: 'red', fontSize: '14px' }}>
      Popover content
    </Popover>,
  )
  const popover = screen.getByText('Popover content')
  expect(popover).toHaveStyle('background-color: red')
  expect(popover).toHaveStyle('font-size: 14px')
})

test('combines existing styles with CSS custom properties', () => {
  render(
    <Popover
      {...requiredProps}
      maxWidth="300px"
      style={{ backgroundColor: 'red', '--custom-prop': 'value' } as CSSProperties}
    >
      Popover content
    </Popover>,
  )
  const popover = screen.getByText('Popover content')
  expect(popover).toHaveStyle('background-color: red')
  expect(popover).toHaveStyle('--popover-max-width: 300px')
  expect(popover).toHaveStyle('--custom-prop: value')
})

test('forwards additional props to the div element', () => {
  render(
    <Popover {...requiredProps} data-testid="popover-element">
      Popover content
    </Popover>,
  )
  expect(screen.getByTestId('popover-element')).toBeInTheDocument()
})

test('applies the el-popover className', () => {
  render(
    <Popover {...requiredProps} className="custom-class">
      Popover content
    </Popover>,
  )
  expect(screen.getByText('Popover content')).toHaveClass('el-popover')
})

test('applies custom className along with default styling', () => {
  render(
    <Popover {...requiredProps} className="custom-class">
      Popover content
    </Popover>,
  )
  expect(screen.getByText('Popover content')).toHaveClass('custom-class')
})
