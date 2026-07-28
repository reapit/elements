import figma from "@figma/code-connect";

import { EmptyState } from "./empty-state";

figma.connect(EmptyState, "<EMPTY_STATE_URL>", {
  props: {
    actions: figma.boolean("Show actions", {
      true: figma.children("Button group"),
      false: undefined,
    }),
    background: figma.enum("Background", {
      White: "white",
      Grey: "neutral-lightest",
      Transparent: "transparent",
    }),
    illustration: figma.boolean("Show illustration", {
      true: figma.slot("↳ Illustration slot").connectedInstances,
      false: undefined,
    }),
    secondaryText: figma.boolean("Show description", {
      true: figma.string("↳ Description"),
      false: undefined,
    }),
    size: figma.enum("Size", {
      Large: "large",
      Small: "small",
    }),
    title: figma.boolean("Show title", {
      true: figma.string("↳ Title"),
      false: undefined,
    }),
  },
  example: (props) => (
    <EmptyState background={props.background} size={props.size}>
      {props.illustration}
      <EmptyState.Description secondaryText={props.secondaryText}>
        {props.title}
      </EmptyState.Description>
      {props.actions}
    </EmptyState>
  ),
});

figma.connect(EmptyState, "<EMPTY_STATE_URL>", {
  variant: { "Show title": false, "Show description": false },
  props: {
    actions: figma.boolean("Show actions", {
      true: figma.children("Button group"),
      false: undefined,
    }),
    background: figma.enum("Background", {
      White: "white",
      Grey: "neutral-lightest",
      Transparent: "transparent",
    }),
    illustration: figma.boolean("Show illustration", {
      true: figma.slot("↳ Illustration slot").connectedInstances,
      false: undefined,
    }),
    size: figma.enum("Size", {
      Large: "large",
      Small: "small",
    }),
  },
  example: (props) => (
    <EmptyState background={props.background} size={props.size}>
      {props.illustration}
      {props.actions}
    </EmptyState>
  ),
});
