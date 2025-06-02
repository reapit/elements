import { render } from '@testing-library/react'
import AppAvatar from '../app-avatar'
import { AppName, apps } from '../../appNames'

const testCases = Object.keys(apps) as AppName[]

test.each(testCases)('renders %s icon when `hasAccess` is true', (appName) => {
  const { asFragment } = render(<AppAvatar appName={appName} hasAccess={true} />)
  expect(asFragment()).toMatchSnapshot()
})

test.each(testCases)('renders %s icon when `hasAccess` is false', (appName) => {
  const { asFragment } = render(<AppAvatar appName={appName} hasAccess={false} />)
  expect(asFragment()).toMatchSnapshot()
})
