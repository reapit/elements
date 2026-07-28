import figma from "@figma/code-connect";

import { SectionMessage } from "./section-message";

figma.connect(SectionMessage, "<SECTION_MESSAGE_URL>", {
  props: {
    actions: figma.boolean("Show actions", {
      true: figma.children("Button group"),
      false: undefined,
    }),
    children: figma.string("Description"),
    icon: figma.boolean("Show icon", {
      true: figma.instance("Icon"),
      false: undefined,
    }),
    onDismiss: figma.boolean("Dismissible", {
      true: () => {
        // TOOD: Handle dismiss
      },
      false: undefined,
    }),
    title: figma.string("Title"),
    variant: figma.enum("Variant", {
      Error: "error",
      Warning: "warning",
      Info: "info",
      Success: "success",
      "Neutral light": "neutral-light",
      "Neutral dark": "neutral-dark",
    }),
  },
  example: (props) => (
    <SectionMessage
      actions={props.actions}
      icon={props.icon}
      onDismiss={props.onDismiss}
      title={props.title}
      variant={props.variant}
    >
      {props.children}
    </SectionMessage>
  ),
});

//
// Deprecated Figma components support
//

figma.connect(SectionMessage, "<SECTION_MESSAGE_URL_DEPRECATED_20260709>", {
  props: {
    actions: figma.boolean("Show actions", {
      true: figma.children("[deprecated] Button group"),
      false: undefined,
    }),
    children: figma.string("Description"),
    icon: figma.boolean("Show icon", {
      true: figma.instance("Icon"),
      false: undefined,
    }),
    onDismiss: figma.boolean("Dismissible", {
      true: () => {
        // TOOD: Handle dismiss
      },
      false: undefined,
    }),
    title: figma.string("Title"),
    variant: figma.enum("Variant", {
      Error: "error",
      Warning: "warning",
      Info: "info",
      Success: "success",
      "Neutral light": "neutral-light",
      "Neutral dark": "neutral-dark",
    }),
  },
  example: (props) => (
    <SectionMessage
      actions={props.actions}
      icon={props.icon}
      onDismiss={props.onDismiss}
      title={props.title}
      variant={props.variant}
    >
      {props.children}
    </SectionMessage>
  ),
});
