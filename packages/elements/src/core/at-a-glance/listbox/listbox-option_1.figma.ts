// url=<AT_A_GLANCE_CARD_URL_DEPRECATED>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/at-a-glance/at-a-glance.tsx
// component=AtAGlance.ListboxOption

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "Selectable") {
  const content = (function () {
    const nestedLayer71 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer71.type !== "ERROR"
          ? nestedLayer71.getBoolean("Show icon", {
              true: nestedLayer71.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer71.type !== "ERROR"
          ? nestedLayer71.getBoolean("Show description", {
              true: nestedLayer71.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer71.type !== "ERROR" ? nestedLayer71.getString("Label") : undefined,
      layout:
        nestedLayer71.type !== "ERROR"
          ? nestedLayer71.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer71.type !== "ERROR" ? nestedLayer71.getString("Value") : undefined,
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
    const nestedLayer73 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer73.type !== "ERROR"
          ? nestedLayer73.getBoolean("Show icon", {
              true: nestedLayer73.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer73.type !== "ERROR"
          ? nestedLayer73.getBoolean("Show description", {
              true: nestedLayer73.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer73.type !== "ERROR" ? nestedLayer73.getString("Label") : undefined,
      layout:
        nestedLayer73.type !== "ERROR"
          ? nestedLayer73.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer73.type !== "ERROR" ? nestedLayer73.getString("Value") : undefined,
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
    const nestedLayer75 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer75.type !== "ERROR"
          ? nestedLayer75.getBoolean("Show icon", {
              true: nestedLayer75.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer75.type !== "ERROR"
          ? nestedLayer75.getBoolean("Show description", {
              true: nestedLayer75.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer75.type !== "ERROR" ? nestedLayer75.getString("Label") : undefined,
      layout:
        nestedLayer75.type !== "ERROR"
          ? nestedLayer75.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer75.type !== "ERROR" ? nestedLayer75.getString("Value") : undefined,
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
    const nestedLayer75 = figma.selectedInstance.findInstance("AAG card content");
    return {
      icon:
        nestedLayer75.type !== "ERROR"
          ? nestedLayer75.getBoolean("Show icon", {
              true: nestedLayer75.getInstanceSwap("Icon")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      description:
        nestedLayer75.type !== "ERROR"
          ? nestedLayer75.getBoolean("Show description", {
              true: nestedLayer75.getString("Description"),
              false: undefined,
            })
          : undefined,
      label: nestedLayer75.type !== "ERROR" ? nestedLayer75.getString("Label") : undefined,
      layout:
        nestedLayer75.type !== "ERROR"
          ? nestedLayer75.getEnum("Layout", {
              Vertical: "vertical",
              Horizontal: "horizontal",
              Compact: "compact",
            })
          : undefined,
      displayValue: nestedLayer75.type !== "ERROR" ? nestedLayer75.getString("Value") : undefined,
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
