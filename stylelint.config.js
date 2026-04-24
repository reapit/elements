/** @type {import('stylelint').Config} */
export default {
  customSyntax: '@linaria/postcss-linaria',
  plugins: ['stylelint-no-unsupported-browser-features'],
  rules: {
    // Zero-support violations are reported as errors. Partial-support violations are suppressed
    // via ignorePartialSupport, because caniuse groups CSS features coarsely: a single entry can
    // cover both fully-supported sub-properties and unsupported ones (e.g. `column-gap` within
    // `multicolumn`, `text-decoration-style` within `text-decoration`).
    'plugin/no-unsupported-browser-features': [
      'error',
      {
        severity: 'error',
        ignorePartialSupport: true,
        ignore: [
          // Touch devices have no resize handles, so the property has no effect on iOS Safari.
          'css-resize',
          // iOS Safari 18.2–26.1 renders unstyled scrollbars; the visual difference is acceptable.
          // Support arrives in iOS Safari 26.2 (Baseline 2025).
          'css-scrollbar',
          // Touch devices have no cursor, so custom cursor values have no effect on iOS Safari.
          'css3-cursors',
          // touch-action is used as a progressive enhancement to prevent page scroll during swipe
          // gestures. iOS Safari ignores it, but the interaction degrades gracefully without it.
          'css-touch-action',
        ],
      },
    ],

    // Prevent use of obsolete @-rules and properties
    'at-rule-no-deprecated': true,
    'declaration-property-value-keyword-no-deprecated': true,

    // Would be nice to prevent descending specificity, but it doesn't play well with nested styles
    'no-descending-specificity': null,

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
    'at-rule-prelude-no-invalid': null, // TODO: This rule doesn't play nice with interpolations in template strings
    'color-no-invalid-hex': true,
    'custom-property-no-missing-var-function': true,
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'function-no-unknown': true,
    'keyframe-declaration-no-important': true,
    'media-feature-name-no-unknown': true,
    'media-feature-name-value-no-unknown': true,
    'media-query-no-invalid': null, // TODO: This rule doesn't play ncie with interpolations in template strings
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
