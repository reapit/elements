import { render, screen } from '@testing-library/react'
import { PrimaryTabsItem } from '../primary-tabs-item'

test('renders a list item containing a link', () => {
  render(
    <ul>
      <PrimaryTabsItem aria-current={false} href="/test">
        Primary tab
      </PrimaryTabsItem>
    </ul>,
  )

  expect(screen.getByRole('listitem')).toBeVisible()
  expect(screen.getByRole('link', { name: 'Primary tab' })).toBeVisible()
})

test('passes through additional props to the PrimaryTab component', () => {
  render(
    <ul>
      <PrimaryTabsItem aria-current="page" href="/current" data-testid="custom-tab">
        Current Tab
      </PrimaryTabsItem>
    </ul>,
  )

  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('aria-current', 'page')
  expect(link).toHaveAttribute('href', '/current')
  expect(link).toHaveAttribute('data-testid', 'custom-tab')
})
