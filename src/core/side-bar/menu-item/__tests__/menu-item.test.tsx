import { render, screen } from '@testing-library/react'
import { SideBarMenuItem } from '../menu-item'
import { SideBarContextPublisher } from '../../side-bar-context'
import { PropertyIcon } from '#src/icons/property'
import { elSideBarMenuItem } from '../styles'
import type { ReactNode } from 'react'

test('renders a link', () => {
  render(
    <SideBarMenuItem aria-current={false} href="#" icon={<PropertyIcon />}>
      Item
    </SideBarMenuItem>,
    { wrapper: Wrapper },
  )
  expect(screen.getByRole('link', { name: 'Item' })).toBeVisible()
})

test(`combines the .${elSideBarMenuItem} and consumer-supplied classes correctly`, () => {
  render(
    <SideBarMenuItem aria-current={false} href="#" icon={<PropertyIcon />} className="my-custom-class">
      Menu item
    </SideBarMenuItem>,
    { wrapper: Wrapper },
  )
  // NOTE: We don't use the `toHaveClass` matcher here because it does not enforce the order of classes, which we are
  // specifically interested in here.
  expect(screen.getByRole('link')).toHaveAttribute('class', `${elSideBarMenuItem} my-custom-class`)
})

test('icon is visible but hidden from the accessibility tree', () => {
  render(
    <SideBarMenuItem aria-current={false} href="#" icon="😎">
      Item
    </SideBarMenuItem>,
    { wrapper: Wrapper },
  )
  const icon = screen.getByText('😎')

  expect(icon).toBeVisible()
  expect(icon).toHaveAttribute('aria-hidden')
})

test('has `aria-current="false"` attribute when it does NOT represent the current page', () => {
  render(
    <SideBarMenuItem aria-current={false} href="#" icon={<PropertyIcon />}>
      Item
    </SideBarMenuItem>,
    { wrapper: Wrapper },
  )
  expect(screen.getByRole('link', { name: 'Item' })).toHaveAttribute('aria-current', 'false')
})

test('has `aria-current="page"` attribute when it represents the current page', () => {
  render(
    <SideBarMenuItem aria-current="page" href="#" icon={<PropertyIcon />}>
      Item
    </SideBarMenuItem>,
    { wrapper: Wrapper },
  )
  expect(screen.getByRole('link', { name: 'Item' })).toHaveAttribute('aria-current', 'page')
})

test('has an accessible name when the `SideBar` is collapsed', () => {
  render(
    <SideBarMenuItem aria-current={false} href="#" icon={<PropertyIcon />}>
      Item
    </SideBarMenuItem>,
    { wrapper: (props) => <Wrapper {...props} state="collapsed" /> },
  )
  expect(screen.getByRole('link', { name: 'Item' })).toBeVisible()
})

interface WrapperProps {
  children: ReactNode
  state?: 'expanded' | 'collapsed'
}

function Wrapper({ children, state = 'expanded' }: WrapperProps) {
  return (
    <SideBarContextPublisher
      id="test-sidebar"
      expand={() => void 0}
      setState={() => void 0}
      state={state}
      toggle={() => void 0}
    >
      {children}
    </SideBarContextPublisher>
  )
}
