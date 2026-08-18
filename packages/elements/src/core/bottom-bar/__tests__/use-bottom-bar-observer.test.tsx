import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { useBottomBarObserver } from "../use-bottom-bar-observer";

test('returns "extended" initially', () => {
  render(<TestComponent />);
  expect(screen.getByText("extended")).toBeInTheDocument();
});

test('returns "extended" when scrolling up', async () => {
  render(<TestComponent />);

  // Decreasing scrollTop = scrolling up
  fireEvent.scroll(screen.getByTestId("scroll-container"), { target: { scrollTop: 100 } });
  fireEvent.scroll(screen.getByTestId("scroll-container"), { target: { scrollTop: 50 } });

  await waitFor(() => {
    expect(screen.getByText("extended")).toBeInTheDocument();
  });
});

test('returns "retracted" when scrolling down', async () => {
  render(<TestComponent />);

  // Increasing scrollTop = scrolling down
  fireEvent.scroll(screen.getByTestId("scroll-container"), { target: { scrollTop: 100 } });
  fireEvent.scroll(screen.getByTestId("scroll-container"), { target: { scrollTop: 150 } });

  await waitFor(() => {
    expect(screen.getByText("retracted")).toBeInTheDocument();
  });
});

test("handles unattached ID gracefully", () => {
  function NoIDTestComponent() {
    // NOTE: ID is not attached to a DOM element.
    const state = useBottomBarObserver("scroll-container-id");
    return <div>{state}</div>;
  }

  render(<NoIDTestComponent />);
  expect(screen.queryByText("extended")).toBeInTheDocument();
});

test("cleans up event listener on unmount", () => {
  const abortSpy = vi.spyOn(AbortController.prototype, "abort");
  const { unmount } = render(<TestComponent />);
  unmount();

  expect(abortSpy).toHaveBeenCalled();
});

function TestComponent() {
  const state = useBottomBarObserver("scroll-container-id");
  return (
    <div data-testid="scroll-container" id="scroll-container-id">
      {state}
    </div>
  );
}
