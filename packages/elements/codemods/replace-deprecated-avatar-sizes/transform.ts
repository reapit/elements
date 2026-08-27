import { SyntaxKind } from "ts-morph";

import { createProjectFromSource, getImportAliases, getPropStringValue } from "../shared/index.js";

const SIZE_MAP: Record<string, string> = {
  small: "sm",
  medium: "md",
};

const COMPONENT_NAMES = ["Avatar", "AvatarButton", "AvatarAnchor"];

/**
 * Codemod to migrate the deprecated `"small"` and `"medium"` Avatar `size`
 * values to their replacements, `"sm"` and `"md"`.
 *
 * Size transformations:
 * - size="small"  → size="sm"
 * - size="medium" → size="md"
 *
 * Applies to `Avatar`, `AvatarButton`, and `AvatarAnchor`.
 *
 * Dynamic `size` values (e.g. `size={someVar}`) cannot be determined at
 * compile time and are left unchanged.
 */
export default function transform(
  source: string,
  filePath: string = "file.tsx",
  options?: { facadePackage?: string },
): string {
  if (
    !source.includes('"small"') &&
    !source.includes("'small'") &&
    !source.includes('"medium"') &&
    !source.includes("'medium'")
  ) {
    return source;
  }

  const facadePackage = options?.facadePackage;
  const sourceFile = createProjectFromSource(source, filePath);

  const aliases = new Set<string>();
  for (const name of COMPONENT_NAMES) {
    for (const alias of getImportAliases(sourceFile, name, facadePackage, {
      fallbackToName: true,
    })) {
      aliases.add(alias);
    }
  }
  if (aliases.size === 0) return source;

  const openingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement);
  const selfClosingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);

  const elements = [...openingElements, ...selfClosingElements].filter((el) =>
    aliases.has(el.getTagNameNode().getText()),
  );

  for (const element of elements) {
    if (element.wasForgotten()) continue;

    const sizeAttr = element.getAttribute("size");
    if (sizeAttr?.getKind() !== SyntaxKind.JsxAttribute) continue;

    const jsxAttr = sizeAttr.asKindOrThrow(SyntaxKind.JsxAttribute);
    const value = getPropStringValue(jsxAttr);
    if (value === undefined) continue; // Dynamic value; leave as is.

    const mappedValue = SIZE_MAP[value];
    if (mappedValue) {
      jsxAttr.getInitializerOrThrow().replaceWithText(`"${mappedValue}"`);
    }
  }

  return sourceFile.getFullText();
}
