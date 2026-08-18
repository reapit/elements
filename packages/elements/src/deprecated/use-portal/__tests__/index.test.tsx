import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import React from "react";

import { usePortal, Portal } from "../index";

describe("usePortal", () => {
  it("should return a target  div correctly", async () => {
    const { result } = renderHook<{}, {}>(() => usePortal("some-div"));

    expect(result.current).toMatchSnapshot();
  });
});

describe("Portal", () => {
  it("should match a snapshot and render children", async () => {
    expect(render(<Portal id="some-id">I am some content</Portal>).asFragment()).toMatchSnapshot();
  });
});
