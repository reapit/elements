import preview from "#.storybook/preview";

import { ProgressIndicator } from "./progress-indicator";

const meta = preview.meta({
  title: "Indicators and status/ProgressIndicator",
  component: ProgressIndicator,
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
    },
  },
});

export const Example = meta.story({
  args: {
    "aria-label": "Upload progress",
    value: 50,
  },
});

/**
 * The value is clamped between `0` and `100`, so out-of-range values are handled safely.
 */
export const Complete = Example.extend({
  args: {
    value: 100,
  },
});

/**
 * Omit `value` to communicate that a task is in progress when its completion progress or duration cannot
 * be determined, such as while waiting for a server response.
 */
export const Indeterminate = meta.story({
  args: {
    "aria-label": "Loading",
  },
});
