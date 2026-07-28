import { fireEvent, render, screen } from "@testing-library/react";

import { maybeCloseOnBackdropClick } from "#src/utils/dialog/close-on-backdrop-click";

describe("maybeCloseOnBackdropClick", () => {
  test('closes the dialog when clicking backdrop, closedBy is "any" and consumeBackdropClick is true', () => {
    const closeSpy = vi.fn();
    render(<TestComponent closeSpy={closeSpy} closedBy="any" consumeBackdropClick />);

    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog);

    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  test("closes the dialog when consumeBackdropClick is false and closedBy is not natively supported", () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(
      HTMLDialogElement.prototype,
      "closedBy",
    );
    delete (HTMLDialogElement.prototype as { closedBy?: unknown }).closedBy;

    try {
      const closeSpy = vi.fn();
      render(<TestComponent closeSpy={closeSpy} closedBy="any" consumeBackdropClick={false} />);

      const dialog = screen.getByRole("dialog");
      fireEvent.click(dialog);

      expect(closeSpy).toHaveBeenCalledTimes(1);
    } finally {
      if (originalDescriptor) {
        Object.defineProperty(HTMLDialogElement.prototype, "closedBy", originalDescriptor);
      }
    }
  });

  test("does not close the dialog when consumeBackdropClick is false and closedBy is natively supported", () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(
      HTMLDialogElement.prototype,
      "closedBy",
    );
    Object.defineProperty(HTMLDialogElement.prototype, "closedBy", {
      value: "any",
      configurable: true,
    });

    try {
      const closeSpy = vi.fn();
      render(<TestComponent closeSpy={closeSpy} closedBy="any" consumeBackdropClick={false} />);

      const dialog = screen.getByRole("dialog");
      fireEvent.click(dialog);

      expect(closeSpy).not.toHaveBeenCalled();
    } finally {
      if (originalDescriptor) {
        Object.defineProperty(HTMLDialogElement.prototype, "closedBy", originalDescriptor);
      } else {
        delete (HTMLDialogElement.prototype as { closedBy?: unknown }).closedBy;
      }
    }
  });

  test("does not close the dialog when it is already closed", () => {
    const closeSpy = vi.fn();
    render(<TestComponent closeSpy={closeSpy} closedBy="any" consumeBackdropClick alreadyClosed />);

    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog);

    expect(closeSpy).not.toHaveBeenCalled();
  });

  test('does not close the dialog when closedBy is "closerequest"', () => {
    const closeSpy = vi.fn();
    render(<TestComponent closeSpy={closeSpy} closedBy="closerequest" consumeBackdropClick />);

    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog);

    expect(closeSpy).not.toHaveBeenCalled();
  });

  test('does not close the dialog when closedBy is "none"', () => {
    const closeSpy = vi.fn();
    render(<TestComponent closeSpy={closeSpy} closedBy="none" consumeBackdropClick />);

    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog);

    expect(closeSpy).not.toHaveBeenCalled();
  });

  test("does not close the dialog when clicking child content", () => {
    const closeSpy = vi.fn();
    render(<TestComponent closeSpy={closeSpy} closedBy="any" consumeBackdropClick />);

    const content = screen.getByText("Dialog Content");
    fireEvent.click(content);

    expect(closeSpy).not.toHaveBeenCalled();
  });

  test("does not close when event target does not match currentTarget", () => {
    const closeSpy = vi.fn();
    render(<TestComponent closeSpy={closeSpy} closedBy="any" consumeBackdropClick />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(closeSpy).not.toHaveBeenCalled();
  });
});

interface TestComponentProps {
  closedBy: "any" | "closerequest" | "none";
  consumeBackdropClick: boolean;
  closeSpy: () => void;
  alreadyClosed?: boolean;
}

function TestComponent({
  closedBy,
  consumeBackdropClick,
  closeSpy,
  alreadyClosed,
}: TestComponentProps) {
  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (alreadyClosed) {
      // Simulates a consumer closing the dialog in their own `onClick`, which fires before
      // this handler.
      event.currentTarget.removeAttribute("open");
    }
    maybeCloseOnBackdropClick(event, closedBy, consumeBackdropClick);
  };

  return (
    <dialog
      open
      onClick={handleClick}
      ref={(dialog) => {
        if (dialog) {
          dialog.close = closeSpy;
        }
      }}
    >
      <div>
        Dialog Content
        <button>Close</button>
      </div>
    </dialog>
  );
}
