---
'@reapit/elements': minor
---

Added: `FileInput` component to `src/utils/file-input`. A native `<input type="file">` primitive supporting controlled/uncontrolled `File[]` selection via a real `change` event, `accept`/`multiple`/`required` native attributes, and `maxFileSize`/`maxFiles`/`maxTotalSize` constraints surfaced through the constraint validation API. Accepts a `children` render function to fully customise the rendered content while keeping these native mechanics.
