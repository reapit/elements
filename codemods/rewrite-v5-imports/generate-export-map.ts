/**
 * Build-time script to generate the export map used by the rewrite-v5-imports codemod.
 *
 * Reads the source files for each namespace (core, deprecated, utils, icons) using ts-morph to
 * resolve all `export *` chains. Produces a mapping of every named export to its
 * subpath import specifier (e.g. `Button` -> `core/button`).
 *
 * Exports that should remain as root barrel imports (styles/globals) are intentionally
 * excluded from the map because they have no dedicated subpath entry point.
 *
 * Usage:
 *   node --experimental-strip-types codemods/rewrite-v5-imports/generate-export-map.ts
 */

import { writeFileSync, readFileSync } from 'node:fs'
import { globSync } from 'node:fs'
import { resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Project, SourceFile } from 'ts-morph'

// ESM-compatible __dirname shim
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** Namespaces that have component-level index files discovered by glob */
const GLOB_NAMESPACES = ['core', 'deprecated', 'utils'] as const

/** Namespaces that use a dedicated barrel file to enumerate their entries */
const BARREL_NAMESPACES = ['icons'] as const

/**
 * Names that should be excluded from the export map. These are generic names
 * (e.g. bare `Props`) that are not meaningful as standalone barrel imports.
 */
const EXCLUDED_NAMES = new Set(['Props'])

interface ModuleEntry {
  /** Namespace prefix, e.g. 'core', 'deprecated', 'utils', 'icons' */
  namespace: string
  /** Module slug, e.g. 'button', 'accordion', 'more' */
  slug: string
  /** Absolute path to the module's index.ts or .tsx file */
  filePath: string
}

/**
 * Parses a namespace barrel file to extract the list of module entries.
 *
 * Each `export * from './foo'` line in e.g. `src/core/index.ts` maps to a
 * module entry with namespace='core' and slug='foo'.
 */
export function getModuleEntries(barrelFile: SourceFile, namespace: string): ModuleEntry[] {
  const entries: ModuleEntry[] = []

  for (const exportDecl of barrelFile.getExportDeclarations()) {
    const specifier = exportDecl.getModuleSpecifierValue()
    if (!specifier) continue

    // The specifier is a relative path like './button', './alert-banner/outlet', or '../more'
    const slug = specifier.replace(/^\.\.?\//, '')

    // Resolve the actual file path via ts-morph
    const sourceFile = exportDecl.getModuleSpecifierSourceFile()
    if (!sourceFile) {
      console.warn(`Warning: Could not resolve '${specifier}' from ${barrelFile.getFilePath()}`)
      continue
    }

    entries.push({
      namespace,
      slug,
      filePath: sourceFile.getFilePath(),
    })
  }

  return entries
}

/**
 * Collects all named exports from a module by resolving `export *` chains.
 *
 * Uses ts-morph's `getExportedDeclarations()` which recursively resolves
 * all re-exports to their original declarations.
 */
export function getExportedNames(project: Project, filePath: string): string[] {
  const sourceFile = project.getSourceFile(filePath)
  if (!sourceFile) return []

  const exportedDecls = sourceFile.getExportedDeclarations()
  const names: string[] = []

  for (const [name] of exportedDecls) {
    if (EXCLUDED_NAMES.has(name)) continue
    names.push(name)
  }

  return names.sort()
}

/**
 * Builds the complete export map: a Record<string, string> mapping each
 * exported name to its subpath (e.g. `Button` -> `core/button`).
 */
export function buildExportMap(srcDir: string): Record<string, string> {
  const project = new Project({
    tsConfigFilePath: resolve(srcDir, '..', 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
  })

  // Add all source files under src/
  project.addSourceFilesAtPaths(resolve(srcDir, '**/*.{ts,tsx}'))

  const exportMap: Record<string, string> = {}
  const conflicts: Array<{ name: string; first: string; second: string }> = []

  function registerEntries(entries: ModuleEntry[]) {
    for (const entry of entries) {
      const names = getExportedNames(project, entry.filePath)
      const subpath = `${entry.namespace}/${entry.slug}`

      for (const name of names) {
        if (exportMap[name]) {
          conflicts.push({ name, first: exportMap[name], second: subpath })
          continue
        }
        exportMap[name] = subpath
      }
    }
  }

  // For core, deprecated, and utils: discover component-level index files by glob
  for (const ns of GLOB_NAMESPACES) {
    const indexFiles = globSync(`src/${ns}/*/index.{ts,tsx}`, { cwd: resolve(srcDir, '..') })

    const entries: ModuleEntry[] = indexFiles.map((relPath) => {
      // relPath is e.g. 'src/core/button/index.ts'
      const slug = relPath.split('/')[2] // the component folder name
      const filePath = resolve(srcDir, '..', relPath)
      return { namespace: ns, slug, filePath }
    })

    registerEntries(entries)
  }

  // For icons: use all-icons.ts barrel to enumerate entries
  for (const ns of BARREL_NAMESPACES) {
    const barrelPath = ns === 'icons' ? resolve(srcDir, ns, 'docs', 'all-icons.ts') : resolve(srcDir, ns, 'index.ts')
    const barrelFile = project.getSourceFile(barrelPath)

    if (!barrelFile) {
      console.warn(`Warning: Barrel file not found at ${barrelPath}`)
      continue
    }

    registerEntries(getModuleEntries(barrelFile, ns))
  }

  if (conflicts.length > 0) {
    console.warn(`\nWarning: ${conflicts.length} duplicate export(s) detected (first-seen wins):`)
    for (const c of conflicts) {
      console.warn(`  ${c.name}: ${c.first} vs ${c.second}`)
    }
  }

  return exportMap
}

/**
 * Generates the export-map.ts source file content from the map data.
 */
export function generateFileContent(exportMap: Record<string, string>): string {
  const sortedEntries = Object.entries(exportMap).sort(([a], [b]) => a.localeCompare(b))

  const lines = [
    '/**',
    ' * Auto-generated export map for the rewrite-v5-imports codemod.',
    ' *',
    ' * Maps each named export from @reapit/elements to its subpath entry point.',
    ' * Only includes exports that have dedicated subpath imports (core/*, deprecated/*,',
    ' * utils/*, icons/*). Root-only exports (styles/globals) are intentionally excluded.',
    ' *',
    ' * DO NOT EDIT — regenerate with:',
    ' *   node --experimental-strip-types codemods/rewrite-v5-imports/generate-export-map.ts',
    ' */',
    '',
    'export const EXPORT_MAP: Record<string, string> = {',
  ]

  for (const [name, subpath] of sortedEntries) {
    lines.push(`  ${name}: '${subpath}',`)
  }

  lines.push('}')
  lines.push('')

  return lines.join('\n')
}

// ─── Main (only runs when executed directly) ─────────────────────────────────

if (import.meta.main) {
  const srcDir = resolve(__dirname, '..', '..', 'src')
  const outputPath = resolve(__dirname, 'export-map.ts')

  console.log('Building export map from source...')
  console.log(`  Source: ${srcDir}`)
  console.log(`  Output: ${outputPath}`)
  console.log()

  const exportMap = buildExportMap(srcDir)
  const content = generateFileContent(exportMap)

  let existingContent: string | null = null
  try {
    existingContent = readFileSync(outputPath, 'utf-8')
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err
  }

  const entryCount = Object.keys(exportMap).length

  if (existingContent === content) {
    console.log(`\nExport map is up to date — ${entryCount} export mappings, no changes needed.`)
  } else {
    writeFileSync(outputPath, content, 'utf-8')
    console.log(`\nDone! Generated ${entryCount} export mappings.`)
  }
}
