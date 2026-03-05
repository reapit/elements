import { JsxOpeningElement, JsxSelfClosingElement, Project, QuoteKind, SourceFile, SyntaxKind } from 'ts-morph'
import { isElementsImport, matchesPackage } from '../shared/elements-import.js'

/**
 * Codemod to upgrade DeprecatedTag and DeprecatedTagGroup to the new Tag and TagGroup components.
 *
 * Import Transformations:
 * - DeprecatedTag (standalone) -> Tag (from @reapit/elements/core/tag or facade package)
 * - DeprecatedTag (inside group) -> TagGroup.Item (no separate import needed; it is a property of TagGroup)
 * - DeprecatedTagGroup -> TagGroup (from @reapit/elements/core/tag-group or facade package)
 * - DeprecatedTagProps -> removed (type references rewritten to Tag.Props in phase 3)
 * - ElDeprecatedTag -> removed (styled component; manual migration needed)
 * - ElDeprecatedTagGroup -> removed (styled component; manual migration needed)
 * - ElDeprecatedTagGroupInner -> removed (styled component; manual migration needed)
 *
 * Type Transformations:
 * - DeprecatedTagProps -> Tag.Props
 *
 * JSX Element Transformations:
 * - <DeprecatedTag> inside <DeprecatedTagGroup> -> <TagGroup.Item>
 *   with intent prop removed (TODO comment if intent was present)
 * - <DeprecatedTag> standalone -> <Tag>
 *   with intent prop removed (TODO comment if intent was present)
 *   and a TODO comment noting that this standalone migration should be verified
 * - <DeprecatedTagGroup> -> <TagGroup>
 */

/**
 * Collects all local aliases used for DeprecatedTag in import declarations.
 * Returns the set of names that may appear as JSX tag names.
 */
function getDeprecatedTagAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'DeprecatedTag') {
        aliases.add(namedImport.getAliasNode()?.getText() ?? 'DeprecatedTag')
      }
    }
  }

  // Fallback for snippet tests that have no import declarations
  if (aliases.size === 0 && sourceFile.getImportDeclarations().length === 0) {
    aliases.add('DeprecatedTag')
  }

  return aliases
}

/**
 * Collects all local aliases used for DeprecatedTagGroup in import declarations.
 */
function getDeprecatedTagGroupAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'DeprecatedTagGroup') {
        aliases.add(namedImport.getAliasNode()?.getText() ?? 'DeprecatedTagGroup')
      }
    }
  }

  if (aliases.size === 0 && sourceFile.getImportDeclarations().length === 0) {
    aliases.add('DeprecatedTagGroup')
  }

  return aliases
}

/**
 * The set of named imports that should be removed from elements import declarations.
 * DeprecatedTag is handled separately (converted to Tag).
 * DeprecatedTagGroup is handled separately (converted to TagGroup).
 */
const IMPORTS_TO_REMOVE = new Set([
  'DeprecatedTagProps',
  'ElDeprecatedTag',
  'ElDeprecatedTagGroup',
  'ElDeprecatedTagGroupInner',
])

/**
 * Resolves the target module specifier for a converted import entry.
 *
 * The rule is:
 * - If the original import came from a facade package, the migrated import stays
 *   at that same specifier (e.g. `@company/ui/elements` → `@company/ui/elements`).
 * - If the original import came from `@reapit/elements` (or a subpath of it), the
 *   migrated import goes to the canonical subpath (`@reapit/elements/core/tag` or
 *   `@reapit/elements/core/tag-group`).
 */
function resolveTargetSpecifier(sourceSpecifier: string, canonicalSubpath: string, facadePackage?: string): string {
  if (facadePackage && matchesPackage(sourceSpecifier, facadePackage)) {
    return sourceSpecifier
  }
  return canonicalSubpath
}

/**
 * Determines whether a DeprecatedTag JSX element (identified by its alias set) is
 * inside a DeprecatedTagGroup element (identified by its alias set).
 *
 * This walks ancestor nodes to handle common patterns like conditionals and fragments
 * between the group and its items, instead of requiring a direct parent/child shape.
 */
function isInsideTagGroup(
  element: ReturnType<SourceFile['getDescendantsOfKind']>[number],
  tagGroupAliases: Set<string>,
): boolean {
  // For a JsxOpeningElement, start from its wrapping JsxElement so we don't
  // accidentally match the element itself as an ancestor.
  const kind = element.getKind()
  let current: ReturnType<typeof element.getParent>

  if (kind === SyntaxKind.JsxOpeningElement) {
    const tagElement = element.getParent() // JsxElement wrapping this opening tag
    if (!tagElement || tagElement.getKind() !== SyntaxKind.JsxElement) return false
    current = tagElement.getParent()
  } else if (kind === SyntaxKind.JsxSelfClosingElement) {
    current = element.getParent()
  } else {
    return false
  }

  while (current) {
    if (current.getKind() === SyntaxKind.JsxElement) {
      const jsxElement = current.asKind(SyntaxKind.JsxElement)
      if (!jsxElement) return false
      const openingTag = jsxElement.getOpeningElement()
      const tagName = openingTag.getTagNameNode().getText()
      if (tagGroupAliases.has(tagName)) {
        return true
      }
    }

    // For JsxFragment or any other non-element ancestor (conditionals, fragments, etc.)
    // just continue walking upward.
    current = current.getParent()
  }

  return false
}

/**
 * Determines whether the file has any standalone DeprecatedTag usage (not inside a group).
 * This is used to decide whether we need a `Tag` import from `core/tag`.
 *
 * Covers both JSX element usage and non-JSX value/type references (e.g. `const Cmp = DeprecatedTag`,
 * `ComponentProps<typeof DeprecatedTag>`).
 */
function hasStandaloneTagUsage(sourceFile: SourceFile, tagAliases: Set<string>, tagGroupAliases: Set<string>): boolean {
  const elements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const element of elements) {
    const tagName = element.getTagNameNode().getText()
    if (!tagAliases.has(tagName)) continue
    if (!isInsideTagGroup(element, tagGroupAliases)) return true
  }

  // Also check non-JSX identifier references (value or type usage outside JSX)
  for (const identifier of sourceFile.getDescendantsOfKind(SyntaxKind.Identifier)) {
    if (!tagAliases.has(identifier.getText())) continue
    const parent = identifier.getParent()
    if (!parent) continue
    const parentKind = parent.getKind()
    // Skip import/export declarations and JSX tag names (already covered above)
    if (
      parentKind === SyntaxKind.ImportSpecifier ||
      parentKind === SyntaxKind.ExportSpecifier ||
      parentKind === SyntaxKind.JsxOpeningElement ||
      parentKind === SyntaxKind.JsxSelfClosingElement ||
      parentKind === SyntaxKind.JsxClosingElement
    )
      continue
    return true
  }

  return false
}

/**
 * Determines whether the file has any DeprecatedTagGroup usage.
 *
 * Covers both JSX element usage and non-JSX value/type references (e.g. `typeof DeprecatedTagGroup`).
 */
function hasTagGroupUsage(sourceFile: SourceFile, tagGroupAliases: Set<string>): boolean {
  const elements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  if (elements.some((element) => tagGroupAliases.has(element.getTagNameNode().getText()))) return true

  // Also check non-JSX identifier references
  for (const identifier of sourceFile.getDescendantsOfKind(SyntaxKind.Identifier)) {
    if (!tagGroupAliases.has(identifier.getText())) continue
    const parent = identifier.getParent()
    if (!parent) continue
    const parentKind = parent.getKind()
    if (
      parentKind === SyntaxKind.ImportSpecifier ||
      parentKind === SyntaxKind.ExportSpecifier ||
      parentKind === SyntaxKind.JsxOpeningElement ||
      parentKind === SyntaxKind.JsxSelfClosingElement ||
      parentKind === SyntaxKind.JsxClosingElement
    )
      continue
    return true
  }

  return false
}

/**
 * Transforms import declarations:
 * - Moves DeprecatedTag -> Tag into the target module specifier for tag.
 * - Moves DeprecatedTagGroup -> TagGroup into the target module specifier for tag-group.
 * - Removes DeprecatedTagProps and El* styled components.
 * - Merges into existing target import declarations if present.
 * - Removes empty import declarations after all deprecated imports are removed.
 *
 * Imports are grouped by their *source* module specifier so that facade imports
 * stay on the facade specifier they originated from, while @reapit/elements imports
 * are moved to the canonical subpath imports:
 * - Tag -> @reapit/elements/core/tag
 * - TagGroup -> @reapit/elements/core/tag-group
 */
function transformImports(
  sourceFile: SourceFile,
  needsTagImport: boolean,
  needsTagGroupImport: boolean,
  facadePackage?: string,
): void {
  // Each entry records the resolved target specifier alongside the import details,
  // so imports from different source specifiers are routed correctly.
  const tagImportsToAdd: Array<{ name: string; alias?: string; isTypeOnly: boolean; targetSpecifier: string }> = []
  const tagGroupImportsToAdd: Array<{
    name: string
    alias?: string
    isTypeOnly: boolean
    targetSpecifier: string
  }> = []

  // The "already migrated" paths only apply to the default (non-facade) target.
  const alreadyMigratedTagPath = facadePackage ? null : '@reapit/elements/core/tag'
  const alreadyMigratedTagGroupPath = facadePackage ? null : '@reapit/elements/core/tag-group'

  const importDeclarations = sourceFile.getImportDeclarations().slice()

  for (const importDecl of importDeclarations) {
    if (importDecl.wasForgotten()) continue

    const moduleSpecifier = importDecl.getModuleSpecifierValue()

    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    // Already from the target path (non-facade only) -- do not touch
    if (alreadyMigratedTagPath && moduleSpecifier === alreadyMigratedTagPath) continue
    if (alreadyMigratedTagGroupPath && moduleSpecifier === alreadyMigratedTagGroupPath) continue

    const namedImports = importDecl.getNamedImports()
    const importsToRemove: typeof namedImports = []

    for (const namedImport of namedImports) {
      const originalName = namedImport.getName()

      if (originalName === 'DeprecatedTag') {
        if (needsTagImport) {
          tagImportsToAdd.push({
            name: 'Tag',
            alias: namedImport.getAliasNode()?.getText(),
            isTypeOnly: namedImport.isTypeOnly(),
            targetSpecifier: resolveTargetSpecifier(moduleSpecifier, '@reapit/elements/core/tag', facadePackage),
          })
        }
        importsToRemove.push(namedImport)
        continue
      }

      if (originalName === 'DeprecatedTagGroup') {
        if (needsTagGroupImport) {
          tagGroupImportsToAdd.push({
            name: 'TagGroup',
            alias: namedImport.getAliasNode()?.getText(),
            isTypeOnly: namedImport.isTypeOnly(),
            targetSpecifier: resolveTargetSpecifier(moduleSpecifier, '@reapit/elements/core/tag-group', facadePackage),
          })
        }
        importsToRemove.push(namedImport)
        continue
      }

      if (IMPORTS_TO_REMOVE.has(originalName)) {
        importsToRemove.push(namedImport)
      }
    }

    importsToRemove.forEach((namedImport) => namedImport.remove())

    if (importDecl.getNamedImports().length === 0 && !importDecl.getDefaultImport()) {
      importDecl.remove()
    }
  }

  // When needsTagImport is true (e.g. DeprecatedTagProps references) but no DeprecatedTag
  // named import was found to convert, we still need to add a Tag import.
  if (needsTagImport && tagImportsToAdd.length === 0) {
    tagImportsToAdd.push({
      name: 'Tag',
      isTypeOnly: false,
      targetSpecifier: facadePackage ?? '@reapit/elements/core/tag',
    })
  }

  // When needsTagGroupImport is true but no DeprecatedTagGroup named import was found
  // to convert (e.g. snippet input with no import declarations), we still need to add
  // a TagGroup import.
  if (needsTagGroupImport && tagGroupImportsToAdd.length === 0) {
    tagGroupImportsToAdd.push({
      name: 'TagGroup',
      isTypeOnly: false,
      targetSpecifier: facadePackage ?? '@reapit/elements/core/tag-group',
    })
  }

  // Group entries by target specifier and emit one addImportsToTarget call per group.
  const tagBySpecifier = new Map<string, Array<{ name: string; alias?: string; isTypeOnly: boolean }>>()
  for (const { targetSpecifier, ...entry } of tagImportsToAdd) {
    const group = tagBySpecifier.get(targetSpecifier) ?? []
    group.push(entry)
    tagBySpecifier.set(targetSpecifier, group)
  }
  for (const [specifier, entries] of tagBySpecifier) {
    addImportsToTarget(sourceFile, entries, specifier)
  }

  const tagGroupBySpecifier = new Map<string, Array<{ name: string; alias?: string; isTypeOnly: boolean }>>()
  for (const { targetSpecifier, ...entry } of tagGroupImportsToAdd) {
    const group = tagGroupBySpecifier.get(targetSpecifier) ?? []
    group.push(entry)
    tagGroupBySpecifier.set(targetSpecifier, group)
  }
  for (const [specifier, entries] of tagGroupBySpecifier) {
    addImportsToTarget(sourceFile, entries, specifier)
  }
}

/**
 * Adds named imports to a target module specifier, merging into existing declarations
 * where possible.
 */
function addImportsToTarget(
  sourceFile: SourceFile,
  importsToAdd: Array<{ name: string; alias?: string; isTypeOnly: boolean }>,
  targetModuleSpecifier: string,
): void {
  if (importsToAdd.length === 0) return

  const currentImportDeclarations = sourceFile.getImportDeclarations()

  let targetDecl = currentImportDeclarations.find(
    (importDecl) => importDecl.getModuleSpecifierValue() === targetModuleSpecifier,
  )

  if (!targetDecl) {
    targetDecl = sourceFile.addImportDeclaration({
      moduleSpecifier: targetModuleSpecifier,
    })
  }

  for (const { name, alias, isTypeOnly } of importsToAdd) {
    // Avoid duplicating an import that is already in the target declaration
    const existingImport = targetDecl.getNamedImports().find((namedImport) => {
      return namedImport.getName() === name && namedImport.getAliasNode()?.getText() === alias
    })

    if (existingImport) {
      // Upgrade type-only to value import if needed
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

/**
 * Rewrites non-JSX identifier references to the deprecated tag names so that
 * value and type usage outside JSX (e.g. `const Cmp = DeprecatedTag`,
 * `typeof DeprecatedTagGroup`, `ComponentProps<typeof DeprecatedTag>`) remains
 * valid after the import is rewritten.
 *
 * Only the unaliased names (`DeprecatedTag` → `Tag`, `DeprecatedTagGroup` → `TagGroup`)
 * are rewritten here; aliased bindings are left as-is because the import transformation
 * preserves the local alias.
 */
function transformIdentifierReferences(sourceFile: SourceFile): void {
  const rewrites: Map<string, string> = new Map([
    ['DeprecatedTag', 'Tag'],
    ['DeprecatedTagGroup', 'TagGroup'],
  ])

  for (const identifier of sourceFile.getDescendantsOfKind(SyntaxKind.Identifier)) {
    const text = identifier.getText()
    const replacement = rewrites.get(text)
    if (!replacement) continue

    const parent = identifier.getParent()
    if (!parent) continue
    const parentKind = parent.getKind()

    // Skip import/export declarations and JSX tag names
    // (JSX tags are handled by transformTagElements / transformTagGroupElements)
    if (
      parentKind === SyntaxKind.ImportSpecifier ||
      parentKind === SyntaxKind.ExportSpecifier ||
      parentKind === SyntaxKind.JsxOpeningElement ||
      parentKind === SyntaxKind.JsxSelfClosingElement ||
      parentKind === SyntaxKind.JsxClosingElement
    )
      continue

    identifier.replaceWithText(replacement)
  }
}

/**
 * Rewrites DeprecatedTagProps type references to Tag.Props.
 * Covers type annotations, interface extensions (heritage clauses), and generics.
 */
function transformTypeReferences(sourceFile: SourceFile): void {
  for (const typeRef of sourceFile.getDescendantsOfKind(SyntaxKind.TypeReference)) {
    const typeName = typeRef.getTypeName()
    if (typeName.getText() === 'DeprecatedTagProps') {
      typeName.replaceWithText('Tag.Props')
    }
  }

  for (const heritage of sourceFile.getDescendantsOfKind(SyntaxKind.ExpressionWithTypeArguments)) {
    const expression = heritage.getExpression()
    if (expression.getText() === 'DeprecatedTagProps') {
      expression.replaceWithText('Tag.Props')
    }
  }
}

const STANDALONE_TODO = '{/* TODO: Standalone DeprecatedTag migrated to Tag — verify this is correct */}'
const INTENT_REMOVED_TODO =
  '{/* TODO: intent prop removed — the new Tag and TagGroup.Item have no colour/intent equivalent */}'
const ALIASED_GROUP_CHILD_TODO =
  '{/* TODO: This aliased DeprecatedTag is inside a group and should be TagGroup.Item, but the alias resolves to Tag — replace this with <TagGroup.Item> */}'

/**
 * Processes the intent prop on a DeprecatedTag element: removes it and returns
 * whether a TODO comment should be inserted (i.e. when intent was explicitly present).
 */
function processIntentProp(element: JsxOpeningElement | JsxSelfClosingElement): boolean {
  const attributes = element.getAttributes()
  let hasIntentAttr = false

  for (const attr of attributes.slice()) {
    if (attr.getKind() !== SyntaxKind.JsxAttribute) continue
    const jsxAttr = attr.asKind(SyntaxKind.JsxAttribute)!
    const name = jsxAttr.getNameNode().getText()

    if (name === 'intent') {
      hasIntentAttr = true
      jsxAttr.remove()
    }
  }

  return hasIntentAttr
}

/**
 * Transforms <DeprecatedTag> elements to either <TagGroup.Item> (when inside a group)
 * or <Tag> (when standalone).
 *
 * - Inside a group: renames to TagGroup.Item, removes intent prop, adds TODO if intent was present
 * - Standalone: renames to Tag, removes intent prop, adds TODO if intent was present,
 *   adds a separate TODO noting the standalone migration should be verified
 */
function transformTagElements(sourceFile: SourceFile, tagAliases: Set<string>, tagGroupAliases: Set<string>): void {
  // Collect positions where we need to insert TODO comments.
  // We do this after all AST renames to avoid offset invalidation.
  const commentInsertions: Array<{ position: number; comments: string[] }> = []

  const elements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const element of elements) {
    const tagName = element.getTagNameNode()
    const tagNameText = tagName.getText()

    if (!tagAliases.has(tagNameText)) continue

    const insideGroup = isInsideTagGroup(element, tagGroupAliases)
    const comments: string[] = []

    if (insideGroup) {
      // Inside a group: rename to TagGroup.Item
      if (tagNameText === 'DeprecatedTag') {
        tagName.replaceWithText('TagGroup.Item')
      } else {
        // Aliased tag inside a group — the alias now resolves to Tag (from the
        // import rewrite) but should be TagGroup.Item. Flag for manual fix.
        comments.push(ALIASED_GROUP_CHILD_TODO)
      }
    } else {
      // Standalone: rename to Tag
      if (tagNameText === 'DeprecatedTag') {
        tagName.replaceWithText('Tag')
      }
      comments.push(STANDALONE_TODO)
    }

    // Process intent prop
    const hadIntent = processIntentProp(element)
    if (hadIntent) {
      comments.push(INTENT_REMOVED_TODO)
    }

    // Update closing tag if present
    if (element.getKind() === SyntaxKind.JsxOpeningElement) {
      const parent = element.getParent()
      if (parent?.getKind() === SyntaxKind.JsxElement) {
        const closingTag = parent.asKind(SyntaxKind.JsxElement)?.getClosingElement()
        if (closingTag) {
          const closingTagName = closingTag.getTagNameNode().getText()
          if (closingTagName === 'DeprecatedTag') {
            closingTag.getTagNameNode().replaceWithText(insideGroup ? 'TagGroup.Item' : 'Tag')
          }
        }

        // Record position for TODO comments (before the entire JsxElement)
        if (comments.length > 0) {
          commentInsertions.push({ position: parent.getStart(), comments })
        }
      }
    } else if (element.getKind() === SyntaxKind.JsxSelfClosingElement) {
      if (comments.length > 0) {
        commentInsertions.push({ position: element.getStart(), comments })
      }
    }
  }

  // Insert comments in reverse order so positions stay valid
  const sorted = [...commentInsertions].sort((a, b) => b.position - a.position)
  for (const { position, comments } of sorted) {
    const text = comments.map((c) => `${c}\n`).join('')
    sourceFile.insertText(position, text)
  }
}

/**
 * Transforms <DeprecatedTagGroup> elements to <TagGroup>.
 *
 * When an alias is used (e.g. `import { DeprecatedTagGroup as TG }`), the JSX
 * tag name is left unchanged because the import transformation already renames
 * the binding to `TagGroup as TG`, so the alias still resolves correctly.
 */
function transformTagGroupElements(sourceFile: SourceFile, aliases: Set<string>): void {
  // Process self-closing elements
  for (const element of sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)) {
    const tagNameText = element.getTagNameNode().getText()
    if (!aliases.has(tagNameText)) continue
    if (tagNameText === 'DeprecatedTagGroup') {
      element.getTagNameNode().replaceWithText('TagGroup')
    }
  }

  // Process opening elements (with children)
  for (const element of sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement)) {
    const tagNameText = element.getTagNameNode().getText()
    if (!aliases.has(tagNameText)) continue

    if (tagNameText === 'DeprecatedTagGroup') {
      element.getTagNameNode().replaceWithText('TagGroup')
    }

    // Rename closing tag (only for non-aliased usage)
    const parent = element.getParent()
    if (parent?.getKind() === SyntaxKind.JsxElement) {
      const closingTag = parent.asKind(SyntaxKind.JsxElement)?.getClosingElement()
      if (closingTag?.getTagNameNode().getText() === 'DeprecatedTagGroup') {
        closingTag.getTagNameNode().replaceWithText('TagGroup')
      }
    }
  }
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
  options?: { facadePackage?: string },
): string {
  if (!source.includes('DeprecatedTag')) return source

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

  // Phase 1 -- collect aliases before any AST mutation
  const tagAliases = getDeprecatedTagAliases(sourceFile, facadePackage)
  const tagGroupAliases = getDeprecatedTagGroupAliases(sourceFile, facadePackage)

  // Determine what imports are needed based on JSX usage
  const needsTag = hasStandaloneTagUsage(sourceFile, tagAliases, tagGroupAliases)
  const needsTagGroup = hasTagGroupUsage(sourceFile, tagGroupAliases)

  // Also need Tag import if DeprecatedTagProps is referenced (for Tag.Props rewrite)
  const hasTagPropsRef = source.includes('DeprecatedTagProps')
  const needsTagImport = needsTag || hasTagPropsRef

  // Phase 2 -- transform imports
  transformImports(sourceFile, needsTagImport, needsTagGroup, facadePackage)

  // Phase 3 -- transform type references
  transformTypeReferences(sourceFile)

  // Phase 3.5 -- rewrite non-JSX identifier references
  // (e.g. `const Cmp = DeprecatedTag`, `typeof DeprecatedTagGroup`)
  transformIdentifierReferences(sourceFile)

  // Phase 4 -- transform JSX elements
  // Tags are transformed before tag groups so that isInsideTagGroup checks can
  // still walk the *original* parent tag names (captured in aliases) when
  // deciding how to rewrite each Tag.  Once all Tags are rewritten the parent
  // TagGroup names are no longer needed and are safe to transform.
  transformTagElements(sourceFile, tagAliases, tagGroupAliases)
  transformTagGroupElements(sourceFile, tagGroupAliases)

  return sourceFile.getFullText()
}
