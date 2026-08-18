// url=<AT_A_GLANCE_CARD_URL>
// component=AtAGlance.ArticleCard

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "Simple") {
  const content = (function () {
    const nestedLayer3 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer3.type !== "ERROR"
          ? nestedLayer3.getBoolean("Show icon", {
              true: nestedLayer3.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer3.type !== "ERROR"
          ? nestedLayer3.getBoolean("Show description", {
              true: nestedLayer3.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer3.type !== "ERROR" ? nestedLayer3.getString("Label") : undefined,
      layout:
        nestedLayer3.type !== "ERROR"
          ? nestedLayer3.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer3.type !== "ERROR" ? nestedLayer3.getString("Value") : undefined,
    };
  })();

  template = {
    id: "AtAGlance.ArticleCard",
    imports: ["import { AtAGlance } from '@reapit/elements/core/at-a-glance';"],
    example: figma.code`<AtAGlance.GridItem>
      <AtAGlance.ArticleCard${figma.helpers.react.renderProp(
        "icon",
        content.icon,
      )}${figma.helpers.react.renderProp(
        "description",
        content.description,
      )}${figma.helpers.react.renderProp(
        "displayValue",
        content.displayValue,
      )}${figma.helpers.react.renderProp(
        "label",
        content.label,
      )}${figma.helpers.react.renderProp("layout", content.layout)}/>
    </AtAGlance.GridItem>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Variant") === "With link") {
  const content = (function () {
    const nestedLayer5 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer5.type !== "ERROR"
          ? nestedLayer5.getBoolean("Show icon", {
              true: nestedLayer5.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer5.type !== "ERROR"
          ? nestedLayer5.getBoolean("Show description", {
              true: nestedLayer5.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer5.type !== "ERROR" ? nestedLayer5.getString("Label") : undefined,
      layout:
        nestedLayer5.type !== "ERROR"
          ? nestedLayer5.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer5.type !== "ERROR" ? nestedLayer5.getString("Value") : undefined,
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
    const nestedLayer5 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer5.type !== "ERROR"
          ? nestedLayer5.getBoolean("Show icon", {
              true: nestedLayer5.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer5.type !== "ERROR"
          ? nestedLayer5.getBoolean("Show description", {
              true: nestedLayer5.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer5.type !== "ERROR" ? nestedLayer5.getString("Label") : undefined,
      layout:
        nestedLayer5.type !== "ERROR"
          ? nestedLayer5.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer5.type !== "ERROR" ? nestedLayer5.getString("Value") : undefined,
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
