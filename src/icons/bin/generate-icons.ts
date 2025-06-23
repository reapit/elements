// README: This script generates icon files from the SVG files in the `svgs` directory, as well as
// a barrel file that exports all icons (this barrel file is primarily used for the Storybook docs).
//
// To run it, use `yarn generate:icons`. You will need to have Node.js 22.x or higher installed.

import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdirSync, writeFileSync } from 'node:fs'
import { styleText } from 'node:util'

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
function main() {
  const svgFiles = readdirSync(iconsDir).filter((file) => file.endsWith('.svg'))

  // Generate icon files for all SVG files
  svgFiles.forEach(generateIconFile)
  console.log(styleText('green', `✔️ Generated ${svgFiles.length} icon files`))

  // Create a barrel file for all icons
  writeBarrelFile(svgFiles)
  console.log(styleText('green', '✔️ Generated icon barrel file'))
}

try {
  main()
} catch (error) {
  console.error(styleText('red', '❌ An error occurred during icon generation:'))
  console.error(error)
  process.exit(1)
}
