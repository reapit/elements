// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=7051-11054&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/chip/chip.tsx
// component=Chip

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Clearable") === true) {
  const children = figma.selectedInstance.getString("Label");
  const disabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  });
  const variant = figma.selectedInstance.getEnum("Variant", {
    Filter: "filter",
    Selection: "selection",
  });

  template = {
    id: "Chip",
    imports: ['import { Chip } from "@reapit/elements/core/chip";'],
    example: figma.code`<Chip${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}${figma.helpers.react.renderProp(
      "variant",
      variant,
    )}>${figma.helpers.react.renderChildren(children)}</Chip>`,
    metadata: { nestable: true },
  };
} else {
  const children = figma.selectedInstance.getString("Label");
  const disabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  });
  const variant = figma.selectedInstance.getEnum("Variant", {
    Filter: "filter",
    Selection: "selection",
  });

  template = {
    id: "Chip",
    imports: ['import { Chip } from "@reapit/elements/core/chip";'],
    example: figma.code`<Chip${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}${figma.helpers.react.renderProp(
      "variant",
      variant,
    )}>${figma.helpers.react.renderChildren(children)}</Chip>`,
    metadata: { nestable: true },
  };
}

export default template;
