// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=15854-47008&m=dev
// component=AtAGlance.ArticleCard

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "Simple") {
  const content = (function () {
    const nestedLayer4 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer4.type !== "ERROR"
          ? nestedLayer4.getBoolean("Show icon", {
              true: nestedLayer4.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer4.type !== "ERROR"
          ? nestedLayer4.getBoolean("Show description", {
              true: nestedLayer4.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer4.type !== "ERROR" ? nestedLayer4.getString("Label") : undefined,
      layout:
        nestedLayer4.type !== "ERROR"
          ? nestedLayer4.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer4.type !== "ERROR" ? nestedLayer4.getString("Value") : undefined,
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
    const nestedLayer6 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer6.type !== "ERROR"
          ? nestedLayer6.getBoolean("Show icon", {
              true: nestedLayer6.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer6.type !== "ERROR"
          ? nestedLayer6.getBoolean("Show description", {
              true: nestedLayer6.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer6.type !== "ERROR" ? nestedLayer6.getString("Label") : undefined,
      layout:
        nestedLayer6.type !== "ERROR"
          ? nestedLayer6.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer6.type !== "ERROR" ? nestedLayer6.getString("Value") : undefined,
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
    const nestedLayer6 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer6.type !== "ERROR"
          ? nestedLayer6.getBoolean("Show icon", {
              true: nestedLayer6.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer6.type !== "ERROR"
          ? nestedLayer6.getBoolean("Show description", {
              true: nestedLayer6.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer6.type !== "ERROR" ? nestedLayer6.getString("Label") : undefined,
      layout:
        nestedLayer6.type !== "ERROR"
          ? nestedLayer6.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer6.type !== "ERROR" ? nestedLayer6.getString("Value") : undefined,
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
