import { render, screen } from "@testing-library/react";

import { Heading } from "../heading";

test("renders as <h2> by default", () => {
  render(<Heading>Test Heading</Heading>);
  const el = screen.getByRole("heading", { level: 2 });
  expect(el.tagName).toBe("H2");
});

test("renders as the specified heading element", () => {
  render(<Heading as="h1">Level 1</Heading>);
  const el = screen.getByRole("heading", { level: 1 });
  expect(el.tagName).toBe("H1");
});

test("renders all heading levels correctly", () => {
  const { rerender } = render(<Heading as="h3">Level 3</Heading>);
  expect(screen.getByRole("heading", { level: 3 }).tagName).toBe("H3");

  rerender(<Heading as="h4">Level 4</Heading>);
  expect(screen.getByRole("heading", { level: 4 }).tagName).toBe("H4");

  rerender(<Heading as="h5">Level 5</Heading>);
  expect(screen.getByRole("heading", { level: 5 }).tagName).toBe("H5");

  rerender(<Heading as="h6">Level 6</Heading>);
  expect(screen.getByRole("heading", { level: 6 }).tagName).toBe("H6");
});

test("applies data attributes for colour and font", () => {
  render(
    <Heading as="h3" colour="primary" font="text-2xl/bold">
      Styled Heading
    </Heading>,
  );
  const el = screen.getByRole("heading", { level: 3 });
  expect(el).toHaveAttribute("data-colour", "primary");
  expect(el).toHaveAttribute("data-font-size", "2xl");
  expect(el).toHaveAttribute("data-font-weight", "bold");
});

test("defaults to inherit for font and colour when not specified", () => {
  render(<Heading>Default Heading</Heading>);
  const el = screen.getByRole("heading", { level: 2 });
  expect(el).toHaveAttribute("data-colour", "inherit");
  expect(el).toHaveAttribute("data-font-size", "inherit");
  expect(el).toHaveAttribute("data-font-weight", "inherit");
});

test("parses font prop into size and weight correctly", () => {
  render(<Heading font="text-3xl/bold">Large Heading</Heading>);
  const el = screen.getByRole("heading", { level: 2 });
  expect(el).toHaveAttribute("data-font-size", "3xl");
  expect(el).toHaveAttribute("data-font-weight", "bold");
});

test("forwards additional HTML attributes", () => {
  render(
    <Heading as="h1" id="page-title" aria-label="Main Title">
      Page Title
    </Heading>,
  );
  const el = screen.getByRole("heading", { level: 1 });
  expect(el).toHaveAttribute("id", "page-title");
  expect(el).toHaveAttribute("aria-label", "Main Title");
});

test("applies custom className alongside base styles", () => {
  const customClass = "my-custom-class";
  render(<Heading className={customClass}>Custom</Heading>);
  const el = screen.getByRole("heading", { level: 2 });
  expect(el.className).toContain(customClass);
});
