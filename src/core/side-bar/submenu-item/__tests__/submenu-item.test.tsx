import { elSideBarSubmenuItem } from '../styles'
import { render, screen } from '@testing-library/react'
import { SideBarSubmenuItem } from '../submenu-item'
import { SideBarContextPublisher } from '../../side-bar-context'
import type { ReactNode } from 'react'

test('renders an <a> element', () => {
  render(
    <SideBarSubmenuItem aria-current={false} href="#">
      Test item
    </SideBarSubmenuItem>,
    { wrapper: Wrapper },
  )
  expect(screen.getByRole('link', { name: 'Test item' })).toBeVisible()
})

test(`combines the .${elSideBarSubmenuItem} and consumer-supplied classes correctly`, () => {
  render(
    <SideBarSubmenuItem aria-current={false} href="#" className="my-custom-class">
      Submenu Item
    </SideBarSubmenuItem>,
    { wrapper: Wrapper },
  )
  // NOTE: We don't use the `toHaveClass` matcher here because it does not enforce the order of classes, which we are
  // specifically interested in here.
  expect(screen.getByRole('link')).toHaveAttribute('class', `${elSideBarSubmenuItem} my-custom-class`)
})

test('has `aria-current="false"` attribute when it does NOT represent the current page', () => {
  render(
    <SideBarSubmenuItem aria-current={false} href="#">
      Test item
    </SideBarSubmenuItem>,
    { wrapper: Wrapper },
  )
  expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'false')
})

test('has `aria-current="page"` attribute when it represents the current page', () => {
  render(
    <SideBarSubmenuItem aria-current="page" href="#">
      Test item
    </SideBarSubmenuItem>,
    { wrapper: Wrapper },
  )
  expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page')
})

interface WrapperProps {
  children: ReactNode
}

function Wrapper({ children }: WrapperProps) {
  return (
    <SideBarContextPublisher
      id="test-sidebar"
      expand={() => void 0}
      setState={() => void 0}
      state="expanded"
      toggle={() => void 0}
    >
      {children}
    </SideBarContextPublisher>
  )
}
