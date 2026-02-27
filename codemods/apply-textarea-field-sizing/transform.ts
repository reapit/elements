import { Project, SyntaxKind, SourceFile } from 'ts-morph'
import { isElementsImport } from '../shared/elements-import.js'

/**
 * Codemod to add fieldSizing="manual" to Textarea components missing the prop.
 *
 * In v4, the TextArea component did not require a fieldSizing prop. In v5, the
 * Textarea component requires a mandatory fieldSizing prop. The value "manual"
 * preserves the v4 behaviour, allowing consumers to upgrade without visual
 * regressions.
 *
 * This codemod is intended to be run after rewrite-v4-imports, which renames
 * `TextArea` imports to `Textarea as TextArea`. However, it also handles the
 * case where consumers have already manually renamed their imports.
 *
 * Transformations:
 * - <Textarea /> -> <Textarea fieldSizing="manual" />
 * - <Textarea placeholder="..." /> -> <Textarea placeholder="..." fieldSizing="manual" />
 * - <TextArea /> (aliased from Textarea) -> <TextArea fieldSizing="manual" />
 *
 * Skips:
 * - Textarea elements that already have a fieldSizing prop (any value)
 * - Textarea components not imported from @reapit/elements or a facade package
 * - Handles facade packages via --facade-package flag
 */

/**
 * Collects all aliases used for Textarea imports from @reapit/elements or a facade package.
 * Returns a set of names that could appear as JSX tag names in the file.
 *
 * Handles both:
 * - import { Textarea } -> alias set contains 'Textarea'
 * - import { Textarea as TextArea } -> alias set contains 'TextArea'
 */
function getTextareaAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()

    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'Textarea') {
        const alias = namedImport.getAliasNode()?.getText()
        aliases.add(alias ?? 'Textarea')
      }
    }
  }

  return aliases
}

/**
 * Adds fieldSizing="manual" to all Textarea JSX elements that do not already have
 * a fieldSizing prop.
 */
function addFieldSizingProp(sourceFile: SourceFile, textareaAliases: Set<string>): void {
  const jsxElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const element of jsxElements) {
    const tagName = element.getTagNameNode().getText()

    if (!textareaAliases.has(tagName)) continue

    // Skip if fieldSizing is already set (any value)
    if (element.getAttribute('fieldSizing')) continue

    element.addAttribute({
      name: 'fieldSizing',
      initializer: '"manual"',
    })
  }
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
  options?: { facadePackage?: string },
): string {
  // Early return if the file does not contain Textarea (performance optimisation)
  if (!source.includes('Textarea')) {
    return source
  }

  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      jsx: 2, // JsxEmit.React
    },
  })

  const sourceFile = project.createSourceFile(filePath, source)

  const textareaAliases = getTextareaAliases(sourceFile, options?.facadePackage)

  // Nothing to do if Textarea is not imported from a recognised package
  if (textareaAliases.size === 0) {
    return source
  }

  addFieldSizingProp(sourceFile, textareaAliases)

  return sourceFile.getFullText()
}
