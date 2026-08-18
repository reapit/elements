// url=<CHIP_SELECT_OPTION_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/chip-select/chip-select.tsx
// component=ChipSelect.Option

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Show label") === true) {
  const defaultChecked = figma.selectedInstance.getBoolean("Selected");
  const children = figma.selectedInstance.getString("Label");
  const disabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  });
  const icon = figma.selectedInstance.getInstanceSwap("Icon")?.executeTemplate().example;

  template = {
    id: "ChipSelect.Option",
    imports: ['import { ChipSelect } from "@reapit/elements/core/chip-select";'],
    example: figma.code`<ChipSelect.Option${figma.helpers.react.renderProp(
      "defaultChecked",
      defaultChecked,
    )}${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}${figma.helpers.react.renderProp("icon", icon)} value="change-me">
      ${figma.helpers.react.renderChildren(children)}
    </ChipSelect.Option>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Show label") === false) {
  const defaultChecked = figma.selectedInstance.getBoolean("Selected");
  const disabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  });
  const icon = figma.selectedInstance.getInstanceSwap("Icon")?.executeTemplate().example;

  template = {
    id: "ChipSelect.Option",
    imports: ['import { ChipSelect } from "@reapit/elements/core/chip-select";'],
    example: figma.code`<ChipSelect.Option${figma.helpers.react.renderProp(
      "defaultChecked",
      defaultChecked,
    )}${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}${figma.helpers.react.renderProp("icon", icon)} value="change-me"/>`,
    metadata: { nestable: true },
  };
} else {
  const defaultChecked = figma.selectedInstance.getBoolean("Selected");
  const disabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  });
  const icon = figma.selectedInstance.getInstanceSwap("Icon")?.executeTemplate().example;

  template = {
    id: "ChipSelect.Option",
    imports: ['import { ChipSelect } from "@reapit/elements/core/chip-select";'],
    example: figma.code`<ChipSelect.Option${figma.helpers.react.renderProp(
      "defaultChecked",
      defaultChecked,
    )}${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}${figma.helpers.react.renderProp("icon", icon)} value="change-me"/>`,
    metadata: { nestable: true },
  };
}

export default template;
