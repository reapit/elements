import { fireEvent, render, screen } from "@testing-library/react";

import { FileUploaderMediaCard } from "../media-card";

const src = "https://example.com/photo.jpg";

test("renders the filename and thumbnail", () => {
  const { container } = render(
    <FileUploaderMediaCard fileName="Photo.jpg" src={src} status="uploaded" />,
  );
  expect(screen.getByText("Photo.jpg")).toBeVisible();
  expect(container.querySelector("img")).toHaveAttribute("src", src);
});

test("renders the formatted file size and status text", () => {
  render(
    <FileUploaderMediaCard
      fileName="Photo.jpg"
      fileSize={2 * 1000 * 1000}
      locale="en-GB"
      src={src}
      status="queued"
    />,
  );
  expect(screen.getByText("2 MB")).toBeVisible();
  expect(screen.getByText("Queued")).toBeVisible();
});

test("omits the size when fileSize is not provided", () => {
  render(<FileUploaderMediaCard fileName="Photo.jpg" src={src} status="queued" />);
  expect(screen.queryByText("MB", { exact: false })).not.toBeInTheDocument();
});

test("renders the error message when status is error", () => {
  render(
    <FileUploaderMediaCard
      errorMessage="File too large"
      fileName="Photo.jpg"
      src={src}
      status="error"
    />,
  );
  expect(screen.getByText("File too large")).toBeVisible();
});

test("renders no remove button when onRemove is omitted", () => {
  render(<FileUploaderMediaCard fileName="Photo.jpg" src={src} status="uploaded" />);
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});

test("renders an accessibly-named remove button that calls onRemove when clicked", () => {
  const onRemove = vi.fn();
  render(
    <FileUploaderMediaCard fileName="Photo.jpg" src={src} status="uploaded" onRemove={onRemove} />,
  );

  const button = screen.getByRole("button", { name: "Remove Photo.jpg" });
  fireEvent.click(button);

  expect(onRemove).toHaveBeenCalledTimes(1);
});

test("renders a determinate circular progress indicator while uploading with known progress", () => {
  const { container } = render(
    <FileUploaderMediaCard fileName="Photo.jpg" progress={45} src={src} status="uploading" />,
  );
  expect(container.querySelector("circle[stroke-dasharray]")).toBeInTheDocument();
});

test("renders an indeterminate spinner while uploading with no known progress", () => {
  const { container } = render(
    <FileUploaderMediaCard fileName="Photo.jpg" src={src} status="uploading" />,
  );
  expect(container.querySelectorAll("circle")).toHaveLength(2);
  expect(container.querySelector("path")).toBeNull();
});

test.each([NaN, Infinity])(
  "renders an indeterminate spinner while uploading with invalid progress (%s)",
  (progress) => {
    const { container } = render(
      <FileUploaderMediaCard
        fileName="Photo.jpg"
        progress={progress}
        src={src}
        status="uploading"
      />,
    );
    expect(container.querySelectorAll("circle")).toHaveLength(2);
    expect(container.querySelector("path")).toBeNull();
  },
);

test("renders an indeterminate spinner while processing", () => {
  const { container } = render(
    <FileUploaderMediaCard fileName="Photo.jpg" src={src} status="processing" />,
  );
  expect(container.querySelectorAll("circle")).toHaveLength(2);
});

test("renders no progress indicator while queued, uploaded, or errored", () => {
  for (const status of ["queued", "uploaded", "error"] as const) {
    const { container, unmount } = render(
      <FileUploaderMediaCard fileName="Photo.jpg" src={src} status={status} />,
    );
    expect(container.querySelector("circle")).toBeNull();
    unmount();
  }
});

test("renders the duration badge only when provided", () => {
  render(
    <FileUploaderMediaCard duration="15:39" fileName="Video.mp4" src={src} status="uploaded" />,
  );
  expect(screen.getByText("15:39")).toBeVisible();
});

test("renders no duration badge when omitted", () => {
  render(<FileUploaderMediaCard fileName="Photo.jpg" src={src} status="uploaded" />);
  expect(screen.queryByText(/^\d+:\d+$/)).not.toBeInTheDocument();
});

test("marks the error message so it can wrap onto a second line, unlike other status text", () => {
  render(
    <FileUploaderMediaCard
      errorMessage="File too large"
      fileName="Photo.jpg"
      src={src}
      status="error"
    />,
  );
  expect(screen.getByText("File too large")).toHaveAttribute("data-error");
});

test("does not mark non-error status text as wrappable", () => {
  render(<FileUploaderMediaCard fileName="Photo.jpg" src={src} status="uploaded" />);
  expect(screen.getByText("Uploaded")).not.toHaveAttribute("data-error");
});
