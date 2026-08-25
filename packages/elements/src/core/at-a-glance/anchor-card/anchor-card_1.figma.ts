// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=15854-47008&m=dev
// component=AtAGlance.AnchorCard

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "With link") {
  const content = (function () {
    const nestedLayer1 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer1.type !== "ERROR"
          ? nestedLayer1.getBoolean("Show icon", {
              true: nestedLayer1.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer1.type !== "ERROR"
          ? nestedLayer1.getBoolean("Show description", {
              true: nestedLayer1.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer1.type !== "ERROR" ? nestedLayer1.getString("Label") : undefined,
      layout:
        nestedLayer1.type !== "ERROR"
          ? nestedLayer1.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer1.type !== "ERROR" ? nestedLayer1.getString("Value") : undefined,
    };
  })();

  template = {
    id: "AtAGlance.AnchorCard",
    imports: ["import { AtAGlance } from '@reapit/elements/core/at-a-glance';"],
    example: figma.code`<AtAGlance.GridItem>
      <AtAGlance.AnchorCard href="<REPLACE ME>"${figma.helpers.react.renderProp(
        "icon",
        content.icon,
      )}${figma.helpers.react.renderProp(
        "description",
        content.description,
      )}${figma.helpers.react.renderProp("label", content.label)}${figma.helpers.react.renderProp(
        "layout",
        content.layout,
      )}${figma.helpers.react.renderProp("displayValue", content.displayValue)}/>
    </AtAGlance.GridItem>`,
    metadata: { nestable: true },
  };
} else {
  const content = (function () {
    const nestedLayer1 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer1.type !== "ERROR"
          ? nestedLayer1.getBoolean("Show icon", {
              true: nestedLayer1.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer1.type !== "ERROR"
          ? nestedLayer1.getBoolean("Show description", {
              true: nestedLayer1.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer1.type !== "ERROR" ? nestedLayer1.getString("Label") : undefined,
      layout:
        nestedLayer1.type !== "ERROR"
          ? nestedLayer1.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer1.type !== "ERROR" ? nestedLayer1.getString("Value") : undefined,
    };
  })();

  template = {
    id: "AtAGlance.AnchorCard",
    imports: ["import { AtAGlance } from '@reapit/elements/core/at-a-glance';"],
    example: figma.code`<AtAGlance.GridItem>
      <AtAGlance.AnchorCard href="<REPLACE ME>"${figma.helpers.react.renderProp(
        "icon",
        content.icon,
      )}${figma.helpers.react.renderProp(
        "description",
        content.description,
      )}${figma.helpers.react.renderProp("label", content.label)}${figma.helpers.react.renderProp(
        "layout",
        content.layout,
      )}${figma.helpers.react.renderProp("displayValue", content.displayValue)}/>
    </AtAGlance.GridItem>`,
    metadata: { nestable: true },
  };
}

export default template;
