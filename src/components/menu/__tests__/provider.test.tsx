import { fireEvent, render } from '@testing-library/react'
import { MenuProvider, useMenu } from '../provider'

const TestComponent = () => {
  const { triggerProps, popoverProps, isOpen } = useMenu()

  return (
    <div>
      <button {...triggerProps}>Trigger</button>
      <div {...popoverProps}>{isOpen && <span>Content</span>}</div>
    </div>
  )
}

describe('MenuProvider and useMenu', () => {
  it('should render MenuProvider and match snapshot', () => {
    const { asFragment } = render(
      <MenuProvider>
        <TestComponent />
      </MenuProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should toggle isOpen state when trigger button is clicked and match snapshot', () => {
    const { getByText, asFragment } = render(
      <MenuProvider>
        <TestComponent />
      </MenuProvider>,
    )

    fireEvent.click(getByText('Trigger'))

    expect(asFragment()).toMatchSnapshot()
  })

  it('should throw an error when useMenu is used outside of MenuProvider', () => {
    const TestErrorComponent = () => {
      useMenu()
      return null
    }
    const renderWithoutProvider = () => render(<TestErrorComponent />)

    expect(renderWithoutProvider).toThrow('useMenu must be used within a MenuProvider')
  })
})
