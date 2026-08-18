// url=<TABLE_PRIMARY_DATA_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/table/table.tsx
// component=Table.PrimaryData

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Data") === "Alphanumeric") {
  const iconLeft = (function () {
    const nestedLayer14 = figma.selectedInstance.findInstance("Icon L");
    return {
      icon:
        nestedLayer14.type !== "ERROR"
          ? nestedLayer14.getInstanceSwap("Icon")?.executeTemplate().example
          : undefined,
    };
  })();
  const iconRight = (function () {
    const nestedLayer15 = figma.selectedInstance.findInstance("Icon R");
    return {
      icon:
        nestedLayer15.type !== "ERROR"
          ? nestedLayer15.getInstanceSwap("Icon")?.executeTemplate().example
          : undefined,
    };
  })();
  const data = (function () {
    const nestedLayer16 = figma.selectedInstance.findInstance("Alphanumeric value");
    return {
      children:
        nestedLayer16.type !== "ERROR" ? nestedLayer16.findText("Value").__render__() : undefined,
    };
  })();

  template = {
    id: "Table.PrimaryData",
    imports: ['import { Table } from "@reapit/elements/core/table";'],
    example: figma.code`<Table.PrimaryData${figma.helpers.react.renderProp(
      "iconLeft",
      iconLeft.icon,
    )}${figma.helpers.react.renderProp("iconRight", iconRight.icon)}>
      ${figma.helpers.react.renderChildren(data.children)}
    </Table.PrimaryData>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Data") === "Date and Time") {
  const iconLeft = (function () {
    const nestedLayer17 = figma.selectedInstance.findInstance("Icon L");
    return {
      icon:
        nestedLayer17.type !== "ERROR"
          ? nestedLayer17.getInstanceSwap("Icon")?.executeTemplate().example
          : undefined,
    };
  })();
  const iconRight = (function () {
    const nestedLayer18 = figma.selectedInstance.findInstance("Icon R");
    return {
      icon:
        nestedLayer18.type !== "ERROR"
          ? nestedLayer18.getInstanceSwap("Icon")?.executeTemplate().example
          : undefined,
    };
  })();
  const date = (function () {
    const nestedLayer19 = figma.selectedInstance.findInstance("Date");
    return {
      value:
        nestedLayer19.type !== "ERROR" ? nestedLayer19.findText("Value").__render__() : undefined,
    };
  })();
  const comma = (function () {
    const nestedLayer20 = figma.selectedInstance.findInstance("Comma");
    return {
      value:
        nestedLayer20.type !== "ERROR" ? nestedLayer20.findText("Value").__render__() : undefined,
    };
  })();
  const time = (function () {
    const nestedLayer21 = figma.selectedInstance.findInstance("Time");
    return {
      value:
        nestedLayer21.type !== "ERROR" ? nestedLayer21.findText("Value").__render__() : undefined,
    };
  })();

  template = {
    id: "Table.PrimaryData",
    imports: ['import { Table } from "@reapit/elements/core/table";'],
    example: figma.code`<Table.PrimaryData${figma.helpers.react.renderProp(
      "iconLeft",
      iconLeft.icon,
    )}${figma.helpers.react.renderProp("iconRight", iconRight.icon)}>
      ${figma.helpers.react.renderChildren(date.value)}
      ${figma.helpers.react.renderChildren(comma.value)}
      ${figma.helpers.react.renderChildren(time.value)}
    </Table.PrimaryData>`,
    metadata: { nestable: true },
  };
} else {
  const iconLeft = (function () {
    const nestedLayer17 = figma.selectedInstance.findInstance("Icon L");
    return {
      icon:
        nestedLayer17.type !== "ERROR"
          ? nestedLayer17.getInstanceSwap("Icon")?.executeTemplate().example
          : undefined,
    };
  })();
  const iconRight = (function () {
    const nestedLayer18 = figma.selectedInstance.findInstance("Icon R");
    return {
      icon:
        nestedLayer18.type !== "ERROR"
          ? nestedLayer18.getInstanceSwap("Icon")?.executeTemplate().example
          : undefined,
    };
  })();
  const date = (function () {
    const nestedLayer19 = figma.selectedInstance.findInstance("Date");
    return {
      value:
        nestedLayer19.type !== "ERROR" ? nestedLayer19.findText("Value").__render__() : undefined,
    };
  })();
  const comma = (function () {
    const nestedLayer20 = figma.selectedInstance.findInstance("Comma");
    return {
      value:
        nestedLayer20.type !== "ERROR" ? nestedLayer20.findText("Value").__render__() : undefined,
    };
  })();
  const time = (function () {
    const nestedLayer21 = figma.selectedInstance.findInstance("Time");
    return {
      value:
        nestedLayer21.type !== "ERROR" ? nestedLayer21.findText("Value").__render__() : undefined,
    };
  })();

  template = {
    id: "Table.PrimaryData",
    imports: ['import { Table } from "@reapit/elements/core/table";'],
    example: figma.code`<Table.PrimaryData${figma.helpers.react.renderProp(
      "iconLeft",
      iconLeft.icon,
    )}${figma.helpers.react.renderProp("iconRight", iconRight.icon)}>
      ${figma.helpers.react.renderChildren(date.value)}
      ${figma.helpers.react.renderChildren(comma.value)}
      ${figma.helpers.react.renderChildren(time.value)}
    </Table.PrimaryData>`,
    metadata: { nestable: true },
  };
}

export default template;
