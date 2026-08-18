import type { Decorator } from "@storybook/react-vite";

import preview from "#.storybook/preview";

import { AppSwitcher } from "../app-switcher";

const useParentDecorator: Decorator = (Story) => {
  return (
    <div style={{ boxSizing: "content-box", border: "1px solid #FA00FF" }}>
      <Story />
    </div>
  );
};

const meta = preview.meta({
  title: "Navigation/AppSwitcher/YourAppsMenuGroup",
  component: AppSwitcher.YourAppsMenuGroup,
  argTypes: {
    children: {
      control: false,
    },
  },
  decorators: [useParentDecorator],
});

/**
 * `YourAppsMenuGroup` wraps its children in a context that signals the current user has access to the products
 * in this group. Consumers of `AppSwitcherProductMenuItem` (from `@reapit/elements/core/app-switcher/anz`) read
 * this context to determine which avatar style to display.
 */
export const Default = meta.story({
  args: {
    children: null,
  },
  render: () => {
    return (
      <AppSwitcher.YourAppsMenuGroup>
        <AppSwitcher.MenuItem
          appName="App name"
          avatar={
            <div
              aria-hidden
              style={{ background: "currentColor", borderRadius: 4, height: 32, width: 32 }}
            />
          }
          supplementaryInfo="Supplementary info"
          href="#"
        />
      </AppSwitcher.YourAppsMenuGroup>
    );
  },
});
