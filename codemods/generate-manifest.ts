import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
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
  // Always read from the script's own directory (codemods/)
  const sourceDir = __dirname

  // Write to both source and dist directories
  const outputDirs = [
    sourceDir, // codemods/manifest.json (for development and tests)
    join(__dirname, '..', 'dist', 'codemods'), // dist/codemods/manifest.json (for built package)
  ]

  console.log('Generating codemod manifest...')

  // Discover available codemods (read from source)
  const codemodNames = discoverCodemods(sourceDir)
  console.log(`Found ${codemodNames.length} codemod(s): ${codemodNames.join(', ')}`)

  // Get metadata for each codemod
  const codemods = codemodNames.map((name) => getCodemodMetadata(sourceDir, name))

  // Generate manifest content
  const manifestContent = generateManifestContent(codemods)

  // Write to all output directories
  for (const outputDir of outputDirs) {
    // Ensure output directory exists
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true })
    }

    const outputPath = join(outputDir, 'manifest.json')
    writeFileSync(outputPath, manifestContent, 'utf-8')
    console.log(styleText('green', `✓ Generated manifest at ${outputPath}`))
  }

  console.log(`  ${codemods.length} codemod(s) registered`)
}

if (import.meta.main) {
  main()
}
