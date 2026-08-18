import preview from "#.storybook/preview";

import { Button } from "../core/button";
import { DeprecatedElementsThemeProvider } from "./deprecated-theme-provider";

const meta = preview.meta({
  title: "Deprecated/DeprecatedTheming",
});

export default meta;

export const DeprecatedThemingProvider = meta.story({
  render: () => (
    <DeprecatedElementsThemeProvider
      theme={{
        intentPrimary: "#ffa000",
        intentPrimaryDark: "#ad6c00",
        fontSizeSmall: "0.875rem",
      }}
    >
      <Button variant="primary">Button Text</Button>
    </DeprecatedElementsThemeProvider>
  ),
});
