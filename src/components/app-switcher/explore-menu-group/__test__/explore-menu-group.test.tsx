import { render } from '@testing-library/react'
import { AppSwitcherExploreMenuGroup } from '../explore-menu-group'

test('renders AppSwitcherExploreMenuGroup properly', () => {
  const { asFragment } = render(<AppSwitcherExploreMenuGroup>Fake child</AppSwitcherExploreMenuGroup>)
  expect(asFragment()).toMatchSnapshot()
})
