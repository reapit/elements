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

test("keeps hasError as false on initial load success", () => {
  const { result, rerender } = renderHook(({ src }) => useImage({ src }), {
    initialProps: { src: "valid.png" },
  });

  act(() => {
    result.current.handleLoad(new Event("load") as unknown as SyntheticEvent<HTMLImageElement>);
  });
  rerender({ src: "valid.png" });

  expect(result.current.hasError).toBe(false);
});

test("sets hasError to true on initial load failure", () => {
  const { result } = renderHook(({ src }) => useImage({ src }), {
    initialProps: { src: "broken.png" },
  });

  act(() => {
    result.current.handleError(new Event("error") as unknown as SyntheticEvent<HTMLImageElement>);
  });

  expect(result.current.hasError).toBe(true);
});

test("resets hasError when src changes after a previous load error", () => {
  const { result, rerender } = renderHook(({ src }) => useImage({ src }), {
    initialProps: { src: "broken.png" },
  });

  act(() => {
    result.current.handleError(new Event("error") as unknown as SyntheticEvent<HTMLImageElement>);
  });
  expect(result.current.hasError).toBe(true);

  rerender({ src: "valid.png" });

  expect(result.current.hasError).toBe(false);
});

test("resets hasError when srcSet changes after a previous load error", () => {
  const { result, rerender } = renderHook(({ srcSet }) => useImage({ src: "same.png", srcSet }), {
    initialProps: { srcSet: "broken-2x.png 2x" },
  });

  act(() => {
    result.current.handleError(new Event("error") as unknown as SyntheticEvent<HTMLImageElement>);
  });
  expect(result.current.hasError).toBe(true);

  rerender({ srcSet: "valid-2x.png 2x" });

  expect(result.current.hasError).toBe(false);
});
