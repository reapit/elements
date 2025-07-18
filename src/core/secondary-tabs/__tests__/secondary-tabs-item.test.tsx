import { render, screen } from '@testing-library/react'
import { SecondaryTabsItem } from '../secondary-tabs-item'

test('renders a list item containing a link', () => {
  render(
    <ul>
      <SecondaryTabsItem aria-current={false} href="/test">
        Secondary tab
      </SecondaryTabsItem>
    </ul>,
  )

  expect(screen.getByRole('listitem')).toBeVisible()
  expect(screen.getByRole('link', { name: 'Secondary tab' })).toBeVisible()
})

test('passes through additional props to the SecondaryTab component', () => {
  render(
    <ul>
      <SecondaryTabsItem aria-current="page" href="/current" data-testid="custom-tab">
        Current Tab
      </SecondaryTabsItem>
    </ul>,
  )

  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('aria-current', 'page')
  expect(link).toHaveAttribute('href', '/current')
  expect(link).toHaveAttribute('data-testid', 'custom-tab')
})

test('includes an ARIA hidden separator', () => {
  render(
    <ul>
      <SecondaryTabsItem aria-current="page" href="/current" data-testid="custom-tab">
        Current Tab
      </SecondaryTabsItem>
    </ul>,
  )

  const listItem = screen.getByRole('listitem')
  const separator = listItem.querySelector('> span')
  expect(separator).toHaveAttribute('aria-hidden', 'true')
})
