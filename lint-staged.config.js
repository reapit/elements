/** @type {import('lint-staged').Configuration} */
export default {
  '*.{js,jsx,ts,tsx,mjs,cjs}': ['oxlint --fix', 'oxfmt --no-error-on-unmatched-pattern'],
  '!(*.js|*.jsx|*.ts|*.tsx|*.mjs|*.cjs)': 'oxfmt --no-error-on-unmatched-pattern',
}
