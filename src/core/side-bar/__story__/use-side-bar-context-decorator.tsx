import type { Decorator } from "@storybook/react-vite";
import { useId } from "react";

import { SideBarContextPublisher } from "../side-bar-context";
import { useSideBar } from "../use-side-bar";

export const useSideBarContextDecorator: Decorator = (Story, context) => {
  const id = useId();
  const { initialState, state } = context.parameters.sideBar ?? { initialState: "expanded" };
  const sideBar = useSideBar(initialState);

  return (
    <SideBarContextPublisher {...sideBar} id={id} state={state ?? sideBar.state}>
      <Story />
    </SideBarContextPublisher>
  );
};
