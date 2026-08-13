// url=<AVATAR_GROUP_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/avatar-group/avatar-group.tsx
// component=AvatarGroup

import figma from "figma";

// NOTE: the source Figma file drives the overflow avatar with a "Show overflow" boolean, purely for demo
// purposes. In code, a consumer renders `AvatarGroup.OverflowItem` explicitly alongside the other children,
// so that boolean has no direct code equivalent and is intentionally unmapped.
const children = (function () {
  const slot = figma.properties.slot("Content slot");
  return slot
    ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
    : [];
})();

export default {
  id: "AvatarGroup",
  imports: ['import { AvatarGroup } from "@reapit/elements/core/avatar-group";'],
  example: figma.code`<AvatarGroup>
      {/* NOTE: use AvatarGroup.Item instead of Avatar. AvatarGroup.Item's size is pinned by the group. */}
      ${figma.helpers.react.renderChildren(children)}
    </AvatarGroup>`,
  metadata: { nestable: true },
};
