import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

import { AtAGlanceCardContext } from "../../context";
import { AtAGlanceCardDescription } from "../description";

test('renders a p element when as="article"', () => {
  render(<AtAGlanceCardDescription>Test Description</AtAGlanceCardDescription>, {
    wrapper: (props) => <Wrapper {...props} as="article" />,
  });
  const description = screen.getByText("Test Description");
  expect(description.tagName).toBe("P");
});

test('renders a span element when as="a"', () => {
  render(<AtAGlanceCardDescription>Test Description</AtAGlanceCardDescription>, {
    wrapper: (props) => <Wrapper {...props} as="a" />,
  });
  const description = screen.getByText("Test Description");
  expect(description.tagName).toBe("SPAN");
});

test('renders a span element when as="button"', () => {
  render(<AtAGlanceCardDescription>Test Description</AtAGlanceCardDescription>, {
    wrapper: (props) => <Wrapper {...props} as="button" />,
  });
  const description = screen.getByText("Test Description");
  expect(description.tagName).toBe("SPAN");
});

test("forwards additional props to the element", () => {
  render(
    <AtAGlanceCardDescription data-testid="custom-desc">Test Description</AtAGlanceCardDescription>,
    {
      wrapper: (props) => <Wrapper {...props} as="article" />,
    },
  );
  expect(screen.getByTestId("custom-desc")).toBeVisible();
});

test("applies custom className", () => {
  render(
    <AtAGlanceCardDescription className="custom-class">Test Description</AtAGlanceCardDescription>,
    {
      wrapper: (props) => <Wrapper {...props} as="article" />,
    },
  );
  expect(screen.getByText("Test Description")).toHaveClass("custom-class");
});

test("throws error when rendered outside context", () => {
  const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => {
    render(<AtAGlanceCardDescription>Test Description</AtAGlanceCardDescription>);
  }).toThrow("useAtAGlanceCardContext requires an AtAGlance.Card ancestor");

  consoleError.mockRestore();
});

interface WrapperProps {
  children: ReactNode;
  as: AtAGlanceCardContext.Value["as"];
}

function Wrapper({ children, as }: WrapperProps) {
  return <AtAGlanceCardContext.Provider value={{ as }}>{children}</AtAGlanceCardContext.Provider>;
}
