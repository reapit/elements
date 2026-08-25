/**
 * Classifies a design token change into added, changed, renamed and removed
 * tokens, and reports where each removed CSS custom property is still used.
 *
 * Run from the repo root after `yarn generate:tokens`:
 *
 *   node --experimental-strip-types \
 *     .agents/skills/sync-design-tokens/scripts/classify-token-diff.ts [base-ref]
 *
 * `base-ref` defaults to HEAD. Output is JSON on stdout.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";

const baseRef = process.argv[2] ?? "HEAD";

const TOKENS_DIR = "packages/elements/src/tokens";
const JSON_FILES = [
  "Semantics.Reapit.tokens.json",
  "Semantics.PayProp.tokens.json",
  "Primitives.Value.tokens.json",
  "effect.styles.tokens.json",
];
const CSS_FILES = ["reapit.css", "payprop.css"];

/** The generated CSS is the published surface; the JSON is the source. */
type Surface = "css" | "json";

interface Rename {
  from: string;
  to: string;
  value: string;
}

/** Above this, the hit list is truncated — `total` still carries the real count. */
const MAX_HITS = 20;

interface Usage {
  /** The literal property searched for, or the interpolation stem that matched. */
  pattern: string;
  interpolated: boolean;
  total: number;
  hits: string[];
}

const git = (args: string[]): string | null => {
  try {
    return execFileSync("git", args, { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  } catch {
    // The file did not exist at base-ref — treat it as empty rather than fatal.
    return null;
  }
};

const readBase = (path: string) => git(["show", `${baseRef}:${path}`]);
const readWorking = (path: string) => (fs.existsSync(path) ? fs.readFileSync(path, "utf8") : null);

/** `--colour-fill-white: #ffffff;` → `["--colour-fill-white", "#ffffff"]` */
const parseCss = (css: string | null): Map<string, string> => {
  const out = new Map<string, string>();
  if (!css) return out;
  for (const [, name, value] of css.matchAll(/^\s*(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+);/gm)) {
    out.set(name, value.trim());
  }
  return out;
};

/** Flattens a DTCG tree to `colour/fill/white` → serialised `$value`. */
const parseTokens = (raw: string | null): Map<string, string> => {
  const out = new Map<string, string>();
  if (!raw) return out;
  const walk = (node: unknown, path: string[]) => {
    if (node === null || typeof node !== "object") return;
    const record = node as Record<string, unknown>;
    if ("$value" in record) {
      out.set(path.join("/"), JSON.stringify(record.$value));
      return;
    }
    for (const [key, child] of Object.entries(record)) walk(child, [...path, key]);
  };
  walk(JSON.parse(raw), []);
  return out;
};

interface Classification {
  added: string[];
  removed: string[];
  changed: { name: string; from: string; to: string }[];
  renamed: Rename[];
}

/**
 * A rename is inferred, not declared: Figma reports a renamed variable as one
 * gone and one arrived. Pairing on identical value is the only signal available,
 * so a same-value add/remove pair is reported as a rename candidate for the
 * caller to confirm, and dropped from `added`/`removed`.
 */
const classify = (base: Map<string, string>, next: Map<string, string>): Classification => {
  const added: string[] = [];
  const removed: string[] = [];
  const changed: Classification["changed"] = [];

  for (const [name, value] of next) {
    const before = base.get(name);
    if (before === undefined) added.push(name);
    else if (before !== value) changed.push({ name, from: before, to: value });
  }
  for (const name of base.keys()) if (!next.has(name)) removed.push(name);

  const renamed: Rename[] = [];
  for (const from of [...removed]) {
    const value = base.get(from)!;
    const to = added.find((candidate) => next.get(candidate) === value);
    if (!to) continue;
    renamed.push({ from, to, value });
    removed.splice(removed.indexOf(from), 1);
    added.splice(added.indexOf(to), 1);
  }

  return { added: added.sort(), removed: removed.sort(), changed, renamed };
};

/**
 * Finds where a removed custom property is still referenced. A literal search
 * is not enough: component styles build property names by interpolation
 * (`var(--comp-badge-colour-fill-${intent})`), so when the literal misses, the
 * name is searched again with trailing segments stripped one at a time.
 */
const findUsage = (property: string, sources: { path: string; text: string }[]): Usage => {
  const search = (needle: string, bounded: boolean) => {
    // `--colour-fill-action-light` must not match `--colour-fill-action-lightest`,
    // so a literal search requires the name to end where the token name ends.
    // Custom property names are `[a-zA-Z0-9_-]` only, so none of this needs escaping.
    const pattern = new RegExp(needle + (bounded ? "(?![a-zA-Z0-9_-])" : ""));
    const hits: string[] = [];
    for (const { path, text } of sources) {
      text.split("\n").forEach((line, index) => {
        if (pattern.test(line)) hits.push(`${path}:${index + 1}`);
      });
    }
    return hits;
  };

  const found = (pattern: string, interpolated: boolean, hits: string[]): Usage => ({
    pattern,
    interpolated,
    total: hits.length,
    hits: hits.slice(0, MAX_HITS),
  });

  const literal = search(property, true);
  if (literal.length > 0) return found(property, false, literal);

  const segments = property.split("-");
  // Stop well short of the bare `--` prefix; a two-segment stem matches everything.
  while (segments.length > 4) {
    segments.pop();
    const stem = `${segments.join("-")}-`;
    const hits = search(stem, false);
    if (hits.length > 0) return found(stem, true, hits);
  }

  return found(property, false, []);
};

const collectSources = () => {
  const tracked = git(["ls-files", "packages/elements/src", "packages/elements/codemods"]) ?? "";
  return tracked
    .trim()
    .split("\n")
    .filter((path) => /\.(ts|tsx|css|mdx)$/.test(path) && !path.startsWith(`${TOKENS_DIR}/dist/`))
    .map((path) => ({ path, text: fs.readFileSync(path, "utf8") }));
};

const mergeSurface = (
  files: string[],
  dir: string,
  parse: (raw: string | null) => Map<string, string>,
) => {
  const base = new Map<string, string>();
  const next = new Map<string, string>();
  for (const file of files) {
    const path = `${dir}/${file}`;
    // Namespaced by file so the same token in two themes stays distinguishable.
    try {
      for (const [key, value] of parse(readBase(path))) base.set(`${file}:${key}`, value);
      for (const [key, value] of parse(readWorking(path))) next.set(`${file}:${key}`, value);
    } catch (error) {
      // Only parseTokens throws here. Name the file, which a bare SyntaxError does not.
      throw new Error(`${path} is not valid JSON`, { cause: error });
    }
  }
  return { base, next };
};

const strip = (name: string) => name.slice(name.indexOf(":") + 1);

const surfaces: Record<Surface, Classification> = {
  json: ((): Classification => {
    const { base, next } = mergeSurface(JSON_FILES, TOKENS_DIR, parseTokens);
    return classify(base, next);
  })(),
  css: ((): Classification => {
    const { base, next } = mergeSurface(CSS_FILES, `${TOKENS_DIR}/dist`, parseCss);
    return classify(base, next);
  })(),
};

// Only the CSS surface is published, so usage is only searched for properties
// that left it. Deduplicated across themes — both files declare the same names.
const gone = [
  ...new Set([...surfaces.css.removed, ...surfaces.css.renamed.map((r) => r.from)].map(strip)),
].sort();
const sources = gone.length > 0 ? collectSources() : [];
const usage = Object.fromEntries(gone.map((property) => [property, findUsage(property, sources)]));

// The exporter flags names ending in a space and a digit; by the time they reach
// the JSON the space is an underscore, so re-flag them on this side too.
const suspicious = [
  ...new Set(surfaces.json.added.map(strip).filter((name) => /_\d+$/.test(name.split("/").pop()!))),
].sort();

const bump = (() => {
  if (surfaces.css.removed.length > 0 || surfaces.css.renamed.length > 0) return "minor";
  if (surfaces.css.added.length > 0) return "minor";
  if (surfaces.css.changed.length > 0) return "patch";
  return "none";
})();

console.log(
  JSON.stringify(
    {
      baseRef,
      bump,
      json: surfaces.json,
      css: surfaces.css,
      usage,
      suspicious,
    },
    null,
    2,
  ),
);
