import preview from "#.storybook/preview";

import { FormControl } from "../form-control";

const meta = preview.meta({
  title: "Input and selection/FormControl/HelpText",
  component: FormControl.HelpText,
  argTypes: {
    children: {
      control: "text",
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "'medium'" },
      },
    },
  },
});

export const Example = meta.story({
  args: {
    children: "Help text",
    id: "my-help-text",
    size: "medium",
  },
});

/** The help text will naturally wrap to additional lines when it does not have sufficient space. */
export const Wrapping = Example.extend({
  args: {
    children: "This is long help text that won’t fit in a single row",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "200px", border: "1px solid #FA00FF" }}>
        <Story />
      </div>
    ),
  ],
});
