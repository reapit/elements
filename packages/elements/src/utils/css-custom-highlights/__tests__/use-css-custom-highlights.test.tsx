import { cleanup, render } from "@testing-library/react";
import { useRef } from "react";

import { useCSSCustomHighlights } from "../use-css-custom-highlights";

// happy-dom does not implement the CSS Custom Highlight API, so we stub the pieces `highlight` needs.
class FakeHighlight {
  ranges: Range[];

  constructor(...ranges: Range[]) {
    this.ranges = ranges;
  }
}

function stubHighlightApi() {
  const highlights = new Map<string, FakeHighlight>();
  vi.stubGlobal("CSS", { highlights });
  vi.stubGlobal("Highlight", FakeHighlight);
  return highlights;
}

afterEach(() => {
  // Unmount (which runs the highlight cleanup) before un-stubbing the CSS Custom Highlight API globals.
  cleanup();
  vi.unstubAllGlobals();
});

function TestComponent({ name, query, text }: { name: string; query: string; text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useCSSCustomHighlights(name, query, ref);
  return <div ref={ref}>{text}</div>;
}

test("registers a highlight for the referenced element", () => {
  const highlights = stubHighlightApi();

  render(<TestComponent name="test-highlight" query="ipsum" text="Lorem ipsum dolor sit amet." />);

  expect(highlights.has("test-highlight")).toBe(true);
});

test("removes the highlight on unmount", () => {
  const highlights = stubHighlightApi();

  const { unmount } = render(
    <TestComponent name="test-highlight" query="ipsum" text="Lorem ipsum dolor sit amet." />,
  );
  expect(highlights.has("test-highlight")).toBe(true);

  unmount();

  expect(highlights.has("test-highlight")).toBe(false);
});

test("re-applies the highlight when the query changes", () => {
  const highlights = stubHighlightApi();

  const { rerender } = render(
    <TestComponent name="test-highlight" query="ipsum" text="Lorem ipsum dolor sit amet." />,
  );
  const first = highlights.get("test-highlight");
  expect(first?.ranges).toHaveLength(1);

  rerender(
    <TestComponent name="test-highlight" query="dolor" text="Lorem ipsum dolor sit amet." />,
  );
  const second = highlights.get("test-highlight");
  expect(second?.ranges[0]?.toString()).toBe("dolor");
});
