import { render, screen } from "@testing-library/react";

import { GalleryViewerThumbnailListButtonItem } from "../thumbnail-list-button-item";

test("renders a <button> element as child of a <li>", () => {
  render(
    <GalleryViewerThumbnailListButtonItem
      aria-pressed={false}
      aria-label="View photo 1"
      src="https://fake.url/for/image.jpg"
    />,
  );
  const listItem = screen.getByRole("listitem");
  const button = screen.getByRole("button", { name: "View photo 1" });

  expect(listItem).toBeVisible();
  expect(button).toBeVisible();
  expect(listItem.firstChild).toBe(button);
});

test("forwards additional props to the underlying GalleryViewerThumbnailButton", () => {
  render(
    <GalleryViewerThumbnailListButtonItem
      aria-pressed={true}
      aria-label="View photo 1"
      src="https://fake.url/for/image.jpg"
    />,
  );
  expect(screen.getByRole("button", { name: "View photo 1" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});
