// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=6364-9402&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/pagination/pagination.tsx
// component=Pagination

import figma from "figma";

const pageNumber = figma.selectedInstance.getString("Page number");
const pageCount = figma.selectedInstance.getString("Page count");

export default {
  id: "Pagination",
  imports: ['import { Pagination } from "@reapit/elements/core/pagination";'],
  example: figma.code`<Pagination${figma.helpers.react.renderProp(
    "pageCount",
    pageCount,
  )}${figma.helpers.react.renderProp("pageNumber", pageNumber)}/>`,
  metadata: { nestable: true },
};
