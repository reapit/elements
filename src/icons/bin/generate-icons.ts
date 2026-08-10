// README: This script fetches icon SVGs from the Reapit DS Figma file, processes them through an
// SVGO monochrome preset (stripping hardcoded colours and re-applying `fill="currentColor"`), writes
// them to `src/icons/svgs/`, then generates React component files, Figma Code Connect files, and a
// barrel export file.
//
// To run it, use `yarn generate:icons`. You will need:
//   - Node.js 24.x or higher
//   - A `FIGMA_ACCESS_TOKEN` environment variable set to a Figma personal access token with
//     "File content" read scope

import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { styleText } from "node:util";

import { client } from "@figma/code-connect";
import { optimize } from "svgo";

type FigmaComponent = Awaited<ReturnType<typeof client.getComponents>>[number];

const FIGMA_FILE_KEY = "6CaivqdlTX0UkFYJkpBKDu";

// We read from and write SVGs to `src/icons/svgs`
const iconsDir = join(dirname(fileURLToPath(import.meta.url)), "../svgs");

// We write generated files to `src/icons`
const outputDir = join(dirname(fileURLToPath(import.meta.url)), "../");

function kebabToPascalCase(kebab: string): string {
  return kebab
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/** Load icon components from Reapit DS Figma file. */
async function loadFigmaIcons(): Promise<FigmaComponent[]> {
  // The `?node-id=xxx` query param scopes the search to within the identified node — in this case
  // the "Icons list" auto layout layer which contains all icon component instances.
  return await client.getComponents(
    "https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=20-727&m=dev",
  );
}

/**
 * Fetch temporary SVG export URLs for all icon components from the Figma Images API.
 * Returns a map of node ID → temporary S3 URL (or null if Figma could not render that node).
 */
async function fetchSvgUrls(components: FigmaComponent[]): Promise<Record<string, string | null>> {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      "FIGMA_ACCESS_TOKEN environment variable is not set. " +
        'Set it to a Figma personal access token with "File content" read scope.',
    );
  }

  // Figma node IDs use `:` (e.g. `20:487`) but must be comma-separated and URL-encoded in the
  // query string.
  const ids = components.map((c) => c.id).join(",");
  const url =
    `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}` +
    `?ids=${encodeURIComponent(ids)}&format=svg&svg_include_id=false&svg_simplify_stroke=true`;

  const response = await fetch(url, {
    headers: { "X-Figma-Token": token },
  });

  if (!response.ok) {
    throw new Error(`Figma Images API returned ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as { images: Record<string, string | null> };
  return data.images;
}

/**
 * Process a raw SVG string through the SVGO monochrome preset:
 * - Runs `preset-default` optimisations (preserving viewBox and dimensions)
 * - Strips all hardcoded `fill`, `stroke`, and `color` attributes from child elements
 * - Re-applies `fill="currentColor"` and `stroke="currentColor"` to the `<svg>` root so colour
 *   can be controlled via CSS for both fill-based and stroke-based icons
 */
function processSvg(rawSvg: string): string {
  const result = optimize(rawSvg, {
    plugins: [
      // Standard optimisations. SVGO v4 preset-default preserves width, height, and viewBox by
      // default, so no overrides are needed.
      "preset-default",
      // Strip all hardcoded colour attributes from child elements so no colours are hard-coded.
      {
        name: "removeAttrs",
        params: { attrs: ["fill", "stroke", "color"] },
      },
      // Re-apply fill="currentColor" to the <svg> root so colour can be controlled via CSS.
      // Note: all icons are fill-based. If stroke-based icons are used in future, the SVGO
      // processing will need to be updated.
      {
        name: "addAttributesToSVGElement",
        params: { attributes: [{ fill: "currentColor" }] },
      },
    ],
  });
  return result.data;
}

/**
 * Download, process, and write SVG files for all Figma icon components.
 * Warns and skips individual icons on failure — never throws.
 */
async function downloadAndWriteSvgs(
  components: FigmaComponent[],
  svgUrls: Record<string, string | null>,
): Promise<void> {
  let warnings = 0;

  await Promise.all(
    components.map(async (component) => {
      const url = svgUrls[component.id];

      if (!url) {
        console.log(
          styleText(
            "yellow",
            `  ⚠️  No SVG URL returned by Figma for "${component.name}" (node ${component.id})`,
          ),
        );
        warnings++;
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        const rawSvg = await response.text();
        const processedSvg = processSvg(rawSvg);
        writeFileSync(join(iconsDir, `${component.name}.svg`), processedSvg);
      } catch (error) {
        console.log(
          styleText(
            "yellow",
            `  ⚠️  Failed to fetch or process SVG for "${component.name}": ${error}`,
          ),
        );
        warnings++;
      }
    }),
  );

  const summary =
    warnings > 0
      ? styleText(
          "yellow",
          `✔️  Fetched and processed ${components.length - warnings} SVGs from Figma (${warnings} warning(s))`,
        )
      : styleText("green", `✔️  Fetched and processed ${components.length} SVGs from Figma`);

  console.log(summary);
}

/**
 * Warn about SVG files on disk that have no corresponding Figma component.
 * These may have been removed or renamed in Figma and should be reviewed manually.
 */
function warnAboutStaleIcons(components: FigmaComponent[], svgFiles: string[]): void {
  const figmaNames = new Set(components.map((c) => c.name));
  const stale = svgFiles.map((f) => basename(f, ".svg")).filter((name) => !figmaNames.has(name));

  if (stale.length === 0) return;

  console.log(
    styleText(
      "yellow",
      [
        ``,
        `⚠️  ${stale.length} local SVG(s) were not found in Figma and may have been removed or renamed:`,
        ...stale.map((name) => `    - ${name}`),
        ``,
        `    Review these manually. A deprecation script will be available in a future release.`,
        ``,
      ].join("\n"),
    ),
  );
}

/** Create a file for a specific icon */
function generateIconFile(svgFileName: string): void {
  const baseName = basename(svgFileName, ".svg");
  const pascalCaseName = kebabToPascalCase(baseName);
  const svgImportPath = `./svgs/${baseName}.svg?react`;

  const fileContent = `import { makeIcon } from "./make-icon";
import ${pascalCaseName}Svg from "${svgImportPath}";

export const ${pascalCaseName}Icon = makeIcon("${pascalCaseName}Icon", ${pascalCaseName}Svg);
`;

  const outputPath = join(outputDir, `${baseName}.tsx`);
  writeFileSync(outputPath, fileContent);
}

/**
 * Write the Figma Code Connect batch file listing every icon. Icons with no matching Figma
 * component (e.g. removed or renamed in Figma) are omitted, mirroring the previous per-file
 * generator's behaviour of skipping icons it couldn't find a Figma URL for.
 */
function writeIconsBatchFile(svgFiles: string[], figmaIcons: FigmaComponent[]): void {
  const figmaIconsByName = new Map(figmaIcons.map((icon) => [icon.name, icon]));

  const components = svgFiles
    .map((file) => {
      const baseName = basename(file, ".svg");
      const figmaIconComponent = figmaIconsByName.get(baseName);
      if (!figmaIconComponent) {
        return null;
      }

      const iconComponentName = `${kebabToPascalCase(baseName)}Icon`;

      return {
        url: figmaIconComponent.figmaUrl,
        name: iconComponentName,
        component: iconComponentName,
        id: baseName,
        source: `src/icons/${baseName}.tsx`,
        importPath: `@reapit/elements/icons/${baseName}`,
      };
    })
    .filter((component) => component !== null);

  const batchFileContent = {
    templateFile: "./icons.figma.batch.ts",
    components,
  };

  writeFileSync(
    join(outputDir, "icons.figma.batch.json"),
    `${JSON.stringify(batchFileContent, null, 2)}\n`,
  );
}

/** Create a barrel file for all icons */
function writeBarrelFile(svgFiles: string[]): void {
  const exports = svgFiles
    .map((file) => {
      const baseName = basename(file, ".svg");
      return `export * from "../${baseName}";`;
    })
    .join("\n");

  // Emit a PascalName → kebabName map so consumers (e.g. the icon gallery story) can
  // recover the subpath name without parsing the export name — which is lossy for
  // names containing digits (e.g. `W3wIcon` could derive to either `w3w` or `w-3-w`).
  const kebabEntries = svgFiles
    .map((file) => {
      const baseName = basename(file, ".svg");
      const pascalCaseName = kebabToPascalCase(baseName);
      return `  ${pascalCaseName}Icon: "${baseName}",`;
    })
    .join("\n");

  const fileContent = `${exports}

export const ICON_KEBAB_NAMES: Record<string, string> = {
${kebabEntries}
};
`;

  writeFileSync(join(outputDir, "docs", "all-icons.ts"), fileContent);
}

/**
 * Warn about entries in `icon-synonyms.json` whose icon no longer exists in Figma. These
 * entries are orphaned and should be pruned from the JSON. Non-fatal: never throws so a
 * regeneration is never blocked by stale synonym data.
 */
function warnAboutOrphanedSynonyms(svgFiles: string[]): void {
  const synonymsPath = join(outputDir, "docs", "icon-synonyms.json");
  let synonyms: Record<string, unknown>;

  try {
    synonyms = JSON.parse(readFileSync(synonymsPath, "utf8"));
  } catch (error) {
    console.log(styleText("yellow", `⚠️  Could not read icon-synonyms.json: ${error}`));
    return;
  }

  const liveIconNames = new Set(
    svgFiles.map((f) => `${kebabToPascalCase(basename(f, ".svg"))}Icon`),
  );
  const orphaned = Object.keys(synonyms).filter((name) => !liveIconNames.has(name));

  if (orphaned.length === 0) return;

  console.log(
    styleText(
      "yellow",
      [
        ``,
        `⚠️  ${orphaned.length} entry/entries in icon-synonyms.json reference icons that no longer exist:`,
        ...orphaned.map((name) => `    - ${name}`),
        ``,
        `    Prune these entries from src/icons/docs/icon-synonyms.json.`,
        ``,
      ].join("\n"),
    ),
  );
}

/** Main script execution */
async function main() {
  mkdirSync(iconsDir, { recursive: true });

  // 1. Fetch Figma component metadata (names, node IDs, figma URLs)
  const figmaIcons = await loadFigmaIcons();
  console.log(styleText("green", `✔️  Found ${figmaIcons.length} icon components in Figma`));

  // 2. Fetch temporary SVG export URLs from the Figma Images API
  const svgUrls = await fetchSvgUrls(figmaIcons);

  // 3. Download, run SVGO monochrome processing, and write SVGs to src/icons/svgs/
  await downloadAndWriteSvgs(figmaIcons, svgUrls);

  // 4. Read the now up-to-date SVG files from disk
  const svgFiles = readdirSync(iconsDir).filter((file) => file.endsWith(".svg"));

  // 5. Warn about any local SVGs that have no Figma counterpart
  warnAboutStaleIcons(figmaIcons, svgFiles);

  // 5a. Warn about any synonym entries whose icon no longer exists
  warnAboutOrphanedSynonyms(svgFiles);

  // 6. Generate React component files for all SVGs
  svgFiles.forEach(generateIconFile);
  console.log(styleText("green", `✔️  Generated ${svgFiles.length} icon files`));

  // 7. Write the Figma Code Connect batch file
  writeIconsBatchFile(svgFiles, figmaIcons);
  console.log(styleText("green", "✔️  Generated Figma Code Connect batch file"));

  // 8. Write the barrel file
  writeBarrelFile(svgFiles);
  console.log(styleText("green", "✔️  Generated icon barrel file"));
}

try {
  await main();
} catch (error) {
  console.error(styleText("red", "❌ An error occurred during icon generation:"));
  console.error(error);
  process.exit(1);
}
