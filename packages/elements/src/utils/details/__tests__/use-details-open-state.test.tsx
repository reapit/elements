import { fireEvent, render, screen } from "@testing-library/react";
import { useRef } from "react";

import { useDetailsOpenState } from "../use-details-open-state";

test("returns false when details is closed", () => {
  render(<TestComponent />);
  expect(screen.getByTestId("status")).toHaveTextContent("closed");
});

test("returns true when details is open", () => {
  render(<TestComponent open />);
  expect(screen.getByTestId("status")).toHaveTextContent("open");
});

test("updates when details is toggled open", () => {
  render(<TestComponent />);
  fireEvent.click(screen.getByText("Summary"));
  expect(screen.getByTestId("status")).toHaveTextContent("open");
});

test("updates when details is toggled closed", () => {
  render(<TestComponent open />);
  fireEvent.click(screen.getByText("Summary"));
  expect(screen.getByTestId("status")).toHaveTextContent("closed");
});

test("handles null ref gracefully", () => {
  const NullRefComponent = () => {
    const ref = useRef<HTMLDetailsElement>(null);
    const isOpen = useDetailsOpenState(ref);
    return <div data-testid="status">{isOpen ? "open" : "closed"}</div>;
  };

  render(<NullRefComponent />);
  expect(screen.getByTestId("status")).toHaveTextContent("closed");
});

test("cleans up event listener on unmount", () => {
  const removeEventListenerSpy = vi.spyOn(HTMLDetailsElement.prototype, "removeEventListener");
  const { unmount } = render(<TestComponent />);
  unmount();

  expect(removeEventListenerSpy).toHaveBeenCalledWith("toggle", expect.any(Function));
  removeEventListenerSpy.mockRestore();
});

test("uses initialOpen for the initial render value", () => {
  const InitialOpenComponent = () => {
    const ref = useRef<HTMLDetailsElement>(null);
    const isOpen = useDetailsOpenState(ref, true);
    return <div data-testid="status">{isOpen ? "open" : "closed"}</div>;
  };

  render(<InitialOpenComponent />);
  expect(screen.getByTestId("status")).toHaveTextContent("open");
});

interface TestComponentProps {
  open?: boolean;
}

function TestComponent({ open }: TestComponentProps) {
  const ref = useRef<HTMLDetailsElement>(null);
  const isOpen = useDetailsOpenState(ref, open);
  return (
    <>
      <details ref={ref} open={open} data-testid="details">
        <summary>Summary</summary>
        Content
      </details>
      <div data-testid="status">{isOpen ? "open" : "closed"}</div>
    </>
  );
}
