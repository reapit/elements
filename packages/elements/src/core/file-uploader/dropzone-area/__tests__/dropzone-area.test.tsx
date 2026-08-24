import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";

import { CloudUploadIcon } from "#src/icons/cloud-upload";

import { FileUploaderDropzoneArea } from "../dropzone-area";

test("renders a button with the given primary text", () => {
  render(<FileUploaderDropzoneArea>Drag and drop your file here</FileUploaderDropzoneArea>);
  expect(screen.getByRole("button")).toHaveTextContent("Drag and drop your file here");
});

test('defaults to type="button" so it does not submit an enclosing form', () => {
  render(<FileUploaderDropzoneArea>Drag and drop your file here</FileUploaderDropzoneArea>);
  expect(screen.getByRole("button")).toHaveAttribute("type", "button");
});

test("renders no icon badge when no icon is given", () => {
  render(<FileUploaderDropzoneArea>Drag and drop your file here</FileUploaderDropzoneArea>);
  expect(screen.getByRole("button").querySelector("[aria-hidden]")).toBeNull();
});

test("renders the given icon inside an aria-hidden badge", () => {
  render(
    <FileUploaderDropzoneArea icon={<CloudUploadIcon />}>
      Drag and drop your file here
    </FileUploaderDropzoneArea>,
  );
  expect(screen.getByRole("button").querySelector("[aria-hidden] svg")).toBeVisible();
});

test("renders secondary text for the large variant", () => {
  render(
    <FileUploaderDropzoneArea secondaryText="Up to 10MB" variant="large">
      Drag and drop your file here
    </FileUploaderDropzoneArea>,
  );
  expect(screen.getByText("Up to 10MB")).toBeVisible();
});

test("ignores secondary text for the compact variant", () => {
  render(
    <FileUploaderDropzoneArea secondaryText="Up to 10MB" variant="compact">
      Drag and drop your file here
    </FileUploaderDropzoneArea>,
  );
  expect(screen.queryByText("Up to 10MB")).toBeNull();
});

test("defaults to the large variant", () => {
  render(<FileUploaderDropzoneArea>Drag and drop your file here</FileUploaderDropzoneArea>);
  expect(screen.getByRole("button")).toHaveAttribute("data-variant", "large");
});

test("reflects variant via a data attribute", () => {
  render(
    <FileUploaderDropzoneArea variant="compact">
      Drag and drop your file here
    </FileUploaderDropzoneArea>,
  );
  expect(screen.getByRole("button")).toHaveAttribute("data-variant", "compact");
});

test("reflects isDraggingOver via a data attribute", () => {
  render(
    <FileUploaderDropzoneArea isDraggingOver>
      Drag and drop your file here
    </FileUploaderDropzoneArea>,
  );
  expect(screen.getByRole("button")).toHaveAttribute("data-is-dragging-over", "true");
});

test("calls onClick when clicked", () => {
  const onClick = vi.fn();
  render(
    <FileUploaderDropzoneArea onClick={onClick}>
      Drag and drop your file here
    </FileUploaderDropzoneArea>,
  );

  fireEvent.click(screen.getByRole("button"));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("forwards ref to the underlying button element", () => {
  const ref = createRef<HTMLButtonElement>();
  render(
    <FileUploaderDropzoneArea ref={ref}>Drag and drop your file here</FileUploaderDropzoneArea>,
  );
  expect(ref.current).toBeInstanceOf(HTMLButtonElement);
});
