import { fireEvent, render } from '@testing-library/react'
import { MobileNavMenu } from '../mobile-nav-menu'

describe('MobileNavMenu', () => {
  it('should match a snapshot when isOpen state is true', () => {
    expect(
      render(
        <MobileNavMenu isOpen onClose={vi.fn()}>
          <MobileNavMenu.Header onClose={vi.fn()} />
          <MobileNavMenu.Content>
            <MobileNavMenu.ItemGroup>
              <MobileNavMenu.Item label="Main Nav Item 1" hasBadge>
                <MobileNavMenu.Item label="Label" href="#item-1.1" />
                <MobileNavMenu.Item label="Label" href="#item-1.2" />
                <MobileNavMenu.Item label="Label" href="#item-1.3" />
                <MobileNavMenu.Item label="Label" href="#item-1.4" />
                <MobileNavMenu.Item label="Label" href="#item-1.5" />
              </MobileNavMenu.Item>
            </MobileNavMenu.ItemGroup>
            <MobileNavMenu.ItemGroup>
              <MobileNavMenu.Item label="User Item 1" href="#item-1.1" />
              <MobileNavMenu.Item label="User Item 2" href="#item-1.1" />
            </MobileNavMenu.ItemGroup>
          </MobileNavMenu.Content>
        </MobileNavMenu>,
      ).asFragment(),
    ).toMatchSnapshot()
  })

  it('should handle the keyboard navigation properly', () => {
    const mockOnButtonClick = vi.fn()
    const mockOnKeyDown = vi.fn()

    render(
      <MobileNavMenu isOpen onKeyDown={mockOnKeyDown}>
        <MobileNavMenu.Content>
          <MobileNavMenu.ItemGroup>
            <MobileNavMenu.Item isActive={false} label="Main Nav Item 1">
              <MobileNavMenu.Item label="Label" href="#item-1.1" />
              <MobileNavMenu.Item label="Label" href="#item-1.2" />
            </MobileNavMenu.Item>
            <MobileNavMenu.Item label="Main Nav Item 2" href="#item-2" />
            <MobileNavMenu.Item label="Main Nav Item 3" onClick={mockOnButtonClick} />
          </MobileNavMenu.ItemGroup>
        </MobileNavMenu.Content>
      </MobileNavMenu>,
    )
    const items = document?.querySelectorAll(
      'ul:not([aria-hidden="true"]):not([aria-hidden="false"]) > li > a, ul[aria-hidden="false"] > li > a, button',
    ) as NodeListOf<HTMLElement>

    items[0].focus()

    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' })
    expect(mockOnKeyDown).toHaveBeenCalled()
    expect(document.activeElement).toBe(items[1])

    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(items[2])

    fireEvent.keyDown(document.activeElement!, { key: 'ArrowUp' })
    expect(document.activeElement).toBe(items[1])
    fireEvent.keyDown(document.activeElement!, { key: ' ' })

    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(items[2])
    fireEvent.keyDown(document.activeElement!, { key: 'Enter' })
    expect(mockOnButtonClick).toHaveBeenCalled()
  })
})
