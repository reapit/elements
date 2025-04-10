import { useMediaQuery } from '#src/hooks/use-media-query/index'
import { fireEvent, render } from '@testing-library/react'
import { SideBar } from '..'

vi.mock('../../side-bar-collapse-button/icons/collapse.svg?react', () => ({
  default: vi.fn(() => <span data-testid="collapse-icon" />),
}))

vi.mock('#src/hooks/use-media-query/index', () => ({
  useMediaQuery: vi.fn(),
}))

const mockUseMediaQuery = vi.mocked(useMediaQuery)

describe('SideBar', () => {
  beforeAll(() => {
    // default expanded side-bar
    mockUseMediaQuery.mockReturnValue({
      isDesktop: false,
      isWideScreen: true,
      isSuperWideScreen: false,
      is4KScreen: false,
      isMobile: false,
      isTablet: false,
    })
  })

  it('should match snapshot with expanded state', () => {
    const { asFragment } = render(
      <SideBar>
        <SideBar.MenuList>SideBar list content</SideBar.MenuList>
        <SideBar.CollapseButon />
      </SideBar>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with collapsed state', () => {
    mockUseMediaQuery.mockReturnValue({
      isDesktop: true,
    } as any)
    const { asFragment } = render(
      <SideBar>
        <SideBar.MenuList>SideBar list content</SideBar.MenuList>
        <SideBar.CollapseButon />
      </SideBar>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should handle onKeyDown event properly', () => {
    const mockOnAnchorClick = vi.fn()
    const mockOnButtonClick = vi.fn()
    const mockOnKeyDown = vi.fn()
    render(
      <SideBar onKeyDown={mockOnKeyDown}>
        <SideBar.MenuList>
          <button>Item 1</button>
          <a onClick={mockOnAnchorClick}>Item 2</a>
        </SideBar.MenuList>
        <button onClick={mockOnButtonClick}>Item 3</button>
      </SideBar>,
    )
    const items = document.querySelectorAll('a,button') as NodeListOf<HTMLAnchorElement | HTMLButtonElement>
    items[0].focus()

    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' })
    expect(mockOnKeyDown).toHaveBeenCalled()
    expect(document.activeElement).toBe(items[1])

    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(items[2])

    fireEvent.keyDown(document.activeElement!, { key: 'ArrowUp' })
    expect(document.activeElement).toBe(items[1])
    fireEvent.keyDown(document.activeElement!, { key: ' ' })
    expect(mockOnAnchorClick).toHaveBeenCalled()

    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(items[2])
    fireEvent.keyDown(document.activeElement!, { key: 'Enter' })
    expect(mockOnButtonClick).toHaveBeenCalled()
  })
})
