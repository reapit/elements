import figma from "@figma/code-connect";

import { CompactSelectNative } from "./compact-select-native";

figma.connect(CompactSelectNative, "<COMPACT_SELECT_NATIVE_URL>", {
  props: {
    size: figma.enum("Size", {
      Small: "small",
      Medium: "medium",
      Large: "large",
    }),
    selectionLabel: figma.string("Selection label"),
  },
  example: (props) => (
    <CompactSelectNative aria-label="change me" size={props.size}>
      <option>{props.selectionLabel}</option>
      {/* TODO: add remaining options */}
    </CompactSelectNative>
  ),
});
