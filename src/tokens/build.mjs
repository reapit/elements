// @ts-check

/**
 * @typedef {import('./types.ts').Theme} Theme
 * @typedef {import('style-dictionary').Config} Config
 */

import StyleDictionary from 'style-dictionary'

/** @type {Theme[]} */
const themes = ['payprop', 'reapit']

/** @returns {Config} */
function getConfig(themeName) {
  return {
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
        transformGroup: 'web',
      },
    },
  }
}

themes.map(async (theme) => {
  const sd = new StyleDictionary(getConfig(theme))
  sd.buildAllPlatforms()
})
