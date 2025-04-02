import { useIsSideBarExpandedContext } from '#src/components/side-bar/is-side-bar-expanded-context'
import { render, screen } from '@testing-library/react'
import type { Mock } from 'vitest'
import { SideBarCollapseButton } from '..'

vi.mock('../../side-bar-collapse-button/icons/collapse.svg?react', () => ({
  default: () => <span data-testid="collapse-icon" />,
}))

vi.mock('#src/components/side-bar/is-side-bar-expanded-context', () => ({
  useIsSideBarExpandedContext: vi.fn(),
}))

const mockuseIsSideBarExpandedContext = useIsSideBarExpandedContext as Mock

describe('SideBar', () => {
  beforeAll(() => {
    mockuseIsSideBarExpandedContext.mockReturnValue({ isExpanded: true, setIsExpanded: vi.fn() })
  })

  it('should match snapshot with expanded state', () => {
    const { asFragment } = render(<SideBarCollapseButton />)

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
    expect(asFragment()).toMatchSnapshot()
  })

  it('should handle click properly and match snapshot with collapsed state', () => {
    const mockOnClick = vi.fn()
    mockuseIsSideBarExpandedContext.mockReturnValue({ isExpanded: false, setIsExpanded: mockOnClick })
    const { asFragment } = render(<SideBarCollapseButton />)

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
    screen.getByRole('button').click()

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(asFragment()).toMatchSnapshot()
  })
})
