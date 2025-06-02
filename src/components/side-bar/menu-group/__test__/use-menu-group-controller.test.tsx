import { render, screen, waitFor } from '@testing-library/react'
import { useSideBarMenuGroupController } from '../use-menu-group-controller'

import type { DetailsHTMLAttributes } from 'react'
import type { SideBarState } from '../../use-side-bar'

test('`<details>` is opened when the `SideBar` is expanded and a descendant represents the current page', () => {
  const { rerender } = render(
    // NOTE: the `open` attribute is absent when we first render
    <Details sideBarState="collapsed">
      <a href="/" aria-current="page">
        Current Page
      </a>
    </Details>,
  )
  expect(screen.getByRole('group')).not.toBeVisible()

  rerender(
    // NOTE: the `open` attribute is still absent when we rerender with the SideBar expanded, but we expect the
    // <details> element to be opened by our useSideBarMenuGroupController because one of its descendants represents
    // the current page
    <Details sideBarState="expanded">
      <a href="/" aria-current="page">
        Current Page
      </a>
    </Details>,
  )
  expect(screen.getByRole('group')).toBeVisible()
})

test('`<details>` is closed when the `SideBar` is collapsed', () => {
  const { rerender } = render(
    <Details open sideBarState="expanded">
      Content
    </Details>,
  )
  expect(screen.getByRole('group')).toBeVisible()

  rerender(
    // NOTE: the `open` attribute is still present when we rerender, but we expect the <details> element
    // to be closed by our useSideBarMenuGroupController
    <Details open sideBarState="collapsed">
      Content
    </Details>,
  )
  expect(screen.getByRole('group')).not.toBeVisible()
})

test('`<details>` is opened when a descendant comes to represent the current page', async () => {
  const { rerender } = render(
    // NOTE: the `open` attribute is absent when we first render
    <Details sideBarState="expanded">
      <a aria-current="false">Current Page</a>
    </Details>,
  )
  expect(screen.getByRole('group')).not.toBeVisible()

  rerender(
    // NOTE: the `open` attribute is still absent when we rerender, but we expect the <details> element to be
    // opened by our useSideBarMenuGroupController because one of its descendants _now_ represents the current page
    <Details sideBarState="expanded">
      <a aria-current="page">Current Page</a>
    </Details>,
  )
  await waitFor(() => expect(screen.getByRole('group')).toBeVisible())
})

test('`<details>` is closed when a descendant no longer represents the current page', async () => {
  const { rerender } = render(
    // NOTE: the `open` attribute is present when we first render
    <Details open sideBarState="expanded">
      <a href="/" aria-current="page">
        Current Page
      </a>
    </Details>,
  )
  expect(screen.getByRole('group')).toBeVisible()

  rerender(
    // NOTE: the `open` attribute is still present when we rerender, but we expect the <details> element to be
    // closed by our useSideBarMenuGroupController because one of its descendants _no longer_ represents the
    // current page
    <Details open sideBarState="expanded">
      <a href="/" aria-current="false">
        Current Page
      </a>
    </Details>,
  )
  await waitFor(() => expect(screen.getByRole('group')).not.toBeVisible())
})

interface DetailsProps extends DetailsHTMLAttributes<HTMLDetailsElement> {
  sideBarState: SideBarState
}

/** Simple integration of the subject under test (useSideBarMenuGroupController) and a `<details>` element */
function Details({ children, sideBarState, ...props }: DetailsProps) {
  const ref = useSideBarMenuGroupController(sideBarState)
  return (
    <details {...props} ref={ref}>
      {children}
    </details>
  )
}
