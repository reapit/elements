import { SyntaxKind } from "ts-morph";

import { createProjectFromSource, getImportAliases, getPropStringValue } from "../shared/index.js";

const AUTO_FLOW_TO_ORIENTATION: Record<string, string> = {
  column: "horizontal",
  row: "vertical",
};

/**
 * Codemod to migrate deprecated ButtonGroup layout props to their replacements.
 *
 * Prop transformations:
 * - autoFlow="column" → orientation="horizontal"
 * - autoFlow="row"    → orientation="vertical"
 * - justifyContent="start|end|center|stretch" → align="start|end|center|stretch"
 *
 * Dynamic autoFlow values (e.g. autoFlow={someVar}) cannot be determined at
 * compile time and are left unchanged. See README for manual migration steps.
 */
export default function transform(
  source: string,
  filePath: string = "file.tsx",
  options?: { facadePackage?: string },
): string {
  if (!source.includes("autoFlow") && !source.includes("justifyContent")) {
    return source;
  }

  const facadePackage = options?.facadePackage;
  const sourceFile = createProjectFromSource(source, filePath);

  const aliases = getImportAliases(sourceFile, "ButtonGroup", facadePackage, {
    fallbackToName: true,
  });
  if (aliases.size === 0) return source;

  const openingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement);
  const selfClosingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);

  const elements = [...openingElements, ...selfClosingElements].filter((el) =>
    aliases.has(el.getTagNameNode().getText()),
  );

  for (const element of elements) {
    if (element.wasForgotten()) continue;

    const justifyContentAttr = element.getAttribute("justifyContent");
    if (justifyContentAttr?.getKind() === SyntaxKind.JsxAttribute) {
      const jsxAttr = justifyContentAttr.asKindOrThrow(SyntaxKind.JsxAttribute);
      if (element.getAttribute("align")) {
        jsxAttr.remove();
      } else {
        jsxAttr.getNameNode().replaceWithText("align");
      }
    }

    const autoFlowAttr = element.getAttribute("autoFlow");
    if (autoFlowAttr?.getKind() === SyntaxKind.JsxAttribute) {
      const jsxAttr = autoFlowAttr.asKindOrThrow(SyntaxKind.JsxAttribute);
      if (element.getAttribute("orientation")) {
        jsxAttr.remove();
      } else {
        const value = getPropStringValue(jsxAttr);
        if (value !== undefined) {
          const orientationValue = AUTO_FLOW_TO_ORIENTATION[value];
          if (orientationValue) {
            jsxAttr.getNameNode().replaceWithText("orientation");
            jsxAttr.getInitializerOrThrow().replaceWithText(`"${orientationValue}"`);
          }
        }
        // Dynamic value — leave as is; the deprecated prop still works.
      }
    }
  }

  return sourceFile.getFullText();
}
