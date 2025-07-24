/** @type {import('stylelint').Config} */
export default {
  customSyntax: '@linaria/postcss-linaria',
  rules: {
    // Prevent use of obsolete @-rules and properties
    'at-rule-no-deprecated': true,
    'declaration-property-value-keyword-no-deprecated': true,

    // Prevent descending specificity
    'no-descending-specificity': true,

    // Prevent duplicate properties
    'declaration-block-no-duplicate-custom-properties': true,
    'declaration-block-no-duplicate-properties': true,
    'font-family-no-duplicate-names': true,
    'keyframe-block-no-duplicate-selectors': true,
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': null, // TODO: Change to true when we've removed the global styles

    // Prevent empty blocks
    'block-no-empty': true,

    // Prevent invalid CSS
    'annotation-no-unknown': true,
    'at-rule-descriptor-no-unknown': true,
    'at-rule-descriptor-value-no-unknown': true,
    'at-rule-no-unknown': true,
    'at-rule-prelude-no-invalid': false, // TODO: This rule doesn't play nice with interpolations in template strings
    'color-no-invalid-hex': true,
    'custom-property-no-missing-var-function': true,
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'function-no-unknown': true,
    'keyframe-declaration-no-important': true,
    'media-feature-name-no-unknown': true,
    'media-feature-name-value-no-unknown': true,
    'media-query-no-invalid': false, // TODO: This rule doesn't play ncie with interpolations in template strings
    'named-grid-areas-no-invalid': true,
    'no-invalid-double-slash-comments': true,
    'no-invalid-position-at-import-rule': null, // TODO: Change to true when we've removed the global styles
    'no-unknown-custom-media': true,
    'no-unknown-custom-properties': null, // TODO: We want this on, but our tokens aren't available to the linter
    'property-no-unknown': true,
    'selector-pseudo-class-no-unknown': null, // TODO: Change to true when we've removed the global styles
    'selector-pseudo-element-colon-notation': 'double',
    'selector-pseudo-element-no-unknown': true,
    'string-no-newline': true,
    'syntax-string-no-invalid': true,
    'unit-no-unknown': true,

    // Prevent accidents
    'declaration-block-no-shorthand-property-overrides': true,
    'selector-anb-no-unmatchable': true,

    // Enforce code style
    'color-function-alias-notation': 'without-alpha',
    'color-function-notation': 'modern',
    'color-hex-length': 'long',
    'declaration-block-no-redundant-longhand-properties': true,
    'comment-whitespace-inside': 'always',
    'import-notation': 'string',
    'length-zero-no-unit': true,
    'shorthand-property-no-redundant-values': true,
    'no-irregular-whitespace': true,
  },
}
