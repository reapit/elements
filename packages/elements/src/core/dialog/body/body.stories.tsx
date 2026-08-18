import preview from "#.storybook/preview";
import { Pattern } from "#src/core/drawer/__story__/Pattern";

import { Dialog } from "../dialog";

const meta = preview.meta({
  title: "Containers and layout/Dialog/Body",
  component: Dialog.Body,
  argTypes: {
    children: {
      control: "text",
    },
  },
  globals: {
    backgrounds: {
      value: "light",
    },
  },
});

export const Example = meta.story({
  args: {
    children: "Dialog content",
  },
});

/**
 * The dialog body will grow to the height of its content. It is the dialog itself that handles the overflow and
 * subsequent scrolling of the content.
 */
export const LongContent = meta.story({
  args: {
    children: <Pattern height="200px" />,
  },
});

/**
 * The dialog body will also adjust its padding based on the dialog's size. In particular, the body for full-screen
 * dialogs includes block start (top) padding.
 */
export const DynamicLayout = meta.story({
  args: {
    children: <Pattern height="200px" />,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "grid",
          color: "#FA00FF",
          gridAutoFlow: "column",
          gridAutoColumns: "1fr",
          gap: "var(--spacing-6)",
        }}
      >
        <div data-size="small" style={{ textAlign: "center" }}>
          <p>small, medium, large</p>
          <div style={{ boxSizing: "content-box", border: "1px solid #FA00FF" }}>
            <Story />
          </div>
        </div>
        <div data-size="full-screen" style={{ textAlign: "center" }}>
          <p>full-screen</p>
          <div style={{ boxSizing: "content-box", border: "1px solid #FA00FF" }}>
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
});
