import type { Decorator } from "@storybook/react-vite";

import { DrawerContext } from "../context";

export function useDrawerContextDecorator(): Decorator {
  return (Story) => (
    <DrawerContext.Provider value={{ titleId: "test-title-id" }}>
      <Story />
    </DrawerContext.Provider>
  );
}
