// Fork of lib/css-fallback.mjs
// Reason: dist/js/style.css ships BOTH a layered flex rule (new core/form-layout,
// inside @layer elements.main) AND an unlayered grid rule (deprecated/form-layout).
// The unlayered rule wins the CSS cascade regardless of source order — so display:grid
// incorrectly overrides display:flex for `.el-form-layout`. This fork appends an
// unlayered override after the cssEntry is written so the correct flex wins.
// Fix is minimal and targeted — remove once the upstream duplicate-class bug is resolved
// in src/deprecated/form-layout/__styles__/index.ts.
import { appendFileSync } from "node:fs";

import * as base from "../../.ds-sync/lib/css-fallback.mjs";

export const { inlineFontFacesFromStorybook, isPlaceholderCss, scrapeRemoteImports } = base;

export function fallbackCssFromStorybook(opts) {
  const result = base.fallbackCssFromStorybook(opts);
  appendFileSync(
    opts.bundleCss,
    "\n/* Fix: .el-form-layout class collision — deprecated FormLayout ships an unlayered\n" +
      "   display:grid rule that beats the new FormLayout's layered display:flex. */\n" +
      ".el-form-layout{display:flex;flex-direction:column;gap:var(--spacing-10)}\n",
  );
  return result;
}
