import { Project, QuoteKind, SourceFile, ImportDeclaration } from 'ts-morph'
import { EXPORT_MAP } from './export-map'

/**
 * Codemod to rewrite @reapit/elements barrel imports to dedicated subpath imports.
 *
 * Transforms root barrel imports (`@reapit/elements`) into per-module subpath imports
 * such as `@reapit/elements/core/button`, `@reapit/elements/deprecated/icon`,
 * `@reapit/elements/utils/popover`, and `@reapit/elements/icons/more`.
 *
 * Transformations:
 * - Each named export known to EXPORT_MAP is moved to its subpath entry point
 * - Exports from the same subpath are grouped into a single import statement
 * - Exports not in EXPORT_MAP (styles, helpers/intent, tokens) remain in a residual
 *   barrel import
 * - Existing subpath imports are left untouched
 * - Type-only import declarations and inline `type` specifiers are preserved
 * - Custom aliases are preserved
 * - No merging across separate import statements
 * - Mixed subpath-eligible and root-only exports in the same statement
 */

/**
 * Checks whether a module specifier is a root barrel import from @reapit/elements.
 *
 * Only matches the exact package root — NOT subpath imports like
 * `@reapit/elements/core/button` (those are already correct and must not be
 * re-transformed).
 */
function isBarrelImport(moduleSpecifier: string): boolean {
  return moduleSpecifier === '@reapit/elements'
}

/**
 * Derives the subpath import specifier for a given export subpath.
 *
 * e.g. `buildSubpathSpecifier('core/button')` → `'@reapit/elements/core/button'`
 */
function buildSubpathSpecifier(subpath: string): string {
  return `@reapit/elements/${subpath}`
}

interface NamedImportInfo {
  /** The imported name (e.g. `Button`) */
  name: string
  /** The alias, if any (e.g. `Btn` from `Button as Btn`) */
  alias: string | undefined
  /** Whether this is an inline `type` specifier (e.g. `{ type Button }`) */
  isTypeOnly: boolean
}

/**
 * Serialises a NamedImportInfo back to an import specifier string.
 * e.g. `{ name: 'Button', alias: 'Btn', isTypeOnly: false }` → `'Button as Btn'`
 */
function serialiseNamedImport(info: NamedImportInfo): string {
  const base = info.alias ? `${info.name} as ${info.alias}` : info.name
  return info.isTypeOnly ? `type ${base}` : base
}

/**
 * Processes a single barrel import declaration, replacing it with one or more
 * subpath imports plus an optional residual barrel import for root-only exports.
 */
function transformDeclaration(
  sourceFile: SourceFile,
  importDecl: ImportDeclaration,
): void {
  const moduleSpecifier = importDecl.getModuleSpecifierValue()
  const isDeclarationTypeOnly = importDecl.isTypeOnly()

  // Collect all named imports with their metadata
  const namedImports: NamedImportInfo[] = importDecl.getNamedImports().map((ni) => ({
    name: ni.getName(),
    alias: ni.getAliasNode()?.getText(),
    isTypeOnly: ni.isTypeOnly(),
  }))

  // Default or namespace imports — leave untouched to avoid dropping bindings
  if (importDecl.getDefaultImport() || importDecl.getNamespaceImport()) {
    return
  }

  if (namedImports.length === 0) {
    // Side-effect import — leave untouched
    return
  }

  // Bucket each named import into its target subpath (or 'root' for residual)
  const buckets = new Map<string, NamedImportInfo[]>()

  for (const info of namedImports) {
    const subpath = EXPORT_MAP[info.name]
    const key = subpath ?? 'root'
    const bucket = buckets.get(key) ?? []
    bucket.push(info)
    buckets.set(key, bucket)
  }

  // If every import maps to 'root' (i.e. none are in the export map), leave as-is
  if (buckets.size === 1 && buckets.has('root')) {
    return
  }

  // Remove the original import declaration
  importDecl.remove()

  // Add a new import for each bucket
  for (const [key, infos] of buckets) {
    const newSpecifier =
      key === 'root' ? moduleSpecifier : buildSubpathSpecifier(key)

    // If the original declaration was `import type { ... }`, the whole new statement
    // should be type-only. Otherwise use per-specifier inline `type` markers.
    sourceFile.addImportDeclaration({
      moduleSpecifier: newSpecifier,
      namedImports: infos.map(serialiseNamedImport),
      isTypeOnly: isDeclarationTypeOnly,
    })
  }
}

/**
 * Transforms all barrel imports in a source file.
 */
function transformImports(sourceFile: SourceFile): void {
  // Snapshot the list before any mutations
  const importDeclarations = sourceFile.getImportDeclarations()

  const barrelImports = importDeclarations.filter((decl) =>
    isBarrelImport(decl.getModuleSpecifierValue()),
  )

  for (const decl of barrelImports) {
    transformDeclaration(sourceFile, decl)
  }
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
): string {
  // Early return: skip files with no barrel imports
  const hasBarrelImport =
    source.includes("'@reapit/elements'") ||
    source.includes('"@reapit/elements"')

  if (!hasBarrelImport) {
    return source
  }

  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      jsx: 2, // JsxEmit.React
    },
    manipulationSettings: {
      quoteKind: QuoteKind.Single,
      useTrailingCommas: false,
    },
  })

  const sourceFile = project.createSourceFile(filePath, source)

  transformImports(sourceFile)

  let result = sourceFile.getFullText()

  // Normalise double-quoted import paths to single quotes.
  // Anchored to import declarations (^import ... from) to avoid mangling
  // double-quoted strings elsewhere in the file.
  result = result.replace(/^(import\s+.*?\sfrom\s)"([^"]+)"/gm, "$1'$2'")

  // Strip semicolons from import statements
  result = result.replace(/^(import\s+.*?from\s+'[^']+');$/gm, '$1')

  return result
}
