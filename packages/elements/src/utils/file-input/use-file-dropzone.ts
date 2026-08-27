import { useRef, useState } from "react";
import type { DragEvent } from "react";

import { getInputElement } from "./get-input-element";
import { syncInputFiles } from "./sync-input-files";
import { filterDroppedFiles } from "./validate-files";

export namespace useFileDropzone {
  export interface Result {
    /** Whether a file is currently being dragged over the dropzone. */
    isDraggingOver: boolean;
    /** Spread onto whichever element is the drop target. Internal to `FileInput`; always wired
     * onto `ElFileInputWrapper`, never exposed to a consumer, so there's no external `onDrag*`/
     * `onDrop` to merge these with. */
    dropzoneProps: {
      onDragEnter: (event: DragEvent<HTMLElement>) => void;
      onDragOver: (event: DragEvent<HTMLElement>) => void;
      onDragLeave: (event: DragEvent<HTMLElement>) => void;
      onDrop: (event: DragEvent<HTMLElement>) => void;
    };
  }
}

/**
 * Drives `FileInput`'s drag-and-drop: tracks whether a file is currently being dragged over the
 * dropzone, and on drop, funnels into the exact same native `change` path browsing already uses;
 * assigns the dropped `DataTransfer`'s files onto the real input's `.files` via `syncInputFiles`,
 * then dispatches a genuine `change` event on it. `handleChange` in `file-input.tsx` is the single
 * place that reacts to a new selection either way; this hook never touches component state directly.
 *
 * `dragenter`/`dragleave` fire on every element boundary crossed while dragging, including nested
 * children; a plain boolean flips false the moment the pointer crosses into a child of the
 * dropzone. A counter, incremented on `dragenter` and decremented on `dragleave`, tracks net depth
 * instead: `isDraggingOver` stays true until the count returns to zero.
 */
export function useFileDropzone({
  inputId,
  disabled,
  accept,
  multiple,
}: {
  inputId: string;
  disabled: boolean;
  accept: string | undefined;
  multiple: boolean;
}): useFileDropzone.Result {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const dragDepth = useRef(0);

  function isFileDrag(event: DragEvent<HTMLElement>): boolean {
    return event.dataTransfer.types.includes("Files");
  }

  function handleDragEnter(event: DragEvent<HTMLElement>) {
    if (disabled || !isFileDrag(event)) return;
    dragDepth.current += 1;
    setIsDraggingOver(true);
  }

  function handleDragOver(event: DragEvent<HTMLElement>) {
    if (!isFileDrag(event)) return;
    // A drop is only permitted on a target whose `dragover` calls `preventDefault()`; otherwise
    // the browser rejects it outright, regardless of any `drop` handler. Always call this, even
    // while disabled: without it a dropped file falls through to the browser's default handling
    // (navigating to/opening the file) instead of being silently swallowed.
    event.preventDefault();
    if (disabled) return;
  }

  function handleDragLeave(event: DragEvent<HTMLElement>) {
    // Not gated on `disabled`: `disabled` can flip true mid-drag, and skipping this would leave
    // `dragDepth`/`isDraggingOver` stuck from whatever state the drag was in when it changed.
    if (!isFileDrag(event)) return;
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setIsDraggingOver(false);
  }

  function handleDrop(event: DragEvent<HTMLElement>) {
    if (!isFileDrag(event)) return;
    event.preventDefault();
    // Same reasoning as `handleDragLeave` above; reset drag state regardless of `disabled`,
    // before gating the actual file selection on it.
    dragDepth.current = 0;
    setIsDraggingOver(false);
    if (disabled) return;

    const input = getInputElement(inputId);
    if (!input) return;

    // The browser only enforces `accept`/`multiple` against the OS picker dialog, never against
    // drag-and-drop; filter here to match what browsing would have already delivered by this
    // point, so the dispatched `change` event below is indistinguishable from a browse round.
    const files = filterDroppedFiles(Array.from(event.dataTransfer.files), { accept, multiple });
    syncInputFiles(input, files);
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }

  return {
    isDraggingOver,
    dropzoneProps: {
      onDragEnter: handleDragEnter,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
  };
}
