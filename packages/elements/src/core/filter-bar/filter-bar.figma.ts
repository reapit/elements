// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=20664-19045&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/filter-bar/filter-bar.tsx
// component=FilterBar

import figma from "figma";

const action = figma.selectedInstance.getInstanceSwap("Button")?.executeTemplate().example;
const filterChips = figma.selectedInstance.getInstanceSwap("Chip group")?.executeTemplate().example;
const leftContent = (function () {
  const slot = figma.properties.slot("Main controls slot");
  return slot
    ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
    : [];
})();
const rightContent = (function () {
  const slot = figma.properties.slot("Secondary controls slot");
  return slot
    ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
    : [];
})();

export default {
  id: "FilterBar",
  imports: ['import { FilterBar } from "@reapit/elements/core/filter-bar";'],
  example: figma.code`<FilterBar appliedFilters={<FilterBar.AppliedFilters${figma.helpers.react.renderProp(
    "action",
    action,
  )}>
          ${figma.helpers.react.renderChildren(filterChips)}
        </FilterBar.AppliedFilters>} leftContent={<FilterBar.LeftContent>${figma.helpers.react.renderChildren(
          leftContent,
        )}</FilterBar.LeftContent>} rightContent={<FilterBar.RightContent>${figma.helpers.react.renderChildren(
          rightContent,
        )}</FilterBar.RightContent>}/>`,
  metadata: { nestable: true },
};
