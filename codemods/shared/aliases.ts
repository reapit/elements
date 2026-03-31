import { SourceFile } from 'ts-morph'
import { isElementsImport } from './elements-import.js'

/**
 * Collects all local aliases (including the original name when unaliased) for a
 * given named export from @reapit/elements or a facade package.
 *
 * For each import declaration that originates from @reapit/elements (or the
 * optional facade package), the function finds every named import whose exported
 * name matches `importName` and records the local binding — the alias if one is
 * present, or `importName` itself when no alias is used.
 *
 * When `options.fallbackToName` is true and the source file contains no import
 * declarations at all (e.g. isolated snippet tests), `importName` is added as a
 * fallback so that callers can still match usages without imports.
 */
export function getImportAliases(
  sourceFile: SourceFile,
  importName: string,
  facadePackage?: string,
  options?: { fallbackToName?: boolean },
): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === importName) {
        aliases.add(namedImport.getAliasNode()?.getText() ?? importName)
      }
    }
  }

  if (options?.fallbackToName && aliases.size === 0 && sourceFile.getImportDeclarations().length === 0) {
    aliases.add(importName)
  }

  return aliases
}
