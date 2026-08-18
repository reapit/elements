import { render, screen } from "@testing-library/react";

import { GalleryViewerDialogContent } from "../content";

test("renders the children", () => {
  render(<GalleryViewerDialogContent>Content Test</GalleryViewerDialogContent>);
  expect(screen.getByText("Content Test")).toBeVisible();
});

test("forwards className to the underlying element", () => {
  const { container } = render(
    <GalleryViewerDialogContent className="custom-class">Content</GalleryViewerDialogContent>,
  );
  expect(container.firstElementChild).toHaveClass("custom-class");
});

test("forwards additional props to the underlying element", () => {
  render(
    <GalleryViewerDialogContent data-testid="gallery-content" aria-label="Gallery content">
      Content
    </GalleryViewerDialogContent>,
  );
  const element = screen.getByTestId("gallery-content");
  expect(element).toBeVisible();
  expect(element).toHaveAttribute("aria-label", "Gallery content");
});
