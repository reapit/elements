import { resolve } from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Project } from "ts-morph";
import { describe, test, expect, beforeAll, vi } from "vitest";

import {
  getModuleEntries,
  getExportedNames,
  buildExportMap,
  generateFileContent,
} from "../generate-export-map";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Absolute path to the workspace src/ directory
const SRC_DIR = resolve(__dirname, "..", "..", "..", "src");

// ─── generateFileContent ──────────────────────────────────────────────────────

describe("generateFileContent", () => {
  test("produces a valid TypeScript export const declaration", () => {
    const content = generateFileContent({ Button: "core/button" });
    expect(content).toContain("export const EXPORT_MAP: Record<string, string> = {");
    expect(content).toContain("  Button: 'core/button',");
    expect(content).toContain("}");
  });

  test("sorts entries alphabetically", () => {
    const map = {
      Zebra: "core/zebra",
      Alpha: "core/alpha",
      Beta: "core/beta",
    };
    const content = generateFileContent(map);
    const alphaPos = content.indexOf("Alpha");
    const betaPos = content.indexOf("Beta");
    const zebraPos = content.indexOf("Zebra");
    expect(alphaPos).toBeLessThan(betaPos);
    expect(betaPos).toBeLessThan(zebraPos);
  });

  test("includes the correct regeneration command in the header", () => {
    const content = generateFileContent({});
    expect(content).toContain(
      "node --experimental-strip-types codemods/rewrite-v5-imports/generate-export-map.ts",
    );
  });

  test("includes a DO NOT EDIT notice", () => {
    const content = generateFileContent({});
    expect(content).toContain("DO NOT EDIT");
  });

  test("ends with a newline", () => {
    const content = generateFileContent({ Button: "core/button" });
    expect(content.endsWith("\n")).toBe(true);
  });

  test("handles an empty map (no entries)", () => {
    const content = generateFileContent({});
    expect(content).toContain("export const EXPORT_MAP: Record<string, string> = {");
  });
});

// ─── getModuleEntries ─────────────────────────────────────────────────────────

// These tests load the entire source tree via ts-morph, which is slow under v8
// coverage instrumentation on CI runners. The 30 s timeout on both describe
// (tests) and beforeAll (hook) prevents false failures caused by parsing
// overhead rather than logic errors.
describe("getModuleEntries (against real source)", { timeout: 30_000 }, () => {
  // These tests read the actual barrel files via ts-morph, so they validate
  // the generator against the real codebase structure.

  let project: Project;

  // addSourceFilesAtPaths over the full source tree is the expensive step —
  // give the hook the same budget as the tests.
  beforeAll(() => {
    project = new Project({
      tsConfigFilePath: resolve(SRC_DIR, "..", "tsconfig.json"),
      skipAddingFilesFromTsConfig: true,
    });
    project.addSourceFilesAtPaths(resolve(SRC_DIR, "**/*.{ts,tsx}"));
  }, 30_000);

  test("extracts module entries from a core component barrel", () => {
    const barrelFile = project.getSourceFileOrThrow(resolve(SRC_DIR, "core", "button", "index.ts"));
    const entries = getModuleEntries(barrelFile, "core");

    expect(entries.length).toBeGreaterThan(0);
    // Every entry should carry the correct namespace
    expect(entries.every((e) => e.namespace === "core")).toBe(true);
  });

  test("extracts module entries from the icons barrel", () => {
    const barrelFile = project.getSourceFileOrThrow(
      resolve(SRC_DIR, "icons", "docs", "all-icons.ts"),
    );
    const entries = getModuleEntries(barrelFile, "icons");

    expect(entries.length).toBeGreaterThan(50); // Many icons
    expect(entries.every((e) => e.namespace === "icons")).toBe(true);
    const moreEntry = entries.find((e) => e.slug === "more");
    expect(moreEntry).toBeDefined();
  });

  test("extracts module entries from a deprecated component barrel", () => {
    const barrelFile = project.getSourceFileOrThrow(
      resolve(SRC_DIR, "deprecated", "tabs", "index.ts"),
    );
    const entries = getModuleEntries(barrelFile, "deprecated");

    expect(entries.length).toBeGreaterThan(0);
    expect(entries.every((e) => e.namespace === "deprecated")).toBe(true);
  });

  test("extracts module entries from a utils component barrel", () => {
    const barrelFile = project.getSourceFileOrThrow(
      resolve(SRC_DIR, "utils", "breakpoints", "index.ts"),
    );
    const entries = getModuleEntries(barrelFile, "utils");

    expect(entries.length).toBeGreaterThan(0);
    expect(entries.every((e) => e.namespace === "utils")).toBe(true);
  });

  test("each entry has a resolvable filePath", () => {
    const barrelFile = project.getSourceFileOrThrow(resolve(SRC_DIR, "core", "button", "index.ts"));
    const entries = getModuleEntries(barrelFile, "core");

    for (const entry of entries) {
      expect(entry.filePath).toBeTruthy();
      expect(entry.filePath).toMatch(/\.tsx?$/);
    }
  });
});

// ─── getExportedNames ─────────────────────────────────────────────────────────

// Same timeout rationale as getModuleEntries above — ts-morph project creation
// over the full source tree is slow under coverage instrumentation on CI.
// Both the describe timeout (tests) and beforeAll timeout (hook) must be set.
describe("getExportedNames (against real source)", { timeout: 30_000 }, () => {
  let project: Project;

  // addSourceFilesAtPaths is the slow step; give the hook the same budget.
  beforeAll(() => {
    project = new Project({
      tsConfigFilePath: resolve(SRC_DIR, "..", "tsconfig.json"),
      skipAddingFilesFromTsConfig: true,
    });
    project.addSourceFilesAtPaths(resolve(SRC_DIR, "**/*.{ts,tsx}"));
  }, 30_000);

  test("returns exported names from src/core/button/index.ts", () => {
    const filePath = resolve(SRC_DIR, "core", "button", "index.ts");
    const names = getExportedNames(project, filePath);

    expect(names).toContain("Button");
    expect(names).toContain("AnchorButton");
  });

  test("returns names in sorted order", () => {
    const filePath = resolve(SRC_DIR, "core", "button", "index.ts");
    const names = getExportedNames(project, filePath);

    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test("excludes bare Props name", () => {
    // The generator excludes the generic 'Props' name to avoid noise
    const filePath = resolve(SRC_DIR, "core", "button", "index.ts");
    const names = getExportedNames(project, filePath);

    expect(names).not.toContain("Props");
  });

  test("returns empty array for a non-existent file path", () => {
    const names = getExportedNames(project, "/does/not/exist.ts");
    expect(names).toEqual([]);
  });

  test("returns exported names from src/icons/more.tsx", () => {
    const filePath = resolve(SRC_DIR, "icons", "more.tsx");
    const names = getExportedNames(project, filePath);

    expect(names).toContain("MoreIcon");
  });
});

// ─── buildExportMap ───────────────────────────────────────────────────────────

// buildExportMap creates a ts-morph Project and walks every component index and source
// file in the tree. This is the most expensive test in the file; under v8
// coverage on CI the work regularly exceeds the default 5 s timeout.
// Both the describe timeout (tests) and beforeAll timeout (hook) must be set —
// Vitest's describe timeout does not cover beforeAll/afterAll hooks.
describe("buildExportMap (integration, against real source)", { timeout: 30_000 }, () => {
  // This is the most expensive test — it reads the entire source tree.
  // It validates key invariants of the generated map.

  let exportMap: Record<string, string>;

  // buildExportMap internally creates a ts-morph Project and processes every
  // source file; give the hook the same 30 s budget as the tests.
  // Suppress the expected duplicate-export console.warn — the duplicates are a
  // known property of the source structure, not a test failure.
  beforeAll(() => {
    const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
    exportMap = buildExportMap(SRC_DIR);
    consoleWarn.mockRestore();
  }, 30_000);

  test("produces a non-empty map", () => {
    expect(Object.keys(exportMap).length).toBeGreaterThan(0);
  });

  test("maps Button to core/button", () => {
    expect(exportMap["Button"]).toBe("core/button");
  });

  test("maps AnchorButton to core/button", () => {
    expect(exportMap["AnchorButton"]).toBe("core/button");
  });

  test("maps MoreIcon to icons/more", () => {
    expect(exportMap["MoreIcon"]).toBe("icons/more");
  });

  test("maps Popover to utils/popover", () => {
    expect(exportMap["Popover"]).toBe("utils/popover");
  });

  test("maps getIntentClassName to deprecated/styles", () => {
    expect(exportMap["getIntentClassName"]).toBe("deprecated/styles");
  });

  test("maps Intent to deprecated/styles", () => {
    expect(exportMap["Intent"]).toBe("deprecated/styles");
  });

  test("maps Theme to utils/theme-provider", () => {
    expect(exportMap["Theme"]).toBe("utils/theme-provider");
  });

  test("does NOT include bare Props", () => {
    expect(exportMap["Props"]).toBeUndefined();
  });

  test("all values are namespaced subpaths (namespace/slug pattern)", () => {
    const validSubpath = /^(core|deprecated|utils|icons)\/.+/;
    for (const [name, subpath] of Object.entries(exportMap)) {
      expect(subpath, `${name} has invalid subpath '${subpath}'`).toMatch(validSubpath);
    }
  });

  test("has at least 1000 entries (sanity check for completeness)", () => {
    expect(Object.keys(exportMap).length).toBeGreaterThanOrEqual(1000);
  });
});
