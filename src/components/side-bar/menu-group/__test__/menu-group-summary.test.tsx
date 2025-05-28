import { fireEvent, render, screen } from '@testing-library/react'
import { SideBarMenuGroupSummary } from '../menu-group-summary'
import { SideBarMenuGroupLabelIdContext } from '../menu-group-label-id-context'

import type { ReactNode, MouseEvent } from 'react'

test('renders a <summary> element', () => {
  render(<SideBarMenuGroupSummary icon="😎">Item</SideBarMenuGroupSummary>, { wrapper })
  // NOTE: <summary> elements have no implicit role, so we cannot use `getByRole` here to select <summary> element
  // See https://w3c.github.io/html-aria/#el-summary. While the spec suggests some user agents apply an implicit
  // button role, this does not appear to the case for React Testing Library
  const label = screen.getByText('Item')

  expect(label).toBeVisible()
  expect(label.parentElement?.tagName).toBe('SUMMARY')
})

test('icon is visible, but hidden from the accessibility tree', () => {
  render(<SideBarMenuGroupSummary icon="😎">Item</SideBarMenuGroupSummary>, { wrapper })
  const icon = screen.getByText('😎')

  expect(icon).toBeVisible()
  expect(icon).toHaveAttribute('aria-hidden')
})

test('prevents default action for click events if the menu group contains a link for the current page', async () => {
  render(
    <details open>
      <SideBarMenuGroupSummary icon="😎">Item</SideBarMenuGroupSummary>
      <a href="/" aria-current="page">
        Link
      </a>
    </details>,
    { wrapper },
  )
  const summaryText = screen.getByText('Item')
  fireEvent.click(summaryText)

  await expect(screen.findByRole('group')).resolves.toBeVisible()
})

test('allows default action for click events if the menu group does NOT contain a link for the current page', async () => {
  render(
    <details open>
      <SideBarMenuGroupSummary icon="😎">Item</SideBarMenuGroupSummary>
      <a href="/">Link</a>
    </details>,
    { wrapper },
  )
  const summaryText = screen.getByText('Item')
  fireEvent.click(summaryText)

  await expect(screen.findByRole('group')).resolves.toBeVisible()
})

function wrapper({ children }: { children: ReactNode }) {
  return (
    <SideBarMenuGroupLabelIdContext.Provider value="test-label-id">{children}</SideBarMenuGroupLabelIdContext.Provider>
  )
}
