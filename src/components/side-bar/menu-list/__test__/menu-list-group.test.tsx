import { render, screen } from '@testing-library/react'
import { SideBarContextPublisher } from '../../side-bar-context'
import { SideBarMenuListGroup } from '../menu-list-group'

import type { ReactNode } from 'react'

test('renders a <details> element as the child of a <li>', () => {
  render(<SideBarMenuListGroup summary={<summary>Item</summary>}>Children</SideBarMenuListGroup>, { wrapper })
  const listItem = screen.getByRole('listitem')
  const details = screen.getByRole('group')

  expect(listItem).toBeVisible()
  // NOTE: <details> is only considered visible if it has an open attribute
  expect(details).toBeInTheDocument()
  expect(listItem.firstChild).toBe(details)
})

function wrapper({ children }: { children: ReactNode }) {
  const noop = () => void 0
  return (
    <SideBarContextPublisher id="test-id" collapse={noop} expand={noop} state="expanded" toggle={noop}>
      {children}
    </SideBarContextPublisher>
  )
}
