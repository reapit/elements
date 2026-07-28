import { figma } from "@figma/code-connect";

import { Toast } from "./toast";

figma.connect(Toast, "<TOAST_URL>", {
  props: {
    icon: figma.enum("Variant", {
      Success: undefined,
      Error: undefined,
      Warning: undefined,
      Info: undefined,
      Neutral: figma.instance("Icon"),
    }),
    message: figma.string("Message"),
    variant: figma.enum("Variant", {
      Success: "success",
      Error: "error",
      Warning: "warning",
      Info: "info",
      Neutral: "neutral",
    }),
  },
  example: ({ icon, message, variant }) => (
    // NOTE: Use `toast` from `@reapit/elements/core/toaster` to imperatively show toasts. This `Toast`
    // component is presentational only and will render within the document flow. See the `Toaster`
    // component for more details.
    //
    // Also, duration should be 4s for single-line messages, and 6s for multi-line messages.
    <Toast duration={4000} icon={icon} variant={variant}>
      {message}
    </Toast>
  ),
});
