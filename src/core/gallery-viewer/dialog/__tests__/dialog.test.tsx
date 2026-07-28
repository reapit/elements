import { render, screen, waitFor } from "@testing-library/react";

import { useGalleryViewerDialogContext } from "../context";
import { GalleryViewerDialog } from "../dialog";

test("renders a dialog element", async () => {
  render(<GalleryViewerDialog isOpen>Test content</GalleryViewerDialog>);
  await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible());
});

test("shows dialog when `isOpen` is true", async () => {
  render(<GalleryViewerDialog isOpen>Test content</GalleryViewerDialog>);
  await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible());
});

test("hides dialog when `isOpen` is false", () => {
  render(<GalleryViewerDialog isOpen={false}>Test content</GalleryViewerDialog>);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("hides dialog when `isOpen` is undefined", () => {
  render(<GalleryViewerDialog>Test content</GalleryViewerDialog>);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("only mounts children when dialog is open", async () => {
  const { rerender } = render(
    <GalleryViewerDialog isOpen={false}>Test content</GalleryViewerDialog>,
  );
  rerender(<GalleryViewerDialog isOpen>Test content</GalleryViewerDialog>);

  await waitFor(() => expect(screen.getByText("Test content")).toBeVisible());
});

test("unmounts children when dialog closes", async () => {
  const { rerender } = render(<GalleryViewerDialog isOpen>Test content</GalleryViewerDialog>);
  rerender(<GalleryViewerDialog isOpen={false}>Test content</GalleryViewerDialog>);

  await waitFor(() => expect(screen.queryByText("Test content")).not.toBeInTheDocument());
});

test("forwards className to the underlying dialog element", async () => {
  render(
    <GalleryViewerDialog className="custom-class" isOpen>
      Test content
    </GalleryViewerDialog>,
  );
  await waitFor(() => expect(screen.getByRole("dialog")).toHaveClass("custom-class"));
});

test("forwards additional props to the dialog element", () => {
  render(<GalleryViewerDialog data-testid="test-id">Test content</GalleryViewerDialog>);
  expect(screen.getByTestId("test-id")).toBeInTheDocument();
});

test("uses provided aria-labelledby when available", async () => {
  render(
    <GalleryViewerDialog isOpen aria-labelledby="custom-title">
      <span id="custom-title">Gallery Title</span>
    </GalleryViewerDialog>,
  );
  await waitFor(() => expect(screen.getByRole("dialog", { name: "Gallery Title" })).toBeVisible());
});

test("useGalleryViewerDialogContext throws when rendered outside a GalleryViewerDialog", () => {
  expect(() => {
    render(<ConsumerOutsideProvider />);
  }).toThrow("useGalleryViewerDialogContext requires a GalleryViewerDialog ancestor");
});

test("exposes GalleryViewerDialog.Context", () => {
  expect(GalleryViewerDialog.Context).toBeDefined();
});

test("exposes GalleryViewerDialog.useContext", () => {
  expect(GalleryViewerDialog.useContext).toBeDefined();
});

test("exposes GalleryViewerDialog.getClosestDialogElement", () => {
  expect(GalleryViewerDialog.getClosestDialogElement).toBeDefined();
});

test("exposes GalleryViewerDialog.Header", () => {
  expect(GalleryViewerDialog.Header).toBeDefined();
});

test("exposes GalleryViewerDialog.Content", () => {
  expect(GalleryViewerDialog.Content).toBeDefined();
});

function ConsumerOutsideProvider() {
  useGalleryViewerDialogContext();
  return null;
}
