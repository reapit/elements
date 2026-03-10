---
'@reapit/elements': major
---

Removed: the deprecated `useClickOutside` hook, previously importable as:

```ts
import { useClickOutside } from '@reapit/elements'
// OR
import { useClickOutside } from '@reapit/elements/deprecated/use-click-outside'
```

To migrate, replace usages with an inline `useEffect` that implements equivalent `AbortController`/`mousedown` logic, or run the `inline-use-click-outside` codemod to automate this change.
