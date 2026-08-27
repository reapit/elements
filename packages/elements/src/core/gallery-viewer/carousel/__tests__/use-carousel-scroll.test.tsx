import { act, render, screen } from "@testing-library/react";

import { GalleryViewerCarousel } from "../carousel";
import { GalleryViewerCarouselItem } from "../carousel-item";
import { GalleryViewerCarouselTrack } from "../carousel-track";
import { setupBrowserStubs } from "./stubs";

const {
  getIntersectionCallback,
  getMutationCallback,
  getObservedElements,
  getUnobservedElements,
  fireScrollEnd,
} = setupBrowserStubs();

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

function fireIntersection(target: Element, intersectionRatio: number) {
  getIntersectionCallback()?.(
    [{ target, isIntersecting: true, intersectionRatio } as unknown as IntersectionObserverEntry],
    {} as IntersectionObserver,
  );
}

function fireMutation(mutations: { addedNodes: Node[]; removedNodes: Node[] }[]) {
  getMutationCallback()?.(mutations as unknown as MutationRecord[], {} as MutationObserver);
}

function triggerScrollEnd() {
  // Dispatch a scroll event to start the debounce, then advance timers past 50 ms.
  fireScrollEnd();
  vi.runAllTimers();
}

test("removes inert from the item that enters view", () => {
  render(
    <GalleryViewerCarousel aria-label="Property photos">
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
          Content 1
        </GalleryViewerCarouselItem>
        <GalleryViewerCarouselItem id="item-2" data-testid="item-2">
          Content 2
        </GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  );
  fireIntersection(screen.getByTestId("item-2"), 0.6);
  expect(screen.getByTestId("item-2")).not.toHaveAttribute("inert");
});

test("sets inert on items not in view", () => {
  render(
    <GalleryViewerCarousel aria-label="Property photos">
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
          Content 1
        </GalleryViewerCarouselItem>
        <GalleryViewerCarouselItem id="item-2" data-testid="item-2">
          Content 2
        </GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  );
  fireIntersection(screen.getByTestId("item-2"), 0.6);
  expect(screen.getByTestId("item-1")).toHaveAttribute("inert");
});

test("calls onChange with the item id when the scroll settles on a new item", () => {
  const onChange = vi.fn();
  render(
    <GalleryViewerCarousel aria-label="Property photos" onChange={onChange} value="item-1">
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
          Content 1
        </GalleryViewerCarouselItem>
        <GalleryViewerCarouselItem id="item-2" data-testid="item-2">
          Content 2
        </GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  );
  fireIntersection(screen.getByTestId("item-2"), 0.6);
  triggerScrollEnd();
  expect(onChange).toHaveBeenCalledWith("item-2");
});

test("does not call onChange when the scroll settles on the already-active item", () => {
  const onChange = vi.fn();
  render(
    <GalleryViewerCarousel aria-label="Property photos" onChange={onChange} value="item-1">
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
          Content
        </GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  );
  fireIntersection(screen.getByTestId("item-1"), 1.0);
  triggerScrollEnd();
  expect(onChange).not.toHaveBeenCalled();
});

test("calls onChange exactly once when scrollend fires", () => {
  const onChange = vi.fn();
  render(
    <GalleryViewerCarousel aria-label="Property photos" onChange={onChange} value="item-1">
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
          Content 1
        </GalleryViewerCarouselItem>
        <GalleryViewerCarouselItem id="item-2" data-testid="item-2">
          Content 2
        </GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  );
  fireIntersection(screen.getByTestId("item-2"), 0.8);
  triggerScrollEnd();
  expect(onChange).toHaveBeenCalledTimes(1);
});

test("does not call onChange a second time when scrollend fires again on the same settled item", () => {
  const onChange = vi.fn();
  render(
    <GalleryViewerCarousel aria-label="Property photos" onChange={onChange} value="item-1">
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
          Content 1
        </GalleryViewerCarouselItem>
        <GalleryViewerCarouselItem id="item-2" data-testid="item-2">
          Content 2
        </GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  );
  fireIntersection(screen.getByTestId("item-2"), 0.8);
  triggerScrollEnd();
  expect(onChange).toHaveBeenCalledTimes(1);

  // A second scrollend on the same item (e.g. scroll-snap micro-adjustment)
  // must not fire onChange again.
  triggerScrollEnd();
  expect(onChange).toHaveBeenCalledTimes(1);
});

test("does not call onChange in uncontrolled mode when scroll-snap returns the user to the same item", () => {
  const onChange = vi.fn();
  render(
    <GalleryViewerCarousel aria-label="Property photos" onChange={onChange}>
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
          Content 1
        </GalleryViewerCarouselItem>
        <GalleryViewerCarouselItem id="item-2" data-testid="item-2">
          Content 2
        </GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  );
  // User swipes to item-2.
  fireIntersection(screen.getByTestId("item-2"), 0.8);
  triggerScrollEnd();
  expect(onChange).toHaveBeenCalledWith("item-2");
  expect(onChange).toHaveBeenCalledTimes(1);

  // User scrolls slightly but scroll-snap returns them to item-2: no repeat call.
  triggerScrollEnd();
  expect(onChange).toHaveBeenCalledTimes(1);
});

test("does not call onChange for intermediate items during a programmatic scroll: only the settled item", () => {
  const onChange = vi.fn();

  function Carousel({ value }: { value: string }) {
    return (
      <GalleryViewerCarousel aria-label="Property photos" onChange={onChange} value={value}>
        <GalleryViewerCarouselTrack>
          <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
            Content 1
          </GalleryViewerCarouselItem>
          <GalleryViewerCarouselItem id="item-2" data-testid="item-2">
            Content 2
          </GalleryViewerCarouselItem>
          <GalleryViewerCarouselItem id="item-3" data-testid="item-3">
            Content 3
          </GalleryViewerCarouselItem>
          <GalleryViewerCarouselItem id="item-4" data-testid="item-4">
            Content 4
          </GalleryViewerCarouselItem>
        </GalleryViewerCarouselTrack>
      </GalleryViewerCarousel>
    );
  }

  const { rerender } = render(<Carousel value="item-1" />);

  // Programmatic jump from item-1 to item-4.
  rerender(<Carousel value="item-4" />);

  // Simulate the smooth scroll animation: intermediate items cross the threshold.
  fireIntersection(screen.getByTestId("item-2"), 0.6);
  fireIntersection(screen.getByTestId("item-3"), 0.6);

  // The target item arrives.
  fireIntersection(screen.getByTestId("item-4"), 0.6);

  // Scroll settles: onChange must not fire since value already equals settled item.
  triggerScrollEnd();

  expect(onChange).not.toHaveBeenCalled();
});

test("calls onChange normally for a user swipe after a programmatic scroll has settled", () => {
  const onChange = vi.fn();

  function Carousel({ value }: { value: string }) {
    return (
      <GalleryViewerCarousel aria-label="Property photos" onChange={onChange} value={value}>
        <GalleryViewerCarouselTrack>
          <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
            Content 1
          </GalleryViewerCarouselItem>
          <GalleryViewerCarouselItem id="item-2" data-testid="item-2">
            Content 2
          </GalleryViewerCarouselItem>
          <GalleryViewerCarouselItem id="item-3" data-testid="item-3">
            Content 3
          </GalleryViewerCarouselItem>
        </GalleryViewerCarouselTrack>
      </GalleryViewerCarousel>
    );
  }

  const { rerender } = render(<Carousel value="item-1" />);

  // Programmatic jump to item-3.
  rerender(<Carousel value="item-3" />);

  // Scroll settles on target: no onChange since value already matches.
  fireIntersection(screen.getByTestId("item-3"), 0.6);
  triggerScrollEnd();
  expect(onChange).not.toHaveBeenCalled();

  // User swipes back to item-2.
  fireIntersection(screen.getByTestId("item-2"), 0.6);
  triggerScrollEnd();

  expect(onChange).toHaveBeenCalledWith("item-2");
  expect(onChange).toHaveBeenCalledTimes(1);
});

test("does not scroll when defaultValue changes after mount", () => {
  const scrollIntoView = vi.fn();

  function Carousel({ defaultValue }: { defaultValue: string }) {
    return (
      <GalleryViewerCarousel aria-label="Property photos" defaultValue={defaultValue}>
        <GalleryViewerCarouselTrack>
          <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
            Content 1
          </GalleryViewerCarouselItem>
          <GalleryViewerCarouselItem id="item-2" data-testid="item-2">
            Content 2
          </GalleryViewerCarouselItem>
        </GalleryViewerCarouselTrack>
      </GalleryViewerCarousel>
    );
  }

  const { rerender } = render(<Carousel defaultValue="item-1" />);

  screen.getByTestId("item-1").scrollIntoView = scrollIntoView;
  screen.getByTestId("item-2").scrollIntoView = scrollIntoView;

  rerender(<Carousel defaultValue="item-2" />);

  expect(scrollIntoView).not.toHaveBeenCalled();
});

// --- MutationObserver: dynamic item set ---

test("observes a newly added child", () => {
  function FilteredCarousel({ showSecond }: { showSecond: boolean }) {
    return (
      <GalleryViewerCarousel aria-label="Property photos" value="item-1" onChange={vi.fn()}>
        <GalleryViewerCarouselTrack>
          <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
            Content 1
          </GalleryViewerCarouselItem>
          {showSecond && (
            <GalleryViewerCarouselItem id="item-2" data-testid="item-2">
              Content 2
            </GalleryViewerCarouselItem>
          )}
        </GalleryViewerCarouselTrack>
      </GalleryViewerCarousel>
    );
  }

  const { rerender } = render(<FilteredCarousel showSecond={false} />);

  rerender(<FilteredCarousel showSecond={true} />);
  const addedItem = screen.getByTestId("item-2");

  // Simulate the MutationObserver callback reporting the addition.
  act(() => {
    fireMutation([{ addedNodes: [addedItem], removedNodes: [] }]);
  });

  // The added item should have been passed to observer.observe().
  expect(getObservedElements()).toContain(addedItem);
});

test("unobserves a removed child", () => {
  function FilteredCarousel({ showSecond }: { showSecond: boolean }) {
    return (
      <GalleryViewerCarousel aria-label="Property photos" value="item-1" onChange={vi.fn()}>
        <GalleryViewerCarouselTrack>
          <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
            Content 1
          </GalleryViewerCarouselItem>
          {showSecond && (
            <GalleryViewerCarouselItem id="item-2" data-testid="item-2">
              Content 2
            </GalleryViewerCarouselItem>
          )}
        </GalleryViewerCarouselTrack>
      </GalleryViewerCarousel>
    );
  }

  const { rerender } = render(<FilteredCarousel showSecond={true} />);
  const removedItem = screen.getByTestId("item-2");

  rerender(<FilteredCarousel showSecond={false} />);

  act(() => {
    fireMutation([{ addedNodes: [], removedNodes: [removedItem] }]);
  });

  expect(getUnobservedElements()).toContain(removedItem);
});

test("does not fire onChange when a non-active item is removed", () => {
  const onChange = vi.fn();

  function FilteredCarousel({ showSecond }: { showSecond: boolean }) {
    return (
      <GalleryViewerCarousel aria-label="Property photos" value="item-1" onChange={onChange}>
        <GalleryViewerCarouselTrack>
          <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
            Content 1
          </GalleryViewerCarouselItem>
          {showSecond && (
            <GalleryViewerCarouselItem id="item-2" data-testid="item-2">
              Content 2
            </GalleryViewerCarouselItem>
          )}
        </GalleryViewerCarouselTrack>
      </GalleryViewerCarousel>
    );
  }

  // Establish item-1 as active.
  const { rerender } = render(<FilteredCarousel showSecond={true} />);
  fireIntersection(screen.getByTestId("item-1"), 1.0);
  onChange.mockClear();

  const removedItem = screen.getByTestId("item-2");
  rerender(<FilteredCarousel showSecond={false} />);

  act(() => {
    fireMutation([{ addedNodes: [], removedNodes: [removedItem] }]);
  });

  expect(onChange).not.toHaveBeenCalled();
});

test("snaps to the first remaining child and fires onChange when the active item is removed", () => {
  const onChange = vi.fn();

  function FilteredCarousel({ items }: { items: string[] }) {
    return (
      <GalleryViewerCarousel aria-label="Property photos" onChange={onChange} value="item-1">
        <GalleryViewerCarouselTrack>
          {items.map((id) => (
            <GalleryViewerCarouselItem key={id} id={id} data-testid={id}>
              Content {id}
            </GalleryViewerCarouselItem>
          ))}
        </GalleryViewerCarouselTrack>
      </GalleryViewerCarousel>
    );
  }

  const { rerender } = render(<FilteredCarousel items={["item-1", "item-2", "item-3"]} />);

  // Make item-1 the known active item.
  fireIntersection(screen.getByTestId("item-1"), 1.0);
  onChange.mockClear();

  const removedItem = screen.getByTestId("item-1");
  const scrollIntoView = vi.fn();
  screen.getByTestId("item-2").scrollIntoView = scrollIntoView;

  rerender(<FilteredCarousel items={["item-2", "item-3"]} />);

  act(() => {
    fireMutation([{ addedNodes: [], removedNodes: [removedItem] }]);
  });

  expect(scrollIntoView).toHaveBeenCalledWith({
    behavior: "instant",
    block: "nearest",
    inline: "start",
  });
  expect(onChange).toHaveBeenCalledWith("item-2");
  expect(onChange).toHaveBeenCalledTimes(1);
});

test("makes the first remaining child non-inert and marks others inert when the active item is removed", () => {
  const onChange = vi.fn();

  function FilteredCarousel({ items }: { items: string[] }) {
    return (
      <GalleryViewerCarousel aria-label="Property photos" onChange={onChange} value="item-1">
        <GalleryViewerCarouselTrack>
          {items.map((id) => (
            <GalleryViewerCarouselItem key={id} id={id} data-testid={id}>
              Content {id}
            </GalleryViewerCarouselItem>
          ))}
        </GalleryViewerCarouselTrack>
      </GalleryViewerCarousel>
    );
  }

  const { rerender } = render(<FilteredCarousel items={["item-1", "item-2", "item-3"]} />);

  fireIntersection(screen.getByTestId("item-1"), 1.0);
  onChange.mockClear();

  const removedItem = screen.getByTestId("item-1");
  screen.getByTestId("item-2").scrollIntoView = vi.fn();

  rerender(<FilteredCarousel items={["item-2", "item-3"]} />);

  act(() => {
    fireMutation([{ addedNodes: [], removedNodes: [removedItem] }]);
  });

  expect(screen.getByTestId("item-2")).not.toHaveAttribute("inert");
  expect(screen.getByTestId("item-3")).toHaveAttribute("inert");
});

test("sets isObserverChangeRef before firing onChange when the active item is removed, preventing a redundant scroll", () => {
  // Verify that the scrollToValue effect does not call scrollIntoView a second
  // time after the mutation snap. We do this by confirming scrollIntoView is
  // called exactly once (by the mutation handler itself) even after the parent
  // re-renders with the new controlled value.
  const onChange = vi.fn();

  function FilteredCarousel({ items }: { items: string[] }) {
    return (
      <GalleryViewerCarousel aria-label="Property photos" onChange={onChange} value={items[0]}>
        <GalleryViewerCarouselTrack>
          {items.map((id) => (
            <GalleryViewerCarouselItem key={id} id={id} data-testid={id}>
              Content {id}
            </GalleryViewerCarouselItem>
          ))}
        </GalleryViewerCarouselTrack>
      </GalleryViewerCarousel>
    );
  }

  const { rerender } = render(<FilteredCarousel items={["item-1", "item-2"]} />);

  fireIntersection(screen.getByTestId("item-1"), 1.0);
  onChange.mockClear();

  const removedItem = screen.getByTestId("item-1");
  const scrollIntoView = vi.fn();
  screen.getByTestId("item-2").scrollIntoView = scrollIntoView;

  rerender(<FilteredCarousel items={["item-2"]} />);

  act(() => {
    fireMutation([{ addedNodes: [], removedNodes: [removedItem] }]);
  });

  // The mutation handler snaps once; the subsequent controlled value update
  // must not trigger a second scrollIntoView.
  expect(scrollIntoView).toHaveBeenCalledTimes(1);
});

test("sets newly added off-screen items as inert immediately", () => {
  const onChange = vi.fn();

  function FilteredCarousel({ items }: { items: string[] }) {
    return (
      <GalleryViewerCarousel aria-label="Property photos" onChange={onChange} value="item-1">
        <GalleryViewerCarouselTrack>
          {items.map((id) => (
            <GalleryViewerCarouselItem key={id} id={id} data-testid={id}>
              Content {id}
            </GalleryViewerCarouselItem>
          ))}
        </GalleryViewerCarouselTrack>
      </GalleryViewerCarousel>
    );
  }

  const { rerender } = render(<FilteredCarousel items={["item-1"]} />);

  // Establish item-1 as the active (non-inert) item.
  fireIntersection(screen.getByTestId("item-1"), 1.0);

  rerender(<FilteredCarousel items={["item-1", "item-2", "item-3"]} />);
  const addedItem2 = screen.getByTestId("item-2");
  const addedItem3 = screen.getByTestId("item-3");

  act(() => {
    fireMutation([{ addedNodes: [addedItem2, addedItem3], removedNodes: [] }]);
  });

  // Newly added off-screen items must be inert immediately.
  expect(addedItem2).toHaveAttribute("inert");
  expect(addedItem3).toHaveAttribute("inert");
  // The active item must remain non-inert.
  expect(screen.getByTestId("item-1")).not.toHaveAttribute("inert");
});
