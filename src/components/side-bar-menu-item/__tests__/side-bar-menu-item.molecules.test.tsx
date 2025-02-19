import { act, fireEvent, render, screen } from '@testing-library/react'
import { SideBarCollapse } from '..'
import { SideBarProvider } from '#src/components/side-bar/side-bar-context'

describe('SideBar', () => {
  it('should match snapshot with expanded state', () => {
    const { asFragment } = render(
      <SideBarProvider>
        <SideBarCollapse />{' '}
      </SideBarProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with simple state', () => {
    const { asFragment } = render(
      <SideBarProvider>
        <SideBarCollapse />
      </SideBarProvider>,
    )
    act(() => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
    expect(asFragment()).toMatchSnapshot()
  })
})
