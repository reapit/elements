import { render, screen } from "@testing-library/react";

import { TopBarNavItem } from "../nav-item";
import { elTopBarNavItem } from "../styles";

test("renders an <a> element", () => {
  render(
    <TopBarNavItem aria-current={false} href="#">
      Test item
    </TopBarNavItem>,
  );
  expect(screen.getByRole("link", { name: "Test item" })).toBeVisible();
});

test(`combines the .${elTopBarNavItem} and consumer-supplied classes correctly`, () => {
  render(<TopBarNavItem aria-current={false} href="#" className="my-custom-class" />);
  // NOTE: We don't use the `toHaveClass` matcher here because it does not enforce the order of classes, which we are
  // specifically interested in here.
  expect(screen.getByRole("link")).toHaveAttribute("class", `${elTopBarNavItem} my-custom-class`);
});

test('has `aria-current="false"` attribute when it does NOT represent the current page', () => {
  render(
    <TopBarNavItem aria-current={false} href="#">
      Test item
    </TopBarNavItem>,
  );
  expect(screen.getByRole("link")).toHaveAttribute("aria-current", "false");
});

test('has `aria-current="page"` attribute when it represents the current page', () => {
  render(
    <TopBarNavItem aria-current="page" href="#">
      Test item
    </TopBarNavItem>,
  );
  expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
});
