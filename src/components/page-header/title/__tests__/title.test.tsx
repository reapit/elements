import { PageHeaderTitle } from '../title'
import { render, screen } from '@testing-library/react'

test('renders a level 1 heading element with the expected title', () => {
  render(<PageHeaderTitle>Page Title</PageHeaderTitle>)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page Title')
})

test('displays actions when provided', () => {
  render(<PageHeaderTitle actions={<button>Action</button>}>Test Title</PageHeaderTitle>)
  expect(screen.getByRole('button', { name: 'Action' })).toBeVisible()
})

test('displays additional information when provided', () => {
  render(<PageHeaderTitle additionalInfo="Fake info">Test Title</PageHeaderTitle>)
  const additionalInfo = screen.getByRole('paragraph')
  expect(additionalInfo).toBeVisible()
  expect(additionalInfo).toHaveTextContent('Fake info')
})

test('forwards additional props to the title container', () => {
  render(<PageHeaderTitle data-testid="test-id">Test Title</PageHeaderTitle>)
  expect(screen.getByTestId('test-id')).toBeVisible()
})
