import { render, screen, fireEvent } from '@testing-library/react'
import { TopBarMenu } from '../top-bar-menu'

vi.mock('../../icon', () => ({
  Icon: () => <svg data-name="mocked" />,
}))

describe('TopBarMenu', () => {
  it('should match a snapshot when isOpen state is true', () => {
    expect(
      render(
        <TopBarMenu isOpen onClose={vi.fn()}>
          <TopBarMenu.Header />
          <TopBarMenu.Body>
            <TopBarMenu.List>
              <TopBarMenu.Group label="Main Nav Item 1" hasBadge>
                <TopBarMenu.Item href="#item-1.1">Label</TopBarMenu.Item>
                <TopBarMenu.Item href="#item-1.2">Label</TopBarMenu.Item>
              </TopBarMenu.Group>
              <TopBarMenu.Item href="#item-2">Main Nav Item 2</TopBarMenu.Item>
            </TopBarMenu.List>
            <TopBarMenu.List>
              <TopBarMenu.Item href="#item-1.1">User Item 1</TopBarMenu.Item>
              <TopBarMenu.Item href="#item-1.1">User Item 2</TopBarMenu.Item>
            </TopBarMenu.List>
          </TopBarMenu.Body>
        </TopBarMenu>,
      ).asFragment(),
    ).toMatchSnapshot()
  })

  it('should call onClose when the close button is clicked', () => {
    const handleClose = vi.fn()

    render(
      <TopBarMenu isOpen onClose={handleClose}>
        <TopBarMenu.Header />
        <TopBarMenu.Body>
          <TopBarMenu.List>
            <TopBarMenu.Item href="#item-1">Test Item</TopBarMenu.Item>
          </TopBarMenu.List>
        </TopBarMenu.Body>
      </TopBarMenu>,
    )

    // The close button renders as a NavIconItem with "Close" aria-label
    fireEvent.click(screen.getByLabelText('Close'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('should properly render all parts of the compound component', () => {
    render(
      <TopBarMenu isOpen onClose={vi.fn()}>
        <TopBarMenu.Header />
        <TopBarMenu.Body>
          <TopBarMenu.List>
            <TopBarMenu.Group label="Test Group" hasBadge>
              <TopBarMenu.Item href="#child-1">Child 1</TopBarMenu.Item>
              <TopBarMenu.Item href="#child-2" isActive>
                Child 2
              </TopBarMenu.Item>
            </TopBarMenu.Group>
            <TopBarMenu.Item href="#item-1" hasBadge>
              Test Item
            </TopBarMenu.Item>
          </TopBarMenu.List>
        </TopBarMenu.Body>
      </TopBarMenu>,
    )

    // Check each part of the compound component
    expect(screen.getByLabelText('Close')).toBeInTheDocument()
    expect(screen.getByText('Test Group')).toBeInTheDocument()
    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByText('Test Item')).toBeInTheDocument()
  })
})
