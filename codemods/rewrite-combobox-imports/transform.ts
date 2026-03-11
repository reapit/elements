import { Project, QuoteKind, SourceFile } from 'ts-morph'
import { isElementsImport } from '../shared/elements-import.js'

/**
 * Codemod to migrate Combobox imports from @reapit/elements/core/combobox to its new location.
 *
 * The Combobox component has moved from core/combobox to utils/combobox.
 * This codemod automatically updates import statements to reflect the new structure.
 *
 * Transformations:
 * - All named imports from @reapit/elements/core/combobox -> @reapit/elements/utils/combobox
 * - Barrel imports from @reapit/elements are unchanged
 */

function isCoreComboboxImport(moduleSpecifier: string, facadePackage?: string): boolean {
  if (!isElementsImport(moduleSpecifier, facadePackage)) {
    return false
  }
  return moduleSpecifier.endsWith('/core/combobox')
}

function buildImportPath(moduleSpecifier: string): string {
  return moduleSpecifier.replace(/\/core\/combobox$/, '/utils/combobox')
}

function transformImports(sourceFile: SourceFile, facadePackage?: string): void {
  const importDeclarations = sourceFile.getImportDeclarations()

  const coreComboboxImports = importDeclarations.filter((importDecl) => {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    return isCoreComboboxImport(moduleSpecifier, facadePackage)
  })

  if (coreComboboxImports.length === 0) {
    return
  }

  for (const importDecl of coreComboboxImports) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    importDecl.setModuleSpecifier(buildImportPath(moduleSpecifier))
  }
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
  options?: { facadePackage?: string },
): string {
  if (!source.includes('/core/combobox')) {
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

  return sourceFile.getFullText()
}
