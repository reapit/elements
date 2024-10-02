import { fireEvent, render } from '@testing-library/react'
import { MenuProvider, useMenu } from '../provider'
import '@testing-library/jest-dom'

const TestComponent = () => {
  const { getTriggerProps, getPopoverProps, isOpen } = useMenu()

  return (
    <div>
      <button {...getTriggerProps()}>Trigger</button>
      <div {...getPopoverProps()}>{isOpen && <span>Popover Content</span>}</div>
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

  it('should toggle isOpen state when trigger button is clicked', () => {
    const { getByText, queryByText } = render(
      <MenuProvider>
        <TestComponent />
      </MenuProvider>,
    )

    expect(queryByText('Popover Content')).toBeNull()

    fireEvent.click(getByText('Trigger'))

    expect(getByText('Popover Content')).toBeInTheDocument()

    fireEvent.click(getByText('Trigger'))

    expect(queryByText('Popover Content')).toBeNull()
  })

  it('should correctly set aria attributes on trigger and popover elements', () => {
    const { getByText, container } = render(
      <MenuProvider>
        <TestComponent />
      </MenuProvider>,
    )

    const triggerButton = getByText('Trigger')
    expect(triggerButton).toHaveAttribute('aria-haspopup', 'true')
    expect(triggerButton).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(triggerButton)

    expect(triggerButton).toHaveAttribute('aria-expanded', 'true')

    const popover = container.querySelector('.menu-popover')
    expect(popover).toHaveAttribute('aria-labelledby', 'menu-header')
    expect(popover).toHaveAttribute('role', 'menu')
    expect(popover).not.toHaveAttribute('hidden')

    fireEvent.click(triggerButton)
    expect(popover).toHaveAttribute('hidden')
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
