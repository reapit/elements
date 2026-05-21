---
'@reapit/elements': minor
---

Changed: Wrap all component styles in cascade layers (`@layer elements.base` and `@layer elements.main`) so that consumer-supplied classes can override defaults without needing higher specificity or `!important`. A layer order declaration (`@layer elements.base, elements.main;`) is emitted first to guarantee consistent ordering. Consumers using their own named `@layer`s should review how their layer order interacts with `elements.base` and `elements.main`. The `elFont` class is now a no-op — the font is loaded unconditionally from the global stylesheet.
