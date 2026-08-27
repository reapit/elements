import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { GalleryViewerCarousel } from "../carousel";
import { GalleryViewerCarouselButton } from "../carousel-button";
import { GalleryViewerCarouselItem } from "../carousel-item";
import { GalleryViewerCarouselTrack } from "../carousel-track";
import { setupBrowserStubs } from "./stubs";

setupBrowserStubs();

test("renders a button element", () => {
  render(<TestComponent />);
  expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
});

test('defaults to type="button" to avoid accidental form submission', () => {
  render(<TestComponent />);
  expect(screen.getByRole("button", { name: "Next" })).toHaveAttribute("type", "button");
});

test("sets data-direction on the buttons", () => {
  render(<TestComponent />);
  expect(screen.getByRole("button", { name: "Previous" })).toHaveAttribute(
    "data-direction",
    "previous",
  );
  expect(screen.getByRole("button", { name: "Next" })).toHaveAttribute("data-direction", "next");
});

test("throws when rendered outside GalleryViewerCarousel", () => {
  expect(() => {
    render(<GalleryViewerCarouselButton aria-label="Next" direction="next" />);
  }).toThrow("useGalleryViewerCarouselContext requires a GalleryViewerCarousel ancestor");
});

test("calls scrollIntoView on the next sibling when the next button is clicked", () => {
  render(<TestComponent />);
  configureTrack(screen.getByTestId("track"), {
    scrollLeft: 100,
    clientWidth: 100,
    scrollWidth: 300,
  });
  const item2 = screen.getByTestId("item-2");
  const scrollIntoView = vi.fn();
  item2.scrollIntoView = scrollIntoView;

  fireEvent.click(screen.getByRole("button", { name: "Next" }));

  expect(scrollIntoView).toHaveBeenCalledOnce();
});

test("calls scrollIntoView on the previous sibling when the previous button is clicked", () => {
  render(<TestComponent defaultValue="item-2" />);
  configureTrack(screen.getByTestId("track"), {
    scrollLeft: 100,
    clientWidth: 100,
    scrollWidth: 300,
  });
  const item1 = screen.getByTestId("item-1");
  const scrollIntoView = vi.fn();
  item1.scrollIntoView = scrollIntoView;

  fireEvent.click(screen.getByRole("button", { name: "Previous" }));

  expect(scrollIntoView).toHaveBeenCalledOnce();
});

test("does not call scrollIntoView when the consumer calls event.preventDefault()", () => {
  render(
    <GalleryViewerCarousel aria-label="Prevented carousel" defaultValue="item-1">
      <GalleryViewerCarouselButton
        aria-label="Next (no scroll)"
        direction="next"
        onClick={(e) => e.preventDefault()}
      />
      <GalleryViewerCarouselTrack data-testid="track-prevented">
        <GalleryViewerCarouselItem id="item-1">Content 1</GalleryViewerCarouselItem>
        <GalleryViewerCarouselItem id="item-2" data-testid="item-2-prevented">
          Content 2
        </GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  );

  configureTrack(screen.getByTestId("track-prevented"), {
    scrollLeft: 100,
    clientWidth: 100,
    scrollWidth: 300,
  });

  const item2prevented = screen.getByTestId("item-2-prevented");
  const scrollIntoViewPrevented = vi.fn();
  item2prevented.scrollIntoView = scrollIntoViewPrevented;

  fireEvent.click(screen.getByRole("button", { name: "Next (no scroll)" }));

  expect(scrollIntoViewPrevented).not.toHaveBeenCalled();
});

test("calls the consumer onClick before scrolling", () => {
  const callOrder: string[] = [];
  render(
    <GalleryViewerCarousel aria-label="Order test" defaultValue="item-1">
      <GalleryViewerCarouselButton
        aria-label="Next (order)"
        direction="next"
        onClick={() => callOrder.push("onClick")}
      />
      <GalleryViewerCarouselTrack data-testid="track-order">
        <GalleryViewerCarouselItem id="item-1">Content 1</GalleryViewerCarouselItem>
        <GalleryViewerCarouselItem id="item-2" data-testid="item-2-order">
          Content 2
        </GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  );

  configureTrack(screen.getByTestId("track-order"), {
    scrollLeft: 100,
    clientWidth: 100,
    scrollWidth: 300,
  });
  screen.getByTestId("item-2-order").scrollIntoView = () => callOrder.push("scroll");

  fireEvent.click(screen.getByRole("button", { name: "Next (order)" }));

  expect(callOrder).toEqual(["onClick", "scroll"]);
});

test("is disabled when the track is at the leftmost position (previous button)", async () => {
  render(<TestComponent />);

  configureTrack(screen.getByTestId("track"), {
    scrollLeft: 0,
    clientWidth: 100,
    scrollWidth: 300,
  });

  await waitFor(() => {
    expect(screen.getByRole("button", { name: "Previous" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
});

test("is disabled when the track is at the rightmost position (next button)", async () => {
  render(<TestComponent />);

  configureTrack(screen.getByTestId("track"), {
    scrollLeft: 200,
    clientWidth: 100,
    scrollWidth: 300,
  });

  await waitFor(() => {
    expect(screen.getByRole("button", { name: "Next" })).toHaveAttribute("aria-disabled", "true");
  });
});

test("is not disabled when the track has room to scroll in both directions", () => {
  render(<TestComponent />);
  configureTrack(screen.getByTestId("track"), {
    scrollLeft: 100,
    clientWidth: 100,
    scrollWidth: 300,
  });
  expect(screen.getByRole("button", { name: "Previous" })).not.toHaveAttribute("aria-disabled");
  expect(screen.getByRole("button", { name: "Next" })).not.toHaveAttribute("aria-disabled");
});

test("is disabled when the carousel is in read-only controlled mode", () => {
  render(
    <GalleryViewerCarousel aria-label="Property photos" value="item-1">
      <GalleryViewerCarouselButton aria-label="Previous" direction="previous" />
      <GalleryViewerCarouselTrack data-testid="track-readonly">
        <GalleryViewerCarouselItem id="item-1">Content 1</GalleryViewerCarouselItem>
        <GalleryViewerCarouselItem id="item-2">Content 2</GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
      <GalleryViewerCarouselButton aria-label="Next" direction="next" />
    </GalleryViewerCarousel>,
  );
  // Put the track mid-scroll so atEdge is false: aria-disabled must come from isReadOnly alone.
  configureTrack(screen.getByTestId("track-readonly"), {
    scrollLeft: 100,
    clientWidth: 100,
    scrollWidth: 300,
  });
  expect(screen.getByRole("button", { name: "Previous" })).toHaveAttribute("aria-disabled", "true");
  expect(screen.getByRole("button", { name: "Next" })).toHaveAttribute("aria-disabled", "true");
});

test("a consumer-provided disabled prop overrides auto-disable", () => {
  render(
    <GalleryViewerCarousel aria-label="Property photos" defaultValue="item-1">
      <GalleryViewerCarouselTrack data-testid="track-disabled">
        <GalleryViewerCarouselItem id="item-1">Content 1</GalleryViewerCarouselItem>
        <GalleryViewerCarouselItem id="item-2">Content 2</GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
      <GalleryViewerCarouselButton aria-label="Next" direction="next" disabled />
    </GalleryViewerCarousel>,
  );
  // Put the track mid-scroll so atEdge is false: aria-disabled must come from the disabled prop alone.
  configureTrack(screen.getByTestId("track-disabled"), {
    scrollLeft: 100,
    clientWidth: 100,
    scrollWidth: 300,
  });
  expect(screen.getByRole("button", { name: "Next" })).toHaveAttribute("aria-disabled", "true");
});

test("does not scroll when the button is at the edge", async () => {
  render(<TestComponent />);
  const item2 = screen.getByTestId("item-2");
  const scrollIntoView = vi.fn();
  item2.scrollIntoView = scrollIntoView;

  configureTrack(screen.getByTestId("track"), {
    scrollLeft: 200,
    clientWidth: 100,
    scrollWidth: 300,
  });

  await waitFor(() => {
    expect(screen.getByRole("button", { name: "Next" })).toHaveAttribute("aria-disabled", "true");
  });

  fireEvent.click(screen.getByRole("button", { name: "Next" }));

  expect(scrollIntoView).not.toHaveBeenCalled();
});

// Sets scroll dimensions on the track element and fires a scroll event so the
// button edge-detection logic picks up the new values.
function configureTrack(
  track: HTMLElement,
  {
    scrollLeft,
    clientWidth,
    scrollWidth,
  }: { scrollLeft: number; clientWidth: number; scrollWidth: number },
) {
  Object.defineProperty(track, "scrollLeft", { configurable: true, value: scrollLeft });
  Object.defineProperty(track, "clientWidth", { configurable: true, value: clientWidth });
  Object.defineProperty(track, "scrollWidth", { configurable: true, value: scrollWidth });
  fireEvent.scroll(track);
}

interface TestComponentProps {
  defaultValue?: string;
}

// Renders a carousel with two items and both navigation buttons.
// The track starts mid-scroll (scrollLeft=100) so neither button is auto-disabled on mount.
function TestComponent({ defaultValue = "item-1" }: TestComponentProps) {
  return (
    <GalleryViewerCarousel aria-label="Property photos" defaultValue={defaultValue}>
      <GalleryViewerCarouselButton aria-label="Previous" direction="previous" />
      <GalleryViewerCarouselTrack data-testid="track">
        <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
          Content 1
        </GalleryViewerCarouselItem>
        <GalleryViewerCarouselItem id="item-2" data-testid="item-2">
          Content 2
        </GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
      <GalleryViewerCarouselButton aria-label="Next" direction="next" />
    </GalleryViewerCarousel>
  );
}
