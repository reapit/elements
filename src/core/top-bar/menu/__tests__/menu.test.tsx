import { areInvokerCommandsSupported } from '../are-invoker-commands-supported'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { TopBarMenu } from '../menu'

vi.mock('../are-invoker-commands-supported')
vi.mocked(areInvokerCommandsSupported).mockReturnValue(true)

test('renders a button element', () => {
  render(<TopBarMenu>Menu content</TopBarMenu>)
  expect(screen.getByRole('button')).toBeVisible()
})

test('renders a dialog', () => {
  render(<TopBarMenu>Menu content</TopBarMenu>)
  expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument()
})

test('uses default aria-label "Menu" on button', () => {
  render(<TopBarMenu>Menu content</TopBarMenu>)
  expect(screen.getByRole('button', { name: 'Menu' })).toBeVisible()
})

test('uses custom aria-label on button when provided', () => {
  render(<TopBarMenu aria-label="Navigation">Menu content</TopBarMenu>)
  expect(screen.getByRole('button', { name: 'Navigation' })).toBeVisible()
})

test('button has command attribute set to "show-modal"', () => {
  render(<TopBarMenu>Menu content</TopBarMenu>)
  expect(screen.getByRole('button')).toHaveAttribute('command', 'show-modal')
})

test('button commandfor attribute matches dialog id', () => {
  const { container } = render(<TopBarMenu>Menu content</TopBarMenu>)

  const drawer = container.querySelector('dialog')
  expect(screen.getByRole('button')).toHaveAttribute('commandfor', drawer?.id)
})

test('can be opened and closed when invoker commands are not supported', async () => {
  vi.mocked(areInvokerCommandsSupported).mockReturnValue(false)

  render(<TopBarMenu>Menu content</TopBarMenu>)

  fireEvent.click(screen.getByRole('button', { name: 'Menu' }))
  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())

  fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
  await waitFor(() => expect(screen.queryByRole('dialog', { hidden: true })).not.toBeVisible())
})

test('call onClick when provided', () => {
  const onClick = vi.fn()
  render(<TopBarMenu onClick={onClick}>Menu content</TopBarMenu>)

  const button = screen.getByRole('button', { name: 'Menu' })
  fireEvent.click(button)
  expect(onClick).toHaveBeenCalled()
})

test('call onClose when provided', () => {
  // NOTE: Happy DOM doesn't action invoker commands yet, so easiest way to verify onClose is called is
  // to force invoker commands to be unsupported, which causes the component to fallback to local React
  // open state.
  vi.mocked(areInvokerCommandsSupported).mockReturnValue(false)

  const onClose = vi.fn()
  render(<TopBarMenu onClose={onClose}>Menu content</TopBarMenu>)

  fireEvent.click(screen.getByRole('button', { name: 'Menu' }))
  fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
  expect(onClose).toHaveBeenCalled()
})

test('uses provided id for button', () => {
  render(<TopBarMenu id="custom-menu-button">Menu content</TopBarMenu>)
  expect(screen.getByRole('button')).toHaveAttribute('id', 'custom-menu-button')
})

test('drawer is labelled by button', () => {
  const { container } = render(<TopBarMenu id="menu-button">Menu content</TopBarMenu>)

  const drawer = container.querySelector('dialog')
  expect(drawer).toHaveAttribute('aria-labelledby', 'menu-button')
})

test('drawer is labelled by generated button id when no id provided', () => {
  const { container } = render(<TopBarMenu>Menu content</TopBarMenu>)

  const button = screen.getByRole('button')
  const drawer = container.querySelector('dialog')

  expect(drawer).toHaveAttribute('aria-labelledby', button.id)
  expect(button.id).toBeTruthy()
})

test('renders children inside drawer', () => {
  render(
    <TopBarMenu>
      <div>Menu content</div>
    </TopBarMenu>,
  )
  expect(screen.getByText('Menu content')).toBeInTheDocument()
})

test('renders MenuDrawer.Header inside drawer', () => {
  render(<TopBarMenu>Menu content</TopBarMenu>)
  // NOTE: because the dialog is closed, the header element is considered hidden.
  expect(screen.getByRole('banner', { hidden: true })).toBeInTheDocument()
})

test('forwards additional props to button element', () => {
  render(
    <TopBarMenu data-testid="custom-menu" className="custom-class">
      Menu content
    </TopBarMenu>,
  )

  const button = screen.getByTestId('custom-menu')
  expect(button.tagName).toBe('BUTTON')
  expect(button).toHaveClass('custom-class')
})

test('exposes TopBarMenu.getClosestDialogElement', () => {
  expect(TopBarMenu.getClosestDialogElement).toBeDefined()
})

test('exposes TopBarMenu.Content', () => {
  expect(TopBarMenu.Content).toBeDefined()
})

test('exposes TopBarMenu.MainNav', () => {
  expect(TopBarMenu.MainNav).toBeDefined()
})

test('exposes TopBarMenu.SecondaryNav', () => {
  expect(TopBarMenu.SecondaryNav).toBeDefined()
})

test('exposes TopBarMenu.ProfileNav', () => {
  expect(TopBarMenu.ProfileNav).toBeDefined()
})

test('exposes TopBarMenu.MenuList', () => {
  expect(TopBarMenu.MenuList).toBeDefined()
})

test('exposes TopBarMenu.MenuItem', () => {
  expect(TopBarMenu.MenuItem).toBeDefined()
})

test('exposes TopBarMenu.MenuItemButton', () => {
  expect(TopBarMenu.MenuItemButton).toBeDefined()
})

test('exposes TopBarMenu.MenuGroup', () => {
  expect(TopBarMenu.MenuGroup).toBeDefined()
})

test('exposes TopBarMenu.MenuGroupSummary', () => {
  expect(TopBarMenu.MenuGroupSummary).toBeDefined()
})

test('exposes TopBarMenu.Submenu', () => {
  expect(TopBarMenu.Submenu).toBeDefined()
})

test('exposes TopBarMenu.SubmenuItem', () => {
  expect(TopBarMenu.SubmenuItem).toBeDefined()
})

test('exposes TopBarMenu.SubmenuItemButton', () => {
  expect(TopBarMenu.SubmenuItemButton).toBeDefined()
})
