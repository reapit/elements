import figma from "@figma/code-connect";

import { DescriptionList } from "../description-list";

figma.connect(DescriptionList.Item, "<DESCRIPTION_LIST_ITEM_STACKED_URL>", {
  props: {
    description: "TODO: add description content",
    label: figma.nestedProps("List item", {
      value: figma.string("Label"),
    }),
    size: figma.enum("Size", {
      base: "base",
      sm: "sm",
    }),
  },
  example: (props) => (
    <DescriptionList.Item
      label={props.label.value}
      // TODO: Apply this size to the DescriptionList's size prop instead of each individual item
      size={props.size}
    >
      {props.description}
    </DescriptionList.Item>
  ),
});

figma.connect(DescriptionList.Item, "<DESCRIPTION_LIST_ITEM_INLINE_URL>", {
  props: {
    description: "TODO: add description content",
    label: figma.nestedProps("List item", {
      value: figma.string("Label"),
    }),
    size: figma.enum("Size", {
      base: "base",
      sm: "sm",
    }),
  },
  example: (props) => (
    <DescriptionList.Item
      label={props.label.value}
      // TODO: Apply this size to the DescriptionList's size prop instead of each individual item
      size={props.size}
    >
      {props.description}
    </DescriptionList.Item>
  ),
});
