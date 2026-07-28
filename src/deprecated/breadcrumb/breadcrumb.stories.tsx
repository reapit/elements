import preview from "#.storybook/preview";

import { DeprecatedBreadCrumb } from "./index";

const meta = preview.meta({
  title: "Deprecated/DeprecatedBreadCrumb",
  component: DeprecatedBreadCrumb,
});

export default meta;

export const BasicUsage = meta.story({
  render: () => (
    <DeprecatedBreadCrumb
      defaultActiveIndex={3}
      items={[
        {
          text: "Home",
          onClick: () => console.log("Home clicked"),
        },
        {
          text: "Level 1",
          onClick: () => console.log("1 clicked"),
        },
        {
          text: "Level 2",
          onClick: () => console.log("2 clicked"),
        },
        {
          text: "Level 3",
          onClick: () => console.log("3 clicked"),
        },
      ]}
    />
  ),
});

export const DefaultIndex = meta.story({
  render: () => (
    <DeprecatedBreadCrumb
      defaultActiveIndex={3}
      items={[
        {
          text: "Home",
          onClick: () => console.log("Home clicked"),
        },
        {
          text: "Level 1",
          onClick: () => console.log("1 clicked"),
        },
        {
          text: "Level 2",
          onClick: () => console.log("2 clicked"),
        },
        {
          text: "Level 3",
          onClick: () => console.log("3 clicked"),
        },
      ]}
    />
  ),
});
