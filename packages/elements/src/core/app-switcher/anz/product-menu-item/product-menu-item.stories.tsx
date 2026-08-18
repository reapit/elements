import preview from "#.storybook/preview";

import { AppSwitcherMenuGroupHasAccessContext } from "../../menu-group-has-access-context";
import { productConfigs } from "../config";
import { AppSwitcherProductMenuItem } from "./product-menu-item";

const meta = preview.meta({
  title: "Navigation/AppSwitcher/ANZ/ProductMenuItem",
  component: AppSwitcherProductMenuItem,
  argTypes: {
    productId: {
      control: "select",
      options: Object.keys(productConfigs),
    },
  },
  decorators: [
    (Story, { parameters: { hasAccessContextValue } }) => (
      <AppSwitcherMenuGroupHasAccessContext.Provider value={!!hasAccessContextValue}>
        <Story />
      </AppSwitcherMenuGroupHasAccessContext.Provider>
    ),
  ],
  parameters: {
    hasAccessContextValue: true,
  },
});

/**
 * When the product menu item is rendered as a child of the `AppSwitcher.YourAppsMenuGroup` (or more
 * specifically, when the nearest `HasAccessContext.Provider` has a value of `true`), its logo will
 * automatically reflect the user's access to the product.
 */
export const Example = meta.story({
  args: {
    href: "#",
    productId: "consoleCloud",
  },
});

/**
 * When the product menu item is rendered as a child of the `AppSwitcher.ExploreMenuGroup` (or more
 * specifically, when the nearest `HasAccessContext.Provider` has a value of `false`), its logo will
 * automatically reflect the user's lack of access to the product.
 */
export const NoAccess = Example.extend({
  args: {
    productId: "autoResponder",
  },
  parameters: {
    hasAccessContextValue: false,
  },
});
