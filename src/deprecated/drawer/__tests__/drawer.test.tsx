import { render } from '@testing-library/react'
import {
  DeprecatedDrawer as Drawer,
  DeprecatedDrawerBg as DrawerBg,
  DeprecatedDrawerBody as DrawerBody,
  DeprecatedDrawerContainer as DrawerContainer,
  DeprecatedDrawerHeader as DrawerHeader,
  DeprecatedDrawerSubtitle as DrawerSubtitle,
  DeprecatedDrawerTitle as DrawerTitle,
  handleDrawerFocus,
} from '..'
import { createRef } from 'react'

describe('Drawer component', () => {
  it('should match a snapshot when closed', () => {
    const wrapper = render(
      <Drawer isOpen={false} onDrawerClose={() => {}} title="test">
        Content within Drawer
      </Drawer>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot when open', () => {
    const wrapper = render(
      <Drawer isOpen={true} onDrawerClose={() => {}} title="test" canDismiss>
        Content within Drawer
      </Drawer>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('DrawerBg', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DrawerBg>Content within Drawer</DrawerBg>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('DrawerContainer', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DrawerContainer>Content within Drawer</DrawerContainer>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('DrawerHeader', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DrawerHeader>Content within Drawer</DrawerHeader>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('DrawerTitle', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DrawerTitle>Content within Drawer</DrawerTitle>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('DrawerSubtitle', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DrawerSubtitle>Content within Drawer</DrawerSubtitle>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('DrawerBody', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DrawerBody>Content within Drawer</DrawerBody>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('handleDrawerFocus', () => {
  it('should focus on the drawer if it is open', () => {
    const drawerRef = createRef<HTMLDivElement>()
    const mockElement = document.createElement('div')
    const focusSpy = vi.spyOn(mockElement, 'focus')

    Object.defineProperty(drawerRef, 'current', {
      value: mockElement,
    })

    const curried = handleDrawerFocus(drawerRef, true)

    curried()

    expect(focusSpy).toHaveBeenCalled()
  })

  it('should not focus on the drawer if it is not open', () => {
    const drawerRef = createRef<HTMLDivElement>()
    const mockElement = document.createElement('div')
    const focusSpy = vi.spyOn(mockElement, 'focus')

    Object.defineProperty(drawerRef, 'current', {
      value: mockElement,
    })

    const curried = handleDrawerFocus(drawerRef, false)

    curried()

    expect(focusSpy).not.toHaveBeenCalled()
  })
})
