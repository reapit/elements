import { fireEvent, render, screen } from "@testing-library/react";

import { useComboboxPopupObserver } from "../use-popup-observer";
import { FakeToggleEvent } from "./FakeToggleEvent";

test('calls callback when popup receives toggle event with newState "open"', () => {
  const callback = vi.fn();
  render(<TestComponent callback={callback} />);

  const popup = screen.getByTestId("popup");
  fireEvent(popup, new FakeToggleEvent("toggle", { newState: "open" }));

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith(expect.objectContaining({ newState: "open" }));
});

test('calls callback when popup receives toggle event with newState "closed"', () => {
  const callback = vi.fn();
  render(<TestComponent callback={callback} />);

  const popup = screen.getByTestId("popup");
  fireEvent(popup, new FakeToggleEvent("toggle", { newState: "closed" }));

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith(expect.objectContaining({ newState: "closed" }));
});

test("calls callback multiple times for multiple toggle events", () => {
  const callback = vi.fn();
  render(<TestComponent callback={callback} />);

  const popup = screen.getByTestId("popup");

  fireEvent(popup, new FakeToggleEvent("toggle", { newState: "open" }));
  fireEvent(popup, new FakeToggleEvent("toggle", { newState: "closed" }));
  fireEvent(popup, new FakeToggleEvent("toggle", { newState: "open" }));

  expect(callback).toHaveBeenCalledTimes(3);
});

test("handles unattached ID gracefully", () => {
  const callback = vi.fn();

  function NoIDTestComponent() {
    useComboboxPopupObserver("non-existent-popup-id", callback);
    return <div>Test</div>;
  }

  expect(() => render(<NoIDTestComponent />)).not.toThrow();

  const popup = document.createElement("div");
  popup.id = "some-other-id";
  document.body.appendChild(popup);

  fireEvent(popup, new FakeToggleEvent("toggle", { newState: "open" }));

  expect(callback).not.toHaveBeenCalled();

  document.body.removeChild(popup);
});

test("cleans up event listener on unmount", () => {
  const abortSpy = vi.spyOn(AbortController.prototype, "abort");
  const callback = vi.fn();

  const { unmount } = render(<TestComponent callback={callback} />);
  unmount();

  expect(abortSpy).toHaveBeenCalled();
});

test("uses latest callback when callback changes", () => {
  const callback1 = vi.fn();
  const callback2 = vi.fn();

  const { rerender } = render(<TestComponent callback={callback1} />);

  const popup = screen.getByTestId("popup");
  fireEvent(popup, new FakeToggleEvent("toggle", { newState: "open" }));

  expect(callback1).toHaveBeenCalledTimes(1);
  expect(callback2).not.toHaveBeenCalled();

  rerender(<TestComponent callback={callback2} />);

  fireEvent(popup, new FakeToggleEvent("toggle", { newState: "closed" }));

  expect(callback1).toHaveBeenCalledTimes(1);
  expect(callback2).toHaveBeenCalledTimes(1);
});

interface TestComponentProps {
  callback: (event: ToggleEvent) => void;
}

function TestComponent({ callback }: TestComponentProps) {
  useComboboxPopupObserver("popup-id", callback);
  return <div id="popup-id" data-testid="popup" />;
}
