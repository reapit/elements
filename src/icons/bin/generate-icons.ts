// README: This script generates icon files from the SVG files in the `svgs` directory, as well as
// a barrel file that exports all icons (this barrel file is primarily used for the Storybook docs).
//
// To run it, use `yarn generate:icons`. You will need to have Node.js 22.x or higher installed.

import { basename, dirname, join } from 'node:path'
import { client } from '@figma/code-connect'
import { fileURLToPath } from 'node:url'
import { readdirSync, writeFileSync } from 'node:fs'
import { styleText } from 'node:util'

type FigmaComponent = Awaited<ReturnType<typeof client.getComponents>>[number]

// We read from `src/icons/svgs`
const iconsDir = join(dirname(fileURLToPath(import.meta.url)), '../svgs')

// We write to `src/icons`
const outputDir = join(dirname(fileURLToPath(import.meta.url)), '../')

function kebabToPascalCase(kebab: string): string {
  return kebab
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

/** Load icon components from Reapit DS Figma file. */
async function loadFigmaIcons(): Promise<FigmaComponent[]> {
  // The `?node-id=xxx` query param is important as it helps Figma narrow the search for components to within
  // the identified node in the figma file. In this case, the node is the "Icons list" auto layout layer
  // which contains all the icon component instances.
  return await client.getComponents('https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=20-727')
}

/** Create a file for a specific icon */
function generateIconFile(svgFileName: string): void {
  const baseName = basename(svgFileName, '.svg')
  const pascalCaseName = kebabToPascalCase(baseName)
  const svgImportPath = `./svgs/${baseName}.svg?react`

  const fileContent = `import ${pascalCaseName}Svg from '${svgImportPath}'
import { makeIcon } from './make-icon'

export const ${pascalCaseName}Icon = makeIcon('${pascalCaseName}Icon', ${pascalCaseName}Svg)
`

  const outputPath = join(outputDir, `${baseName}.tsx`)
  writeFileSync(outputPath, fileContent)
}

/** Create a Figma code connect file for a specific icon */
function generateIconCodeConnectFile(svgFileName: string, figmaIconComponent?: FigmaComponent): void {
  if (!figmaIconComponent) {
    return
  }

  const baseName = basename(svgFileName, '.svg')
  const pascalCaseName = kebabToPascalCase(baseName)
  const iconComponentName = `${pascalCaseName}Icon`
  const iconImportPath = `./${baseName}`

  const fileContent = `import figma from '@figma/code-connect'
import { ${iconComponentName} } from '${iconImportPath}'

figma.connect(${iconComponentName}, '${figmaIconComponent.figmaUrl}')
`

  const outputPath = join(outputDir, `${baseName}.figma.tsx`)
  writeFileSync(outputPath, fileContent)
}

/** Create a barrel file for all icons */
function writeBarrelFile(svgFiles: string[]): void {
  const fileContent = svgFiles
    .map((file) => {
      const baseName = basename(file, '.svg')
      return `export * from './${baseName}'`
    })
    .join('\n')

  writeFileSync(join(outputDir, 'index.ts'), `${fileContent}\n`)
}

/** Main script execution */
async function main() {
  const svgFiles = readdirSync(iconsDir).filter((file) => file.endsWith('.svg'))

  const figmaIcons = await loadFigmaIcons()

  // Generate icon files for all SVG files
  svgFiles.forEach(generateIconFile)

  console.log(styleText('green', `✔️ Generated ${svgFiles.length} icon files`))

  // Generate icon code connect files for all icons
  const failedCodeConnectFiles = svgFiles
    .map((file) => {
      const figmaIcon = figmaIcons.find((icon) => icon.name === basename(file, '.svg'))
      try {
        generateIconCodeConnectFile(file, figmaIcon)
      } catch (error) {
        console.log(styleText('red', `❌ Error generating code connect file for ${file}`))
        return file
      }
    })
    .filter(Boolean)

  if (failedCodeConnectFiles.length === 0) {
    console.log(styleText('green', `✔️ Generated ${svgFiles.length} code connect files`))
  } else {
    console.log(
      styleText('yellow', `⚠️ Generated ${svgFiles.length - failedCodeConnectFiles.length} code connect files`),
    )
  }

  // Create a barrel file for all icons
  writeBarrelFile(svgFiles)
  console.log(styleText('green', '✔️ Generated icon barrel file'))
}

try {
  await main()
} catch (error) {
  console.error(styleText('red', '❌ An error occurred during icon generation:'))
  console.error(error)
  process.exit(1)
}
