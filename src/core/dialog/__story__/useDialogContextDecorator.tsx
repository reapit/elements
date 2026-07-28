import type { Decorator } from "@storybook/react-vite";

import { DialogContext } from "../context";

export function useDialogContextDecorator(): Decorator {
  return (Story) => (
    <DialogContext.Provider value={{ titleId: "test-title-id" }}>
      <Story />
    </DialogContext.Provider>
  );
}
