export type { EvalTask } from "./types.js";

// POC foundation: three tasks chosen to cover distinct failure modes in documentation quality.
// - delete-confirmation: correct Dialog type and Button variant selection
// - settings-toggles:    Switch vs Toggle naming, Switch vs Checkbox distinction
// - form-validation:     error hierarchy across inline errors, Section message, Alert Banner, and Toast
// Add more tasks here as the eval suite matures.
import { deleteConfirmation } from "./tasks/delete-confirmation.js";
import { formValidation } from "./tasks/form-validation.js";
import { settingsToggles } from "./tasks/settings-toggles.js";

export const tasks = [deleteConfirmation, settingsToggles, formValidation];
