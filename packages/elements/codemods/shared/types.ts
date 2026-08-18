import { SourceFile, SyntaxKind } from "ts-morph";

/**
 * Rewrites type references and heritage clause expressions matching any name in
 * `oldNames` to `newName`. Covers type annotations (e.g. `type Props = OldProps`),
 * interface extensions (`extends OldProps`), and generic type arguments
 * (`Partial<OldProps>`).
 */
export function transformTypeReferences(
  sourceFile: SourceFile,
  oldNames: Set<string>,
  newName: string,
): void {
  for (const typeRef of sourceFile.getDescendantsOfKind(SyntaxKind.TypeReference)) {
    const typeName = typeRef.getTypeName();
    if (oldNames.has(typeName.getText())) {
      typeName.replaceWithText(newName);
    }
  }
  for (const heritage of sourceFile.getDescendantsOfKind(SyntaxKind.ExpressionWithTypeArguments)) {
    const expression = heritage.getExpression();
    if (oldNames.has(expression.getText())) {
      expression.replaceWithText(newName);
    }
  }
}
