// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=14949-11030&m=dev
// component=OfficeSwitcher.Optgroup

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "Office group") {
  const group = (function () {
    const nestedLayer2 = figma.selectedInstance.findInstance("Office group header");
    return {
      label:
        nestedLayer2.type !== "ERROR" ? nestedLayer2.getString("Office group name") : undefined,
    };
  })();
  const children = figma.selectedInstance.getBoolean("Expanded", {
    true: figma.properties.children(["Office item *"]),
    false: "TODO: Add options",
  });

  template = {
    id: "OfficeSwitcher.Optgroup",
    imports: ["import { OfficeSwitcher } from '@reapit/elements/core/office-switcher';"],
    example: figma.code`<OfficeSwitcher.Optgroup${figma.helpers.react.renderProp(
      "label",
      group.label,
    )}>${figma.helpers.react.renderChildren(children)}</OfficeSwitcher.Optgroup>`,
    metadata: { nestable: true },
  };
} else {
  const group = (function () {
    const nestedLayer2 = figma.selectedInstance.findInstance("Office group header");
    return {
      label:
        nestedLayer2.type !== "ERROR" ? nestedLayer2.getString("Office group name") : undefined,
    };
  })();
  const children = figma.selectedInstance.getBoolean("Expanded", {
    true: figma.properties.children(["Office item *"]),
    false: "TODO: Add options",
  });

  template = {
    id: "OfficeSwitcher.Optgroup",
    imports: ["import { OfficeSwitcher } from '@reapit/elements/core/office-switcher';"],
    example: figma.code`<OfficeSwitcher.Optgroup${figma.helpers.react.renderProp(
      "label",
      group.label,
    )}>${figma.helpers.react.renderChildren(children)}</OfficeSwitcher.Optgroup>`,
    metadata: { nestable: true },
  };
}

export default template;
