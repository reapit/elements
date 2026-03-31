import { SourceFile, ImportDeclaration } from 'ts-morph'
import { isElementsImport, createProjectFromSource } from '../shared/index.js'

/**
 * Codemod to migrate Text and font imports from @reapit/elements/core/text to their new locations.
 *
 * The Text component has moved from core/text to utils/text, and the font helper has moved to utils/font.
 * This codemod automatically updates import statements to reflect the new structure.
 *
 * Transformations:
 * - Text-related imports (Text, TextColour, textColours, elText) -> @reapit/elements/utils/text
 * - Font-related imports (font, FontSize, FontWeight, FontStyle, fontSizes, fontWeights) -> @reapit/elements/utils/font
 * - Mixed imports are split into two separate import statements
 * - Barrel imports from @reapit/elements are unchanged
 */

// Classification of exports from the old core/text module
const TEXT_EXPORTS = new Set(['Text', 'TextColour', 'textColours', 'elText'])

const FONT_EXPORTS = new Set(['font', 'FontSize', 'FontWeight', 'FontStyle', 'fontSizes', 'fontWeights'])

/**
 * Checks if a module specifier is importing from the old core/text path.
 */
function isCoreTextImport(moduleSpecifier: string, facadePackage?: string): boolean {
  if (!isElementsImport(moduleSpecifier, facadePackage)) {
    return false
  }

  // Match @reapit/elements/core/text or @facade-package/core/text
  return moduleSpecifier.endsWith('/core/text')
}

/**
 * Constructs the new import path for a given package and subpath.
 */
function buildImportPath(moduleSpecifier: string, subpath: 'utils/text' | 'utils/font'): string {
  // Extract the base package from the old path
  // e.g., "@reapit/elements/core/text" -> "@reapit/elements"
  const basePath = moduleSpecifier.replace(/\/core\/text$/, '')
  return `${basePath}/${subpath}`
}

interface ImportGroups {
  textImports: string[]
  fontImports: string[]
}

/**
 * Groups named imports from a single import declaration into text and font categories.
 */
function groupImportsFromDeclaration(importDecl: ImportDeclaration): ImportGroups {
  const textImports: string[] = []
  const fontImports: string[] = []

  for (const namedImport of importDecl.getNamedImports()) {
    const importName = namedImport.getName()
    const alias = namedImport.getAliasNode()?.getText()
    const isTypeOnly = namedImport.isTypeOnly()

    // Build the import string (e.g., "Text", "type FontSize", "Text as MyText")
    let importString = isTypeOnly ? `type ${importName}` : importName
    if (alias) {
      importString += ` as ${alias}`
    }

    // Classify the import
    if (TEXT_EXPORTS.has(importName)) {
      textImports.push(importString)
    } else if (FONT_EXPORTS.has(importName)) {
      fontImports.push(importString)
    }
  }

  return { textImports, fontImports }
}

/**
 * Transforms imports in a source file.
 */
function transformImports(sourceFile: SourceFile, facadePackage?: string): void {
  const importDeclarations = sourceFile.getImportDeclarations()

  // Find core/text imports
  const coreTextImports = importDeclarations.filter((importDecl) => {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    return isCoreTextImport(moduleSpecifier, facadePackage)
  })

  if (coreTextImports.length === 0) {
    return
  }

  // Process each core/text import
  for (const importDecl of coreTextImports) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    const isTypeOnly = importDecl.isTypeOnly()

    // Group the imports from this specific declaration
    const { textImports, fontImports } = groupImportsFromDeclaration(importDecl)

    // Remove the old import
    importDecl.remove()

    // Add new imports if needed
    if (textImports.length > 0) {
      const textPath = buildImportPath(moduleSpecifier, 'utils/text')
      sourceFile.addImportDeclaration({
        moduleSpecifier: textPath,
        namedImports: textImports,
        isTypeOnly,
      })
    }

    if (fontImports.length > 0) {
      const fontPath = buildImportPath(moduleSpecifier, 'utils/font')
      sourceFile.addImportDeclaration({
        moduleSpecifier: fontPath,
        namedImports: fontImports,
        isTypeOnly,
      })
    }
  }
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
  options?: { facadePackage?: string },
): string {
  // Early return if no core/text imports
  if (!source.includes('/core/text')) {
    return source
  }

  const sourceFile = createProjectFromSource(source, filePath)

  transformImports(sourceFile, options?.facadePackage)

  let result = sourceFile.getFullText()

  // ts-morph's addImportDeclaration() always appends a semicolon to the generated
  // statement regardless of the source file's existing style. There is no option in
  // ManipulationSettings to disable this behaviour (the interface only exposes
  // quoteKind, indentationText, newLineKind, useTrailingCommas, and
  // usePrefixAndSuffixTextForRename). The original source files in this codebase do
  // not use semicolons, so we strip them from the newly-added import lines to keep
  // the output consistent. Removing this replacement would cause all transformed
  // import lines to gain a trailing semicolon that wasn't in the original source.
  result = result.replace(/^(import\s+.*?from\s+'[^']+');$/gm, '$1')

  return result
}
