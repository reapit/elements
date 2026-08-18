import fs from "node:fs";
import path from "node:path";

import type { Plugin } from "vite";

/**
 * Prepends the cascade layer order declaration to the bundled CSS output.
 *
 * LightningCSS strips standalone `@layer` order declarations during
 * minification, so a normal CSS import does not survive the build. This
 * plugin reads `src/styles/layer-order.css` from disk and prepends its
 * content to the emitted CSS file during `writeBundle`, restoring the
 * declaration after minification has run.
 *
 * See `src/styles/ARCHITECTURE.md` for the full rationale.
 */
export function cascadeLayerOrder(): Plugin {
  const layerOrderPath = path.resolve(import.meta.dirname, "../src/styles/layer-order.css");
  const layerOrder = fs.readFileSync(layerOrderPath, "utf-8");

  return {
    name: "elements:cascade-layer-order",
    apply: "build",
    buildStart() {
      // Trigger a rebuild when `layer-order.css` changes in `vite build --watch`.
      this.addWatchFile(layerOrderPath);
    },
    writeBundle(options, bundle) {
      const outDir = options.dir ?? "dist";

      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (
          chunk.type === "asset" &&
          typeof chunk.source === "string" &&
          fileName.endsWith(".css")
        ) {
          const filePath = path.resolve(outDir, fileName);
          const content = fs.readFileSync(filePath, "utf-8");
          // NOTE: We prepend without checking for an existing `@charset` rule.
          // LightningCSS does not currently emit one for this bundle. If that
          // changes, this plugin must insert the layer order *after* the
          // `@charset` rule to keep it valid.
          fs.writeFileSync(filePath, `${layerOrder}${content}`);
          // NOTE: The current Vite config emits a single CSS asset
          // (`cssFileName: 'style'`), so returning after the first match is
          // safe. If the build is ever changed to emit multiple CSS files,
          // change this to `continue` so each one gets the layer order.
          return;
        }
      }
    },
  };
}
