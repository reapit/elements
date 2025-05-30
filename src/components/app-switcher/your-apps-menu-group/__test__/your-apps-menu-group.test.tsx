import { render } from '@testing-library/react'
import { AppSwitcher } from '../../app-switcher'
import { AppSwitcherYourAppsMenuGroup } from '../your-apps-menu-group'

const sampleUrl = 'https://www.test.com'
test('renders AppSwitcherYourAppsMenuGroup properly', () => {
  const { asFragment } = render(
    <AppSwitcherYourAppsMenuGroup>
      <AppSwitcher.ReapitPMMenuItem url={sampleUrl} />
      <AppSwitcher.ReapitSalesMenuItem url={sampleUrl} />
      <AppSwitcher.KeyWhereMenuItem url={sampleUrl} />
    </AppSwitcherYourAppsMenuGroup>,
  )
  expect(asFragment()).toMatchSnapshot()
})
