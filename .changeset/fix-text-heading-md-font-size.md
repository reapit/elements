---
'@reapit/elements': patch
---

Fixed: `Text` and `Heading` now render correctly when given the `md` font size or `text-md/*` font style, resolving it to the `base` size. `md` isn't a real design token, so it's no longer listed in Storybook documentation.
