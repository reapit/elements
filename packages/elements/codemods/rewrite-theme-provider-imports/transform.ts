import { SourceFile } from "ts-morph";

import { isElementsImport, createProjectFromSource } from "../shared/index.js";

/**
 * Codemod to migrate ThemeProvider imports from @reapit/elements/core/theme-provider to its new location.
 *
 * The ThemeProvider component has moved from core/theme-provider to utils/theme-provider.
 * This codemod automatically updates import statements to reflect the new structure.
 *
 * Transformations:
 * - All named imports from @reapit/elements/core/theme-provider -> @reapit/elements/utils/theme-provider
 * - Barrel imports from @reapit/elements are unchanged
 */

function isCoreThemeProviderImport(moduleSpecifier: string, facadePackage?: string): boolean {
  if (!isElementsImport(moduleSpecifier, facadePackage)) {
    return false;
  }
  return moduleSpecifier.endsWith("/core/theme-provider");
}

function buildImportPath(moduleSpecifier: string): string {
  return moduleSpecifier.replace(/\/core\/theme-provider$/, "/utils/theme-provider");
}

function transformImports(sourceFile: SourceFile, facadePackage?: string): void {
  const importDeclarations = sourceFile.getImportDeclarations();

  const coreThemeProviderImports = importDeclarations.filter((importDecl) => {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();
    return isCoreThemeProviderImport(moduleSpecifier, facadePackage);
  });

  if (coreThemeProviderImports.length === 0) {
    return;
  }

  for (const importDecl of coreThemeProviderImports) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();
    importDecl.setModuleSpecifier(buildImportPath(moduleSpecifier));
  }
}

export default function transform(
  source: string,
  filePath: string = "file.tsx",
  options?: { facadePackage?: string },
): string {
  if (!source.includes("/core/theme-provider")) {
    return source;
  }

  const sourceFile = createProjectFromSource(source, filePath);

  transformImports(sourceFile, options?.facadePackage);

  return sourceFile.getFullText();
}
