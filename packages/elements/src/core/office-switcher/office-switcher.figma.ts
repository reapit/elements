// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=14949-11979&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/office-switcher/office-switcher.tsx
// component=OfficeSwitcher

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "Simple") {
  const children = figma.selectedInstance.getString("Office name");

  template = {
    id: "OfficeSwitcher",
    imports: ['import { OfficeSwitcher } from "@reapit/elements/core/office-switcher";'],
    example: figma.code`<OfficeSwitcher>${figma.helpers.react.renderChildren(
      children,
    )}</OfficeSwitcher>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Variant") === "With selector") {
  const popup = figma.properties.children(["Office switcher popover"]);

  template = {
    id: "OfficeSwitcher",
    imports: ['import { OfficeSwitcher } from "@reapit/elements/core/office-switcher";'],
    example: figma.code`<OfficeSwitcher>
      <OfficeSwitcher.Select>
        <OfficeSwitcher.Button />
        ${figma.helpers.react.renderChildren(popup)}
      </OfficeSwitcher.Select>
    </OfficeSwitcher>`,
    metadata: { nestable: true },
  };
} else {
  const popup = figma.properties.children(["Office switcher popover"]);

  template = {
    id: "OfficeSwitcher",
    imports: ['import { OfficeSwitcher } from "@reapit/elements/core/office-switcher";'],
    example: figma.code`<OfficeSwitcher>
      <OfficeSwitcher.Select>
        <OfficeSwitcher.Button />
        ${figma.helpers.react.renderChildren(popup)}
      </OfficeSwitcher.Select>
    </OfficeSwitcher>`,
    metadata: { nestable: true },
  };
}

export default template;
