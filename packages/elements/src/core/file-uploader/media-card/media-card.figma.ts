// url=<FILE_UPLOADER_MULTI_SELECT_MEDIA_CARD_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/file-uploader/media-card/media-card.tsx
// component=FileUploaderMediaCard

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
  id: "FileUploaderMediaCard",
  imports: ['import { FileUploaderMediaCard } from "@reapit/elements/core/file-uploader";'],
  example: figma.code`<FileUploaderMediaCard${figma.helpers.react.renderProp(
    "fileName",
    fileName,
  )}${figma.helpers.react.renderProp("status", status)}${figma.helpers.react.renderProp(
    "errorMessage",
    errorMessage,
  )} onRemove={() => { }} src="TODO: add image source"/>`,
  metadata: { nestable: true },
};
