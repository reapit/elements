// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=14083-70317&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/compact-select-native/compact-select-native.tsx
// component=CompactSelectNative

import figma from "figma";

const size = figma.selectedInstance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});
const selectionLabel = figma.selectedInstance.getString("Selection label");

export default {
  id: "CompactSelectNative",
  imports: ['import { CompactSelectNative } from "@reapit/elements/core/compact-select-native";'],
  example: figma.code`<CompactSelectNative aria-label="change me"${figma.helpers.react.renderProp(
    "size",
    size,
  )}>
      <option>${figma.helpers.react.renderChildren(selectionLabel)}</option>
      {/* TODO: add remaining options */}
    </CompactSelectNative>`,
  metadata: { nestable: true },
};
