import type { EvalTask } from "../types.js";

export const settingsToggles: EvalTask = {
  id: "settings-toggles",
  prompt:
    "Build a settings page where users can enable or disable individual features. Each setting should take effect immediately when changed, without requiring a form submission. Group related settings under headings.",
  expected: {
    selection: [
      "Recommends Switch as the correct component for an immediately-applied on/off setting",
      "Notes that Switch is for live, immediate on/off settings, not for collecting form submission values",
      "Distinguishes Switch from Checkbox: Checkbox collects form values; Switch applies changes immediately",
      "Mentions labelPlacement as a relevant Switch property",
      "Recommends section headings to group switches by feature category",
    ],
    implementation: [
      "Imports Switch (not a deprecated Toggle component) from the design system",
      "Uses a controlled state pattern: each Switch has a checked prop and an onChange handler",
      "Changes apply immediately, not submitted via a form action",
      "Does not use Checkbox instead of Switch for the feature toggles",
      "Uses heading elements between Switch groups to label each feature category",
    ],
  },
};
