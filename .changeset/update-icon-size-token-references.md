---
'@reapit/elements': patch
---

Internal: Update all component styles to reference the renamed `--icon_size` tokens (`-l` → `-lg`, `-m` → `-md`, `-s` → `-sm`) and the consolidated gallery viewer caption colour token. Use `upgrade-css-variables` codemod to migrate usage of these tokens.
