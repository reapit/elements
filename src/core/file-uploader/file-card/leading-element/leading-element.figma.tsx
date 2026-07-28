import figma from "@figma/code-connect";

import { FileUploaderFileCardLeadingElement } from "./leading-element";

figma.connect(FileUploaderFileCardLeadingElement, "<FILE_UPLOADER_FILE_CARD_LEADING_ELEMENT_URL>", {
  variant: { Type: "Image" },
  example: () => <FileUploaderFileCardLeadingElement type="image" src="thumbnail.jpg" />,
});

figma.connect(FileUploaderFileCardLeadingElement, "<FILE_UPLOADER_FILE_CARD_LEADING_ELEMENT_URL>", {
  variant: { Type: "File type" },
  props: {
    label: figma.string("Abbreviation"),
  },
  example: ({ label }) => <FileUploaderFileCardLeadingElement type="file-type" label={label} />,
});

figma.connect(FileUploaderFileCardLeadingElement, "<FILE_UPLOADER_FILE_CARD_LEADING_ELEMENT_URL>", {
  variant: { Type: "Icon" },
  example: () => <FileUploaderFileCardLeadingElement type="icon" />,
});
