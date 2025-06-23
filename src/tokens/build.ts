import StyleDictionary from 'style-dictionary'

import type { Config } from 'style-dictionary'
import type { Theme } from './types'

const themes = ['payprop', 'reapit'] as const satisfies Theme[]

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

function getConfig(themeName: Theme): Config {
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
              const isSemanticToken = token.filePath.includes('Semantics')

              // Further, we only want to include tokens that are not internal. This is because internal tokens are
              // for use in Figma only.
              const isInternalToken = token.path.some((pathSegment) => pathSegment === 'internal')

              return isSemanticToken && !isInternalToken
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
