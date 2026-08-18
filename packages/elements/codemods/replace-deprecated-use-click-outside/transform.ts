import { Node, SourceFile, SyntaxKind } from "ts-morph";

import {
  isElementsImport,
  createProjectFromSource,
  getImportAliases,
  hasIdentifierUsage,
} from "../shared/index.js";

/**
 * Codemod to inline deprecated useClickOutside hook calls.
 *
 * Handles:
 * - useClickOutside(ref, onClickOutside) statement calls -> inline useEffect implementation
 * - import updates: removes migrated useClickOutside imports and adds React useEffect import
 * - alias support for imported useClickOutside symbols
 *
 * Safe fallback behaviour:
 * - unsupported useClickOutside call shapes are retained with a TODO comment
 * - non-call references to useClickOutside are left unchanged
 */

const TODO_INLINE_MANUALLY =
  "// TODO: Inline useClickOutside manually — this call shape could not be transformed safely";

function removeUnusedUseClickOutsideImports(
  sourceFile: SourceFile,
  aliases: Set<string>,
  facadePackage?: string,
): void {
  for (const importDecl of sourceFile.getImportDeclarations().slice()) {
    if (importDecl.wasForgotten()) continue;

    const moduleSpecifier = importDecl.getModuleSpecifierValue();
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue;

    for (const namedImport of importDecl.getNamedImports().slice()) {
      if (namedImport.getName() !== "useClickOutside") continue;

      const alias = namedImport.getAliasNode()?.getText() ?? "useClickOutside";
      if (!aliases.has(alias)) continue;

      if (!hasIdentifierUsage(sourceFile, new Set([alias]))) {
        namedImport.remove();
      }
    }

    if (
      importDecl.getNamedImports().length === 0 &&
      !importDecl.getDefaultImport() &&
      !importDecl.getNamespaceImport()
    ) {
      importDecl.remove();
    }
  }
}

function ensureUseEffectIdentifier(sourceFile: SourceFile): string {
  const reactImports = sourceFile
    .getImportDeclarations()
    .filter((importDecl) => importDecl.getModuleSpecifierValue() === "react");

  // Prefer existing value imports that already include useEffect.
  for (const reactImport of reactImports) {
    if (reactImport.isTypeOnly()) continue;

    const existingUseEffect = reactImport
      .getNamedImports()
      .find((namedImport) => namedImport.getName() === "useEffect");
    if (!existingUseEffect) continue;

    if (existingUseEffect.isTypeOnly()) {
      existingUseEffect.setIsTypeOnly(false);
    }

    return existingUseEffect.getAliasNode()?.getText() ?? "useEffect";
  }

  // Otherwise add to an existing non-namespace, non-type-only React import.
  const importWithoutNamespace = reactImports.find(
    (importDecl) => !importDecl.isTypeOnly() && !importDecl.getNamespaceImport(),
  );
  if (importWithoutNamespace) {
    importWithoutNamespace.addNamedImport("useEffect");
    return "useEffect";
  }

  // If we only found type-only or namespace React imports, create a new value import.
  sourceFile.addImportDeclaration({
    moduleSpecifier: "react",
    namedImports: ["useEffect"],
  });

  return "useEffect";
}

function buildInlinedEffect(
  refArgText: string,
  callbackArgText: string,
  useEffectIdentifier: string,
  uniqueId: number,
): string {
  const refConst = `__inlineUseClickOutsideRef${uniqueId}`;
  const callbackConst = `__inlineUseClickOutsideOnClickOutside${uniqueId}`;

  return `const ${refConst} = ${refArgText}
const ${callbackConst} = ${callbackArgText}

${useEffectIdentifier}(() => {
  const controller = new AbortController()
  const handleClickOutside = (event: MouseEvent) => {
    const outsideParentElementForClickOutside = ${refConst}.current?.parentElement
    const target = event.target
    if (outsideParentElementForClickOutside && target instanceof Node && !outsideParentElementForClickOutside.contains(target)) {
      (${callbackConst})()
    }
  }

  document.addEventListener('mousedown', handleClickOutside, {
    signal: controller.signal,
  })

  return () => {
    controller.abort()
  }
}, [${refConst}, ${callbackConst}])`;
}

function annotateUnsupportedStatement(
  statement: { getText(): string; replaceWithText(text: string): void } | undefined,
): void {
  if (!statement) return;

  const statementText = statement.getText();
  if (statementText.includes(TODO_INLINE_MANUALLY)) return;

  statement.replaceWithText(`${TODO_INLINE_MANUALLY}\n${statementText}`);
}

export default function transform(
  source: string,
  filePath: string = "file.tsx",
  options?: { facadePackage?: string },
): string {
  if (!source.includes("useClickOutside")) {
    return source;
  }

  const sourceFile = createProjectFromSource(source, filePath);
  const aliases = getImportAliases(sourceFile, "useClickOutside", options?.facadePackage);

  if (aliases.size === 0) {
    return source;
  }

  let useEffectIdentifier = "useEffect";
  let nextUniqueId = 1;
  const processedUnsupportedStatements = new Set<number>();
  const supportedStatements = new Map<
    number,
    {
      expressionStatement: ReturnType<SourceFile["getStatements"]>[number];
      refArgText: string;
      callbackArgText: string;
    }
  >();
  const unsupportedStatements = new Map<number, ReturnType<SourceFile["getStatements"]>[number]>();

  const callExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);

  for (const callExpression of callExpressions) {
    if (callExpression.wasForgotten()) continue;

    const calleeText = callExpression.getExpression().getText();
    if (!aliases.has(calleeText)) continue;

    const expressionStatement = callExpression.getParentIfKind(SyntaxKind.ExpressionStatement);

    if (expressionStatement && callExpression.getArguments().length === 2) {
      const [refArg, callbackArg] = callExpression.getArguments();
      supportedStatements.set(expressionStatement.getStart(), {
        expressionStatement,
        refArgText: refArg.getText(),
        callbackArgText: callbackArg.getText(),
      });
      continue;
    }

    const statement = callExpression.getFirstAncestor((ancestor) => Node.isStatement(ancestor));
    if (!statement) continue;

    const position = statement.getStart();
    if (supportedStatements.has(position)) continue;
    if (processedUnsupportedStatements.has(position)) continue;

    unsupportedStatements.set(position, statement);
    processedUnsupportedStatements.add(position);
  }

  if (supportedStatements.size > 0) {
    useEffectIdentifier = ensureUseEffectIdentifier(sourceFile);

    const orderedSupportedStatements = [...supportedStatements.entries()].sort(
      (a, b) => b[0] - a[0],
    );
    for (const [
      ,
      { expressionStatement, refArgText, callbackArgText },
    ] of orderedSupportedStatements) {
      if (expressionStatement.wasForgotten()) continue;
      expressionStatement.replaceWithText(
        buildInlinedEffect(refArgText, callbackArgText, useEffectIdentifier, nextUniqueId),
      );
      nextUniqueId++;
    }
  }

  const orderedUnsupportedStatements = [...unsupportedStatements.entries()].sort(
    (a, b) => b[0] - a[0],
  );
  for (const [, statement] of orderedUnsupportedStatements) {
    if (statement.wasForgotten()) continue;
    annotateUnsupportedStatement(statement);
  }

  removeUnusedUseClickOutsideImports(sourceFile, aliases, options?.facadePackage);

  return sourceFile.getFullText();
}
