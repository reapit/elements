import { act, fireEvent, render, screen } from '@testing-library/react'
import { SideBar } from '..'

vi.mock('../../side-bar-menu-item/icons/collapse.svg?react', () => ({
  default: vi.fn(() => <span data-testid="collapse-icon" />),
}))

describe('SideBar', () => {
  it('should match snapshot with expanded state', () => {
    const { asFragment } = render(
      <SideBar>
        <SideBar.MenuList>SideBar list content</SideBar.MenuList>
        <SideBar.CollapseButon />
      </SideBar>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with simple state', () => {
    const { asFragment } = render(
      <SideBar>
        <SideBar.MenuList>SideBar list content</SideBar.MenuList>
        <SideBar.CollapseButon />
      </SideBar>,
    )
    act(() => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
    expect(asFragment()).toMatchSnapshot()
  })
})
