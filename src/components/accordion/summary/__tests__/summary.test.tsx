import { render, screen } from '@testing-library/react'
import { AccordionLabelIdContext } from '../../accordion-label-id-context'
import { AccordionSummary } from '../summary'

import type { ReactNode } from 'react'

test('renders a <summary> element', () => {
  render(<AccordionSummary data-testid="summary">Accordion Title</AccordionSummary>, { wrapper })

  // NOTE: <summary> elements have no implicit role, so we cannot use `getByRole` here to select <summary> element
  // See https://w3c.github.io/html-aria/#el-summary. While the spec suggests some user agents apply an implicit
  // button role, this does not appear to the case for React Testing Library
  const summary = screen.getByTestId('summary')
  expect(summary.tagName).toBe('SUMMARY')
})

test('right info is visible when provided', () => {
  render(<AccordionSummary rightInfo="Right Info">Accordion Title</AccordionSummary>, { wrapper })
  expect(screen.getByText('Right Info')).toBeVisible()
})

test('forwards additional props to the summary element', async () => {
  render(<AccordionSummary data-testid="summary">Accordion Title</AccordionSummary>, { wrapper })
  expect(screen.getByTestId('summary')).toBeVisible()
})

test('icon is visible, but hidden from the accessibility tree', () => {
  const { container } = render(<AccordionSummary>Accordion Title</AccordionSummary>, { wrapper })

  const icon = container.querySelector('[aria-hidden="true"] > svg')
  expect(icon).toBeInTheDocument()
})

function wrapper({ children }: { children: ReactNode }) {
  return <AccordionLabelIdContext.Provider value="test-label-id">{children}</AccordionLabelIdContext.Provider>
}
