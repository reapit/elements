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
function generateManifestContent(codemods: CodemodMetadata[], timestamp: string): string {
  const manifest = {
    $schema: './manifest.schema.json',
    generated: timestamp,
    codemods: codemods.map((c) => ({
      name: c.name,
      description: c.description,
    })),
  }

  return JSON.stringify(manifest, null, 2) + '\n'
}

/**
 * Checks if codemods have changed compared to existing manifest.
 * Exported for testing.
 *
 * @param manifestPath - Path to the existing manifest file
 * @param newCodemods - New codemods to compare
 * @returns true if codemods have changed or manifest doesn't exist
 */
export function hasCodemodsChanged(manifestPath: string, newCodemods: CodemodMetadata[]): boolean {
  try {
    const existingContent = readFileSync(manifestPath, 'utf-8')
    const existingManifest = JSON.parse(existingContent)

    // Compare the codemods arrays (excluding timestamp)
    const existingCodemods: CodemodMetadata[] = existingManifest.codemods || []

    // Quick length check to detect obvious differences
    if (existingCodemods.length !== newCodemods.length) {
      return true
    }

    // Order-independent deep comparison of codemods by name
    const toMap = (arr: CodemodMetadata[]): Map<string, string | null> =>
      new Map(arr.map((c) => [c.name, c.description ?? null]))

    const existingMap = toMap(existingCodemods)
    const newMap = toMap(newCodemods)

    if (existingMap.size !== newMap.size) {
      return true
    }

    for (const [name, description] of newMap) {
      if (!existingMap.has(name)) {
        return true
      }
      if (existingMap.get(name) !== description) {
        return true
      }
    }

    return false
  } catch {
    // If manifest doesn't exist or can't be read, consider it changed
    return true
  }
}

/**
 * Main function to generate the manifest file.
 */
function main(): void {
  // Always read from the script's own directory (codemods/)
  const sourceDir = __dirname

  // Define output paths
  const sourceManifestPath = join(sourceDir, 'manifest.json')
  const distManifestPath = join(__dirname, '..', 'dist', 'codemods', 'manifest.json')

  console.log('Generating codemod manifest...')

  // Discover available codemods (read from source)
  const codemodNames = discoverCodemods(sourceDir)
  console.log(`Found ${codemodNames.length} codemod(s): ${codemodNames.join(', ')}`)

  // Get metadata for each codemod
  const codemods = codemodNames.map((name) => getCodemodMetadata(sourceDir, name))

  // Check if source manifest needs updating based on codemod changes
  const sourceNeedsUpdate = hasCodemodsChanged(sourceManifestPath, codemods)

  if (!sourceNeedsUpdate) {
    console.log('No changes detected. Source manifest is up to date.')

    // Still write dist manifest if it doesn't exist, copying from source
    try {
      const sourceContent = readFileSync(sourceManifestPath, 'utf-8')
      const distDir = dirname(distManifestPath)

      if (!existsSync(distManifestPath)) {
        if (!existsSync(distDir)) {
          mkdirSync(distDir, { recursive: true })
        }
        writeFileSync(distManifestPath, sourceContent, 'utf-8')
        console.log(styleText('green', `✓ Copied manifest to ${distManifestPath}`))
      }
    } catch (error) {
      console.warn(styleText('yellow', `Warning: Could not sync dist manifest: ${(error as Error).message}`))
    }

    console.log(`  ${codemods.length} codemod(s) registered`)
    return
  }

  // Generate new manifest content with current timestamp
  const manifestContent = generateManifestContent(codemods, new Date().toISOString())

  // Write to source directory
  writeFileSync(sourceManifestPath, manifestContent, 'utf-8')
  console.log(styleText('green', `✓ Generated manifest at ${sourceManifestPath}`))

  // Write to dist directory
  const distDir = dirname(distManifestPath)
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true })
  }
  writeFileSync(distManifestPath, manifestContent, 'utf-8')
  console.log(styleText('green', `✓ Generated manifest at ${distManifestPath}`))

  console.log(`  ${codemods.length} codemod(s) registered`)
}

if (import.meta.main) {
  main()
}
