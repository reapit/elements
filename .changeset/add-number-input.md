---
'@reapit/elements': minor
---

Added: `NumberInput` component. Displays locale-aware formatted numbers via an overlay whilst keeping the raw numeric value as the input value. Accepts `locale`, `formatOptions`, `inputMode`, `min`, and `max` props. When `formatOptions.style` is `'currency'`, `'percent'`, or `'unit'` and no affix prop is supplied, the localised affix is automatically derived and rendered as a prefix or suffix; supplying an explicit `prefix`, `suffix`, `leadingIcon`, or `trailingIcon` takes precedence and disables the derivation. With `style: 'percent'`, values are stored and edited as model-space decimals (e.g. `0.255` displays as `25.5%`).
