import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Utility to convert a string to PascalCase
function toPascalCase(str: string): string {
  return str
    .split(/[-_ ]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

const iconsDir = path.join(__dirname, '../assets/icons')
const outputDir = path.join(__dirname, '../src/iconsNew')

// Clear the output directory (delete it entirely if it exists)
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true })
}
// Recreate the output directory
fs.mkdirSync(outputDir, { recursive: true })

const files = fs.readdirSync(iconsDir).filter((file) => file.endsWith('.svg'))
const exportStatements: string[] = []

files.forEach((file) => {
  const baseName = path.basename(file, '.svg')
  const componentName = `${toPascalCase(baseName)}Icon`
  const content = `import { createIconComponent } from '../components/iconNew/createIconComponent'
import IconSvg from '../../assets/icons/${file}?react'

export const ${componentName} = createIconComponent(IconSvg, '${componentName.replace(/Icon$/, '')}')
`
  fs.writeFileSync(path.join(outputDir, `${baseName}.tsx`), content, 'utf8')
  exportStatements.push(`export * from './${baseName}'`)
})

// Generate a barrel file that re-exports all icons
fs.writeFileSync(path.join(outputDir, 'index.ts'), exportStatements.join('\n') + '\n', 'utf8')

console.log('Icon components generated:', files.length)
