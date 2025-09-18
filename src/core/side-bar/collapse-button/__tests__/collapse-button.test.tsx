import { composeStories } from '@storybook/react-vite'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as stories from '../collapse-button.stories'
import { SideBarContextPublisher } from '../../side-bar-context'
import { SideBarCollapseButton } from '../collapse-button'

const CollapseButtonStoriesWithSideBarInitiallyCollapsed = composeStories(stories, {
  parameters: { sideBar: { initialState: 'collapsed' } },
})
const CollapseButtonStoriesWithSideBarInitiallyExpanded = composeStories(stories, {
  parameters: { sideBar: { initialState: 'expanded' } },
})

describe('when the SideBar is collapsed', () => {
  // The following tests expect the SideBar to be in an initially collapsed state.

  test('renders a button with an accessible name of "Expand"', () => {
    render(<CollapseButtonStoriesWithSideBarInitiallyCollapsed.Example />)
    expect(screen.getByRole('button', { name: 'Expand' })).toBeVisible()
  })

  test('button has `aria-expanded="false"`', () => {
    render(<CollapseButtonStoriesWithSideBarInitiallyCollapsed.Example />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
  })
})

describe('when the SideBar is expanded', () => {
  // The following tests expect the SideBar to be in an initially expanded state.

  test('renders a button with an accessible name of "Collapse"', () => {
    render(<CollapseButtonStoriesWithSideBarInitiallyExpanded.Example />)
    expect(screen.getByRole('button', { name: 'Collapse' })).toBeVisible()
  })

  test('button has `aria-expanded="true"`', () => {
    render(<CollapseButtonStoriesWithSideBarInitiallyExpanded.Example />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })
})

test('clicking the button toggles the SideBar state', async () => {
  const toggle = vi.fn()
  render(
    <SideBarContextPublisher
      id="test-sidebar"
      expand={() => void 0}
      setState={() => void 0}
      state="collapsed" // NOTE: this is not relevant to the test, we're just providing a valid state
      toggle={toggle}
    >
      <SideBarCollapseButton />
    </SideBarContextPublisher>,
  )
  const button = screen.getByRole('button')

  fireEvent.click(button)
  await waitFor(() => expect(toggle).toHaveBeenCalledTimes(1))
})

test('a consumer-supplied `onClick` can prevent the side bar state from being toggled', async () => {
  render(<CollapseButtonStoriesWithSideBarInitiallyCollapsed.Example onClick={(e) => e.preventDefault()} />)

  // The button has an accessible name of "Expand" when we render, because the SideBar is initially collapsed.
  fireEvent.click(screen.getByRole('button', { name: 'Expand' }))

  // We expect the button to still have an accessible name of "Expand", because the default action
  // (toggling the sidebar) was prevented by our onClick handler.
  expect(screen.getByRole('button', { name: 'Expand' })).toBeVisible()
})
