import { SyntaxKind } from "ts-morph";

import { matchesPackage } from "../shared/elements-import.js";
import { createProjectFromSource } from "../shared/project.js";

const FROM_SPECIFIER = "@reapit/elements/core/app-switcher";
const TO_SPECIFIER = "@reapit/elements/core/app-switcher/anz";

// Named imports that, on their own, identify this as an ANZ-specific import
const ANZ_NAMED_IMPORTS = new Set(["SupportedProductId", "ProductConfig"]);

// AppSwitcher namespace properties that identify ANZ-specific usage
const ANZ_MEMBER_PROPERTIES = new Set([
  "AppAvatar",
  "ProductMenuItem",
  "getDisplayableProductsForExploreGroup",
  "getDisplayableProductsForYourAppsGroup",
]);

function isAppSwitcherImport(specifier: string, facadePackage?: string): boolean {
  if (specifier === FROM_SPECIFIER) return true;
  if (facadePackage !== undefined && specifier === `${facadePackage}/core/app-switcher`)
    return true;
  return false;
}

function resolveTargetSpecifier(specifier: string, facadePackage?: string): string {
  if (facadePackage !== undefined && matchesPackage(specifier, facadePackage)) {
    return `${facadePackage}/core/app-switcher/anz`;
  }
  return TO_SPECIFIER;
}

function hasAnzPropertyAccess(
  sourceFile: ReturnType<typeof createProjectFromSource>,
  localName: string,
): boolean {
  return sourceFile.getDescendantsOfKind(SyntaxKind.PropertyAccessExpression).some((node) => {
    return (
      node.getExpression().getText() === localName && ANZ_MEMBER_PROPERTIES.has(node.getName())
    );
  });
}

function transform(
  source: string,
  filePath: string = "file.tsx",
  options?: { facadePackage?: string },
): string {
  // Quick reject: must contain a known ANZ-specific symbol or member access pattern
  const hasAnzIndicator =
    [...ANZ_NAMED_IMPORTS].some((name) => source.includes(name)) ||
    [...ANZ_MEMBER_PROPERTIES].some((prop) => source.includes(`.${prop}`));
  if (!hasAnzIndicator) return source;
  if (!source.includes("app-switcher")) return source;

  const facadePackage = options?.facadePackage;
  const sourceFile = createProjectFromSource(source, filePath);
  let modified = false;

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const specifier = importDecl.getModuleSpecifierValue();
    if (!isAppSwitcherImport(specifier, facadePackage)) continue;

    const namedImports = importDecl.getNamedImports();

    // Case 1: explicit ANZ-specific named import (e.g. SupportedProductId)
    const hasAnzNamedImport = namedImports.some((ni) => ANZ_NAMED_IMPORTS.has(ni.getName()));

    // Case 2: AppSwitcher is imported and accessed with an ANZ-specific namespace property.
    // Resolves the local alias (e.g. `import { AppSwitcher as AS }`) so we check for `AS.AppAvatar`
    // rather than always assuming the name is `AppSwitcher`. Uses AST property-access traversal to
    // avoid false positives from comments or string literals containing the member name.
    const appSwitcherImport = namedImports.find((ni) => ni.getName() === "AppSwitcher");
    const localName = appSwitcherImport?.getAliasNode()?.getText() ?? appSwitcherImport?.getName();
    const hasAnzMemberAccess =
      localName !== undefined && hasAnzPropertyAccess(sourceFile, localName);

    if (!hasAnzNamedImport && !hasAnzMemberAccess) continue;

    importDecl.setModuleSpecifier(resolveTargetSpecifier(specifier, facadePackage));
    modified = true;
  }

  if (!modified) return source;
  return sourceFile.getFullText();
}

export default transform;
