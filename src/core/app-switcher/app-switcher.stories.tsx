import preview from '#.storybook/preview'
import { AppSwitcher } from './app-switcher'

const meta = preview.meta({
  title: 'Core/AppSwitcher',
  component: AppSwitcher,
  argTypes: {
    children: {
      control: false,
    },
  },
})

const href = '#'

/**
 * The UI for the App Switcher is built by composing subcomponents like `AppSwitcher.ProductMenuItem`,
 * `AppSwitcher.YourAppsMenuGroup`, `AppSwitcher.ExploreMenuGroup`, and `AppSwitcher.Divider`. This composition
 * is manual, but it's important to note that the order of the products in the menu, as well as which products
 * are approved for display is not handled automatically by these subcomponents.
 *
 * Instead, there are two utility functions, `getDisplayableProductsForYourAppsGroup` and
 * `getDisplayableProductsForExploreGroup`, that can be used to obtain the list of product IDs for each group based
 * on the currently logged-in user has access to, according to Reapit Connect. A practical exmaple of how to do this
 * is shown in the "All Accessible" and "None Accessible" stories below.
 */
export const Example = meta.story({
  args: {
    children: [
      <AppSwitcher.YourAppsMenuGroup key="1">
        <AppSwitcher.ProductMenuItem href={href} productId="ireWeb" />
      </AppSwitcher.YourAppsMenuGroup>,
      <AppSwitcher.Divider key="2" />,
      <AppSwitcher.ExploreMenuGroup key="3">
        <AppSwitcher.ProductMenuItem href={href} productId="consoleCloud" />
        <AppSwitcher.ProductMenuItem href={href} productId="keyWhere" />
      </AppSwitcher.ExploreMenuGroup>,
    ],
  },
})
