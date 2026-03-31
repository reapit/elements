import type { SourceFile } from 'ts-morph'
import { matchesPackage } from './elements-import.js'

/**
 * Resolves the module specifier to use when writing a migrated import.
 *
 * If `facadePackage` is provided and `sourceSpecifier` matches it (including
 * subpath imports), the source specifier is returned unchanged — the facade
 * re-exports from its own path, so the codemod must not rewrite it.
 * Otherwise, `targetSpecifier` is returned.
 *
 * @param sourceSpecifier - The module specifier found in the source file.
 * @param targetSpecifier - The canonical specifier to migrate towards (e.g. '@reapit/elements').
 * @param facadePackage - An optional facade package name whose imports must not be rewritten.
 */
export function resolveTargetSpecifier(
  sourceSpecifier: string,
  targetSpecifier: string,
  facadePackage?: string,
): string {
  if (facadePackage && matchesPackage(sourceSpecifier, facadePackage)) {
    return sourceSpecifier
  }
  return targetSpecifier
}

/**
 * Adds named imports to an existing or newly created import declaration for
 * `targetSpecifier` in `sourceFile`.
 *
 * - If no import declaration for `targetSpecifier` exists, one is created.
 * - If `options.promoteDeclarationTypeOnly` is `true` and the target declaration
 *   is a declaration-level type-only import (`import type { … }`) but at least
 *   one entry in `importsToAdd` is a value import, the entire declaration is
 *   demoted to a regular import. This must be handled at the declaration level
 *   because specifier-level `isTypeOnly()` returns `false` inside a
 *   declaration-level type-only import, so the per-specifier check below would
 *   never fire.
 * - For each import in `importsToAdd`, if a matching named import already
 *   exists and is type-only but the incoming entry is not, its `isTypeOnly`
 *   flag is cleared. Duplicate imports are skipped.
 * - Aliased imports are written as `name as alias` (or `type name as alias`).
 *
 * @param sourceFile - The ts-morph source file to modify.
 * @param importsToAdd - The named imports to add.
 * @param targetSpecifier - The module specifier of the import declaration to target.
 * @param options - Optional behaviour flags.
 * @param options.promoteDeclarationTypeOnly - When `true`, demote a
 *   declaration-level `import type { … }` to `import { … }` if any entry is a
 *   value import. Defaults to `false`.
 */
export function addImportsToTarget(
  sourceFile: SourceFile,
  importsToAdd: Array<{ name: string; alias?: string; isTypeOnly: boolean }>,
  targetSpecifier: string,
  options?: { promoteDeclarationTypeOnly?: boolean },
): void {
  if (importsToAdd.length === 0) return

  const currentImportDeclarations = sourceFile.getImportDeclarations()

  let targetDecl = currentImportDeclarations.find(
    (importDecl) => importDecl.getModuleSpecifierValue() === targetSpecifier,
  )

  if (!targetDecl) {
    targetDecl = sourceFile.addImportDeclaration({ moduleSpecifier: targetSpecifier })
  }

  if (options?.promoteDeclarationTypeOnly) {
    const needsValueDecl = importsToAdd.some((entry) => !entry.isTypeOnly)
    if (needsValueDecl && targetDecl.isTypeOnly()) {
      targetDecl.setIsTypeOnly(false)
    }
  }

  for (const { name, alias, isTypeOnly } of importsToAdd) {
    const existingImport = targetDecl.getNamedImports().find((namedImport) => {
      return namedImport.getName() === name && namedImport.getAliasNode()?.getText() === alias
    })

    if (existingImport) {
      if (existingImport.isTypeOnly() && !isTypeOnly) {
        existingImport.setIsTypeOnly(false)
      }
      continue
    }

    if (alias && alias !== name) {
      const typePrefix = isTypeOnly ? 'type ' : ''
      targetDecl.addNamedImport(`${typePrefix}${name} as ${alias}`)
    } else if (isTypeOnly) {
      targetDecl.addNamedImport({ name, isTypeOnly: true })
    } else {
      targetDecl.addNamedImport(name)
    }
  }
}
