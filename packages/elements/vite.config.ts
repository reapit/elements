import fs from "node:fs";
import path from "node:path";

import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

import { cascadeLayerOrder } from "./build/cascade-layer-order";
import packageManifest from "./package.json";

// We dynamically discover all "first-level" barrel files in the `src/core` directory and add them as
// individual entry points for our build.
const core = Object.fromEntries(
  fs.globSync("src/core/*/index.ts", { withFileTypes: true }).map((file) => [
    path.join("core", path.basename(file.parentPath)), // e.g. `core/button`
    path.join(file.parentPath, file.name), // e.g. `src/core/button/index.ts`
  ]),
);

// Explicit entry points for barrel files that live in subdirectories not matched by the first-level globs above.
const coreSubpaths = {
  "core/app-switcher/anz": "src/core/app-switcher/anz/index.ts",
};

// We dynamically discover all "first-level" barrel files in the `src/lab` directory and add them as
// individual entry points for our build.
const lab = Object.fromEntries(
  fs.globSync("src/lab/*/index.ts", { withFileTypes: true }).map((file) => [
    path.join("lab", path.basename(file.parentPath)), // e.g. `core/button`
    path.join(file.parentPath, file.name), // e.g. `src/core/button/index.ts`
  ]),
);

// We dynamically discover all "first-level" barrel files in the `src/deprecated` directory and add them as
// individual entry points for our build.
const deprecated = Object.fromEntries(
  fs.globSync("src/deprecated/*/index.{ts,tsx}", { withFileTypes: true }).map((file) => [
    path.join("deprecated", path.basename(file.parentPath)), // e.g. `deprecated/button`
    path.join(file.parentPath, file.name), // e.g. `src/deprecated/button/index.ts`
  ]),
);

// We dynamically discover all icons in the `src/icons` directory and add them as individual entry points
// for our build.
const icons = Object.fromEntries(
  fs
    .globSync("src/icons/*.tsx", { withFileTypes: true })
    .filter((file) => !file.name.endsWith(".figma.tsx"))
    .map((file) => [
      path.join("icons", path.basename(file.name, path.extname(file.name))), // e.g. `icons/add`
      path.join(file.parentPath, file.name), // e.g. `src/icons/add.tsx`
    ]),
);

// We dynamically discover all "first-level" barrel files in the `src/utils` directory and add them as individual
// entry points for our build.
const utils = Object.fromEntries(
  fs.globSync("src/utils/*/index.ts", { withFileTypes: true }).map((file) => [
    path.join("utils", path.basename(file.parentPath)), // e.g. `utils/url-search-params`
    path.join(file.parentPath, file.name), // e.g. `src/utils/url-search-params/index.ts`
  ]),
);

// Dedicated polyfill entry points that can be preloaded via <link rel="modulepreload">
const polyfillPreloads = {
  "polyfills/css-anchor-positioning/preload": "src/polyfills/css-anchor-positioning/preload.ts",
};

// Standalone style entry points that exist solely to inject CSS (e.g. design tokens, resets) into
// the combined stylesheet produced by the build. The emitted JS modules are inert side-effect-only
// stubs; only the CSS extracted by wyw-in-js / Linaria matters.
const globalStyles = {
  "styles/globals": "src/styles/globals.ts",
};

export default defineConfig({
  build: {
    copyPublicDir: false,
    emptyOutDir: true,
    lib: {
      cssFileName: "style",
      entry: {
        ...core,
        ...coreSubpaths,
        ...lab,
        ...deprecated,
        ...icons,
        ...utils,
        ...polyfillPreloads,
        ...globalStyles,
      },
      formats: ["es"],
    },
    outDir: "dist/js",
    rollupOptions: {
      // NOTE: This function ensures all peerDependencies defined in our package manifest are correctly externalised
      // (i.e. not bundled into our build artefact/s)
      external(id, _, isResolved) {
        // A resolved id is an absolute file path to the module being imported and since the names of our package's
        // peers do not correlate to the folder name thanks to the `@console` scope our package names typically
        // include, we cannot have enough confidence to externalise a resolved id. Thus we always return false.
        if (isResolved) {
          return false;
        }

        const peerDependencies = Object.keys(packageManifest.peerDependencies);

        return peerDependencies.some((packageName) => {
          // Imports from a peer dependency fall into one of two categories:
          //  1. From the peer's root entry point, e.g. `import { Foo } from "my-peer-dependency"`; or,
          //  2. From a peer's subpath/non-root entry point, e.g. `import Foo from "my-peer-dependency/foo".
          //
          // The `id` we have here will be `my-peer-dependency` and `my-peer-dependency/foo` respectively.
          // Since `my-peer-dependency` is the name of a package declared as a peer, we want to externalise
          // both imports. However, we do not want to externalise an `id` like `my-peer-dependency-alt`, so
          // it is important we do not simply look for a substring match.
          //
          // So, for scenario (1), we check for an exact match, and for scenario (2), we check if the `id`
          // starts with the peer's name AND a `/`. The inclusion of the trailing slash is to avoid partial
          // matches against an `id` that happens to have our peer's name as a valid substring.
          return id === packageName || id.startsWith(`${packageName}/`);
        });
      },
    },
  },
  plugins: [
    react(),
    svgr(),
    cascadeLayerOrder(),
    wyw({
      // NOTE: We only want to run wyw-in-js on components, not our codemods, because the wyw
      // plugin does not currently support import attributes, which are used in our codemods
      include: ["src/**/*.ts", "src/**/*.tsx"],
    }),
  ],
});
