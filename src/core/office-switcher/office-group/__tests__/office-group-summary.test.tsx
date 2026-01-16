import { render, screen } from '@testing-library/react'
import { OfficeSwitcherOfficeGroupSummary } from '../office-group-summary'
import { expect, test } from 'vitest'

test('renders a summary element', () => {
  render(
    <details>
      <OfficeSwitcherOfficeGroupSummary>Summary Text</OfficeSwitcherOfficeGroupSummary>
    </details>,
  )
  const summary = screen.getByText('Summary Text')
  expect(summary.closest('summary')).toBeInTheDocument()
})

test('applies custom className', () => {
  render(
    <details>
      <OfficeSwitcherOfficeGroupSummary className="custom-summary">Summary Text</OfficeSwitcherOfficeGroupSummary>
    </details>,
  )
  const summary = screen.getByText('Summary Text').closest('summary')
  expect(summary).toHaveClass('custom-summary')
})

test('applies id to the summary element', () => {
  render(
    <details>
      <OfficeSwitcherOfficeGroupSummary id="custom-summary-id">Summary Text</OfficeSwitcherOfficeGroupSummary>
    </details>,
  )
  const summary = screen.getByText('Summary Text').closest('summary')
  expect(summary).toHaveAttribute('id', 'custom-summary-id')
})

test('generates a label id and uses it for aria-labelledby on the summary', () => {
  render(
    <details>
      <OfficeSwitcherOfficeGroupSummary>Summary Text</OfficeSwitcherOfficeGroupSummary>
    </details>,
  )
  const summary = screen.getByText('Summary Text').closest('summary')
  const label = screen.getByText('Summary Text')
  const labelId = label.getAttribute('id')

  expect(labelId).toBeTruthy()
  expect(summary).toHaveAttribute('aria-labelledby', labelId)
})

test('uses provided aria-labelledby instead of generating one', () => {
  render(
    <details>
      <OfficeSwitcherOfficeGroupSummary aria-labelledby="custom-label-id">
        Summary Text
      </OfficeSwitcherOfficeGroupSummary>
    </details>,
  )
  const summary = screen.getByText('Summary Text').closest('summary')
  const label = screen.getByText('Summary Text')

  expect(label).toHaveAttribute('id', 'custom-label-id')
  expect(summary).toHaveAttribute('aria-labelledby', 'custom-label-id')
})
