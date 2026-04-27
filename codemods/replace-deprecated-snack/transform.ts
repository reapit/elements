import type { CallExpression, SourceFile, VariableDeclaration } from 'ts-morph'
import { SyntaxKind } from 'ts-morph'
import {
  isElementsImport,
  createProjectFromSource,
  getJsxElements,
  syncClosingTag,
  collectStatementCommentPositions,
  insertLineComments,
  addImportsToTarget,
  transformIdentifierReferences,
} from '../shared/index.js'

/**
 * Codemod to migrate deprecated Snack and useSnack exports to the Toaster system.
 *
 * Handles:
 * - useSnack() variable declarations → removed; method calls rewritten to toast.*
 * - snack.success/error/info/warning(msg, timeout?) → toast.METHOD(msg, { duration: timeout })
 * - snack.custom(...) → TODO comment (no direct equivalent)
 * - <SnackProvider> wrapper → renamed to <Toaster>
 * - <Snack> / <SnackHolder> usages → TODO comment
 * - UseSnack, SnackProps, SnackHolderProps, SnackContextProps, SnackProviderProps type references → never with TODO
 * - SnackContext usages → undefined with TODO
 * - Import cleanup: removes deprecated imports, adds toast / Toaster from core/toaster
 */

const DEPRECATED_EXPORTS = [
  'useSnack',
  'UseSnack',
  'SnackProvider',
  'SnackContext',
  'SnackContextProps',
  'Snack',
  'SnackHolder',
  'SnackProps',
  'SnackHolderProps',
  'SnackProviderProps',
]

const MIGRATABLE_METHODS = ['success', 'error', 'info', 'warning'] as const
type MigratableMethod = (typeof MIGRATABLE_METHODS)[number]

interface DeprecatedImportInfo {
  aliases: Map<string, string>
  basePackage: string
}

function collectDeprecatedImports(sourceFile: SourceFile, facadePackage?: string): DeprecatedImportInfo {
  const aliases = new Map<string, string>()
  let basePackage = facadePackage ?? '@reapit/elements'
  let foundBase = false

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    if (!foundBase) {
      basePackage = facadePackage ?? '@reapit/elements'
      foundBase = true
    }

    for (const namedImport of importDecl.getNamedImports()) {
      const name = namedImport.getName()
      if (DEPRECATED_EXPORTS.includes(name)) {
        aliases.set(name, namedImport.getAliasNode()?.getText() ?? name)
      }
    }
  }

  return { aliases, basePackage }
}

function removeDeprecatedImports(sourceFile: SourceFile, facadePackage?: string, excludeNames?: Set<string>): void {
  for (const importDecl of sourceFile.getImportDeclarations().slice()) {
    if (importDecl.wasForgotten()) continue

    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports().slice()) {
      const name = namedImport.getName()
      if (DEPRECATED_EXPORTS.includes(name) && !excludeNames?.has(name)) {
        namedImport.remove()
      }
    }

    if (importDecl.getNamedImports().length === 0 && !importDecl.getDefaultImport()) {
      importDecl.remove()
    }
  }
}

/**
 * Transforms useSnack() call sites.
 *
 * const snack = useSnack()           → (declaration removed)
 * snack.success('msg')               → toast.success('msg')
 * snack.success('msg', 3000)         → toast.success('msg', { duration: 3000 })
 * snack.custom(snackProps, timeout)  → // TODO: no custom() equivalent — migrate manually
 *
 * Returns whether a toast import is needed and whether any unmigrated bindings
 * remain (destructured patterns or non-migratable calls like custom()). When
 * unmigrated bindings remain the useSnack declaration and import are preserved
 * so the output stays runnable.
 */
function transformUseSnackCalls(
  sourceFile: SourceFile,
  useSnackAlias: string,
): { needsToastImport: boolean; hasUnmigrated: boolean } {
  let needsToastImport = false
  let hasUnmigrated = false

  const declarationsToProcess: VariableDeclaration[] = []
  for (const varDecl of sourceFile.getDescendantsOfKind(SyntaxKind.VariableDeclaration)) {
    const init = varDecl.getInitializer()
    if (!init || init.getKind() !== SyntaxKind.CallExpression) continue
    if (init.asKind(SyntaxKind.CallExpression)!.getExpression().getText() !== useSnackAlias) continue
    declarationsToProcess.push(varDecl)
  }

  for (const varDecl of declarationsToProcess) {
    if (varDecl.wasForgotten()) continue

    const nameNode = varDecl.getNameNode()
    const varDeclList = varDecl.getParent()?.asKind(SyntaxKind.VariableDeclarationList)
    const varStatement = varDeclList?.getParent()?.asKind(SyntaxKind.VariableStatement)
    if (!varDeclList || !varStatement) continue

    // Destructured binding — cannot automate safely; keep declaration and import in place
    if (nameNode.getKind() !== SyntaxKind.Identifier) {
      varStatement.replaceWithText(
        `// TODO: Migrate useSnack() to toast — see @reapit/elements migration guide\n${varStatement.getText()}`,
      )
      hasUnmigrated = true
      continue
    }

    const localName = nameNode.getText()

    // Pass 1: annotate custom() call sites
    for (const callExpr of sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression)) {
      if (callExpr.wasForgotten()) continue
      const expr = callExpr.getExpression()
      if (expr.getKind() !== SyntaxKind.PropertyAccessExpression) continue
      const propAccess = expr.asKind(SyntaxKind.PropertyAccessExpression)!
      if (propAccess.getExpression().getText() !== localName || propAccess.getName() !== 'custom') continue

      const statement = callExpr.getFirstAncestorByKind(SyntaxKind.ExpressionStatement)
      if (!statement || statement.wasForgotten()) continue
      statement.replaceWithText(`// TODO: toast has no custom() equivalent — migrate manually\n${statement.getText()}`)
    }

    // Pass 2: collect and rewrite success/error/info/warning calls
    const calls: Array<{ node: CallExpression; method: MigratableMethod }> = []
    for (const callExpr of sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression)) {
      if (callExpr.wasForgotten()) continue
      const expr = callExpr.getExpression()
      if (expr.getKind() !== SyntaxKind.PropertyAccessExpression) continue
      const propAccess = expr.asKind(SyntaxKind.PropertyAccessExpression)!
      if (propAccess.getExpression().getText() !== localName) continue
      const method = propAccess.getName()
      if (!(MIGRATABLE_METHODS as ReadonlyArray<string>).includes(method)) continue
      calls.push({ node: callExpr, method: method as MigratableMethod })
    }

    for (const { node: callExpr, method } of [...calls].reverse()) {
      if (callExpr.wasForgotten()) continue
      const args = callExpr.getArguments()
      const messageArg = args[0]?.getText() ?? "''"
      const timeoutArg = args[1]
      const newText = timeoutArg
        ? `toast.${method}(${messageArg}, { duration: ${timeoutArg.getText()} })`
        : `toast.${method}(${messageArg})`
      callExpr.replaceWithText(newText)
      needsToastImport = true
    }

    // If non-migratable accesses (e.g. custom()) remain on this binding, keep the
    // declaration and import so the output stays runnable while TODOs are addressed.
    const hasRemainingAccesses = sourceFile
      .getDescendantsOfKind(SyntaxKind.PropertyAccessExpression)
      .filter((pa) => !pa.wasForgotten())
      .some((pa) => pa.getExpression().getText() === localName)

    if (hasRemainingAccesses) {
      hasUnmigrated = true
    } else if (!varStatement.wasForgotten()) {
      if (varDeclList.getDeclarations().length === 1) {
        varStatement.remove()
      } else {
        varDecl.remove()
      }
    }
  }

  return { needsToastImport, hasUnmigrated }
}

/**
 * Renames SnackProvider JSX tags to Toaster, syncing closing tags.
 */
function transformSnackProvider(sourceFile: SourceFile, snackProviderAlias: string): boolean {
  const elements = getJsxElements(sourceFile, new Set([snackProviderAlias]))
  if (elements.length === 0) return false

  for (const element of elements) {
    element.getTagNameNode().replaceWithText('Toaster')
    syncClosingTag(element, snackProviderAlias, 'Toaster')
  }

  return true
}

/**
 * Adds TODO comments above statements that use Snack or SnackHolder.
 */
function addTodosForSnackComponents(sourceFile: SourceFile, aliases: Map<string, string>): void {
  const targets = new Set(
    ['Snack', 'SnackHolder'].map((name) => aliases.get(name)).filter((a): a is string => a !== undefined),
  )
  if (targets.size === 0) return

  const elements = getJsxElements(sourceFile, targets)
  if (elements.length === 0) return

  const positions = collectStatementCommentPositions(sourceFile, elements)
  insertLineComments(
    sourceFile,
    positions,
    ' TODO: Snack and SnackHolder have no direct equivalent — migrate to Toaster and toast',
  )
}

// These are type-only exports (never used as values), so string replacement is safe — they
// cannot appear in string literals or JSX text in realistic code. ts-morph's replaceWithText
// cannot replace a TypeReference Identifier with the `never` keyword directly (Identifier →
// NeverKeyword causes a reconciliation error), so the string approach is the practical choice.
function rewriteTypeReferences(output: string, aliases: Map<string, string>): string {
  for (const exportName of ['UseSnack', 'SnackProps', 'SnackHolderProps', 'SnackContextProps', 'SnackProviderProps']) {
    const alias = aliases.get(exportName)
    if (!alias) continue
    output = output.replace(
      new RegExp(`\\b${alias}\\b`, 'g'),
      `never /* TODO: ${exportName} has been removed — update this type manually */`,
    )
  }
  return output
}

// SnackContext is a value export and can appear in comments or strings, so we use an
// AST-based replacement that skips non-code positions (import specifiers, trivia, etc.).
function rewriteSnackContextUsages(sourceFile: SourceFile, snackContextAlias: string): void {
  transformIdentifierReferences(
    sourceFile,
    snackContextAlias,
    'undefined /* TODO: SnackContext has been removed — migrate to toast */',
  )
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
  options?: { facadePackage?: string },
): string {
  if (!DEPRECATED_EXPORTS.some((name) => source.includes(name))) return source

  const sourceFile = createProjectFromSource(source, filePath)
  const { aliases, basePackage } = collectDeprecatedImports(sourceFile, options?.facadePackage)

  if (aliases.size === 0) return source

  const toasterSpecifier = `${basePackage}/core/toaster`

  let needsToastImport = false
  let needsToasterImport = false
  let hasUnmigratedUseSnack = false

  const useSnackAlias = aliases.get('useSnack')
  if (useSnackAlias) {
    const result = transformUseSnackCalls(sourceFile, useSnackAlias)
    needsToastImport = result.needsToastImport
    hasUnmigratedUseSnack = result.hasUnmigrated
  }

  const snackProviderAlias = aliases.get('SnackProvider')
  if (snackProviderAlias) {
    needsToasterImport = transformSnackProvider(sourceFile, snackProviderAlias)
  }

  addTodosForSnackComponents(sourceFile, aliases)

  const snackContextAlias = aliases.get('SnackContext')
  if (snackContextAlias) {
    rewriteSnackContextUsages(sourceFile, snackContextAlias)
  }

  removeDeprecatedImports(sourceFile, options?.facadePackage, hasUnmigratedUseSnack ? new Set(['useSnack']) : undefined)

  const importsToAdd: Array<{ name: string; isTypeOnly: boolean }> = []
  if (needsToastImport) importsToAdd.push({ name: 'toast', isTypeOnly: false })
  if (needsToasterImport) importsToAdd.push({ name: 'Toaster', isTypeOnly: false })
  if (importsToAdd.length > 0) {
    addImportsToTarget(sourceFile, importsToAdd, toasterSpecifier, { promoteDeclarationTypeOnly: true })
  }

  let result = sourceFile.getFullText()

  result = rewriteTypeReferences(result, aliases)

  // Strip trailing semicolons from codemod-generated import lines to match project style
  result = result.replace(
    new RegExp(`^(import\\s+.*?from\\s+'${basePackage.replace(/[/]/g, '\\/')}[^']*');$`, 'gm'),
    '$1',
  )

  return result
}
