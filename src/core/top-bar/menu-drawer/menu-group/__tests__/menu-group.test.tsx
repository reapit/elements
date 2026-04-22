import { render, screen } from '@testing-library/react'
import { TopBarMenuDrawerMenuGroup } from '../menu-group'
import { TopBarMenuDrawerMenuGroupSummary } from '../menu-group-summary'
import { TopBarMenuDrawerSubmenu } from '../../submenu'
import { elTopBarMenuDrawerMenuGroup } from '../styles'

const exampleChildren = (
  <TopBarMenuDrawerSubmenu>
    <TopBarMenuDrawerSubmenu.Item href="/settings/profile" aria-current={false}>
      Profile
    </TopBarMenuDrawerSubmenu.Item>
    <TopBarMenuDrawerSubmenu.Item href="/settings/preferences" aria-current={false}>
      Preferences
    </TopBarMenuDrawerSubmenu.Item>
  </TopBarMenuDrawerSubmenu>
)

const exampleSummary = <TopBarMenuDrawerMenuGroupSummary>Settings</TopBarMenuDrawerMenuGroupSummary>

const selectedChildren = (
  <TopBarMenuDrawerSubmenu>
    <TopBarMenuDrawerSubmenu.Item href="/settings/profile" aria-current="page">
      Profile
    </TopBarMenuDrawerSubmenu.Item>
    <TopBarMenuDrawerSubmenu.Item href="/settings/preferences" aria-current={false}>
      Preferences
    </TopBarMenuDrawerSubmenu.Item>
  </TopBarMenuDrawerSubmenu>
)

test('renders a <details> element', () => {
  render(<TopBarMenuDrawerMenuGroup summary={exampleSummary}>{exampleChildren}</TopBarMenuDrawerMenuGroup>)
  const group = screen.getByRole('group')

  expect(group.tagName).toBe('DETAILS')
  expect(group).toBeInTheDocument()
})

test(`combines the .${elTopBarMenuDrawerMenuGroup} and consumer-supplied classes correctly`, () => {
  render(
    <TopBarMenuDrawerMenuGroup summary={exampleSummary} className="my-custom-class">
      {exampleChildren}
    </TopBarMenuDrawerMenuGroup>,
  )
  expect(screen.getByRole('group')).toHaveAttribute('class', `${elTopBarMenuDrawerMenuGroup} my-custom-class`)
})

test('is closed by default', () => {
  render(<TopBarMenuDrawerMenuGroup summary={exampleSummary}>{exampleChildren}</TopBarMenuDrawerMenuGroup>)
  expect(screen.getByRole('group')).not.toBeVisible()
})

test('can be opened with open prop', () => {
  render(
    <TopBarMenuDrawerMenuGroup summary={exampleSummary} open>
      {exampleChildren}
    </TopBarMenuDrawerMenuGroup>,
  )
  expect(screen.getByRole('group')).toBeVisible()
})

test('applies isActive data attribute', () => {
  render(
    <TopBarMenuDrawerMenuGroup summary={exampleSummary} isActive>
      {exampleChildren}
    </TopBarMenuDrawerMenuGroup>,
  )
  expect(screen.getByRole('group')).toHaveAttribute('data-is-active', 'true')
})

test('renders summary and children correctly', () => {
  render(<TopBarMenuDrawerMenuGroup summary={exampleSummary}>{exampleChildren}</TopBarMenuDrawerMenuGroup>)

  expect(screen.getByText('Settings')).toBeInTheDocument()
  expect(screen.getByText('Profile')).toBeInTheDocument()
})

test('is labelled by the <summary> element', () => {
  render(<TopBarMenuDrawerMenuGroup summary={exampleSummary}>{selectedChildren}</TopBarMenuDrawerMenuGroup>)
  const detailsElement = screen.getByRole('group')
  const summaryElement = screen.getByText('Settings').closest('summary')
  expect(detailsElement.getAttribute('aria-labelledby')).toBe(summaryElement?.id)
})

test('is open by default when a descendant submenu item represents the current page', () => {
  render(<TopBarMenuDrawerMenuGroup summary={exampleSummary}>{selectedChildren}</TopBarMenuDrawerMenuGroup>)
  // NOTE: <details> elements are only considered visible when they are open
  expect(screen.getByRole('group')).toBeVisible()
})

test('is closed by default when NO descendant submenu items represent the current page', () => {
  render(<TopBarMenuDrawerMenuGroup summary={exampleSummary}>{exampleChildren}</TopBarMenuDrawerMenuGroup>)
  // NOTE: <details> elements are only considered visible when they are open
  expect(screen.getByRole('group')).not.toBeVisible()
})
