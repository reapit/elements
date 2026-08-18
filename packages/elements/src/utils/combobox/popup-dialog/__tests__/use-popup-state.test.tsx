import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { useComboboxPopupState } from "../use-popup-state";
import { FakeToggleEvent } from "./FakeToggleEvent";

test("returns false initially", () => {
  render(<TestComponent />);
  expect(screen.getByText("false")).toBeInTheDocument();
});

test('returns true when popup receives toggle event with newState "open"', async () => {
  render(<TestComponent />);

  const popup = screen.getByTestId("popup");
  fireEvent(popup, new FakeToggleEvent("toggle", { newState: "open" }));

  await waitFor(() => {
    expect(screen.getByText("true")).toBeInTheDocument();
  });
});

test('returns false when popup receives toggle event with newState "closed"', async () => {
  render(<TestComponent />);

  const popup = screen.getByTestId("popup");

  fireEvent(popup, new FakeToggleEvent("toggle", { newState: "open" }));

  await waitFor(() => {
    expect(screen.getByText("true")).toBeInTheDocument();
  });

  fireEvent(popup, new FakeToggleEvent("toggle", { newState: "closed" }));

  await waitFor(() => {
    expect(screen.getByText("false")).toBeInTheDocument();
  });
});

test("handles multiple toggle events correctly", async () => {
  render(<TestComponent />);

  const popup = screen.getByTestId("popup");

  // Open
  fireEvent(popup, new FakeToggleEvent("toggle", { newState: "open" }));
  await waitFor(() => {
    expect(screen.getByText("true")).toBeInTheDocument();
  });

  // Close
  fireEvent(popup, new FakeToggleEvent("toggle", { newState: "closed" }));
  await waitFor(() => {
    expect(screen.getByText("false")).toBeInTheDocument();
  });

  // Open again
  fireEvent(popup, new FakeToggleEvent("toggle", { newState: "open" }));
  await waitFor(() => {
    expect(screen.getByText("true")).toBeInTheDocument();
  });
});

test("handles unattached ID gracefully", () => {
  function NoIDTestComponent() {
    const isOpen = useComboboxPopupState("popup-id");
    return <div>{String(isOpen)}</div>;
  }

  render(<NoIDTestComponent />);
  expect(screen.queryByText("false")).toBeInTheDocument();
});

function TestComponent() {
  const isOpen = useComboboxPopupState("popup-id");
  return (
    <div id="popup-id" data-testid="popup">
      {String(isOpen)}
    </div>
  );
}
