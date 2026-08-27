import type { EvalTask } from "../types.js";

export const deleteConfirmation: EvalTask = {
  id: "delete-confirmation",
  prompt:
    "Build a confirmation dialog for deleting a contact. The dialog should warn the user that the action is irreversible and provide Cancel and Delete buttons.",
  expected: {
    selection: [
      "Recommends Dialog as the primary component for the confirmation interaction",
      "Identifies the Standard Dialog type (includes a footer area for action buttons) as appropriate, not the Light type",
      "Identifies that the Delete button should use a destructive button style to signal risk, not a plain primary button",
      "Provides Cancel as a secondary option, not a symmetric primary button alongside Delete",
      "Does not recommend Alert, Banner, or a custom modal as the confirmation mechanism",
      "Notes that focus must be trapped within the Dialog until the user responds",
    ],
    implementation: [
      "Imports Dialog from the Reapit Elements design system",
      "Imports Button from the Reapit Elements design system",
      "Controls Dialog visibility with a boolean prop or state",
      "Wires an onClose or dismiss callback to close the Dialog",
      "Renders both a Cancel button and a Delete button within the Dialog footer",
      'Applies a destructive variant or prop to the Delete button; does NOT use the deprecated intent="danger" prop',
    ],
  },
};
