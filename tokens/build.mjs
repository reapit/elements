import StyleDictionaryPackage from 'style-dictionary'
const { fileHeader, formattedVariables } = StyleDictionaryPackage.formatHelpers

const themes = ['Reapit', 'PayProp']

const getStyleDictionaryConfig = (theme) => {
  const lowerCasedTheme = theme.toLowerCase()
  return {
    source: ['./tokens/tokens.json'],
    format: {
      linariaFormat: ({ dictionary, options, file }) => {
        const { outputReferences } = options
        const lineSeparator = '\n'

        return (
          fileHeader({ file }) +
          `export const tokens${theme} = ` +
          '`' +
          lineSeparator +
          formattedVariables({
            dictionary,
            outputReferences,
            format: 'css',
            formatting: {
              prefix: '--',
              separator: ':',
              suffix: ';',
            },
          }) +
          lineSeparator +
          '`' +
          lineSeparator
        )
      },
    },
    parsers: [
      {
        pattern: /\.json$/,
        parse: ({ contents }) => {
          try {
            const object = JSON.parse(contents)
            const primitives = object['Primitives/Value']
            const payProp = object[`Semantic variables/${theme}`]
            return { ...primitives, ...payProp }
          } catch (error) {
            console.log(error)
          }
        },
      },
    ],
    platforms: {
      linaria: {
        buildPath: `tokens/${lowerCasedTheme}/`,
        files: [
          {
            destination: 'linaria-tokens.ts',
            format: 'linariaFormat',
          },
        ],
      },
      ts: {
        buildPath: `tokens/${lowerCasedTheme}/`,
        files: [
          {
            destination: 'typescript-tokens.ts',
            format: 'javascript/es6',
          },
        ],
        transforms: ['name/cti/camel'],
      },
    },
  }
}

themes.map((theme) => {
  const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(theme))

  StyleDictionary.buildAllPlatforms()
})
