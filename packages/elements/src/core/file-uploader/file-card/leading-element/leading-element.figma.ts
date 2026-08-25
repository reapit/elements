// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=20523-19699&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/file-uploader/file-card/leading-element/leading-element.tsx
// component=FileUploaderFileCardLeadingElement

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Type") === "Image") {
  template = {
    id: "FileUploaderFileCardLeadingElement",
    imports: [
      'import { FileUploaderFileCardLeadingElement } from "@reapit/elements/core/file-uploader";',
    ],
    example: figma.code`<FileUploaderFileCardLeadingElement type="image" src="thumbnail.jpg"/>`,
  };
} else if (figma.selectedInstance.getPropertyValue("Type") === "File type") {
  const label = figma.selectedInstance.getString("Abbreviation");

  template = {
    id: "FileUploaderFileCardLeadingElement",
    imports: [
      'import { FileUploaderFileCardLeadingElement } from "@reapit/elements/core/file-uploader";',
    ],
    example: figma.code`<FileUploaderFileCardLeadingElement type="file-type"${figma.helpers.react.renderProp(
      "label",
      label,
    )}/>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Type") === "Icon") {
  template = {
    id: "FileUploaderFileCardLeadingElement",
    imports: [
      'import { FileUploaderFileCardLeadingElement } from "@reapit/elements/core/file-uploader";',
    ],
    example: figma.code`<FileUploaderFileCardLeadingElement type="icon"/>`,
  };
} else {
  template = {
    id: "FileUploaderFileCardLeadingElement",
    imports: [
      'import { FileUploaderFileCardLeadingElement } from "@reapit/elements/core/file-uploader";',
    ],
    example: figma.code`<FileUploaderFileCardLeadingElement type="icon"/>`,
  };
}

export default template;
