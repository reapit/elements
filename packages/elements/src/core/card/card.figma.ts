// url=<CARD_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/card/card.tsx
// component=Card

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "Simple") {
  const nested = (function () {
    const nestedLayer62 = figma.selectedInstance.findInstance("Basic card");
    return {
      isBorderless:
        nestedLayer62.type !== "ERROR" ? nestedLayer62.getBoolean("↳ Borderless") : undefined,
    };
  })();

  template = {
    id: "Card",
    imports: ['import { Card } from "@reapit/elements/core/card";'],
    example: figma.code`<Card${figma.helpers.react.renderProp(
      "isBorderless",
      nested.isBorderless,
    )}>Content</Card>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Variant") === "Interactive") {
  template = {
    id: "ButtonCard",
    imports: ['import { ButtonCard } from "@reapit/elements/core/card";'],
    example: figma.code`// NOTE: Use AnchorCard when the card needs to navigate to a URL
<ButtonCard>Content</ButtonCard>`,
  };
} else {
  template = {
    id: "ButtonCard",
    imports: ['import { ButtonCard } from "@reapit/elements/core/card";'],
    example: figma.code`// NOTE: Use AnchorCard when the card needs to navigate to a URL
<ButtonCard>Content</ButtonCard>`,
  };
}

export default template;
