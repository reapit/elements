// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=18327-21770&m=dev
// component=AtAGlance.AnchorCard

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "With link") {
  const content = (function () {
    const nestedLayer0 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer0.type !== "ERROR"
          ? nestedLayer0.getBoolean("Show icon", {
              true: nestedLayer0.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer0.type !== "ERROR"
          ? nestedLayer0.getBoolean("Show description", {
              true: nestedLayer0.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer0.type !== "ERROR" ? nestedLayer0.getString("Label") : undefined,
      layout:
        nestedLayer0.type !== "ERROR"
          ? nestedLayer0.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer0.type !== "ERROR" ? nestedLayer0.getString("Value") : undefined,
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
    const nestedLayer0 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer0.type !== "ERROR"
          ? nestedLayer0.getBoolean("Show icon", {
              true: nestedLayer0.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer0.type !== "ERROR"
          ? nestedLayer0.getBoolean("Show description", {
              true: nestedLayer0.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer0.type !== "ERROR" ? nestedLayer0.getString("Label") : undefined,
      layout:
        nestedLayer0.type !== "ERROR"
          ? nestedLayer0.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer0.type !== "ERROR" ? nestedLayer0.getString("Value") : undefined,
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
