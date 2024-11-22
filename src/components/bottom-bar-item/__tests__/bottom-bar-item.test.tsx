import { render } from '@testing-library/react'
import { BottomBarItem } from '../bottom-bar-item'

describe('BottomBarItem', () => {
  it('should render the component as HTMLAnchorElement with default state', () => {
    expect(
      render(
        <BottomBarItem href="#" icon={<span>icon</span>}>
          Label
        </BottomBarItem>,
      ).asFragment(),
    ).toMatchSnapshot()
  })

  it('should render the component as HTMLAnchorElement with active state', () => {
    expect(
      render(
        <BottomBarItem href="#" isActive icon={<span>icon</span>}>
          Label
        </BottomBarItem>,
      ).asFragment(),
    ).toMatchSnapshot()
  })

  it('should render the component as HTMLButtonElement with default state', () => {
    expect(
      render(
        <BottomBarItem onClick={vi.fn()} isActive icon={<span>icon</span>}>
          Label
        </BottomBarItem>,
      ).asFragment(),
    ).toMatchSnapshot()
  })

  it('should render the component as HTMLButtonElement with active state', () => {
    expect(
      render(
        <BottomBarItem onClick={vi.fn()} isActive icon={<span>icon</span>}>
          Label
        </BottomBarItem>,
      ).asFragment(),
    ).toMatchSnapshot()
  })

  it('should render the component as HTMLButtonElement with badge state', () => {
    expect(
      render(
        <BottomBarItem onClick={vi.fn()} isActive icon={<span>icon</span>} hasBadge>
          Label
        </BottomBarItem>,
      ).asFragment(),
    ).toMatchSnapshot()
  })
})
