import path from "node:path";

const ELEMENTS_DIR = path.resolve(import.meta.dirname, "packages/elements");

/** @type {import('lint-staged').Configuration} */
export default {
  // uses --no-error-on-unmatched-pattern, so a single '*' glob covers all file types without
  // a separate non-scripts entry.
  "*": ["oxlint --fix --no-error-on-unmatched-pattern", "oxfmt --no-error-on-unmatched-pattern"],
  // Unit tests are read-only and target source/codemod files only, so lint-staged runs
  // this key concurrently with the lint/format tasks above.
  //
  // lint-staged runs from the repo root and hands over absolute paths, but vitest has to run
  // inside the elements workspace to pick up its config. So re-base each path onto that
  // workspace before passing it along.
  "packages/elements/{src,codemods}/**/*": (files) => {
    const relative = files.map((file) => JSON.stringify(path.relative(ELEMENTS_DIR, file)));
    return [
      `yarn workspace @reapit/elements exec vitest related --run --passWithNoTests ${relative.join(" ")}`,
    ];
  },
};
