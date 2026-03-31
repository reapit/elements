import { Node, SourceFile, SyntaxKind } from 'ts-morph'

/**
 * Checks whether any identifier in `localNames` is used in a non-structural
 * position within the source file.
 *
 * Import specifiers, JSX tag names and — by default — export specifiers are
 * excluded from consideration, since they are structural references rather than
 * runtime usages.
 *
 * @param sourceFile - The source file to search.
 * @param localNames - The set of local binding names to look for.
 * @param options.treatLocalReExportsAsUsage - When `true`, a bare
 *   `export { X }` (i.e. an ExportSpecifier that belongs to an export
 *   declaration without a module specifier) is counted as usage. When `false`
 *   (the default), all ExportSpecifier parents are skipped regardless of
 *   whether they belong to a re-export or a local export.
 */
export function hasIdentifierUsage(
  sourceFile: SourceFile,
  localNames: Set<string>,
  options?: { treatLocalReExportsAsUsage?: boolean },
): boolean {
  const treatLocalReExportsAsUsage = options?.treatLocalReExportsAsUsage ?? false

  for (const identifier of sourceFile.getDescendantsOfKind(SyntaxKind.Identifier)) {
    if (!localNames.has(identifier.getText())) continue

    const parent = identifier.getParent()
    if (!parent) continue

    const kind = parent.getKind()

    if (kind === SyntaxKind.ExportSpecifier) {
      if (!treatLocalReExportsAsUsage) {
        continue
      }

      // Variant B: only skip re-exports that include a module specifier
      // (e.g. `export { X } from '...'`). A bare `export { X }` is local
      // re-export and counts as usage.
      const exportDeclaration = parent.getFirstAncestorByKind(SyntaxKind.ExportDeclaration)
      if (exportDeclaration?.getModuleSpecifierValue()) {
        continue
      }

      return true
    }

    if (
      kind === SyntaxKind.ImportSpecifier ||
      kind === SyntaxKind.JsxOpeningElement ||
      kind === SyntaxKind.JsxSelfClosingElement ||
      kind === SyntaxKind.JsxClosingElement
    ) {
      continue
    }

    return true
  }

  return false
}

/**
 * Rewrites all non-structural references to `oldName` in `sourceFile` to
 * `newName`.
 *
 * Two strategies are available:
 *
 * **Simple (default, `useFindReferences: false`)** — iterates every Identifier
 * node, matches by text, and replaces those whose parent is not an import
 * specifier, export specifier, or JSX tag name. This is fast but will rename
 * any identifier with that text regardless of which binding it refers to.
 *
 * **findReferences (`useFindReferences: true`)** — locates the import
 * declaration for `oldName` (using `isElementsImportFn` when supplied,
 * otherwise scanning all imports), then calls `findReferences()` on the import
 * name node to obtain only references to that specific binding. This is more
 * precise and avoids renaming shadowed or unrelated identifiers with the same
 * name. Re-exports to external modules and JSX tag positions are still skipped;
 * bare local re-exports (`export { X }` without `from`) are renamed.
 *
 * @param sourceFile - The source file to transform.
 * @param oldName - The identifier text to search for.
 * @param newName - The replacement text.
 * @param options.useFindReferences - When `true`, use the binding-aware
 *   findReferences strategy. Defaults to `false`.
 * @param options.facadePackage - Optional facade package name passed to
 *   `isElementsImportFn` for identifying relevant import declarations.
 * @param options.isElementsImportFn - Predicate that returns `true` when a
 *   module specifier belongs to the target package (e.g. @reapit/elements or a
 *   facade). When omitted under `useFindReferences`, all import declarations
 *   are considered.
 */
export function transformIdentifierReferences(
  sourceFile: SourceFile,
  oldName: string,
  newName: string,
  options?: {
    useFindReferences?: boolean
    facadePackage?: string
    isElementsImportFn?: (spec: string, facade?: string) => boolean
  },
): void {
  const useFindReferences = options?.useFindReferences ?? false

  if (!useFindReferences) {
    // Variant A: simple text-based scan.
    for (const identifier of sourceFile.getDescendantsOfKind(SyntaxKind.Identifier)) {
      if (identifier.getText() !== oldName) continue

      const parent = identifier.getParent()
      if (!parent) continue
      const parentKind = parent.getKind()

      if (
        parentKind === SyntaxKind.ImportSpecifier ||
        parentKind === SyntaxKind.ExportSpecifier ||
        parentKind === SyntaxKind.JsxOpeningElement ||
        parentKind === SyntaxKind.JsxSelfClosingElement ||
        parentKind === SyntaxKind.JsxClosingElement
      ) {
        continue
      }

      identifier.replaceWithText(newName)
    }

    return
  }

  // Variant B: binding-aware scan using findReferences().
  const { facadePackage, isElementsImportFn } = options ?? {}

  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (isElementsImportFn) {
      const moduleSpecifier = importDecl.getModuleSpecifierValue()
      if (!isElementsImportFn(moduleSpecifier, facadePackage)) continue
    }

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() !== oldName) continue

      // Skip aliased imports — the local binding has a different name already
      // and does not need renaming.
      if (namedImport.getAliasNode()) continue

      const nameNode = namedImport.getNameNode().asKind(SyntaxKind.Identifier)
      if (!nameNode) continue

      for (const referencedSymbol of nameNode.findReferences()) {
        for (const reference of referencedSymbol.getReferences()) {
          if (reference.isDefinition()) continue

          const identifier = reference.getNode().asKind(SyntaxKind.Identifier)
          if (!identifier) continue

          const parent = identifier.getParent()
          if (!parent) continue
          const parentKind = parent.getKind()

          if (parentKind === SyntaxKind.ExportSpecifier) {
            // Skip re-exports to an external module; rename bare local re-exports.
            const exportDeclaration = parent.getFirstAncestorByKind(SyntaxKind.ExportDeclaration)
            if (exportDeclaration?.getModuleSpecifierValue()) {
              continue
            }
          }

          if (
            parentKind === SyntaxKind.ImportSpecifier ||
            parentKind === SyntaxKind.JsxOpeningElement ||
            parentKind === SyntaxKind.JsxSelfClosingElement ||
            parentKind === SyntaxKind.JsxClosingElement
          ) {
            continue
          }

          identifier.replaceWithText(newName)
        }
      }
    }
  }
}

// Re-export Node so callers that import from this module do not need a
// separate ts-morph import solely for Node.isStatement checks.
export { Node }
