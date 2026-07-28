import { render, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";

import { useListboxSelectionObserver } from "../use-selection-observer";

test("invokes callback with initial selection on mount", () => {
  const callback = vi.fn();

  render(
    <TestListboxObserver callback={callback}>
      <button role="option" value="1">
        Option 1
      </button>
      <button role="option" value="2">
        Option 2
      </button>
    </TestListboxObserver>,
  );

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith([], "");
});

test("invokes callback when aria-checked attribute changes", async () => {
  const callback = vi.fn();

  const { rerender } = render(
    <TestListboxObserver callback={callback}>
      <button role="option" value="1">
        Option 1
      </button>
    </TestListboxObserver>,
  );

  rerender(
    <TestListboxObserver callback={callback}>
      <button aria-checked role="option" value="1">
        Option 1
      </button>
    </TestListboxObserver>,
  );

  await waitFor(() => expect(callback).toHaveBeenCalledTimes(2));
  expect(callback).toHaveBeenLastCalledWith([expect.any(HTMLButtonElement)], "");
});

test("invokes callback when aria-selected attribute changes", async () => {
  const callback = vi.fn();

  const { rerender } = render(
    <TestListboxObserver callback={callback}>
      <button role="option" value="1">
        Option 1
      </button>
    </TestListboxObserver>,
  );

  rerender(
    <TestListboxObserver callback={callback}>
      <button aria-selected role="option" value="1">
        Option 1
      </button>
    </TestListboxObserver>,
  );

  await waitFor(() => expect(callback).toHaveBeenCalledTimes(2));
  expect(callback).toHaveBeenLastCalledWith([expect.any(HTMLButtonElement)], "");
});

test("does not invoke callback for other attribute changes", async () => {
  const callback = vi.fn();
  const { rerender } = render(
    <TestListboxObserver callback={callback}>
      <button role="option" value="1">
        Option 1
      </button>
    </TestListboxObserver>,
  );

  rerender(
    <TestListboxObserver callback={callback}>
      <button data-testid="test" role="option" value="1">
        Option 1
      </button>
    </TestListboxObserver>,
  );

  // Only call will be the initial one made on mount
  await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));
});

test("observes selection changes in subtree", async () => {
  const callback = vi.fn();
  const { rerender } = render(
    <TestListboxObserver callback={callback}>
      <div role="group">
        <button role="option" value="1">
          Option 1
        </button>
      </div>
    </TestListboxObserver>,
  );

  rerender(
    <TestListboxObserver callback={callback}>
      <div role="group">
        <button aria-checked role="option" value="1">
          Option 1
        </button>
      </div>
    </TestListboxObserver>,
  );

  await waitFor(() => expect(callback).toHaveBeenCalledTimes(2));
});

test("invokes callback when option elements are added to select", async () => {
  const callback = vi.fn();
  const { rerender } = render(
    <TestListboxObserver
      callback={callback}
      selectChildren={<option value="1">Option 1</option>}
    />,
  );

  // Clear initial mount call
  callback.mockClear();

  rerender(
    <TestListboxObserver
      callback={callback}
      selectChildren={
        <>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </>
      }
    />,
  );

  await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));
});

test("invokes callback when option elements are removed from select", async () => {
  const callback = vi.fn();
  const { rerender } = render(
    <TestListboxObserver
      callback={callback}
      selectChildren={
        <>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </>
      }
    />,
  );

  // Clear initial mount call
  callback.mockClear();

  rerender(
    <TestListboxObserver
      callback={callback}
      selectChildren={<option value="1">Option 1</option>}
    />,
  );

  await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));
});

interface TestListboxObserverProps {
  listboxId?: string;
  callback: (
    selectedOptions: HTMLButtonElement[],
    listboxState: string | readonly string[],
  ) => void;
  /** Children to render as visible listbox options */
  children?: ReactNode;
  /** Children to render inside the hidden select element */
  selectChildren?: ReactNode;
}

function TestListboxObserver({
  listboxId = "test-listbox",
  callback,
  children,
  selectChildren,
}: TestListboxObserverProps) {
  useListboxSelectionObserver(listboxId, callback);
  return (
    <div id={listboxId} role="listbox">
      <select id={`${listboxId}-select`} hidden>
        {selectChildren}
      </select>
      {children}
    </div>
  );
}
