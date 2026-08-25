// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=14949-11030&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/office-switcher/office-switcher.tsx
// component=OfficeSwitcher.Option

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "Office") {
  const item = (function () {
    const nestedLayer35 = figma.selectedInstance.findInstance("Office item");
    return {
      label: nestedLayer35.type !== "ERROR" ? nestedLayer35.getString("Office label") : undefined,
      badge:
        nestedLayer35.type !== "ERROR"
          ? nestedLayer35.getBoolean("Show Badge", {
              true: (function () {
                const badge = nestedLayer35.findInstance("Badge");
                return badge.type !== "ERROR" ? badge.executeTemplate().example : undefined;
              })(),
              false: undefined,
            })
          : undefined,
    };
  })();

  template = {
    id: "OfficeSwitcher.Option",
    imports: ['import { OfficeSwitcher } from "@reapit/elements/core/office-switcher";'],
    example: figma.code`<OfficeSwitcher.Option${figma.helpers.react.renderProp(
      "badge",
      item.badge,
    )} value="<REPLACE_ME>">
      ${figma.helpers.react.renderChildren(item.label)}
    </OfficeSwitcher.Option>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Variant") === "Office group") {
  const group = (function () {
    const nestedLayer36 = figma.selectedInstance.findInstance("Office group header");
    return {
      label:
        nestedLayer36.type !== "ERROR" ? nestedLayer36.getString("Office group name") : undefined,
    };
  })();
  const children = figma.selectedInstance.getBoolean("Expanded", {
    true: figma.properties.children(["Office item *"]),
    false: "TODO: Add options",
  });

  template = {
    id: "OfficeSwitcher.Optgroup",
    imports: ['import { OfficeSwitcher } from "@reapit/elements/core/office-switcher";'],
    example: figma.code`<OfficeSwitcher.Optgroup${figma.helpers.react.renderProp(
      "label",
      group.label,
    )}>${figma.helpers.react.renderChildren(children)}</OfficeSwitcher.Optgroup>`,
    metadata: { nestable: true },
  };
} else {
  const group = (function () {
    const nestedLayer36 = figma.selectedInstance.findInstance("Office group header");
    return {
      label:
        nestedLayer36.type !== "ERROR" ? nestedLayer36.getString("Office group name") : undefined,
    };
  })();
  const children = figma.selectedInstance.getBoolean("Expanded", {
    true: figma.properties.children(["Office item *"]),
    false: "TODO: Add options",
  });

  template = {
    id: "OfficeSwitcher.Optgroup",
    imports: ['import { OfficeSwitcher } from "@reapit/elements/core/office-switcher";'],
    example: figma.code`<OfficeSwitcher.Optgroup${figma.helpers.react.renderProp(
      "label",
      group.label,
    )}>${figma.helpers.react.renderChildren(children)}</OfficeSwitcher.Optgroup>`,
    metadata: { nestable: true },
  };
}

export default template;
