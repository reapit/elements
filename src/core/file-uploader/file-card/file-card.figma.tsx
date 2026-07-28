import figma from "@figma/code-connect";

import { FileUploaderFileCard } from "./file-card";
import { FileUploaderFileCardLeadingElement } from "./leading-element/leading-element";

figma.connect(FileUploaderFileCard, "<FILE_UPLOADER_FILE_CARD_URL>", {
  props: {
    fileName: figma.string("File name"),
    status: figma.enum("State", {
      Queued: "queued",
      Uploading: "uploading",
      Processing: "processing",
      Uploaded: "uploaded",
      Error: "error",
    }),
    errorMessage: figma.string("Error message"),
  },
  example: ({ fileName, status, errorMessage }) => (
    <FileUploaderFileCard
      fileName={fileName}
      status={status}
      errorMessage={errorMessage}
      onRemove={() => {}}
      leadingElement={<FileUploaderFileCardLeadingElement type="icon" />}
    />
  ),
});
