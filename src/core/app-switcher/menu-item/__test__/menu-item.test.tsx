import { render, screen } from '@testing-library/react'
import { AppAvatar } from '../../app-avatar/app-avatar'
import { productConfigs } from '../../config'
import { AppSwitcherMenuItem } from '../menu-item'

test('renders the provided logo, app name and supplementary info', () => {
  const { asFragment } = render(
    <AppSwitcherMenuItem
      {...productConfigs.consoleCloud}
      avatar={<AppAvatar productId={'consoleCloud'} hasAccess />}
      href={'https://www.test.com'}
    />,
  )
  expect(asFragment()).toMatchSnapshot()
})

test('renders as a link element', () => {
  render(
    <AppSwitcherMenuItem
      {...productConfigs.consoleCloud}
      avatar={<AppAvatar productId={'consoleCloud'} hasAccess />}
      href={'https://www.test.com'}
    />,
  )
  expect(screen.getByRole('link')).toBeVisible()
})

test("is accessibly named by the product's name", () => {
  render(
    <AppSwitcherMenuItem
      {...productConfigs.consoleCloud}
      avatar={<AppAvatar productId={'consoleCloud'} hasAccess />}
      href={'https://www.test.com'}
    />,
  )
  expect(screen.getByRole('link', { name: 'Reapit PM' })).toBeVisible()
})

test("is accessibly described by the product's supplementary info", () => {
  render(
    <AppSwitcherMenuItem
      {...productConfigs.consoleCloud}
      avatar={<AppAvatar productId={'consoleCloud'} hasAccess />}
      href={'https://www.test.com'}
    />,
  )
  expect(screen.getByRole('link')).toHaveAccessibleDescription('Property management')
})
