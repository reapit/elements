import { render, screen } from '@testing-library/react'
import { AppSwitcherMenuItem } from '../menu-item'

const defaultProps = {
  appName: 'Test App',
  supplementaryInfo: 'Test supplementary info',
  avatar: <img src="/test-logo.png" alt="" />,
  href: 'https://www.test.com',
}

test('renders the provided logo, app name and supplementary info', () => {
  const { asFragment } = render(<AppSwitcherMenuItem {...defaultProps} />)
  expect(asFragment()).toMatchSnapshot()
})

test('renders as a link element', () => {
  render(<AppSwitcherMenuItem {...defaultProps} />)
  expect(screen.getByRole('link')).toBeVisible()
})

test('is accessibly named by the app name', () => {
  render(<AppSwitcherMenuItem {...defaultProps} />)
  expect(screen.getByRole('link', { name: 'Test App' })).toBeVisible()
})

test('is accessibly described by the supplementary info', () => {
  render(<AppSwitcherMenuItem {...defaultProps} />)
  expect(screen.getByRole('link')).toHaveAccessibleDescription('Test supplementary info')
})
