import { act, renderHook } from "@testing-library/react";
import type { DragEvent } from "react";

import { useFileDropzone } from "../use-file-dropzone";

afterEach(() => {
  document.body.innerHTML = "";
});

// ---------------------------------------------------------------------------
// isDraggingOver
// ---------------------------------------------------------------------------

test("starts with isDraggingOver false", () => {
  const { result } = renderHook(() => useDropzone());
  expect(result.current.isDraggingOver).toBe(false);
});

test("sets isDraggingOver to true on dragenter carrying files", () => {
  const { result } = renderHook(() => useDropzone());

  act(() => result.current.dropzoneProps.onDragEnter(makeDragEvent(["Files"])));

  expect(result.current.isDraggingOver).toBe(true);
});

test("ignores a dragenter that carries no files", () => {
  const { result } = renderHook(() => useDropzone());

  act(() => result.current.dropzoneProps.onDragEnter(makeDragEvent(["text/plain"])));

  expect(result.current.isDraggingOver).toBe(false);
});

test("does not set isDraggingOver while disabled", () => {
  const { result } = renderHook(() => useDropzone({ disabled: true }));

  act(() => result.current.dropzoneProps.onDragEnter(makeDragEvent(["Files"])));

  expect(result.current.isDraggingOver).toBe(false);
});

test("clears isDraggingOver once dragleave brings the net depth back to zero", () => {
  const { result } = renderHook(() => useDropzone());

  act(() => result.current.dropzoneProps.onDragEnter(makeDragEvent(["Files"])));
  act(() => result.current.dropzoneProps.onDragLeave(makeDragEvent(["Files"])));

  expect(result.current.isDraggingOver).toBe(false);
});

test("stays true while the net depth is above zero, as when crossing into a nested child", () => {
  const { result } = renderHook(() => useDropzone());

  act(() => result.current.dropzoneProps.onDragEnter(makeDragEvent(["Files"])));
  act(() => result.current.dropzoneProps.onDragEnter(makeDragEvent(["Files"])));
  act(() => result.current.dropzoneProps.onDragLeave(makeDragEvent(["Files"])));

  expect(result.current.isDraggingOver).toBe(true);
});

test("clears isDraggingOver on dragleave even if disabled becomes true mid-drag", () => {
  const { result, rerender } = renderHook((props) => useDropzone(props), { initialProps: {} });

  act(() => result.current.dropzoneProps.onDragEnter(makeDragEvent(["Files"])));
  rerender({ disabled: true });
  act(() => result.current.dropzoneProps.onDragLeave(makeDragEvent(["Files"])));

  expect(result.current.isDraggingOver).toBe(false);
});

// ---------------------------------------------------------------------------
// dragover
// ---------------------------------------------------------------------------

test("calls preventDefault on dragover to permit a drop", () => {
  const { result } = renderHook(() => useDropzone());
  const event = makeDragEvent(["Files"]);

  act(() => result.current.dropzoneProps.onDragOver(event));

  expect(event.preventDefault).toHaveBeenCalledTimes(1);
});

test("calls preventDefault on dragover of a file even while disabled", () => {
  const { result } = renderHook(() => useDropzone({ disabled: true }));
  const event = makeDragEvent(["Files"]);

  act(() => result.current.dropzoneProps.onDragOver(event));

  expect(event.preventDefault).toHaveBeenCalled();
});

// ---------------------------------------------------------------------------
// drop
// ---------------------------------------------------------------------------

test("assigns the dropped files to the input and dispatches a change event", () => {
  const input = createFileInput("drop-target");
  const onChange = vi.fn();
  input.addEventListener("change", onChange);
  const { result } = renderHook(() => useDropzone({ inputId: "drop-target", multiple: true }));

  const a = makeFile("a.txt");
  const b = makeFile("b.txt");
  act(() => result.current.dropzoneProps.onDrop(makeDragEvent(["Files"], [a, b])));

  expect(Array.from(input.files ?? [])).toEqual([a, b]);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(result.current.isDraggingOver).toBe(false);
});

test("keeps only the first dropped file when multiple is not set", () => {
  const input = createFileInput("drop-target");
  const { result } = renderHook(() => useDropzone({ inputId: "drop-target", multiple: false }));

  const a = makeFile("a.txt");
  const b = makeFile("b.txt");
  act(() => result.current.dropzoneProps.onDrop(makeDragEvent(["Files"], [a, b])));

  expect(Array.from(input.files ?? [])).toEqual([a]);
});

test("ignores a drop while disabled but still prevents the browser default", () => {
  const input = createFileInput("drop-target");
  const onChange = vi.fn();
  input.addEventListener("change", onChange);
  const { result } = renderHook(() => useDropzone({ inputId: "drop-target", disabled: true }));
  const event = makeDragEvent(["Files"], [makeFile("a.txt")]);

  act(() => result.current.dropzoneProps.onDrop(event));

  expect(event.preventDefault).toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
  expect(input.files).toHaveLength(0);
});

test("ignores a drop that carries no files", () => {
  const input = createFileInput("drop-target");
  const onChange = vi.fn();
  input.addEventListener("change", onChange);
  const { result } = renderHook(() => useDropzone({ inputId: "drop-target" }));

  act(() => result.current.dropzoneProps.onDrop(makeDragEvent(["text/plain"])));

  expect(onChange).not.toHaveBeenCalled();
});

test("clears isDraggingOver on drop even if disabled becomes true mid-drag", () => {
  const { result, rerender } = renderHook((props) => useDropzone(props), { initialProps: {} });

  act(() => result.current.dropzoneProps.onDragEnter(makeDragEvent(["Files"])));
  rerender({ disabled: true });
  act(() => result.current.dropzoneProps.onDrop(makeDragEvent(["Files"], [makeFile("a.txt")])));

  expect(result.current.isDraggingOver).toBe(false);
});

test("does not throw when the input element for inputId does not exist", () => {
  const { result } = renderHook(() => useDropzone({ inputId: "missing" }));

  expect(() => {
    act(() => result.current.dropzoneProps.onDrop(makeDragEvent(["Files"], [makeFile("a.txt")])));
  }).not.toThrow();
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function useDropzone(overrides: Partial<Parameters<typeof useFileDropzone>[0]> = {}) {
  return useFileDropzone({
    inputId: "input",
    disabled: false,
    accept: undefined,
    multiple: false,
    ...overrides,
  });
}

function createFileInput(id: string): HTMLInputElement {
  const input = document.createElement("input");
  input.type = "file";
  input.id = id;
  document.body.appendChild(input);
  return input;
}

function makeDragEvent(types: string[], files: File[] = []): DragEvent<HTMLElement> {
  return {
    dataTransfer: { types, files },
    preventDefault: vi.fn(),
  } as unknown as DragEvent<HTMLElement>;
}

function makeFile(name: string): File {
  return new File([new Uint8Array(10)], name);
}
