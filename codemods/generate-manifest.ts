import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { parseFrontMatter } from './readme-parser.ts'
import { styleText } from 'node:util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface CodemodMetadata {
  name: string
  description: string | null
}

/**
 * Discovers available codemods by scanning for directories with transform.ts files.
 * Exported for testing.
 *
 * @param codemodDir - The directory to scan for codemods
 * @returns Array of codemod names sorted alphabetically
 */
export function discoverCodemods(codemodDir: string): string[] {
  try {
    const entries = readdirSync(codemodDir, { withFileTypes: true })

    return entries
      .filter((entry) => {
        if (!entry.isDirectory()) return false
        // Skip special directories
        if (entry.name === 'node_modules' || entry.name === '__tests__' || entry.name.startsWith('.')) {
          return false
        }
        // Check if directory contains a transform.ts file
        try {
          statSync(join(codemodDir, entry.name, 'transform.ts'))
          return true
        } catch {
          return false
        }
      })
      .map((entry) => entry.name)
      .sort() // Sort alphabetically for consistent output
  } catch {
    return []
  }
}

/**
 * Extracts metadata for a specific codemod from its README.
 * Exported for testing.
 *
 * @param codemodDir - The directory containing the codemod
 * @param name - The codemod name
 * @returns CodemodMetadata object
 */
export function getCodemodMetadata(codemodDir: string, name: string): CodemodMetadata {
  try {
    const readmePath = join(codemodDir, name, 'README.md')
    const readme = readFileSync(readmePath, 'utf-8')
    const { description } = parseFrontMatter(readme)

    return {
      name,
      description: description ?? null,
    }
  } catch (error) {
    console.warn(
      styleText('yellow', `Warning: Could not read README for codemod '${name}': ${(error as Error).message}`),
    )
    return {
      name,
      description: null,
    }
  }
}

/**
 * Generates the JSON manifest content.
 */
function generateManifestContent(codemods: CodemodMetadata[]): string {
  const manifest = {
    $schema: './manifest.schema.json',
    generated: new Date().toISOString(),
    codemods: codemods.map((c) => ({
      name: c.name,
      description: c.description,
    })),
  }

  return JSON.stringify(manifest, null, 2) + '\n'
}

/**
 * Main function to generate the manifest file.
 */
function main(): void {
  console.log('Generating codemod manifest...')

  // Discover available codemods
  const codemodNames = discoverCodemods(__dirname)
  console.log(`Found ${codemodNames.length} codemod(s): ${codemodNames.join(', ')}`)

  // Get metadata for each codemod
  const codemods = codemodNames.map((name) => getCodemodMetadata(__dirname, name))

  // Generate manifest content
  const manifestContent = generateManifestContent(codemods)

  // Write to file
  const outputPath = join(__dirname, 'manifest.json')
  writeFileSync(outputPath, manifestContent, 'utf-8')

  console.log(styleText('green', `✓ Generated manifest at ${outputPath}`))
  console.log(`  ${codemods.length} codemod(s) registered`)
  console.log('\nTo regenerate this file, run: yarn generate:codemod-manifest')
}

if (import.meta.main) {
  main()
}
