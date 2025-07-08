import { PageHeaderSubtitle } from '../subtitle'
import { render, screen } from '@testing-library/react'

test('renders a paragraph element with the expected title', () => {
  render(<PageHeaderSubtitle>Page Subtitle</PageHeaderSubtitle>)
  // NOTE: The subtitle should be the first paragraph element
  expect(screen.getAllByRole('paragraph')[0]).toHaveTextContent('Page Subtitle')
})

test('displays additional information when provided', () => {
  render(<PageHeaderSubtitle additionalInfo="Fake info">Page Subtitle</PageHeaderSubtitle>)
  // NOTE: The additional info should be the second paragraph element
  const additionalInfo = screen.getAllByRole('paragraph')[1]
  expect(additionalInfo).toBeVisible()
  expect(additionalInfo).toHaveTextContent('Fake info')
})

test('forwards additional props to the title container', () => {
  render(<PageHeaderSubtitle data-testid="test-id">Page Subtitle</PageHeaderSubtitle>)
  expect(screen.getByTestId('test-id')).toBeVisible()
})
