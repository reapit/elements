import { render } from '@testing-library/react'
import { MenuProvider, useMenuContext } from '../menu-context'

describe.skip('MenuProvider and useMenuContext', () => {
  it('should render MenuProvider and match snapshot', () => {
    const { asFragment } = render(<MenuProvider>Foo</MenuProvider>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should throw an error when useMenuContext is used outside of MenuProvider', () => {
    const TestErrorComponent = () => {
      useMenuContext()
      return null
    }
    const renderWithoutProvider = () => render(<TestErrorComponent />)

    expect(renderWithoutProvider).toThrow('useMenuContext must be used within a MenuProvider')
  })
})
