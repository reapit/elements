import { render, waitFor } from "@testing-library/react";
import { useRef } from "react";
import type { ReactNode } from "react";

import { useMutationObserver } from "../use-mutation-observer";

test("observes element mutations via ref", async () => {
  const callback = vi.fn();
  const options: MutationObserverInit = { childList: true };
  const { rerender } = render(
    <TestObserverWithRef callback={callback} options={options}>
      <span>Element 1</span>
    </TestObserverWithRef>,
  );

  rerender(
    <TestObserverWithRef callback={callback} options={options}>
      <span>Element 1</span>
      <span>Element 2</span>
    </TestObserverWithRef>,
  );

  await waitFor(() => {
    expect(callback).toHaveBeenCalled();
  });
});

test("observes element mutations when via ID", async () => {
  const callback = vi.fn();
  const options: MutationObserverInit = { childList: true };
  const { rerender } = render(
    <TestObserverWithId key="1" callback={callback} options={options}>
      <span>Element 1</span>
    </TestObserverWithId>,
  );

  rerender(
    <TestObserverWithId key="1" callback={callback} options={{ childList: true }}>
      <span>Element 1</span>
      <span>Element 2</span>
    </TestObserverWithId>,
  );

  await waitFor(() => {
    expect(callback).toHaveBeenCalled();
  });
});

test("passes options to observer.observe", () => {
  const callback = vi.fn();
  const options = { childList: true, attributes: true, subtree: true };
  const observeSpy = vi.spyOn(MutationObserver.prototype, "observe");

  render(<TestObserverWithRef callback={callback} options={options} />);

  expect(observeSpy).toHaveBeenCalledWith(expect.any(Element), options);
  observeSpy.mockRestore();
});

test("disconnects observer on cleanup", () => {
  const callback = vi.fn();
  const options: MutationObserverInit = { childList: true };
  const disconnectSpy = vi.spyOn(MutationObserver.prototype, "disconnect");
  const { unmount } = render(<TestObserverWithRef callback={callback} options={options} />);

  unmount();
  expect(disconnectSpy).toHaveBeenCalled();

  disconnectSpy.mockRestore();
});

test("calls takeRecords and processes pending mutations on cleanup", () => {
  const callback = vi.fn();
  const options: MutationObserverInit = { childList: true };
  const mockMutations: MutationRecord[] = [
    { fake: "mutation record" } as unknown as MutationRecord,
  ];
  const takeRecordsSpy = vi
    .spyOn(MutationObserver.prototype, "takeRecords")
    .mockReturnValue(mockMutations);
  const { unmount } = render(<TestObserverWithRef callback={callback} options={options} />);

  unmount();

  expect(takeRecordsSpy).toHaveBeenCalled();
  expect(callback).toHaveBeenCalledWith(mockMutations, expect.any(MutationObserver));

  takeRecordsSpy.mockRestore();
});

test("does not call callback when takeRecords returns empty array on cleanup", () => {
  const callback = vi.fn();
  const options: MutationObserverInit = { childList: true };
  const takeRecordsSpy = vi.spyOn(MutationObserver.prototype, "takeRecords").mockReturnValue([]);
  const { unmount } = render(<TestObserverWithRef callback={callback} options={options} />);

  unmount();

  expect(takeRecordsSpy).toHaveBeenCalled();
  expect(callback).not.toHaveBeenCalled();

  takeRecordsSpy.mockRestore();
});

test("does not observe when element does not exist (ref)", () => {
  function TestObserver({ callback, options = {}, children }: TestObserverProps) {
    const ref = useRef<HTMLDivElement>(null);
    useMutationObserver(ref, callback, options);
    // NOTE: ref not attached
    return <div>{children}</div>;
  }

  const callback = vi.fn();
  const observeSpy = vi.spyOn(MutationObserver.prototype, "observe");

  render(<TestObserver callback={callback} options={{ childList: true }} />);

  expect(observeSpy).not.toHaveBeenCalled();
  observeSpy.mockRestore();
});

test("does not observe when element does not exist (ID)", () => {
  function TestObserver({ callback, options = {}, children }: TestObserverProps) {
    // NOTE: ID does not reference an element
    useMutationObserver("not-an-element", callback, options);
    return <div>{children}</div>;
  }

  const callback = vi.fn();
  const observeSpy = vi.spyOn(MutationObserver.prototype, "observe");

  render(<TestObserver callback={callback} options={{ childList: true }} />);

  expect(observeSpy).not.toHaveBeenCalled();
  observeSpy.mockRestore();
});

interface TestObserverProps {
  callback: MutationCallback;
  options?: MutationObserverInit;
  children?: ReactNode;
}

function TestObserverWithRef({ callback, options, children }: TestObserverProps) {
  const ref = useRef<HTMLDivElement>(null);
  useMutationObserver(ref, callback, options || {});
  return <div ref={ref}>{children}</div>;
}

function TestObserverWithId({ callback, options, children }: TestObserverProps) {
  useMutationObserver("target-id", callback, options || {});
  return <div id="target-id">{children}</div>;
}
