import { render, screen, waitFor } from '@testing-library/react'
import { useTopBarMenuDrawerMenuGroupController } from '../use-menu-group-controller'

import type { DetailsHTMLAttributes } from 'react'

test('`<details>` is opened when it becomes active', async () => {
  const { rerender } = render(
    // NOTE: the `open` attribute is absent when we first render
    <Details />,
  )
  expect(screen.getByRole('group')).not.toBeVisible()

  rerender(
    // NOTE: the `open` attribute is still absent when we rerender, but we expect the <details> element to be
    // opened by our useTopBarMenuDrawerMenuGroupController because the <details> element is marked as active
    <Details data-is-active="true" />,
  )
  await waitFor(() => expect(screen.getByRole('group')).toBeVisible())
})

test('`<details>` is closed when it is no longer active', async () => {
  const { rerender } = render(
    // NOTE: the `open` attribute is present when we first render
    <Details data-is-active="true" open />,
  )
  expect(screen.getByRole('group')).toBeVisible()

  rerender(
    // NOTE: the `open` attribute is still present when we rerender, but we expect the <details> element to be
    // closed by our useTopBarMenuDrawerMenuGroupController because the <details> element is no longer marked as active
    <Details open />,
  )
  await waitFor(() => expect(screen.getByRole('group')).not.toBeVisible())
})

test('`<details>` is opened when a descendant comes to represent the current page', async () => {
  const { rerender } = render(
    // NOTE: the `open` attribute is absent when we first render
    <Details>
      <a aria-current="false">Current Page</a>
    </Details>,
  )
  expect(screen.getByRole('group')).not.toBeVisible()

  rerender(
    // NOTE: the `open` attribute is still absent when we rerender, but we expect the <details> element to be
    // opened by our useTopBarMenuDrawerMenuGroupController because one of its descendants _now_ represents
    // the current page
    <Details>
      <a aria-current="page">Current Page</a>
    </Details>,
  )
  await waitFor(() => expect(screen.getByRole('group')).toBeVisible())
})

test('`<details>` is closed when a descendant no longer represents the current page', async () => {
  const { rerender } = render(
    // NOTE: the `open` attribute is present when we first render
    <Details open>
      <a href="/" aria-current="page">
        Current Page
      </a>
    </Details>,
  )
  expect(screen.getByRole('group')).toBeVisible()

  rerender(
    // NOTE: the `open` attribute is still present when we rerender, but we expect the <details> element to be
    // closed by our useTopBarMenuDrawerMenuGroupController because one of its descendants _no longer_ represents the
    // current page
    <Details open>
      <a href="/" aria-current="false">
        Current Page
      </a>
    </Details>,
  )
  await waitFor(() => expect(screen.getByRole('group')).not.toBeVisible())
})

test('`<details>` is opened on initial render when a descendant represents the current page', () => {
  render(
    // NOTE: the `open` attribute is absent when we first render, but we expect the <details> element to be
    // opened by our useTopBarMenuDrawerMenuGroupController because one of its descendants represents the current page
    <Details>
      <a href="/" aria-current="page">
        Current Page
      </a>
    </Details>,
  )
  expect(screen.getByRole('group')).toBeVisible()
})

test('`<details>` is opened on initial render when it is active', () => {
  render(
    // NOTE: the `open` attribute is absent when we first render, but we expect the <details> element to be
    // opened by our useTopBarMenuDrawerMenuGroupController because the <details> element is marked as active
    <Details data-is-active="true" />,
  )
  expect(screen.getByRole('group')).toBeVisible()
})

/** Simple integration of the subject under test (useTopBarMenuDrawerMenuGroupController) and a `<details>` element */
function Details({ children, ...props }: DetailsHTMLAttributes<HTMLDetailsElement>) {
  const ref = useTopBarMenuDrawerMenuGroupController()
  return (
    <details {...props} ref={ref}>
      {children}
    </details>
  )
}
