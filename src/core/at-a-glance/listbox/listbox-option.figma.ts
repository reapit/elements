// url=<AT_A_GLANCE_CARD_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/at-a-glance/at-a-glance.tsx
// component=AtAGlance.ListboxOption

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "Selectable") {
  const content = (function () {
    const nestedLayer70 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer70.type !== "ERROR"
          ? nestedLayer70.getBoolean("Show icon", {
              true: nestedLayer70.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer70.type !== "ERROR"
          ? nestedLayer70.getBoolean("Show description", {
              true: nestedLayer70.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer70.type !== "ERROR" ? nestedLayer70.getString("Label") : undefined,
      layout:
        nestedLayer70.type !== "ERROR"
          ? nestedLayer70.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer70.type !== "ERROR" ? nestedLayer70.getString("Value") : undefined,
    };
  })();

  template = {
    id: "AtAGlance.ListboxOption",
    imports: ['import { AtAGlance } from "@reapit/elements/core/at-a-glance";'],
    example: figma.code`// Must be a child of AtAGlance.Listbox
<AtAGlance.ListboxOption${figma.helpers.react.renderProp(
      "icon",
      content.icon,
    )}${figma.helpers.react.renderProp(
      "description",
      content.description,
    )}${figma.helpers.react.renderProp(
      "displayValue",
      content.displayValue,
    )}${figma.helpers.react.renderProp("label", content.label)}${figma.helpers.react.renderProp(
      "layout",
      content.layout,
    )} value="<REPLACE ME>"/>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Variant") === "Simple") {
  const content = (function () {
    const nestedLayer72 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer72.type !== "ERROR"
          ? nestedLayer72.getBoolean("Show icon", {
              true: nestedLayer72.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer72.type !== "ERROR"
          ? nestedLayer72.getBoolean("Show description", {
              true: nestedLayer72.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer72.type !== "ERROR" ? nestedLayer72.getString("Label") : undefined,
      layout:
        nestedLayer72.type !== "ERROR"
          ? nestedLayer72.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer72.type !== "ERROR" ? nestedLayer72.getString("Value") : undefined,
    };
  })();

  template = {
    id: "AtAGlance.ArticleCard",
    imports: ['import { AtAGlance } from "@reapit/elements/core/at-a-glance";'],
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
    const nestedLayer74 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer74.type !== "ERROR"
          ? nestedLayer74.getBoolean("Show icon", {
              true: nestedLayer74.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer74.type !== "ERROR"
          ? nestedLayer74.getBoolean("Show description", {
              true: nestedLayer74.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer74.type !== "ERROR" ? nestedLayer74.getString("Label") : undefined,
      layout:
        nestedLayer74.type !== "ERROR"
          ? nestedLayer74.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer74.type !== "ERROR" ? nestedLayer74.getString("Value") : undefined,
    };
  })();

  template = {
    id: "AtAGlance.AnchorCard",
    imports: ['import { AtAGlance } from "@reapit/elements/core/at-a-glance";'],
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
    const nestedLayer74 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer74.type !== "ERROR"
          ? nestedLayer74.getBoolean("Show icon", {
              true: nestedLayer74.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer74.type !== "ERROR"
          ? nestedLayer74.getBoolean("Show description", {
              true: nestedLayer74.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer74.type !== "ERROR" ? nestedLayer74.getString("Label") : undefined,
      layout:
        nestedLayer74.type !== "ERROR"
          ? nestedLayer74.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer74.type !== "ERROR" ? nestedLayer74.getString("Value") : undefined,
    };
  })();

  template = {
    id: "AtAGlance.AnchorCard",
    imports: ['import { AtAGlance } from "@reapit/elements/core/at-a-glance";'],
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
