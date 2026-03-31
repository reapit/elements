import { SourceFile } from 'ts-morph'
import { createProjectFromSource, getImportAliases, getJsxElements } from '../shared/index.js'

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
 * Adds fieldSizing="manual" to all Textarea JSX elements that do not already have
 * a fieldSizing prop.
 */
function addFieldSizingProp(sourceFile: SourceFile, textareaAliases: Set<string>): void {
  const jsxElements = getJsxElements(sourceFile, textareaAliases)

  for (const element of jsxElements) {
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

  const sourceFile = createProjectFromSource(source, filePath)

  const textareaAliases = getImportAliases(sourceFile, 'Textarea', options?.facadePackage)

  // Nothing to do if Textarea is not imported from a recognised package
  if (textareaAliases.size === 0) {
    return source
  }

  addFieldSizingProp(sourceFile, textareaAliases)

  return sourceFile.getFullText()
}
