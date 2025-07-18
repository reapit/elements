import { PageHeaderLeadingElement } from '../leading-element'
import { render, screen } from '@testing-library/react'

test('renders a generic element with the expected title', () => {
  render(<PageHeaderLeadingElement type="image">Leading Element</PageHeaderLeadingElement>)
  expect(screen.getByText('Leading Element')).toBeVisible()
})

test('applies the correct data-type attribute', () => {
  const { rerender } = render(<PageHeaderLeadingElement type="image">Leading Element</PageHeaderLeadingElement>)
  expect(screen.getByText('Leading Element')).toHaveAttribute('data-type', 'image')

  rerender(<PageHeaderLeadingElement type="icon">Leading Element</PageHeaderLeadingElement>)
  expect(screen.getByText('Leading Element')).toHaveAttribute('data-type', 'icon')
})

test('forwards additional props to the leading element container', () => {
  render(
    <PageHeaderLeadingElement type="image" data-testid="test-id">
      Leading Element
    </PageHeaderLeadingElement>,
  )
  expect(screen.getByTestId('test-id')).toBeVisible()
})
