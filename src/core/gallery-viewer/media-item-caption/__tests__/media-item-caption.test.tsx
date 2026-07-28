import { render, screen } from "@testing-library/react";

import { GalleryViewerMediaItemCaption } from "../media-item-caption";

test("renders a figcaption element", () => {
  const { container } = render(
    <GalleryViewerMediaItemCaption>Front view</GalleryViewerMediaItemCaption>,
  );
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  expect(container.querySelector("figcaption")).toBeInTheDocument();
});

test("renders children as text content", () => {
  const { container } = render(
    <GalleryViewerMediaItemCaption>Front view</GalleryViewerMediaItemCaption>,
  );
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  expect(container.querySelector("figcaption")).toHaveTextContent("Front view");
});

test("forwards className", () => {
  render(
    <GalleryViewerMediaItemCaption className="custom" data-testid="caption">
      Caption
    </GalleryViewerMediaItemCaption>,
  );
  expect(screen.getByTestId("caption")).toHaveClass("custom");
});

test("forwards additional props", () => {
  render(
    <GalleryViewerMediaItemCaption data-testid="caption">Caption</GalleryViewerMediaItemCaption>,
  );
  expect(screen.getByTestId("caption")).toBeVisible();
});
