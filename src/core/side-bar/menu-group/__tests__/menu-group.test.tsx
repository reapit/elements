import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

import { PropertyIcon } from "#src/icons/property";

import { SideBarContextPublisher } from "../../side-bar-context";
import { SideBarSubmenu } from "../../submenu";
import { SideBarMenuGroup } from "../menu-group";
import { elSideBarMenuGroup } from "../styles";

const summary = (
  <SideBarMenuGroup.Summary icon={<PropertyIcon />}>Menu group</SideBarMenuGroup.Summary>
);

const noSelectedChildren = (
  <SideBarSubmenu>
    <SideBarSubmenu.Item aria-current={false} href="#">
      Submenu Item
    </SideBarSubmenu.Item>
    <SideBarSubmenu.Item aria-current={false} href="#">
      Submenu Item
    </SideBarSubmenu.Item>
  </SideBarSubmenu>
);

const selectedChildren = (
  <SideBarSubmenu>
    <SideBarSubmenu.Item aria-current={false} href="#">
      Submenu Item
    </SideBarSubmenu.Item>
    <SideBarSubmenu.Item aria-current="page" href="#">
      Submenu Item
    </SideBarSubmenu.Item>
  </SideBarSubmenu>
);

test("renders a <details> element", () => {
  render(
    <SideBarMenuGroup isActive={false} summary={summary}>
      {noSelectedChildren}
    </SideBarMenuGroup>,
    { wrapper: Wrapper },
  );
  const group = screen.getByRole("group");

  expect(group.tagName).toBe("DETAILS");
  expect(group).toBeInTheDocument();
});

test(`combines the .${elSideBarMenuGroup} and consumer-supplied classes correctly`, () => {
  render(
    <SideBarMenuGroup isActive={false} summary={summary} className="my-custom-class">
      {noSelectedChildren}
    </SideBarMenuGroup>,
    { wrapper: Wrapper },
  );
  // NOTE: We don't use the `toHaveClass` matcher here because it does not enforce the order of classes, which we are
  // specifically interested in here.
  expect(screen.getByRole("group")).toHaveAttribute(
    "class",
    `${elSideBarMenuGroup} my-custom-class`,
  );
});

test("has an accessible name when the `SideBar` is collapsed", () => {
  render(
    <SideBarMenuGroup
      isActive={false}
      summary={<SideBarMenuGroup.Summary icon="😎">Group</SideBarMenuGroup.Summary>}
    >
      {noSelectedChildren}
    </SideBarMenuGroup>,
    { wrapper: (props) => <Wrapper {...props} state="collapsed" /> },
  );
  expect(screen.getByRole("group", { name: "Group" })).toBeInTheDocument();
});

test("is labelled by the <summary> element's tooltip", () => {
  render(
    <SideBarMenuGroup isActive={false} open={true} summary={summary}>
      {selectedChildren}
    </SideBarMenuGroup>,
    { wrapper: Wrapper },
  );
  const detailsElement = screen.getByRole("group");
  const tooltipElement = screen.getByRole("tooltip");
  expect(detailsElement.getAttribute("aria-labelledby")).toBe(tooltipElement?.id);
});

test("is open by default when a descendant submenu item represents the current page", () => {
  render(
    <SideBarMenuGroup isActive={false} open={true} summary={summary}>
      {selectedChildren}
    </SideBarMenuGroup>,
    { wrapper: Wrapper },
  );
  // NOTE: <details> elements are only considered visible when they are open
  expect(screen.getByRole("group")).toBeVisible();
});

test("is closed by default when NO descendant submenu items represent the current page", () => {
  render(
    <SideBarMenuGroup isActive={false} summary={summary}>
      {noSelectedChildren}
    </SideBarMenuGroup>,
    { wrapper: Wrapper },
  );
  // NOTE: <details> elements are only considered visible when they are open
  expect(screen.getByRole("group")).not.toBeVisible();
});

test("is closed when the `SideBar` is collapsed", () => {
  const { rerender } = render(
    <SideBarContextPublisher
      id="test-sidebar"
      expand={() => void 0}
      setState={() => void 0}
      state="expanded"
      toggle={() => void 0}
    >
      <SideBarMenuGroup isActive={false} open={true} summary={summary}>
        {selectedChildren}
      </SideBarMenuGroup>
    </SideBarContextPublisher>,
  );

  expect(screen.getByRole("group")).toBeVisible();

  // Simulate the `SideBar` being collapsed
  rerender(
    <SideBarContextPublisher
      id="test-sidebar"
      expand={() => void 0}
      setState={() => void 0}
      state="collapsed"
      toggle={() => void 0}
    >
      <SideBarMenuGroup isActive={false} summary={summary}>
        {noSelectedChildren}
      </SideBarMenuGroup>
    </SideBarContextPublisher>,
  );

  expect(screen.getByRole("group")).not.toBeVisible();
});

test("is opened when the `SideBar` is expanded and a descendant submenu item represents the current page", () => {
  const { rerender } = render(
    <SideBarContextPublisher
      id="test-sidebar"
      expand={() => void 0}
      setState={() => void 0}
      state="collapsed"
      toggle={() => void 0}
    >
      <SideBarMenuGroup isActive={false} summary={summary}>
        {selectedChildren}
      </SideBarMenuGroup>
    </SideBarContextPublisher>,
  );

  expect(screen.getByRole("group")).not.toBeVisible();

  // Simulate the `SideBar` being expanded
  rerender(
    <SideBarContextPublisher
      id="test-sidebar"
      expand={() => void 0}
      setState={() => void 0}
      state="expanded"
      toggle={() => void 0}
    >
      <SideBarMenuGroup isActive={false} open={true} summary={summary}>
        {selectedChildren}
      </SideBarMenuGroup>
    </SideBarContextPublisher>,
  );

  expect(screen.getByRole("group")).toBeVisible();
});

test("is opened when the `SideBar` is expanded and a descendant submenu item represents the current page", () => {
  const { rerender } = render(
    <SideBarContextPublisher
      id="test-sidebar"
      expand={() => void 0}
      setState={() => void 0}
      state="collapsed"
      toggle={() => void 0}
    >
      <SideBarMenuGroup isActive={false} summary={summary}>
        {selectedChildren}
      </SideBarMenuGroup>
    </SideBarContextPublisher>,
  );

  expect(screen.getByRole("group")).not.toBeVisible();

  // Simulate the `SideBar` being expanded
  rerender(
    <SideBarContextPublisher
      id="test-sidebar"
      expand={() => void 0}
      setState={() => void 0}
      state="expanded"
      toggle={() => void 0}
    >
      <SideBarMenuGroup isActive={false} open={true} summary={summary}>
        {selectedChildren}
      </SideBarMenuGroup>
    </SideBarContextPublisher>,
  );

  expect(screen.getByRole("group")).toBeVisible();
});

interface WrapperProps {
  children: ReactNode;
  state?: "expanded" | "collapsed";
}

function Wrapper({ children, state = "expanded" }: WrapperProps) {
  return (
    <SideBarContextPublisher
      id="test-sidebar"
      expand={() => void 0}
      setState={() => void 0}
      state={state}
      toggle={() => void 0}
    >
      {children}
    </SideBarContextPublisher>
  );
}
