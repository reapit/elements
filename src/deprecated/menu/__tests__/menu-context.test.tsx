import { render } from '@testing-library/react'
import { DeprecatedMenuProvider, useDeprecatedMenuContext } from '../menu-context'

describe('MenuProvider and useMenuContext', () => {
  it('should render MenuProvider and match snapshot', () => {
    const { asFragment } = render(<DeprecatedMenuProvider>Foo</DeprecatedMenuProvider>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should throw an error when useMenuContext is used outside of MenuProvider', () => {
    const TestErrorComponent = () => {
      useDeprecatedMenuContext()
      return null
    }
    const renderWithoutProvider = () => render(<TestErrorComponent />)

    expect(renderWithoutProvider).toThrow('useMenuContext must be used within a MenuProvider')
  })
})
