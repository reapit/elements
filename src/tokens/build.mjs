// @ts-check

/**
 * @typedef {import('./types.ts').Theme} Theme
 * @typedef {import('style-dictionary').Config} Config
 */

import StyleDictionary from 'style-dictionary'

/** @type {Theme[]} */
const themes = ['payprop', 'reapit']

StyleDictionary.registerTransform({
  name: 'name/custom-format',
  type: 'name',
  transform: (token) => {
    return (
      token.path
        .map((variable) => {
          if (variable.includes('_')) {
            // Preserve existing underscores (_)
            return variable
          }
          // Convert camelCase to kebab-case
          return variable.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
        })
        // Use `-` as the separator between segments
        .join('-')
    )
  },
})

/** @returns {Config} */
function getConfig(themeName) {
  return {
    log: {
      verbosity: 'verbose',
    },
    source: [
      './src/tokens/Primitives.Value.tokens.json',
      `./src/tokens/Semantics.${themeName.toUpperCase()}.tokens.json`,
    ],
    platforms: {
      css: {
        buildPath: 'src/tokens/dist/',
        files: [
          {
            destination: `${themeName}.css`,
            filter(token) {
              // We only want to include semantic tokens in our output because they are resolved to explicit values
              // instead of referencing the primitives. This is important because we do not want to expose the
              // primitives to consumers, (1) to prevent their misuse, and (2) to minimise the number of CSS variables
              // at play.
              return token.filePath.includes('Semantics')
            },
            format: 'css/variables',
          },
        ],
        options: {
          selector: themeName === 'reapit' ? ':root, :root[data-theme="reapit"]' : `:root[data-theme="${themeName}"]`,
        },
        transforms: ['name/custom-format', 'attribute/cti'], // Apply custom transform
      },
    },
  }
}

themes.map(async (theme) => {
  const sd = new StyleDictionary(getConfig(theme))
  sd.buildAllPlatforms()
})
