import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { SideBarContextPublisher } from "../../side-bar-context";
import { useSideBar } from "../../use-side-bar";
import { SideBarCollapseButton } from "../collapse-button";

function CollapseButtonWithSideBar({ initialState }: { initialState: "collapsed" | "expanded" }) {
  const sideBar = useSideBar(initialState);
  return (
    <SideBarContextPublisher {...sideBar} id="test-sidebar">
      <SideBarCollapseButton />
    </SideBarContextPublisher>
  );
}

describe("when the SideBar is collapsed", () => {
  // The following tests expect the SideBar to be in an initially collapsed state.

  test('renders a button with an accessible name of "Expand"', () => {
    render(<CollapseButtonWithSideBar initialState="collapsed" />);
    expect(screen.getByRole("button", { name: "Expand" })).toBeVisible();
  });

  test('button has `aria-expanded="false"`', () => {
    render(<CollapseButtonWithSideBar initialState="collapsed" />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });
});

describe("when the SideBar is expanded", () => {
  // The following tests expect the SideBar to be in an initially expanded state.

  test('renders a button with an accessible name of "Collapse"', () => {
    render(<CollapseButtonWithSideBar initialState="expanded" />);
    expect(screen.getByRole("button", { name: "Collapse" })).toBeVisible();
  });

  test('button has `aria-expanded="true"`', () => {
    render(<CollapseButtonWithSideBar initialState="expanded" />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });
});

test("clicking the button toggles the SideBar state", async () => {
  const toggle = vi.fn();
  render(
    <SideBarContextPublisher
      id="test-sidebar"
      expand={() => void 0}
      setState={() => void 0}
      state="collapsed" // NOTE: this is not relevant to the test, we're just providing a valid state
      toggle={toggle}
    >
      <SideBarCollapseButton />
    </SideBarContextPublisher>,
  );
  const button = screen.getByRole("button");

  fireEvent.click(button);
  await waitFor(() => expect(toggle).toHaveBeenCalledTimes(1));
});

test("a consumer-supplied `onClick` can prevent the side bar state from being toggled", async () => {
  const toggle = vi.fn();
  render(
    <SideBarContextPublisher
      id="test-sidebar"
      expand={() => void 0}
      setState={() => void 0}
      state="collapsed"
      toggle={toggle}
    >
      <SideBarCollapseButton onClick={(e) => e.preventDefault()} />
    </SideBarContextPublisher>,
  );

  // The button has an accessible name of "Expand" when we render, because the SideBar is in a collapsed state.
  fireEvent.click(screen.getByRole("button", { name: "Expand" }));

  // We expect the button to still have an accessible name of "Expand", because the default action
  // (toggling the sidebar) was prevented by our onClick handler.
  expect(screen.getByRole("button", { name: "Expand" })).toBeVisible();
});
