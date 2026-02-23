import { Project, QuoteKind, SourceFile } from 'ts-morph'

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
 * Checks if a module specifier matches a package name.
 * Handles both exact matches and subpath imports.
 */
function matchesPackage(moduleSpecifier: string, packageName: string): boolean {
  return moduleSpecifier === packageName || moduleSpecifier.startsWith(packageName + '/')
}

/**
 * Checks if a module specifier is an import from @reapit/elements or a facade package.
 */
function isElementsImport(moduleSpecifier: string, facadePackage?: string): boolean {
  return (
    matchesPackage(moduleSpecifier, '@reapit/elements') ||
    (facadePackage !== undefined && matchesPackage(moduleSpecifier, facadePackage))
  )
}

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
function groupImportsFromDeclaration(importDecl: any): ImportGroups {
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

  transformImports(sourceFile, options?.facadePackage)

  // Get the transformed text and normalize formatting
  let result = sourceFile.getFullText()

  // Replace double quotes with single quotes in import statements
  result = result.replace(/from "([^"]+)"/g, "from '$1'")

  // Remove semicolons from import statements
  result = result.replace(/^(import\s+.*?from\s+'[^']+');$/gm, '$1')

  return result
}
