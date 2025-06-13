import { render } from '@testing-library/react'
import { AppSwitcherExploreMenuGroup } from '../explore-menu-group'
import { AppSwitcherMenuGroupHasAccessContext } from '../../menu-group-has-access-context'

test('renders AppSwitcherExploreMenuGroup properly', () => {
  const { asFragment } = render(<AppSwitcherExploreMenuGroup>Fake child</AppSwitcherExploreMenuGroup>)
  expect(asFragment()).toMatchSnapshot()
})

test('provides an `AppSwitcherMenuGroupHasAccessContext` value of `false`', () => {
  let hasAccess: boolean | undefined

  render(
    <AppSwitcherExploreMenuGroup>
      <AppSwitcherMenuGroupHasAccessContext.Consumer>
        {(value) => {
          hasAccess = value
          return null
        }}
      </AppSwitcherMenuGroupHasAccessContext.Consumer>
    </AppSwitcherExploreMenuGroup>,
  )

  expect(hasAccess).toBe(false)
})
