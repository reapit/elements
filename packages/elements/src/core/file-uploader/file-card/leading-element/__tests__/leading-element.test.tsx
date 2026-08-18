import { render, screen } from "@testing-library/react";

import { FileUploaderFileCardLeadingElement } from "../leading-element";

test("renders an image for the image type", () => {
  render(
    <FileUploaderFileCardLeadingElement
      type="image"
      src="thumb.jpg"
      alt="A preview of Invoice.pdf"
    />,
  );
  expect(screen.getByRole("img", { name: "A preview of Invoice.pdf" })).toHaveAttribute(
    "src",
    "thumb.jpg",
  );
});

test("defaults the image alt text to an empty string when omitted", () => {
  render(<FileUploaderFileCardLeadingElement type="image" src="thumb.jpg" />);
  expect(screen.getByRole("presentation")).toHaveAttribute("src", "thumb.jpg");
});

test("renders the label for the file-type badge", () => {
  render(<FileUploaderFileCardLeadingElement type="file-type" label="PDF" />);
  expect(screen.getByText("PDF")).toBeVisible();
});

test("renders a generic icon for the icon fallback", () => {
  render(<FileUploaderFileCardLeadingElement type="icon" />);
  expect(document.querySelector("svg")).toBeVisible();
});
