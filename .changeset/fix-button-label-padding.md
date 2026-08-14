---
"@reapit/elements": patch
---

Fixed: `Button` and `AnchorButton` label spacing now matches the Figma component, adding a small inline padding around the label text alongside any icons. The label text is now wrapped in its own element, so tests querying by label text (e.g. `getByText`) should switch to role-based queries (e.g. `getByRole("button", { name })`).
