import { render } from '@testing-library/react'
import AppAvatar from '../../app-avatar/app-avatar'
import { apps } from '../../appNames'
import { AppSwitcherMenuItem } from '../menu-item'

test('renders AppSwitcherMenuItem properly', () => {
  const { name, description } = apps.reapitPM
  const { asFragment } = render(
    <AppSwitcherMenuItem
      logo={<AppAvatar appName={'reapitPM'} hasAccess />}
      appName={name}
      description={description}
      url={'https://www.test.com'}
    />,
  )
  expect(asFragment()).toMatchSnapshot()
})
