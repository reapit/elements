import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { useScrollObserver } from "../use-scroll-observer";

test("returns initial scroll state when content does not overflow", () => {
  render(<TestComponent />);

  expect(screen.getByText("canScrollLeft: false")).toBeInTheDocument();
  expect(screen.getByText("canScrollRight: false")).toBeInTheDocument();
});

test("updates state when scrolling", async () => {
  render(<TestComponent />);

  const container = screen.getByTestId("scroll-container");
  Object.defineProperty(container, "scrollWidth", { value: 200, configurable: true });
  Object.defineProperty(container, "clientWidth", { value: 100, configurable: true });
  Object.defineProperty(container, "scrollLeft", { value: 0, configurable: true });

  fireEvent.scroll(container);

  await waitFor(() => {
    expect(screen.getByText("canScrollRight: true")).toBeInTheDocument();
  });

  Object.defineProperty(container, "scrollLeft", { value: 50, configurable: true });
  fireEvent.scroll(container);

  await waitFor(() => {
    expect(screen.getByText("canScrollLeft: true")).toBeInTheDocument();
  });
});

test("updates state when window is resized", async () => {
  render(<TestComponent />);

  const container = screen.getByTestId("scroll-container");
  Object.defineProperty(container, "scrollWidth", { value: 200, configurable: true });
  Object.defineProperty(container, "clientWidth", { value: 100, configurable: true });

  fireEvent(window, new Event("resize"));

  await waitFor(() => {
    expect(screen.getByText("canScrollRight: true")).toBeInTheDocument();
  });
});

test("handles non-existent element ID gracefully", () => {
  function NonExistentIdComponent() {
    const result = useScrollObserver("non-existent-id");
    return (
      <div>
        <div>canScrollLeft: {String(result.canScrollLeft)}</div>
        <div>canScrollRight: {String(result.canScrollRight)}</div>
      </div>
    );
  }

  render(<NonExistentIdComponent />);

  expect(screen.getByText("canScrollLeft: false")).toBeInTheDocument();
  expect(screen.getByText("canScrollRight: false")).toBeInTheDocument();
});

test("cleans up all observers and listeners on unmount", () => {
  const abortSpy = vi.spyOn(AbortController.prototype, "abort");
  const resizeDisconnectSpy = vi.spyOn(ResizeObserver.prototype, "disconnect");
  const mutationDisconnectSpy = vi.spyOn(MutationObserver.prototype, "disconnect");
  const cancelAnimationFrameSpy = vi.spyOn(globalThis, "cancelAnimationFrame");

  const { unmount } = render(<TestComponent />);

  unmount();

  expect(abortSpy).toHaveBeenCalled();
  expect(resizeDisconnectSpy).toHaveBeenCalled();
  expect(mutationDisconnectSpy).toHaveBeenCalled();
  expect(cancelAnimationFrameSpy).toHaveBeenCalled();
});

test("manages animation frames for scroll updates", () => {
  const requestAnimationFrameSpy = vi.spyOn(globalThis, "requestAnimationFrame");
  const cancelAnimationFrameSpy = vi.spyOn(globalThis, "cancelAnimationFrame");

  render(<TestComponent />);

  const container = screen.getByTestId("scroll-container");
  fireEvent.scroll(container);

  expect(requestAnimationFrameSpy).toHaveBeenCalled();

  fireEvent.scroll(container);

  expect(cancelAnimationFrameSpy).toHaveBeenCalled();
});

test("sets up observers for element changes", () => {
  const resizeObserveSpy = vi.spyOn(ResizeObserver.prototype, "observe");
  const mutationObserveSpy = vi.spyOn(MutationObserver.prototype, "observe");

  render(<TestComponent />);

  const container = screen.getByTestId("scroll-container");
  expect(resizeObserveSpy).toHaveBeenCalledWith(container);
  expect(mutationObserveSpy).toHaveBeenCalledWith(container, {
    childList: true,
    subtree: true,
  });
});

test("uses passive event listeners for performance", () => {
  const scrollListenerSpy = vi.spyOn(HTMLElement.prototype, "addEventListener");
  const resizeListenerSpy = vi.spyOn(globalThis.window, "addEventListener");

  render(<TestComponent />);

  expect(scrollListenerSpy).toHaveBeenCalledWith(
    "scroll",
    expect.any(Function),
    expect.objectContaining({
      passive: true,
    }),
  );

  expect(resizeListenerSpy).toHaveBeenCalledWith(
    "resize",
    expect.any(Function),
    expect.objectContaining({
      passive: true,
    }),
  );
});

test("updates state when element is resized", async () => {
  let resizeCallback: ResizeObserverCallback | undefined;

  const OriginalResizeObserver = globalThis.ResizeObserver;
  globalThis.ResizeObserver = class MockResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      resizeCallback = callback;
    }
    observe() {}
    disconnect() {}
    unobserve() {}
  } as any;

  render(<TestComponent />);

  const container = screen.getByTestId("scroll-container");
  Object.defineProperty(container, "scrollWidth", { value: 200, configurable: true });
  Object.defineProperty(container, "clientWidth", { value: 100, configurable: true });

  resizeCallback!(
    [
      {
        target: container,
        contentRect: {} as DOMRectReadOnly,
        borderBoxSize: [],
        contentBoxSize: [],
        devicePixelContentBoxSize: [],
      },
    ],
    {} as ResizeObserver,
  );

  await waitFor(() => {
    expect(screen.getByText("canScrollRight: true")).toBeInTheDocument();
  });

  globalThis.ResizeObserver = OriginalResizeObserver;
});

test("updates state when children are mutated", async () => {
  let mutationCallback: MutationCallback | undefined;

  const OriginalMutationObserver = globalThis.MutationObserver;
  globalThis.MutationObserver = class MockMutationObserver {
    constructor(callback: MutationCallback) {
      mutationCallback = callback;
    }
    observe() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  } as any;

  render(<TestComponent />);

  const container = screen.getByTestId("scroll-container");
  Object.defineProperty(container, "scrollWidth", { value: 200, configurable: true });
  Object.defineProperty(container, "clientWidth", { value: 100, configurable: true });

  mutationCallback!([], {} as MutationObserver);

  await waitFor(() => {
    expect(screen.getByText("canScrollRight: true")).toBeInTheDocument();
  });

  globalThis.MutationObserver = OriginalMutationObserver;
});

test("detects scrollable content when scrollWidth exceeds clientWidth", async () => {
  render(<TestComponent />);

  const container = screen.getByTestId("scroll-container");
  Object.defineProperty(container, "scrollWidth", { value: 200, configurable: true });
  Object.defineProperty(container, "clientWidth", { value: 100, configurable: true });
  Object.defineProperty(container, "scrollLeft", { value: 100, configurable: true });

  fireEvent.scroll(container);

  await waitFor(() => {
    expect(screen.getByText("canScrollLeft: true")).toBeInTheDocument();
    expect(screen.getByText("canScrollRight: false")).toBeInTheDocument();
  });
});

function TestComponent() {
  const result = useScrollObserver("scroll-container");

  return (
    <div id="scroll-container" data-testid="scroll-container">
      <div>canScrollLeft: {String(result.canScrollLeft)}</div>
      <div>canScrollRight: {String(result.canScrollRight)}</div>
    </div>
  );
}
