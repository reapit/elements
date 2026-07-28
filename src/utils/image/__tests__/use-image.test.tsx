import { act, renderHook } from "@testing-library/react";
import type { SyntheticEvent } from "react";

import { useImage } from "../use-image";

test("returns hasError as false by default", () => {
  const { result } = renderHook(() => useImage());
  expect(result.current.hasError).toBe(false);
});

test("sets hasError to true when handleError is called", () => {
  const { result } = renderHook(() => useImage());

  act(() => {
    result.current.handleError(new Event("error") as unknown as SyntheticEvent<HTMLImageElement>);
  });

  expect(result.current.hasError).toBe(true);
});

test("sets hasError to false when handleLoad is called after an error", () => {
  const { result } = renderHook(() => useImage());

  act(() => {
    result.current.handleError(new Event("error") as unknown as SyntheticEvent<HTMLImageElement>);
    result.current.handleLoad(new Event("load") as unknown as SyntheticEvent<HTMLImageElement>);
  });

  expect(result.current.hasError).toBe(false);
});

test("calls onError when handleError is called", () => {
  const onError = vi.fn();
  const { result } = renderHook(() => useImage({ onError }));

  act(() => {
    result.current.handleError(new Event("error") as unknown as SyntheticEvent<HTMLImageElement>);
  });

  expect(onError).toHaveBeenCalledTimes(1);
});

test("calls onLoad when handleLoad is called", () => {
  const onLoad = vi.fn();
  const { result } = renderHook(() => useImage({ onLoad }));

  act(() => {
    result.current.handleLoad(new Event("load") as unknown as SyntheticEvent<HTMLImageElement>);
  });

  expect(onLoad).toHaveBeenCalledTimes(1);
});
