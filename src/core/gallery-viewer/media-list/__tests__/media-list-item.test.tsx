import { render, screen } from "@testing-library/react";

import { GalleryViewerMediaListItem } from "../media-list-item";

test("renders a <figure> element as child of a <li>", () => {
  render(<GalleryViewerMediaListItem id="item-1" />);

  const listItem = screen.getByRole("listitem");
  const figure = listItem.querySelector("figure");

  expect(listItem).toBeVisible();
  expect(figure).not.toBeNull();
  expect(listItem.firstChild).toBe(figure);
});

test("forwards all props to the underlying GalleryViewerMediaItem", () => {
  render(
    <GalleryViewerMediaListItem id="item-1" className="custom-class" data-testid="media-item" />,
  );

  const figure = screen.getByTestId("media-item");

  expect(figure).toBeVisible();
  expect(figure).toHaveClass("custom-class");
  expect(figure).toHaveAttribute("id", "item-1");
});
