import { renderHook, act } from "@testing-library/react";

import { THEME_LOCAL_STOREAGE_KEY, useDeprecatedTheme } from "..";

describe("use-theme", () => {
  let store: Record<string, string> = {};

  const localStorageMock = {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };

  beforeEach(() => {
    store = {};
    vi.stubGlobal("localStorage", localStorageMock);
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("can load use-theme", () => {
    const { result } = renderHook(() => useDeprecatedTheme({ initialSelection: "default" }));

    expect(result.current.currentTheme).toBe("default");

    act(() => {
      result.current.toggleTheme("new-theme");
    });

    expect(result.current.currentTheme).toBe("new-theme");
    expect(JSON.parse(localStorage.getItem(THEME_LOCAL_STOREAGE_KEY) as string).theme).toBe(
      "new-theme",
    );
  });

  it("can load use-theme with localstorage preset", () => {
    localStorage.setItem(THEME_LOCAL_STOREAGE_KEY, JSON.stringify({ theme: "my-saved-theme" }));

    const { result } = renderHook(() => useDeprecatedTheme({ initialSelection: "default" }));

    expect(result.current.currentTheme).toBe("my-saved-theme");

    act(() => {
      result.current.toggleTheme("another-theme");
    });

    expect(result.current.currentTheme).toBe("another-theme");
    expect(JSON.parse(localStorage.getItem(THEME_LOCAL_STOREAGE_KEY) as string).theme).toBe(
      "another-theme",
    );
  });
});
