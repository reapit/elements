import { fireEvent, render, screen } from '@testing-library/react'
import { SideBarMenuGroupItem, SideBarMenuGroup } from '..'
import { SideBar } from '#src/components/side-bar/side-bar'
import { SideBarCollapseButton } from '../../side-bar-collapse-button'

describe('SideBarMenuGroupItem', () => {
  it('renders with available props correctly', () => {
    render(<SideBarMenuGroupItem href="/test">Test Child</SideBarMenuGroupItem>)
    expect(screen.getByText('Test Child')).toBeInTheDocument()
    expect(screen.getByText('Test Child')).toHaveAttribute('href', '/test')
    expect(screen.getByText('Test Child')).not.toHaveAttribute('aria-current')
  })

  it('sets aria-current to page when isActive is true', () => {
    render(<SideBarMenuGroupItem isActive>Active Item</SideBarMenuGroupItem>)
    expect(screen.getByText('Active Item')).toHaveAttribute('aria-current', 'page')
  })
})

describe('SideBarMenuGroup', () => {
  it('renders label and icon correctly', () => {
    render(
      <SideBar>
        <SideBarMenuGroup label="Trigger Label" icon={<span>mocked icon</span>}>
          Child Item
        </SideBarMenuGroup>
      </SideBar>,
    )
    expect(screen.getByText('Trigger Label')).toBeInTheDocument()
    expect(screen.getByText('mocked icon')).toBeInTheDocument()
  })

  it('renders active state properly', () => {
    render(
      <SideBar>
        <SideBarMenuGroup label="Trigger Label" icon={null} isActive>
          Child Item
        </SideBarMenuGroup>
      </SideBar>,
    )
    expect(screen.getByText('Trigger Label').parentElement).toHaveAttribute('aria-current', 'page')
  })

  it('hide trigger label and show only icon when SideBar is collapsed', () => {
    render(
      <SideBar>
        <SideBarMenuGroup label="Trigger Label" icon={<span>mocked icon</span>}>
          Child Item
        </SideBarMenuGroup>
        <SideBarCollapseButton data-testid="collapse-button-container" />
      </SideBar>,
    )
    fireEvent.click(screen.getByTestId('collapse-button-container').children[0])
    expect(screen.queryByText('Trigger Label')).not.toBeInTheDocument()
    expect(screen.getByText('mocked icon')).toBeInTheDocument()
  })

  it('should expand SideBar and MenuGroup when trigger button is clicked while SideBar is collapsed ', () => {
    render(
      <SideBar>
        <SideBarMenuGroup label="Trigger Label" icon={<span>mocked icon</span>}>
          Child Item
        </SideBarMenuGroup>
        <SideBarCollapseButton data-testid="collapse-button-container" />
      </SideBar>,
    )
    const collapseButton = screen.getByTestId('collapse-button-container').children[0]
    fireEvent.click(collapseButton)
    expect(screen.queryByText('Child Item')).not.toBeInTheDocument()

    const triggerButton = screen.getByRole('button', { name: 'mocked icon' })
    fireEvent.click(triggerButton)
    expect(screen.getByText('Trigger Label')).toBeInTheDocument()
    expect(screen.getByText('Child Item')).toBeInTheDocument()
  })

  it('show and hide child item based on SideBar expanded state', () => {
    render(
      <SideBar>
        <SideBarMenuGroup label="Group" icon={null}>
          Child Item
        </SideBarMenuGroup>
      </SideBar>,
    )

    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Child Item')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button'))
    expect(screen.queryByText('Child Item')).not.toBeInTheDocument()
  })
})
