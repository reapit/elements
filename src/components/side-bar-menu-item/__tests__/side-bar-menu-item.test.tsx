import { render } from '@testing-library/react'
import { SideBarMenuItem } from '..'
import type { Mock } from 'vitest'
import { useIsSideBarExpandedContext } from '#src/components/side-bar/is-side-bar-expanded-context'

vi.mock('#src/components/side-bar/is-side-bar-expanded-context', () => ({
  useIsSideBarExpandedContext: vi.fn(),
}))

const mockuseIsSideBarExpandedContext = useIsSideBarExpandedContext as Mock

describe('SideBarMenuItem', () => {
  beforeAll(() => {
    mockuseIsSideBarExpandedContext.mockReturnValue({ isExpanded: true, setIsExpanded: vi.fn() })
  })
  it('should render item and match snapshot', () => {
    const { asFragment } = render(
      <SideBarMenuItem icon={<div />} href="#">
        a link
      </SideBarMenuItem>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render active item and match snapshot', () => {
    const { asFragment } = render(
      <SideBarMenuItem icon={<div />} isActive href="/#">
        a link
      </SideBarMenuItem>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
