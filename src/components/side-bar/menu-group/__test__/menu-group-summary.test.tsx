import { fireEvent, render, screen } from '@testing-library/react'
import { SideBarMenuGroupSummary } from '../menu-group-summary'
import { SideBarMenuGroupLabelIdContext } from '../menu-group-label-id-context'

import type { ReactNode, MouseEvent } from 'react'
import { elSideBarMenuItem } from '../../menu-item'
import { elSideBarMenuGroupSummary } from '../styles'

test('renders a <summary> element', () => {
  render(
    <SideBarMenuGroupSummary data-testid="summary" icon="😎">
      Item
    </SideBarMenuGroupSummary>,
    { wrapper },
  )
  // NOTE: <summary> elements have no implicit role, so we cannot use `getByRole` here to select <summary> element
  // See https://w3c.github.io/html-aria/#el-summary. While the spec suggests some user agents apply an implicit
  // button role, this does not appear to the case for React Testing Library
  const summary = screen.getByTestId('summary')
  expect(summary.tagName).toBe('SUMMARY')
})

test(`combines the .${elSideBarMenuItem}, .${elSideBarMenuGroupSummary} and consumer-supplied classes correctly`, () => {
  render(
    <SideBarMenuGroupSummary className="my-custom-class" data-testid="summary" icon="😎">
      Item
    </SideBarMenuGroupSummary>,
    { wrapper },
  )
  // NOTE: We don't use the `toHaveClass` matcher here because it does not enforce the order of classes, which we are
  // specifically interested in here.
  expect(screen.getByTestId('summary')).toHaveAttribute(
    'class',
    `${elSideBarMenuItem} ${elSideBarMenuGroupSummary} my-custom-class`,
  )
})

test('the `id` published by the menu group is used by default', () => {
  render(
    <SideBarMenuGroupSummary data-testid="summary" icon="😎">
      Item
    </SideBarMenuGroupSummary>,
    { wrapper },
  )
  expect(screen.getByTestId('summary')).toHaveAttribute('id', 'test-label-id') // This `id` is provided by the wrapper
})

test('a consumer-supplied `id` will be used instead of the `id` published by the menu group', () => {
  render(
    <SideBarMenuGroupSummary data-testid="summary" icon="😎" id="my-id">
      Item
    </SideBarMenuGroupSummary>,
    { wrapper },
  )
  expect(screen.getByTestId('summary')).toHaveAttribute('id', 'my-id')
})

test('icon is visible, but hidden from the accessibility tree', () => {
  render(<SideBarMenuGroupSummary icon="😎">Item</SideBarMenuGroupSummary>, { wrapper })
  const icon = screen.getByText('😎')

  expect(icon).toBeVisible()
  expect(icon).toHaveAttribute('aria-hidden')
})

test('calls a consumer-supplied `onClick` handler', () => {
  const onClick = vi.fn()
  render(
    <SideBarMenuGroupSummary data-testid="summary" icon="😎" onClick={onClick}>
      Item
    </SideBarMenuGroupSummary>,
    { wrapper },
  )
  const summaryText = screen.getByTestId('summary')
  fireEvent.click(summaryText)

  expect(onClick).toHaveBeenCalledTimes(1)
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

  // If the event was NOT prevented, the <details> element would be closed and thus not visible
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

  // If the event was prevented, the <details> element would not be open and thus not visible
  await expect(screen.findByRole('group')).resolves.toBeVisible()
})

function wrapper({ children }: { children: ReactNode }) {
  return (
    <SideBarMenuGroupLabelIdContext.Provider value="test-label-id">{children}</SideBarMenuGroupLabelIdContext.Provider>
  )
}
