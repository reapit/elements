import { render } from '@testing-library/react'
import { SideBarProvider, useSideBarContext } from '../side-bar-context'

describe('SideBarProvider and useSideBarContext', () => {
  it('should render SideBarProvider and match snapshot', () => {
    const { asFragment } = render(<SideBarProvider>Foo</SideBarProvider>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should throw an error when useSideBarContext is used outside of SideBarProvider', () => {
    const TestErrorComponent = () => {
      useSideBarContext()
      return null
    }
    const renderWithoutProvider = () => render(<TestErrorComponent />)

    expect(renderWithoutProvider).toThrow('useSideBarContext must be used within a SideBarProvider')
  })
})
