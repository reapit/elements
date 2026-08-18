import { fireEvent, render, screen } from "@testing-library/react";

import { Avatar } from "..";

describe("Avatar", () => {
  it("should render properly with default props and match snapshot", () => {
    const { asFragment } = render(<Avatar>Default Avatar</Avatar>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render properly with specified props and match snapshot", () => {
    const { asFragment } = render(
      <Avatar shape="square" size="sm" colour="primary">
        Square Avatar
      </Avatar>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("always renders as a span, even though it accepts image and border props", () => {
    render(<Avatar borderColour="--colour-border-white">AB</Avatar>);
    expect(screen.getByText("AB").tagName).toBe("SPAN");
  });

  it("renders as a focusable button with a tooltip when `aria-label` is provided", () => {
    render(<Avatar aria-label="Alex Doe">AD</Avatar>);
    expect(screen.getByRole("button", { name: "Alex Doe" })).toBeVisible();
  });

  it("supports the new size scale", () => {
    render(<Avatar size="2xl">AB</Avatar>);
    expect(screen.getByText("AB")).toHaveAttribute("data-size", "2xl");
  });

  it("renders an image when `src` is provided", () => {
    render(<Avatar src="https://example.com/avatar.png" alt="A user" />);
    expect(screen.getByRole("img", { name: "A user" })).toBeVisible();
  });

  it("falls back to children when the image fails to load", () => {
    render(
      <Avatar src="https://example.com/broken.png" alt="A user">
        AB
      </Avatar>,
    );
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByText("AB")).toBeVisible();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
