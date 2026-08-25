// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=118-6272&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/tag-group/tag-group.tsx
// component=TagGroup

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("No of tags") === "1") {
  const tag = (function () {
    const nestedLayer8 = figma.selectedInstance.findInstance("Tag");
    return {
      children: nestedLayer8.type !== "ERROR" ? nestedLayer8.getString("Label text") : undefined,
    };
  })();

  template = {
    id: "TagGroup",
    imports: ['import { TagGroup } from "@reapit/elements/core/tag-group";'],
    example: figma.code`<TagGroup>
      <TagGroup.Item>${figma.helpers.react.renderChildren(tag.children)}</TagGroup.Item>
    </TagGroup>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("No of tags") === "2") {
  const tag1 = (function () {
    const nestedLayer9 = figma.selectedInstance.findInstance("Tag 1");
    return {
      children: nestedLayer9.type !== "ERROR" ? nestedLayer9.getString("Label text") : undefined,
    };
  })();
  const tag2 = (function () {
    const nestedLayer10 = figma.selectedInstance.findInstance("Tag 2");
    return {
      children: nestedLayer10.type !== "ERROR" ? nestedLayer10.getString("Label text") : undefined,
    };
  })();

  template = {
    id: "TagGroup",
    imports: ['import { TagGroup } from "@reapit/elements/core/tag-group"'],
    example: figma.code`<TagGroup>
      <TagGroup.Item>${figma.helpers.react.renderChildren(tag1.children)}</TagGroup.Item>
      <TagGroup.Item>${figma.helpers.react.renderChildren(tag2.children)}</TagGroup.Item>
    </TagGroup>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("No of tags") === "3") {
  const tag1 = (function () {
    const nestedLayer11 = figma.selectedInstance.findInstance("Tag 1");
    return {
      children: nestedLayer11.type !== "ERROR" ? nestedLayer11.getString("Label text") : undefined,
    };
  })();
  const tag2 = (function () {
    const nestedLayer12 = figma.selectedInstance.findInstance("Tag 2");
    return {
      children: nestedLayer12.type !== "ERROR" ? nestedLayer12.getString("Label text") : undefined,
    };
  })();
  const tag3 = (function () {
    const nestedLayer13 = figma.selectedInstance.findInstance("Tag 3");
    return {
      children: nestedLayer13.type !== "ERROR" ? nestedLayer13.getString("Label text") : undefined,
    };
  })();

  template = {
    id: "TagGroup",
    imports: ['import { TagGroup } from "@reapit/elements/core/tag-group"'],
    example: figma.code`<TagGroup>
      <TagGroup.Item>${figma.helpers.react.renderChildren(tag1.children)}</TagGroup.Item>
      <TagGroup.Item>${figma.helpers.react.renderChildren(tag2.children)}</TagGroup.Item>
      <TagGroup.Item>${figma.helpers.react.renderChildren(tag3.children)}</TagGroup.Item>
    </TagGroup>`,
    metadata: { nestable: true },
  };
} else {
  const tag1 = (function () {
    const nestedLayer11 = figma.selectedInstance.findInstance("Tag 1");
    return {
      children: nestedLayer11.type !== "ERROR" ? nestedLayer11.getString("Label text") : undefined,
    };
  })();
  const tag2 = (function () {
    const nestedLayer12 = figma.selectedInstance.findInstance("Tag 2");
    return {
      children: nestedLayer12.type !== "ERROR" ? nestedLayer12.getString("Label text") : undefined,
    };
  })();
  const tag3 = (function () {
    const nestedLayer13 = figma.selectedInstance.findInstance("Tag 3");
    return {
      children: nestedLayer13.type !== "ERROR" ? nestedLayer13.getString("Label text") : undefined,
    };
  })();

  template = {
    id: "TagGroup",
    imports: ['import { TagGroup } from "@reapit/elements/core/tag-group"'],
    example: figma.code`<TagGroup>
      <TagGroup.Item>${figma.helpers.react.renderChildren(tag1.children)}</TagGroup.Item>
      <TagGroup.Item>${figma.helpers.react.renderChildren(tag2.children)}</TagGroup.Item>
      <TagGroup.Item>${figma.helpers.react.renderChildren(tag3.children)}</TagGroup.Item>
    </TagGroup>`,
    metadata: { nestable: true },
  };
}

export default template;
