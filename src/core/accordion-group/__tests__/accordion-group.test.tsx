import { AccordionGroup } from '../accordion-group'
import { render, screen } from '@testing-library/react'

test('renders its children', () => {
  render(<AccordionGroup>Fake child</AccordionGroup>)
  const group = screen.getByText('Fake child')

  expect(group).toBeVisible()
})

test('forwards additional props to the root element', () => {
  render(<AccordionGroup data-testid="accordion-group">Fake child</AccordionGroup>)

  expect(screen.getByTestId('accordion-group')).toBeVisible()
  expect(screen.getByTestId('accordion-group')).toHaveTextContent('Fake child')
})
