import { render } from '@testing-library/react'
import { BottomBarItem } from '../bottom-bar-item'

describe('BottomBarItem', () => {
  it('should render the component as HTMLAnchorElement with default state', () => {
    expect(
      render(<BottomBarItem href="#" icon={<span>icon</span>} aria-label="Label" />).asFragment(),
    ).toMatchSnapshot()
  })

  it('should render the component as HTMLAnchorElement with active state', () => {
    expect(
      render(<BottomBarItem href="#" isActive icon={<span>icon</span>} aria-label="Label" />).asFragment(),
    ).toMatchSnapshot()
  })

  it('should render the component as HTMLButtonElement with default state', () => {
    expect(
      render(<BottomBarItem onClick={jest.fn()} isActive icon={<span>icon</span>} aria-label="Label" />).asFragment(),
    ).toMatchSnapshot()
  })

  it('should render the component as HTMLButtonElement with active state', () => {
    expect(
      render(<BottomBarItem onClick={jest.fn()} isActive icon={<span>icon</span>} aria-label="Label" />).asFragment(),
    ).toMatchSnapshot()
  })
})
