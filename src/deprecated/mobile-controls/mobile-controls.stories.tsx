import preview from "#.storybook/preview";

import { MobileControls } from "./index";

const meta = preview.meta({
  title: "Deprecated/MobileControls",
  component: MobileControls,
});

export default meta;

export const BasicUsage = meta.story({
  render: () => (
    <MobileControls
      isVisible
      mobileControlItems={[
        {
          label: "Item One",
          onClick: () => console.log("Clicked Item One"),
        },
        {
          label: "Item Two",
          onClick: () => console.log("Clicked Item Two"),
        },
        {
          label: "Item Three",
          onClick: () => console.log("Clicked Item Three"),
        },
      ]}
    />
  ),
});
