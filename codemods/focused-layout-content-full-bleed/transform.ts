import { SyntaxKind } from 'ts-morph'
import type { JsxElement, JsxOpeningElement, JsxSelfClosingElement, Node, SourceFile } from 'ts-morph'
import {
  addImportsToTarget,
  collectStatementCommentPositions,
  createProjectFromSource,
  getImportAliases,
  getJsxElements,
  isElementsImport,
} from '../shared/index.js'

/**
 * Codemod to migrate `FocusedLayout.Content` off its deprecated default padding and maximum width.
 *
 * `FocusedLayout.Content` used to apply responsive padding and a 1200px maximum width
 * unconditionally. Passing `isFullBleed` removes both, on the expectation that a nested
 * `MainContainer` supplies its own. This codemod adds `isFullBleed` to matching elements and wraps
 * their existing children in a `MainContainer size="wide"`, which shares the deprecated 1200px
 * maximum width so the rendered layout is unchanged.
 *
 * Transformations:
 * - `<FocusedLayout.Content>children</FocusedLayout.Content>`
 *   -> `<FocusedLayout.Content isFullBleed><MainContainer size="wide">children</MainContainer></FocusedLayout.Content>`
 * - `<FocusedLayoutContent>children</FocusedLayoutContent>` (direct import) -> same, using the
 *   element's local alias
 * - Elements already passing `isFullBleed` are left untouched (already migrated)
 * - Elements whose only child is already a `MainContainer` are left untouched, but still receive
 *   `isFullBleed`
 * - Self-closing elements (`<FocusedLayout.Content />`) are left untouched — there is nothing to wrap
 * - Elements with a spread attribute (e.g. `{...props}`) still receive `isFullBleed` and the
 *   `MainContainer` wrap, but get a TODO comment: a spread positioned after `isFullBleed` in the
 *   opening tag can override it at runtime, so this needs manual verification
 * - An existing type-only `MainContainer` import (`import type { MainContainer }`) is promoted to a
 *   value import rather than treated as already satisfying the need for one
 * - If a non-Elements `MainContainer` is already in scope (e.g. a local component of that name),
 *   the Elements import and JSX wrap use a non-conflicting alias (e.g. `ElementsMainContainer`)
 *   instead of colliding with it
 */

const MAIN_CONTAINER_TARGET_SPECIFIER = '@reapit/elements/core/main-container'

const SPREAD_TODO_COMMENT =
  ' TODO: FocusedLayout.Content has a spread attribute here — verify it does not set isFullBleed, which would override the isFullBleed added by this codemod'

type JsxTag = JsxOpeningElement | JsxSelfClosingElement

function hasAttribute(element: JsxTag, name: string): boolean {
  return element.getAttributes().some((attr) => {
    if (attr.getKind() !== SyntaxKind.JsxAttribute) return false
    return attr.asKindOrThrow(SyntaxKind.JsxAttribute).getNameNode().getText() === name
  })
}

function hasSpreadAttribute(element: JsxTag): boolean {
  return element.getAttributes().some((attr) => attr.getKind() === SyntaxKind.JsxSpreadAttribute)
}

/**
 * Promotes any existing `MainContainer` import from `@reapit/elements` to a value import.
 *
 * `getImportAliases` does not distinguish type-only imports from value imports, so an existing
 * `import type { MainContainer }` would otherwise be left as-is while this codemod emits JSX that
 * uses it as a value — a binding that TypeScript erases at compile time.
 */
function promoteMainContainerImportToValue(sourceFile: SourceFile): void {
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (!isElementsImport(importDecl.getModuleSpecifierValue())) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() !== 'MainContainer') continue

      if (importDecl.isTypeOnly()) {
        // Specifier-level isTypeOnly() returns false for siblings inside a declaration-level
        // type-only import, so demoting the declaration alone would silently turn them into
        // value imports too. Mark them explicitly type-only first to preserve that.
        for (const sibling of importDecl.getNamedImports()) {
          if (sibling !== namedImport) sibling.setIsTypeOnly(true)
        }
        importDecl.setIsTypeOnly(false)
      }

      if (namedImport.isTypeOnly()) namedImport.setIsTypeOnly(false)
    }
  }
}

function getMeaningfulChildren(jsxElement: JsxElement): Node[] {
  return jsxElement.getJsxChildren().filter((child) => {
    if (child.getKind() === SyntaxKind.JsxText) {
      return child.getText().trim().length > 0
    }
    return true
  })
}

function getChildTagName(child: Node): string | undefined {
  const kind = child.getKind()
  if (kind === SyntaxKind.JsxElement) {
    return child.asKindOrThrow(SyntaxKind.JsxElement).getOpeningElement().getTagNameNode().getText()
  }
  if (kind === SyntaxKind.JsxSelfClosingElement) {
    return child.asKindOrThrow(SyntaxKind.JsxSelfClosingElement).getTagNameNode().getText()
  }
  return undefined
}

function isAlreadyWrappedInMainContainer(jsxElement: JsxElement, mainContainerAliases: Set<string>): boolean {
  const children = getMeaningfulChildren(jsxElement)
  if (children.length !== 1) return false
  const tagName = getChildTagName(children[0])
  return tagName !== undefined && mainContainerAliases.has(tagName)
}

function isNameInUse(sourceFile: SourceFile, name: string): boolean {
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (importDecl.getDefaultImport()?.getText() === name) return true
    if (importDecl.getNamespaceImport()?.getText() === name) return true
    for (const namedImport of importDecl.getNamedImports()) {
      if ((namedImport.getAliasNode()?.getText() ?? namedImport.getName()) === name) return true
    }
  }
  return (
    sourceFile.getFunction(name) !== undefined ||
    sourceFile.getClass(name) !== undefined ||
    sourceFile.getInterface(name) !== undefined ||
    sourceFile.getTypeAlias(name) !== undefined ||
    sourceFile.getVariableDeclaration(name) !== undefined
  )
}

/**
 * Resolves the local identifier to use for the Elements `MainContainer` — either an existing
 * Elements-scoped alias, the bare name, or a non-conflicting alias if the bare name is already
 * bound to something else (e.g. a locally-defined or third-party `MainContainer`).
 */
function resolveMainContainerName(sourceFile: SourceFile, mainContainerAliases: Set<string>): string {
  const existingAlias = mainContainerAliases.values().next().value
  if (existingAlias !== undefined) return existingAlias
  if (!isNameInUse(sourceFile, 'MainContainer')) return 'MainContainer'

  let candidate = 'ElementsMainContainer'
  let suffix = 2
  while (isNameInUse(sourceFile, candidate)) {
    candidate = `ElementsMainContainer${suffix}`
    suffix += 1
  }
  return candidate
}

interface PendingEdit {
  position: number
  text: string
}

export default function transform(source: string, filePath: string = 'file.tsx'): string {
  if (!source.includes('FocusedLayout')) {
    return source
  }

  const sourceFile = createProjectFromSource(source, filePath)

  const focusedLayoutContentAliases = getImportAliases(sourceFile, 'FocusedLayoutContent')
  const mainContainerAliases = getImportAliases(sourceFile, 'MainContainer')

  const tagNames = new Set<string>(['FocusedLayout.Content', ...focusedLayoutContentAliases])
  const elements = getJsxElements(sourceFile, tagNames)

  if (elements.length === 0) {
    return source
  }

  const mainContainerName = resolveMainContainerName(sourceFile, mainContainerAliases)

  const edits: PendingEdit[] = []
  const spreadTodoNodes: Node[] = []
  let needsMainContainerImport = false

  for (const element of elements) {
    if (hasAttribute(element, 'isFullBleed')) continue

    // Self-closing elements have no children to wrap — leave untouched.
    if (element.getKind() === SyntaxKind.JsxSelfClosingElement) continue

    const openingElement = element.asKindOrThrow(SyntaxKind.JsxOpeningElement)
    const jsxElement = openingElement.getParentIfKind(SyntaxKind.JsxElement)
    if (!jsxElement) continue

    // Add `isFullBleed` right after the tag name, ahead of any existing attributes.
    edits.push({ position: openingElement.getTagNameNode().getEnd(), text: ' isFullBleed' })

    if (!isAlreadyWrappedInMainContainer(jsxElement, mainContainerAliases)) {
      const closingElement = jsxElement.getClosingElement()
      edits.push({ position: openingElement.getEnd(), text: `<${mainContainerName} size="wide">` })
      edits.push({ position: closingElement.getStart(), text: `</${mainContainerName}>` })
      needsMainContainerImport = true
    }

    // A spread attribute can carry its own `isFullBleed`, and — depending on attribute order —
    // override the one just added above. Flag it for manual review rather than skipping the
    // element outright.
    if (hasSpreadAttribute(openingElement)) {
      spreadTodoNodes.push(jsxElement)
    }
  }

  if (edits.length === 0) {
    return source
  }

  // Compute TODO comment insertion points before any other mutation runs. Inserting the
  // MainContainer wrap edits changes each JsxElement's own boundaries, which can forget node
  // references taken afterwards — so the comment position must be resolved from the
  // pre-mutation tree and merged into the same descending-sorted batch of edits below.
  if (spreadTodoNodes.length > 0) {
    const commentPositions = collectStatementCommentPositions(sourceFile, spreadTodoNodes)
    for (const { insertPos, indent } of commentPositions.values()) {
      edits.push({ position: insertPos, text: `${indent}//${SPREAD_TODO_COMMENT}\n` })
    }
  }

  // Apply edits from the end of the file backwards so earlier positions stay valid.
  edits.sort((a, b) => b.position - a.position)
  for (const { position, text } of edits) {
    sourceFile.insertText(position, text)
  }

  if (needsMainContainerImport) {
    if (mainContainerAliases.size === 0) {
      addImportsToTarget(
        sourceFile,
        [
          {
            name: 'MainContainer',
            alias: mainContainerName === 'MainContainer' ? undefined : mainContainerName,
            isTypeOnly: false,
          },
        ],
        MAIN_CONTAINER_TARGET_SPECIFIER,
        { promoteDeclarationTypeOnly: true },
      )
    } else {
      promoteMainContainerImportToValue(sourceFile)
    }
  }

  return sourceFile.getFullText()
}
