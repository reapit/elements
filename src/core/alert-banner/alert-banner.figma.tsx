import figma from "@figma/code-connect";

import { AlertBanner } from "./alert-banner";

figma.connect(AlertBanner, "<ALERT_BANNER_URL>", {
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
      true: () => void 0,
      false: undefined,
    }),
    variant: figma.enum("Variant", {
      Warning: "warning",
      Info: "info",
      Error: "error",
    }),
  },
  example: (props) => (
    <AlertBanner
      actions={props.actions}
      icon={props.icon}
      onDismiss={props.onDismiss}
      variant={props.variant}
    >
      {props.children}
    </AlertBanner>
  ),
});

//
// Deprecated Figma component support
//

figma.connect(AlertBanner, "<ALERT_BANNER_URL_DEPRECATED_20260709>", {
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
      true: () => void 0,
      false: undefined,
    }),
    variant: figma.enum("Variant", {
      Warning: "warning",
      Info: "info",
      Error: "error",
    }),
  },
  example: (props) => (
    <AlertBanner
      actions={props.actions}
      icon={props.icon}
      onDismiss={props.onDismiss}
      variant={props.variant}
    >
      {props.children}
    </AlertBanner>
  ),
});
