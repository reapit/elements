import { render } from '@testing-library/react'
import { AppSwitcher } from '../../app-switcher'
import { AppSwitcherExploreMenuGroup } from '../explore-menu-group'

const sampleUrl = 'https://www.test.com'
test('renders AppSwitcherExploreMenuGroup properly', () => {
  const { asFragment } = render(
    <AppSwitcherExploreMenuGroup>
      <AppSwitcher.ReapitPMMenuItem url={sampleUrl} />
      <AppSwitcher.ReapitSalesMenuItem url={sampleUrl} />
      <AppSwitcher.KeyWhereMenuItem url={sampleUrl} />
    </AppSwitcherExploreMenuGroup>,
  )
  expect(asFragment()).toMatchSnapshot()
})
