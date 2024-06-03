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
            const primitives = object['_Primitives/Value']
            const components = object[`Semantic variables/${theme}`] || object['Semantic variables/Reapit']
            const semantics = object[`_Component variables/${theme}`] || object['_Component variables/Reapit']
            return { ...primitives, ...semantics, ...components }
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
