import {
  JsxElement,
  JsxOpeningElement,
  JsxSelfClosingElement,
  Node,
  Project,
  QuoteKind,
  SourceFile,
  SyntaxKind,
} from 'ts-morph'
import { isElementsImport } from '../shared/elements-import.js'

/**
 * Codemod to upgrade DeprecatedButtonGroup to the new ButtonGroup component.
 *
 * This codemod transforms imports of DeprecatedButtonGroup to use the new v5 ButtonGroup
 * component from @reapit/elements/core/button-group. It handles:
 *
 * Import Transformations:
 * - DeprecatedButtonGroup → ButtonGroup (from @reapit/elements/core/button-group)
 * - DeprecatedButtonGroupProps → removed (type references rewritten to ButtonGroup.Props)
 * - DeprecatedButtonGroupAlignment → removed (no equivalent in new API)
 * - DeprecatedButtonGroup as CustomName → ButtonGroup as CustomName
 * - Handles facade packages via --facade-package flag
 *
 * Type Transformations:
 * - DeprecatedButtonGroupProps → ButtonGroup.Props
 * - DeprecatedButtonGroupAlignment has no equivalent — usages will produce a TypeScript error
 *
 * JSX Element Transformations:
 * - Element name: <DeprecatedButtonGroup> → <ButtonGroup>
 * - Static JSX children are wrapped in <ButtonGroup.Item>
 * - alignment prop is mapped to justifyContent:
 *   - alignment="left"   → justifyContent="start"
 *   - alignment="right"  → justifyContent="end"
 *   - alignment="center" → justifyContent="center"
 *   - alignment={dynamic} → prop removed, TODO comment inserted
 * - Dynamic children expressions (maps, conditionals) are left unchanged
 *   with a TODO comment inserted before them
 */

/** Maps deprecated alignment values to the new justifyContent values. */
const ALIGNMENT_TO_JUSTIFY_CONTENT: Record<string, string> = {
  left: 'start',
  right: 'end',
  center: 'center',
}

const TODO_DYNAMIC_ALIGNMENT_JSX =
  '{/* TODO: DeprecatedButtonGroup had a dynamic alignment prop that cannot be migrated automatically */}'
const TODO_DYNAMIC_ALIGNMENT_JS =
  '// TODO: DeprecatedButtonGroup had a dynamic alignment prop that cannot be migrated automatically'
const TODO_DYNAMIC_CHILDREN = '{/* TODO: wrap each button in this expression in <ButtonGroup.Item> manually */}'

/**
 * Returns true if JSX comment syntax should be used ({/* ... *\/}), false for JS line comment (//).
 * Walks up the AST to determine whether the element lives inside JSX content.
 */
function shouldUseJsxComment(element: JsxOpeningElement | JsxSelfClosingElement): boolean {
  let parent: Node | undefined = element.getParent()

  while (parent) {
    const kind = parent.getKind()

    if (kind === SyntaxKind.JsxElement || kind === SyntaxKind.JsxFragment) {
      return true
    }

    if (kind === SyntaxKind.JsxExpression) {
      return false
    }

    if (
      kind === SyntaxKind.PropertyAssignment ||
      kind === SyntaxKind.ArrayLiteralExpression ||
      kind === SyntaxKind.VariableDeclaration ||
      kind === SyntaxKind.CallExpression ||
      kind === SyntaxKind.ReturnStatement ||
      kind === SyntaxKind.ArrowFunction
    ) {
      return false
    }

    parent = parent.getParent()
  }

  return false
}

/**
 * Collects all local aliases used for DeprecatedButtonGroup in import declarations.
 * Returns a map of localName (alias or 'DeprecatedButtonGroup') → resolved name used in JSX.
 */
function getDeprecatedButtonGroupAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'DeprecatedButtonGroup') {
        aliases.add(namedImport.getAliasNode()?.getText() ?? 'DeprecatedButtonGroup')
      }
    }
  }

  // Fallback for snippet tests that have no import declarations
  if (aliases.size === 0 && sourceFile.getImportDeclarations().length === 0) {
    aliases.add('DeprecatedButtonGroup')
  }

  return aliases
}

/** Named imports that should be removed from elements import declarations. */
const IMPORTS_TO_REMOVE = new Set(['DeprecatedButtonGroupProps', 'DeprecatedButtonGroupAlignment'])

/**
 * Transforms import declarations:
 * - Moves DeprecatedButtonGroup → ButtonGroup into the target module specifier.
 * - Removes DeprecatedButtonGroupProps and DeprecatedButtonGroupAlignment.
 * - Merges into an existing target import declaration if one is present.
 * - Removes empty import declarations after all deprecated imports are removed.
 *
 * Returns the resolved local name for ButtonGroup (alias if one was used, otherwise 'ButtonGroup'),
 * or null if no ButtonGroup import was added (e.g. only type imports were removed).
 */
function transformImports(sourceFile: SourceFile, facadePackage?: string): string | null {
  const importsToAdd: Array<{ name: string; alias?: string; isTypeOnly: boolean }> = []

  const targetModuleSpecifier = facadePackage ?? '@reapit/elements/core/button-group'
  const alreadyMigratedPath = facadePackage ? null : '@reapit/elements/core/button-group'

  const importDeclarations = sourceFile.getImportDeclarations().slice()

  for (const importDecl of importDeclarations) {
    if (importDecl.wasForgotten()) continue

    const moduleSpecifier = importDecl.getModuleSpecifierValue()

    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    // Already at the target subpath — do not touch
    if (alreadyMigratedPath && moduleSpecifier === alreadyMigratedPath) continue

    const namedImports = importDecl.getNamedImports()
    const toRemove: typeof namedImports = []

    for (const namedImport of namedImports) {
      const originalName = namedImport.getName()

      if (originalName === 'DeprecatedButtonGroup') {
        importsToAdd.push({
          name: 'ButtonGroup',
          alias: namedImport.getAliasNode()?.getText(),
          isTypeOnly: namedImport.isTypeOnly(),
        })
        toRemove.push(namedImport)
        continue
      }

      if (IMPORTS_TO_REMOVE.has(originalName)) {
        toRemove.push(namedImport)
      }
    }

    toRemove.forEach((namedImport) => namedImport.remove())

    if (importDecl.getNamedImports().length === 0 && !importDecl.getDefaultImport()) {
      importDecl.remove()
    }
  }

  if (importsToAdd.length === 0) return null

  const currentImportDeclarations = sourceFile.getImportDeclarations()

  let targetImportDecl = currentImportDeclarations.find(
    (importDecl) => importDecl.getModuleSpecifierValue() === targetModuleSpecifier,
  )

  if (!targetImportDecl) {
    targetImportDecl = sourceFile.addImportDeclaration({
      moduleSpecifier: targetModuleSpecifier,
    })
  }

  let resolvedLocalName = 'ButtonGroup'

  for (const { name, alias, isTypeOnly } of importsToAdd) {
    resolvedLocalName = alias ?? name

    const existingImport = targetImportDecl.getNamedImports().find((namedImport) => {
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
      targetImportDecl.addNamedImport(`${typePrefix}${name} as ${alias}`)
    } else if (isTypeOnly) {
      targetImportDecl.addNamedImport({ name, isTypeOnly: true })
    } else {
      targetImportDecl.addNamedImport(name)
    }
  }

  return resolvedLocalName
}

/**
 * Rewrites DeprecatedButtonGroupProps type references to ButtonGroup.Props.
 * Covers type annotations, interface extensions (heritage clauses), and generics.
 * DeprecatedButtonGroupAlignment has no equivalent and is left unchanged.
 *
 * Returns true if any rewrite to ButtonGroup.Props occurred (so the caller can
 * ensure a ButtonGroup import exists).
 */
function transformTypeReferences(sourceFile: SourceFile): boolean {
  let rewrote = false

  for (const typeRef of sourceFile.getDescendantsOfKind(SyntaxKind.TypeReference)) {
    const typeName = typeRef.getTypeName()
    if (typeName.getText() === 'DeprecatedButtonGroupProps') {
      typeName.replaceWithText('ButtonGroup.Props')
      rewrote = true
    }
  }

  for (const heritage of sourceFile.getDescendantsOfKind(SyntaxKind.ExpressionWithTypeArguments)) {
    const expression = heritage.getExpression()
    if (expression.getText() === 'DeprecatedButtonGroupProps') {
      expression.replaceWithText('ButtonGroup.Props')
      rewrote = true
    }
  }

  return rewrote
}

/**
 * Transforms <DeprecatedButtonGroup> JSX elements to <ButtonGroup>.
 *
 * - Renames opening and closing tags.
 * - Maps alignment prop to justifyContent.
 * - Wraps static JSX children in <{localName}.Item>.
 * - Inserts TODO comments before dynamic children expressions.
 *
 * Comment insertions use sourceFile.insertText() in reverse position order so
 * that earlier positions remain valid after each insertion.
 */
function transformJsxElements(sourceFile: SourceFile, aliases: Set<string>, localName: string): void {
  // Positions where TODO comments should be inserted, collected during AST mutation
  // so that sourceFile.insertText() can be called in a single reverse-order pass.
  const commentInsertions: Array<{ pos: number; text: string }> = []

  // Snapshot both lists before any mutation — replaceWithText invalidates descendants.
  const openingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement).slice()
  const selfClosingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement).slice()

  // Process self-closing elements first (no children to wrap)
  for (const element of selfClosingElements) {
    if (element.wasForgotten()) continue
    const tagName = element.getTagNameNode()
    if (!aliases.has(tagName.getText())) continue

    if (tagName.getText() === 'DeprecatedButtonGroup') {
      tagName.replaceWithText('ButtonGroup')
    }

    transformAlignmentProp(element, commentInsertions)
  }

  // Process opening elements (may have children to wrap)
  for (const element of openingElements) {
    if (element.wasForgotten()) continue
    const tagName = element.getTagNameNode()
    if (!aliases.has(tagName.getText())) continue

    if (tagName.getText() === 'DeprecatedButtonGroup') {
      tagName.replaceWithText('ButtonGroup')
    }

    transformAlignmentProp(element, commentInsertions)

    // Rename the closing tag — only rename the non-aliased 'DeprecatedButtonGroup' tag
    const parent = element.getParent()
    if (parent?.getKind() === SyntaxKind.JsxElement) {
      const jsxElement = parent.asKind(SyntaxKind.JsxElement)!
      const closingTag = jsxElement.getClosingElement()
      if (closingTag.getTagNameNode().getText() === 'DeprecatedButtonGroup') {
        closingTag.getTagNameNode().replaceWithText('ButtonGroup')
      }

      // Wrap direct JSX children in <{localName}.Item>
      wrapChildren(jsxElement, commentInsertions, localName)
    }
  }

  // Insert comments in reverse position order so earlier positions stay valid
  const sorted = commentInsertions.sort((a, b) => b.pos - a.pos)
  for (const { pos, text } of sorted) {
    sourceFile.insertText(pos, `${text}\n`)
  }
}

/**
 * Transforms the alignment prop on a JSX element to justifyContent.
 * Collects a comment insertion entry when the value is dynamic.
 * Uses JSX or JS comment syntax depending on the element's position in the tree.
 */
function transformAlignmentProp(
  element: ReturnType<SourceFile['getDescendantsOfKind']>[number],
  commentInsertions: Array<{ pos: number; text: string }>,
): void {
  const jsxElement = element.asKind(SyntaxKind.JsxOpeningElement) ?? element.asKind(SyntaxKind.JsxSelfClosingElement)
  if (!jsxElement) return

  const alignmentAttr = jsxElement.getAttribute('alignment')
  if (!alignmentAttr) return

  const jsxAttr = alignmentAttr.asKind(SyntaxKind.JsxAttribute)
  if (!jsxAttr) return

  const init = jsxAttr.getInitializer()

  // Extract the static string value, if any
  let staticValue: string | undefined

  if (!init) {
    // Bare attribute with no value — treat as undefined, remove
    staticValue = undefined
  } else if (init.getKind() === SyntaxKind.StringLiteral) {
    staticValue = init.asKind(SyntaxKind.StringLiteral)!.getLiteralText()
  } else if (init.getKind() === SyntaxKind.JsxExpression) {
    const expr = init.asKind(SyntaxKind.JsxExpression)!.getExpression()
    if (expr?.getKind() === SyntaxKind.StringLiteral) {
      staticValue = expr.asKind(SyntaxKind.StringLiteral)!.getLiteralText()
    }
  }

  const mappedValue = staticValue !== undefined ? ALIGNMENT_TO_JUSTIFY_CONTENT[staticValue] : undefined

  if (mappedValue !== undefined) {
    // Static, mappable value — rename prop and replace value
    jsxAttr.getNameNode().replaceWithText('justifyContent')
    jsxAttr.setInitializer(`"${mappedValue}"`)
  } else {
    // Dynamic or unmappable — remove prop and schedule a context-aware TODO comment
    const useJsx = shouldUseJsxComment(jsxElement)
    const todoText = useJsx ? TODO_DYNAMIC_ALIGNMENT_JSX : TODO_DYNAMIC_ALIGNMENT_JS
    const elementStart =
      jsxElement.getParent()?.getKind() === SyntaxKind.JsxElement
        ? jsxElement.getParent()!.getStart()
        : jsxElement.getStart()
    jsxAttr.remove()
    commentInsertions.push({ pos: elementStart, text: todoText })
  }
}

/**
 * Wraps direct JSX element children in <{localName}.Item>.
 * Inserts a TODO comment before dynamic JSX expression children.
 * Uses `localName` (the alias or 'ButtonGroup') so aliased imports emit e.g. <BtnGroup.Item>.
 */
function wrapChildren(
  jsxElement: JsxElement,
  commentInsertions: Array<{ pos: number; text: string }>,
  localName: string,
): void {
  const itemTag = `${localName}.Item`
  const children = jsxElement.getJsxChildren()

  for (const child of children) {
    const kind = child.getKind()

    if (kind === SyntaxKind.JsxText) {
      // Whitespace/newlines — leave unchanged
      continue
    }

    if (kind === SyntaxKind.JsxElement || kind === SyntaxKind.JsxSelfClosingElement) {
      // Check if already wrapped in {localName}.Item — avoid double-wrapping
      const tagText =
        kind === SyntaxKind.JsxElement
          ? child.asKind(SyntaxKind.JsxElement)!.getOpeningElement().getTagNameNode().getText()
          : child.asKind(SyntaxKind.JsxSelfClosingElement)!.getTagNameNode().getText()

      if (tagText === itemTag) continue

      const childText = child.getText()
      child.replaceWithText(`<${itemTag}>${childText}</${itemTag}>`)
      continue
    }

    if (kind === SyntaxKind.JsxExpression) {
      // Dynamic expression — leave unchanged, insert TODO comment before it
      commentInsertions.push({ pos: child.getStart(), text: TODO_DYNAMIC_CHILDREN })
    }
  }
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
  options?: { facadePackage?: string },
): string {
  if (!source.includes('DeprecatedButtonGroup')) return source

  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      jsx: 2, // JsxEmit.React
    },
    manipulationSettings: {
      quoteKind: QuoteKind.Single,
    },
  })

  const sourceFile = project.createSourceFile(filePath, source)
  const facadePackage = options?.facadePackage

  // Collect aliases BEFORE any AST mutation
  const aliases = getDeprecatedButtonGroupAliases(sourceFile, facadePackage)

  const importLocalName = transformImports(sourceFile, facadePackage)
  const typeRewriteOccurred = transformTypeReferences(sourceFile)

  // Fix 4: if type references were rewritten to ButtonGroup.Props but no ButtonGroup import
  // was added (e.g. the file only imported DeprecatedButtonGroupProps), add a type-only import.
  if (typeRewriteOccurred && importLocalName === null) {
    const targetModuleSpecifier = facadePackage ?? '@reapit/elements/core/button-group'
    let targetImportDecl = sourceFile
      .getImportDeclarations()
      .find((d) => d.getModuleSpecifierValue() === targetModuleSpecifier)
    if (!targetImportDecl) {
      targetImportDecl = sourceFile.addImportDeclaration({ moduleSpecifier: targetModuleSpecifier })
    }
    const alreadyHasButtonGroup = targetImportDecl.getNamedImports().some((n) => n.getName() === 'ButtonGroup')
    if (!alreadyHasButtonGroup) {
      targetImportDecl.addNamedImport({ name: 'ButtonGroup', isTypeOnly: true })
    }
  }

  // Use the resolved local name (alias or 'ButtonGroup') for child wrapping
  const localName = importLocalName ?? 'ButtonGroup'
  transformJsxElements(sourceFile, aliases, localName)

  return sourceFile.getFullText()
}
