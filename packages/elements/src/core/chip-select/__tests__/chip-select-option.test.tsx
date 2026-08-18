import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

import { ChipSelect } from "../chip-select";
import { ChipSelectOption } from "../chip-select-option";
import { ChipSelectContext } from "../context";

test("renders as checkbox element", () => {
  render(<ChipSelectOption value="test-value">Test Option</ChipSelectOption>, {
    wrapper: createWrapper({ containerRef: { current: null }, multiple: false, size: "medium" }),
  });
  expect(screen.getByRole("checkbox")).toBeVisible();
});

test("passes context `form` prop to ChipSelectChip", () => {
  render(<ChipSelectOption value="test-value">Test Option</ChipSelectOption>, {
    wrapper: createWrapper({
      containerRef: { current: null },
      form: "test-form",
      multiple: false,
      size: "medium",
    }),
  });
  expect(screen.getByRole("checkbox")).toHaveAttribute("form", "test-form");
});

test("passes context `name` prop to ChipSelectChip", () => {
  render(<ChipSelectOption value="test-value">Test Option</ChipSelectOption>, {
    wrapper: createWrapper({
      containerRef: { current: null },
      multiple: false,
      name: "test-name",
      size: "medium",
    }),
  });
  expect(screen.getByRole("checkbox")).toHaveAttribute("name", "test-name");
});

test("passes context `size` prop to ChipSelectChip", () => {
  const { container } = render(
    <ChipSelectOption value="test-value">Test Option</ChipSelectOption>,
    {
      wrapper: createWrapper({ containerRef: { current: null }, multiple: false, size: "large" }),
    },
  );
  expect(container.firstElementChild).toHaveAttribute("data-size", "large");
});

test("`data-exclusive` is true when `multiple` is false", () => {
  render(<ChipSelectOption value="test-value">Option</ChipSelectOption>, {
    wrapper: createWrapper({
      containerRef: { current: null },
      multiple: false,
      name: "test",
      size: "medium",
    }),
  });
  expect(screen.getByRole("checkbox")).toHaveAttribute("data-exclusive", "true");
});

test("`data-exclusive` is false when `multiple` is true", () => {
  render(<ChipSelectOption value="test-value">Option</ChipSelectOption>, {
    wrapper: createWrapper({
      containerRef: { current: null },
      multiple: true,
      name: "test",
      size: "medium",
    }),
  });
  expect(screen.getByRole("checkbox")).toHaveAttribute("data-exclusive", "false");
});

test("forwards additional props to ChipSelectChip", () => {
  render(
    <ChipSelectOption data-testid="custom-option" value="test-value">
      Test Option
    </ChipSelectOption>,
    {
      wrapper: createWrapper({ containerRef: { current: null }, multiple: false, size: "medium" }),
    },
  );
  expect(screen.getByRole("checkbox")).toHaveAttribute("data-testid", "custom-option");
});

test("deselects other chips when selected in single-select mode without a form", () => {
  render(
    <ChipSelect name="test" size="small">
      <ChipSelectOption value="a">A</ChipSelectOption>
      <ChipSelectOption value="b">B</ChipSelectOption>
    </ChipSelect>,
  );

  fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
  expect(screen.getByRole("checkbox", { name: "A" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "B" })).not.toBeChecked();

  fireEvent.click(screen.getByRole("checkbox", { name: "B" }));
  expect(screen.getByRole("checkbox", { name: "A" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "B" })).toBeChecked();
});

test("deselects other chips when selected in single-select mode without a form or name", () => {
  render(
    <ChipSelect size="small">
      <ChipSelectOption value="a">A</ChipSelectOption>
      <ChipSelectOption value="b">B</ChipSelectOption>
    </ChipSelect>,
  );

  fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
  expect(screen.getByRole("checkbox", { name: "A" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "B" })).not.toBeChecked();

  fireEvent.click(screen.getByRole("checkbox", { name: "B" }));
  expect(screen.getByRole("checkbox", { name: "A" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "B" })).toBeChecked();
});

test("does not deselect other chips when selected in multi-select mode", () => {
  render(
    <ChipSelect multiple name="test" size="small">
      <ChipSelectOption value="a">A</ChipSelectOption>
      <ChipSelectOption value="b">B</ChipSelectOption>
    </ChipSelect>,
  );

  fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
  fireEvent.click(screen.getByRole("checkbox", { name: "B" }));
  expect(screen.getByRole("checkbox", { name: "A" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "B" })).toBeChecked();
});

test("applies `required` to every chip when group is required and none are checked", () => {
  render(
    <ChipSelect name="test" required size="small">
      <ChipSelectOption value="a">A</ChipSelectOption>
      <ChipSelectOption value="b">B</ChipSelectOption>
    </ChipSelect>,
  );
  expect(screen.getByRole("checkbox", { name: "A" })).toHaveAttribute("required");
  expect(screen.getByRole("checkbox", { name: "B" })).toHaveAttribute("required");
});

test("removes `required` from every chip when one is initially checked", () => {
  render(
    <ChipSelect name="test" required size="small">
      <ChipSelectOption value="a">A</ChipSelectOption>
      <ChipSelectOption defaultChecked value="b">
        B
      </ChipSelectOption>
    </ChipSelect>,
  );
  expect(screen.getByRole("checkbox", { name: "A" })).not.toHaveAttribute("required");
  expect(screen.getByRole("checkbox", { name: "B" })).not.toHaveAttribute("required");
});

test("does not apply `required` to any chip when the group is not required", () => {
  render(
    <ChipSelect name="test" size="small">
      <ChipSelectOption value="a">A</ChipSelectOption>
      <ChipSelectOption value="b">B</ChipSelectOption>
    </ChipSelect>,
  );
  expect(screen.getByRole("checkbox", { name: "A" })).not.toHaveAttribute("required");
  expect(screen.getByRole("checkbox", { name: "B" })).not.toHaveAttribute("required");
});

test("prevents deselecting the last chip when `required` (single-select)", () => {
  render(
    <ChipSelect name="test" required size="small">
      <ChipSelectOption value="a">A</ChipSelectOption>
      <ChipSelectOption value="b">B</ChipSelectOption>
    </ChipSelect>,
  );

  fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
  expect(screen.getByRole("checkbox", { name: "A" })).toBeChecked();

  fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
  expect(screen.getByRole("checkbox", { name: "A" })).toBeChecked();
});

test("prevents deselecting the last chip when `required` (multi-select)", () => {
  render(
    <ChipSelect multiple name="test" required size="small">
      <ChipSelectOption value="a">A</ChipSelectOption>
      <ChipSelectOption value="b">B</ChipSelectOption>
    </ChipSelect>,
  );

  fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
  expect(screen.getByRole("checkbox", { name: "A" })).toBeChecked();

  fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
  expect(screen.getByRole("checkbox", { name: "A" })).toBeChecked();
});

test("allows deselecting a chip when others remain selected", () => {
  render(
    <ChipSelect multiple name="test" required size="small">
      <ChipSelectOption value="a">A</ChipSelectOption>
      <ChipSelectOption value="b">B</ChipSelectOption>
    </ChipSelect>,
  );

  fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
  fireEvent.click(screen.getByRole("checkbox", { name: "B" }));
  expect(screen.getByRole("checkbox", { name: "A" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "B" })).toBeChecked();

  fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
  expect(screen.getByRole("checkbox", { name: "A" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "B" })).toBeChecked();
});

test("does not call `onChange` when last-chip deselect is prevented (single-select)", () => {
  const handleChange = vi.fn();
  render(
    <ChipSelect name="test" required size="small">
      <ChipSelectOption onChange={handleChange} value="a">
        A
      </ChipSelectOption>
    </ChipSelect>,
  );

  fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
  handleChange.mockClear();

  fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
  expect(handleChange).not.toHaveBeenCalled();
});

test("does not call `onChange` when last-chip deselect is prevented (multi-select)", () => {
  const handleChange = vi.fn();
  render(
    <ChipSelect multiple name="test" required size="small">
      <ChipSelectOption onChange={handleChange} value="a">
        A
      </ChipSelectOption>
    </ChipSelect>,
  );

  fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
  handleChange.mockClear();

  fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
  expect(handleChange).not.toHaveBeenCalled();
});

test("prevents deselecting the last chip when `required` and no `name`", () => {
  render(
    <ChipSelect required size="small">
      <ChipSelectOption value="a">A</ChipSelectOption>
      <ChipSelectOption value="b">B</ChipSelectOption>
    </ChipSelect>,
  );

  fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
  expect(screen.getByRole("checkbox", { name: "A" })).toBeChecked();

  fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
  expect(screen.getByRole("checkbox", { name: "A" })).toBeChecked();
});

test("removes `required` from every chip after one is clicked to check", () => {
  render(
    <ChipSelect name="test" required size="small">
      <ChipSelectOption value="a">A</ChipSelectOption>
      <ChipSelectOption value="b">B</ChipSelectOption>
    </ChipSelect>,
  );
  fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
  expect(screen.getByRole("checkbox", { name: "A" })).not.toHaveAttribute("required");
  expect(screen.getByRole("checkbox", { name: "B" })).not.toHaveAttribute("required");
});

function createWrapper(context: ChipSelectContext.Value) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <ChipSelectContext.Provider value={context}>{children}</ChipSelectContext.Provider>;
  };
}
