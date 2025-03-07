module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    amd: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
  ignorePatterns: [
    'node_modules/',
    'setup-tests.ts',
    '.prettierrc.js',
    'react-app-scaffolder/',
    'marketplace-api-schema.ts',
    'platform-schema.ts',
    'packages/*/build',
    'packages/*/dist',
    'packages/*/public/dist',
    'chat-bot.js',
  ],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
    semi: ['error', 'never'],
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-vars': 'off',
    'no-debugger': 'off',
    'prettier/prettier': 'off',
    'max-len': ['error', { code: 120, ignoreUrls: true, ignoreTemplateLiterals: true, ignoreStrings: true }],
    'no-confusing-arrow': ['error', { allowParens: false }],
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
      },
    ],
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-unexpected-multiline': 'error',
    // Disabling as conflicts with Prettier
    indent: 0,
    'react/react-in-jsx-scope': 0,
    // Disabling as we are validating types with TypeScript not PropTypes
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/display-name': 0,
    // Disabling this rule as storybook has a rendering issue bug which requires us to pass an
    // object to the render func in stories.tsx files
    // See workaround https://github.com/storybookjs/storybook/issues/22281#issuecomment-1932843183
    'no-empty-pattern': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
