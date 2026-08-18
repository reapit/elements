import type { EvalTask } from "../types.js";

export const formValidation: EvalTask = {
  id: "form-validation",
  prompt:
    "Handle form validation errors on a multi-field form. Each field should display its own error message when validation fails, and a general error summary should appear at the top.",
  expected: {
    selection: [
      "Recommends inline error messages displayed directly beneath each invalid field",
      "Recommends a Section message at the top of the form as the error summary when the form is long or scrollable and multiple fields fail",
      "Does not recommend Alert Banner for per-field errors (Alert Banner is for page-level blocking errors)",
      "Notes that validation should run on blur for simple format rules and on submit for cross-field rules",
      "Notes that user input must be preserved on validation failure, never clearing the form",
      "Notes that focus or scroll should move to the first field in error after submit",
      "Correctly identifies the error hierarchy: inline errors per field, Section message for form summary, Alert banner for page-level, Toast for transient failures",
    ],
    implementation: [
      "Text input (and Text area) components show inline error messages directly beneath each invalid field",
      "A Section message component is shown at the top of the form when any field is invalid",
      "Validation fires on blur for individual field format checks",
      "Validation fires on submit for final or cross-field checks",
      "User input is not cleared when validation fails",
      "On submit, focus or scroll moves to the first invalid field",
      "The error summary at the top links to the invalid fields where possible",
    ],
  },
};
