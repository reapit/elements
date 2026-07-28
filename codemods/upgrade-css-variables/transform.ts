import { CSS_VARIABLE_MAP, bestEffortComment, inlineComment } from "./css-variable-map.js";

/**
 * Codemod to migrate legacy v4 CSS custom properties to their v5 equivalents.
 *
 * Supports all file types where `var(--…)` notation is used: .tsx, .ts, .css,
 * .scss, .less, .jsx, .js.
 *
 * Transformations:
 * - Direct (1-to-1) mappings: variable name is replaced silently.
 * - Best-effort mappings: variable name is replaced AND an inline TODO comment
 *   is appended to flag the replacement for manual review.
 * - Inline mappings: var(--name) is replaced with the fully-resolved concrete
 *   value and a "was var(--name)" comment. Any fallback is dropped.
 * - --z-index-* variables (and any other truly unmapped variables): left
 *   unchanged with no modification.
 *
 * Existing fallback values inside var() are preserved unchanged for direct and
 * best-effort mappings. For inline mappings the fallback is dropped — it is
 * redundant once the value is resolved to a concrete literal.
 * New fallback values are never added.
 *
 * Uses a parenthesis-aware parser rather than a regex so that fallback values
 * containing nested parentheses (e.g. `var(--token, rgba(0,0,0,0.5))` or
 * `var(--token, var(--fallback))`) are handled correctly.
 */

/**
 * Replace CSS var() calls in the given source string using CSS_VARIABLE_MAP.
 *
 * Parses each var(...) call manually to correctly handle fallbacks that contain
 * nested parentheses or additional var()/function calls, e.g.:
 *   var(--token, var(--fallback))
 *   var(--token, rgba(0, 0, 0, 0.5))
 */
function replaceCssVarCalls(source: string): string {
  let result = "";
  let index = 0;

  while (index < source.length) {
    const start = source.indexOf("var(", index);

    if (start === -1) {
      result += source.slice(index);
      break;
    }

    result += source.slice(index, start);

    // Find the matching closing parenthesis for this var( call.
    let i = start + 4; // position just after 'var('
    let depth = 1;
    let inSingleQuote = false;
    let inDoubleQuote = false;
    let escaped = false;
    let hitBacktick = false;

    for (; i < source.length; i++) {
      const ch = source[i];

      if (escaped) {
        escaped = false;
        continue;
      }

      if (ch === "\\") {
        escaped = true;
        continue;
      }

      if (inSingleQuote) {
        if (ch === "'") inSingleQuote = false;
        continue;
      }

      if (inDoubleQuote) {
        if (ch === '"') inDoubleQuote = false;
        continue;
      }

      if (ch === "'") {
        inSingleQuote = true;
        continue;
      }
      if (ch === '"') {
        inDoubleQuote = true;
        continue;
      }

      // A backtick marks a template-literal boundary in .tsx/.ts source files.
      // If we encounter one while scanning for the closing ')' of a var() call,
      // the var( is either malformed or sits in a JS context we cannot safely
      // parse. Emit the text up to (but not including) the backtick unchanged,
      // then resume scanning from the backtick so later var() calls in the
      // same source string are still processed.
      if (ch === "`") {
        result += source.slice(start, i);
        index = i;
        hitBacktick = true;
        break;
      }

      if (ch === "(") {
        depth++;
        continue;
      }

      if (ch === ")") {
        depth--;
        if (depth === 0) break;
      }
    }

    // Resume the outer loop from the backtick position — the var( was malformed
    // but scanning must continue so subsequent var() calls are still processed.
    if (hitBacktick) continue;

    // If we ran out of input without closing the var(, append the rest and exit.
    if (i >= source.length) {
      result += source.slice(start);
      break;
    }

    const end = i; // index of the matching ')'
    const fullCall = source.slice(start, end + 1); // includes 'var(' and ')'
    const inner = source.slice(start + 4, end); // content between '(' and ')'

    // Extract the variable name and preserve the remainder (fallback + whitespace).
    const varMatch = inner.match(/^\s*(--[a-zA-Z0-9_-]+)([\s\S]*)$/);

    if (!varMatch) {
      result += fullCall;
      index = end + 1;
      continue;
    }

    const varName = varMatch[1];
    const fallback = varMatch[2] ?? "";

    const key = varName.slice(2);
    const mapping = CSS_VARIABLE_MAP[key];

    if (!mapping) {
      result += fullCall;
      index = end + 1;
      continue;
    }

    if (mapping.kind === "inline") {
      // Replace the entire var() call (including any fallback) with the
      // resolved concrete value. Fallback is dropped — it's moot once the
      // value is inlined.
      result += `${mapping.inlinedValue} ${inlineComment(varName)}`;
    } else {
      const replacement = `var(${mapping.v5}${fallback})`;

      if (mapping.kind === "best_effort") {
        result += `${replacement} ${bestEffortComment(varName)}`;
      } else {
        result += replacement;
      }
    }

    index = end + 1;
  }

  return result;
}

export default function transform(
  source: string,
  _filePath?: string,
  _options?: { facadePackage?: string },
): string {
  // Early exit when there are definitely no CSS variable references to process.
  if (!source.includes("var(--")) {
    return source;
  }

  return replaceCssVarCalls(source);
}
