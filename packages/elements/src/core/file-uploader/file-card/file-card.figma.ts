// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=20523-19497&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/file-uploader/file-card/file-card.tsx
// component=FileUploaderFileCard

import figma from "figma";

const fileName = figma.selectedInstance.getString("File name");
const status = figma.selectedInstance.getEnum("State", {
  Queued: "queued",
  Uploading: "uploading",
  Processing: "processing",
  Uploaded: "uploaded",
  Error: "error",
});
const errorMessage = figma.selectedInstance.getString("Error message");

export default {
  id: "FileUploaderFileCard",
  imports: [
    'import { FileUploaderFileCard } from "@reapit/elements/core/file-uploader";',
    'import { FileUploaderFileCardLeadingElement } from "@reapit/elements/core/file-uploader";',
  ],
  example: figma.code`<FileUploaderFileCard${figma.helpers.react.renderProp(
    "fileName",
    fileName,
  )}${figma.helpers.react.renderProp("status", status)}${figma.helpers.react.renderProp(
    "errorMessage",
    errorMessage,
  )} onRemove={() => { }} leadingElement={<FileUploaderFileCardLeadingElement type="icon"/>}/>`,
  metadata: { nestable: true },
};
