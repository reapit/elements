import { render } from '@testing-library/react'
import { AppSwitcherYourAppsMenuGroup } from '../your-apps-menu-group'

test('renders AppSwitcherYourAppsMenuGroup properly', () => {
  const { asFragment } = render(<AppSwitcherYourAppsMenuGroup>Fake child</AppSwitcherYourAppsMenuGroup>)
  expect(asFragment()).toMatchSnapshot()
})
