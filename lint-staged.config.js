/** @type {import('lint-staged').Configuration} */
export default {
  // oxlint skips non-script files; oxfmt uses --no-error-on-unmatched-pattern,
  // so a single '*' glob covers all file types without a separate non-scripts entry.
  '*': ['oxlint --fix', 'oxfmt --no-error-on-unmatched-pattern'],
  // Unit tests are read-only and target source/codemod files only, so lint-staged runs
  // this key concurrently with the lint/format tasks above.
  '{src,codemods}/**/*': 'vitest related --run --passWithNoTests',
}
