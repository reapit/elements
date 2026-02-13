import { render, screen } from '@testing-library/react'
import { TopBarMenuDrawerMenuGroupSummary } from '../menu-group-summary'
import { TopBarMenuDrawerMenuGroupLabelIdContext } from '../menu-group-label-id-context'

import type { ReactNode } from 'react'

test('renders as a summary element', () => {
  render(
    <details>
      <TopBarMenuDrawerMenuGroupSummary>Settings</TopBarMenuDrawerMenuGroupSummary>
    </details>,
    { wrapper },
  )

  const summary = screen.getByText('Settings').closest('summary')
  expect(summary?.tagName).toBe('SUMMARY')
})

test('includes chevron icon', () => {
  render(
    <details>
      <TopBarMenuDrawerMenuGroupSummary>Settings</TopBarMenuDrawerMenuGroupSummary>
    </details>,
    { wrapper },
  )

  // Icon should be hidden from accessibility tree
  const icon = screen.getByText('Settings').parentElement?.querySelector('[aria-hidden]')
  expect(icon).toBeInTheDocument()
})

test('renders label text correctly', () => {
  render(
    <details>
      <TopBarMenuDrawerMenuGroupSummary>My Label</TopBarMenuDrawerMenuGroupSummary>
    </details>,
    { wrapper },
  )

  expect(screen.getByText('My Label')).toBeVisible()
})

test('uses the ID from context by default', () => {
  render(
    <details>
      <TopBarMenuDrawerMenuGroupSummary data-testid="summary">My Label</TopBarMenuDrawerMenuGroupSummary>
    </details>,
    { wrapper },
  )

  expect(screen.getByTestId('summary')).toHaveAttribute('id', 'test-label-id')
})

test('uses the ID prop if supplied', () => {
  render(
    <details>
      <TopBarMenuDrawerMenuGroupSummary data-testid="summary" id="custom-id">
        My Label
      </TopBarMenuDrawerMenuGroupSummary>
    </details>,
    { wrapper },
  )

  expect(screen.getByTestId('summary')).toHaveAttribute('id', 'custom-id')
})

function wrapper({ children }: { children: ReactNode }) {
  return (
    <TopBarMenuDrawerMenuGroupLabelIdContext.Provider value="test-label-id">
      {children}
    </TopBarMenuDrawerMenuGroupLabelIdContext.Provider>
  )
}
