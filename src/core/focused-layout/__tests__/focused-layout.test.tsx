import { FocusedLayout } from '../focused-layout'
import { render, screen } from '@testing-library/react'

test('renders a div element', () => {
  const { container } = render(<FocusedLayout />)
  expect(container.firstElementChild?.tagName).toBe('DIV')
})

test('has data-background="light" attribute by default', () => {
  const { container } = render(<FocusedLayout />)
  expect(container.firstElementChild).toHaveAttribute('data-background', 'light')
})

test('has data-background="dark" attribute when background="dark"', () => {
  const { container } = render(<FocusedLayout background="dark" />)
  expect(container.firstElementChild).toHaveAttribute('data-background', 'dark')
})

test('provides background value via FocusedLayoutContext', () => {
  expect.assertions(1)
  render(
    <FocusedLayout background="dark">
      <FocusedLayout.Context.Consumer>
        {(context) => {
          expect(context?.background).toBe('dark')
          return null
        }}
      </FocusedLayout.Context.Consumer>
    </FocusedLayout>,
  )
})

test('forwards additional attributes to the div element', () => {
  const { container } = render(<FocusedLayout data-testid="test-id" />)
  expect(screen.getByTestId('test-id')).toBe(container.firstElementChild)
})

test('renders children', () => {
  render(
    <FocusedLayout>
      <span>Test content</span>
    </FocusedLayout>,
  )
  expect(screen.getByText('Test content')).toBeVisible()
})

test('exposes FocusedLayout.TopBar', () => {
  expect(FocusedLayout.TopBar).toBeDefined()
})

test('exposes FocusedLayout.Content', () => {
  expect(FocusedLayout.Content).toBeDefined()
})

test('exposes FocusedLayout.BottomBar', () => {
  expect(FocusedLayout.BottomBar).toBeDefined()
})

test('exposes FocusedLayout.Context', () => {
  expect(FocusedLayout.Context).toBeDefined()
})

test('exposes FocusedLayout.useContext', () => {
  expect(FocusedLayout.useContext).toBeDefined()
})

test('exposes FocusedLayout.ProductLogo', () => {
  expect(FocusedLayout.ProductLogo).toBeDefined()
})
