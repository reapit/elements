import { Node, SourceFile, SyntaxKind } from "ts-morph";

import { isElementsImport, createProjectFromSource, getNearestStatement } from "../shared/index.js";

const TARGET_SPECIFIER = "@reapit/elements/core/table";

const ROW_TODO =
  " TODO: TableRow was migrated to Table.BodyRow. Verify whether this row should be Table.HeaderRow instead.";
const WIDTH_TODO =
  " TODO: width, minWidth, and maxWidth were removed. Verify column sizing using Table `columns` and cell layout.";
const ALIGNMENT_TODO =
  " TODO: alignment uses dynamic expression. Verify justifySelf mapping (left->start, right->end).";

const WIDTH_PROP_NAMES = new Set(["width", "minWidth", "maxWidth"]);

const COMPONENT_SYMBOLS = new Set([
  "Table",
  "TableBody",
  "TableHead",
  "TableHeaderCell",
  "TableRow",
  "TableContainer",
  "TableText",
  "TableToolbar",
  "SingleLineCell",
  "DoubleLineCell",
]);

type Binding = {
  importedName: string;
  localName: string;
};

type TodoMessage = typeof ROW_TODO | typeof WIDTH_TODO | typeof ALIGNMENT_TODO;

function addTodoForNode(
  node: Node,
  todoMessage: TodoMessage,
  stmtCommentMeta: Map<number, { insertPos: number; indent: string; messages: Set<TodoMessage> }>,
  sourceFile: SourceFile,
): void {
  const stmt = getNearestStatement(node);
  if (!stmt) return;

  const triviaStart = stmt.getPos();
  let meta = stmtCommentMeta.get(triviaStart);
  if (!meta) {
    const trivia = sourceFile.getFullText().slice(triviaStart, stmt.getStart());
    const lastNewline = trivia.lastIndexOf("\n");
    const indent = lastNewline === -1 ? "" : trivia.slice(lastNewline + 1);
    const insertPos = triviaStart + (lastNewline === -1 ? 0 : lastNewline + 1);

    meta = { insertPos, indent, messages: new Set<TodoMessage>() };
    stmtCommentMeta.set(triviaStart, meta);
  }

  meta.messages.add(todoMessage);
}

function addTableImport(
  sourceFile: SourceFile,
  tableNamespaceLocalName: string,
  facadePackage?: string,
): void {
  const targetSpecifier = facadePackage ?? TARGET_SPECIFIER;
  let targetDecl = sourceFile
    .getImportDeclarations()
    .find((decl) => decl.getModuleSpecifierValue() === targetSpecifier);

  if (!targetDecl) {
    targetDecl = sourceFile.addImportDeclaration({ moduleSpecifier: targetSpecifier });
  }

  const hasTargetLocal = targetDecl.getNamedImports().some((named) => {
    if (named.getName() !== "Table") return false;
    const localName = named.getAliasNode()?.getText() ?? "Table";
    return localName === tableNamespaceLocalName;
  });

  if (!hasTargetLocal) {
    if (tableNamespaceLocalName === "Table") {
      targetDecl.addNamedImport("Table");
    } else {
      targetDecl.addNamedImport(`Table as ${tableNamespaceLocalName}`);
    }
  }
}

function isJsxIdentifierReference(identifier: Node): boolean {
  const parent = identifier.getParent();
  if (!parent) return false;

  return (
    parent.getKind() === SyntaxKind.JsxOpeningElement ||
    parent.getKind() === SyntaxKind.JsxSelfClosingElement ||
    parent.getKind() === SyntaxKind.JsxClosingElement
  );
}

function analyseLocalSymbolUsage(localNode: import("ts-morph").Identifier): {
  hasJsxUsage: boolean;
  hasOtherUsage: boolean;
} {
  let hasJsxUsage = false;
  let hasOtherUsage = false;

  for (const referencedSymbol of localNode.findReferences()) {
    for (const reference of referencedSymbol.getReferences()) {
      if (reference.isDefinition()) continue;

      const refNode = reference.getNode();
      if (isJsxIdentifierReference(refNode)) {
        hasJsxUsage = true;
      } else {
        hasOtherUsage = true;
      }

      if (hasJsxUsage && hasOtherUsage) {
        return { hasJsxUsage, hasOtherUsage };
      }
    }
  }

  return { hasJsxUsage, hasOtherUsage };
}

function removeTrackedImports(
  sourceFile: SourceFile,
  facadePackage?: string,
): { bindings: Binding[]; needsTableImport: boolean } {
  const bindings: Binding[] = [];
  let needsTableImport = false;
  const alreadyMigratedPath = facadePackage ? null : TARGET_SPECIFIER;

  for (const importDecl of sourceFile.getImportDeclarations().slice()) {
    if (importDecl.wasForgotten()) continue;

    const moduleSpecifier = importDecl.getModuleSpecifierValue();
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue;
    if (alreadyMigratedPath && moduleSpecifier === alreadyMigratedPath) continue;

    const namedImports = importDecl.getNamedImports();
    const namedImportsToRemove: typeof namedImports = [];

    for (const namedImport of namedImports) {
      const importedName = namedImport.getName();
      if (!COMPONENT_SYMBOLS.has(importedName)) continue;

      const localName = namedImport.getAliasNode()?.getText() ?? importedName;
      const localNode = (namedImport.getAliasNode() ?? namedImport.getNameNode()).asKindOrThrow(
        SyntaxKind.Identifier,
      );
      const { hasJsxUsage, hasOtherUsage } = analyseLocalSymbolUsage(localNode);

      if (hasJsxUsage) {
        bindings.push({ importedName, localName });
        if (importedName !== "TableContainer") {
          needsTableImport = true;
        }
      }

      if (!hasOtherUsage) {
        namedImportsToRemove.push(namedImport);
      }
    }

    namedImportsToRemove.forEach((namedImport) => namedImport.remove());

    if (
      namedImportsToRemove.length > 0 &&
      importDecl.getNamedImports().length === 0 &&
      !importDecl.getDefaultImport() &&
      !importDecl.getNamespaceImport()
    ) {
      importDecl.remove();
    }
  }

  return { bindings, needsTableImport };
}

function getTableNamespaceLocalName(
  sourceFile: SourceFile,
  bindings: Binding[],
  facadePackage?: string,
): string {
  const targetSpecifier = facadePackage ?? TARGET_SPECIFIER;
  const targetImport = sourceFile
    .getImportDeclarations()
    .find((importDecl) => importDecl.getModuleSpecifierValue() === targetSpecifier);

  if (targetImport) {
    const tableImport = targetImport
      .getNamedImports()
      .find((namedImport) => namedImport.getName() === "Table");
    if (tableImport) {
      return tableImport.getAliasNode()?.getText() ?? "Table";
    }
  }

  const tableBinding = bindings.find((binding) => binding.importedName === "Table");
  return tableBinding?.localName ?? "Table";
}

function mapAlignmentInitialiser(initialiserText?: string): {
  initialiserText?: string;
  needsTodo: boolean;
} {
  if (!initialiserText) {
    return { initialiserText, needsTodo: false };
  }

  const mapLiteral = (value: string): string | undefined => {
    if (value === "left") return "start";
    if (value === "right") return "end";
    if (value === "center") return "center";
    return undefined;
  };

  if (
    (initialiserText.startsWith('"') && initialiserText.endsWith('"')) ||
    (initialiserText.startsWith("'") && initialiserText.endsWith("'"))
  ) {
    const value = initialiserText.slice(1, -1);
    const mapped = mapLiteral(value);
    if (!mapped) {
      return { initialiserText, needsTodo: false };
    }

    return { initialiserText: `"${mapped}"`, needsTodo: false };
  }

  const expressionMatch = initialiserText.match(/^\{\s*(['"])(left|right|center)\1\s*\}$/);
  if (expressionMatch) {
    const quote = expressionMatch[1];
    const value = expressionMatch[2];
    const mapped = mapLiteral(value);
    if (!mapped) {
      return { initialiserText, needsTodo: false };
    }

    return { initialiserText: `{${quote}${mapped}${quote}}`, needsTodo: false };
  }

  return { initialiserText, needsTodo: true };
}

function getComponentReplacement(
  importedName: string,
  tableNamespaceLocalName: string,
): string | undefined {
  if (importedName === "Table") return tableNamespaceLocalName;
  if (importedName === "TableBody") return `${tableNamespaceLocalName}.Body`;
  if (importedName === "TableHead") return `${tableNamespaceLocalName}.Head`;
  if (importedName === "TableHeaderCell") return `${tableNamespaceLocalName}.HeaderCell`;
  if (importedName === "TableRow") return `${tableNamespaceLocalName}.BodyRow`;
  if (importedName === "TableText") return `${tableNamespaceLocalName}.PrimaryData`;
  if (importedName === "TableToolbar") return `${tableNamespaceLocalName}.Toolbar`;
  if (importedName === "SingleLineCell") return `${tableNamespaceLocalName}.BodyCell`;
  return undefined;
}

function renamePropsForElement(
  element: import("ts-morph").JsxOpeningElement | import("ts-morph").JsxSelfClosingElement,
  options: {
    renameAlignment?: boolean;
    renameToolbarProps?: boolean;
    removeWidthProps?: boolean;
    sourceFile: SourceFile;
    todoMeta: Map<number, { insertPos: number; indent: string; messages: Set<TodoMessage> }>;
  },
): void {
  let widthFound = false;

  for (const attr of element.getAttributes().slice()) {
    if (attr.getKind() !== SyntaxKind.JsxAttribute) continue;
    const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute);
    const name = jsxAttr.getNameNode().getText();

    if (options.renameAlignment && name === "alignment") {
      const mapped = mapAlignmentInitialiser(getAttributeInitialiserText(jsxAttr));
      const attributeValue = mapped.initialiserText ? `=${mapped.initialiserText}` : "";
      jsxAttr.replaceWithText(`justifySelf${attributeValue}`);
      if (mapped.needsTodo) {
        addTodoForNode(element, ALIGNMENT_TODO, options.todoMeta, options.sourceFile);
      }
      continue;
    }

    if (options.renameToolbarProps) {
      if (name === "description") {
        jsxAttr.getNameNode().replaceWithText("leftContent");
        continue;
      }
      if (name === "actions") {
        jsxAttr.getNameNode().replaceWithText("rightContent");
        continue;
      }
    }

    if (options.removeWidthProps && WIDTH_PROP_NAMES.has(name)) {
      widthFound = true;
      jsxAttr.remove();
    }
  }

  if (widthFound) {
    addTodoForNode(element, WIDTH_TODO, options.todoMeta, options.sourceFile);
  }
}

function getAttributeInitialiserText(
  attribute: import("ts-morph").JsxAttribute,
): string | undefined {
  const initialiser = attribute.getInitializer();
  return initialiser ? initialiser.getText() : undefined;
}

function getAttributeValueAsChild(attribute: import("ts-morph").JsxAttribute): string {
  const initialiser = attribute.getInitializer();
  if (!initialiser) {
    return "{true}";
  }

  if (Node.isStringLiteral(initialiser)) {
    return `{${JSON.stringify(initialiser.getLiteralText())}}`;
  }

  return initialiser.getText();
}

function buildDoubleLineReplacement(
  node: import("ts-morph").JsxElement | import("ts-morph").JsxSelfClosingElement,
  tableNamespaceLocalName: string,
): {
  replacement: string;
  hadWidthProps: boolean;
  hasDynamicAlignment: boolean;
} {
  const opening = Node.isJsxSelfClosingElement(node) ? node : node.getOpeningElement();

  const bodyCellAttrs: string[] = [];
  const doubleLineAttrs: string[] = [];
  let firstLineAttribute: import("ts-morph").JsxAttribute | undefined;
  let hadWidthProps = false;
  let hasDynamicAlignment = false;

  for (const attr of opening.getAttributes()) {
    if (attr.getKind() === SyntaxKind.JsxSpreadAttribute) {
      bodyCellAttrs.push(attr.getText());
      continue;
    }

    const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute);
    const name = jsxAttr.getNameNode().getText();

    if (name === "alignment") {
      const mapped = mapAlignmentInitialiser(getAttributeInitialiserText(jsxAttr));
      bodyCellAttrs.push(
        mapped.initialiserText ? `justifySelf=${mapped.initialiserText}` : "justifySelf",
      );
      hasDynamicAlignment = hasDynamicAlignment || mapped.needsTodo;
      continue;
    }

    if (WIDTH_PROP_NAMES.has(name)) {
      hadWidthProps = true;
      continue;
    }

    if (name === "mediaItem") {
      const initialiser = getAttributeInitialiserText(jsxAttr);
      doubleLineAttrs.push(initialiser ? `mediaItem=${initialiser}` : "mediaItem");
      continue;
    }

    if (name === "secondLine") {
      const initialiser = getAttributeInitialiserText(jsxAttr);
      doubleLineAttrs.push(initialiser ? `supplementaryData=${initialiser}` : "supplementaryData");
      continue;
    }

    if (name === "firstLine") {
      firstLineAttribute = jsxAttr;
      continue;
    }

    bodyCellAttrs.push(jsxAttr.getText());
  }

  let primaryChildText = "";
  if (firstLineAttribute) {
    primaryChildText = getAttributeValueAsChild(firstLineAttribute);
  } else if (Node.isJsxElement(node)) {
    primaryChildText = node
      .getJsxChildren()
      .map((child) => child.getText())
      .join("");
  }

  const bodyCellAttrText = bodyCellAttrs.length > 0 ? ` ${bodyCellAttrs.join(" ")}` : "";
  const doubleLineAttrText = doubleLineAttrs.length > 0 ? ` ${doubleLineAttrs.join(" ")}` : "";

  return {
    replacement: `<${tableNamespaceLocalName}.BodyCell${bodyCellAttrText}><${tableNamespaceLocalName}.DoubleLineLayout${doubleLineAttrText}>${primaryChildText}</${tableNamespaceLocalName}.DoubleLineLayout></${tableNamespaceLocalName}.BodyCell>`,
    hadWidthProps,
    hasDynamicAlignment,
  };
}

function transformDoubleLineCells(
  sourceFile: SourceFile,
  localNames: Set<string>,
  tableNamespaceLocalName: string,
  todoMeta: Map<number, { insertPos: number; indent: string; messages: Set<TodoMessage> }>,
): void {
  if (localNames.size === 0) return;

  const elements: Array<import("ts-morph").JsxElement | import("ts-morph").JsxSelfClosingElement> =
    [];
  elements.push(...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement));

  for (const jsxElement of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    if (!Node.isJsxOpeningElement(jsxElement.getOpeningElement())) continue;
    elements.push(jsxElement);
  }

  for (const element of elements) {
    const tagName = Node.isJsxSelfClosingElement(element)
      ? element.getTagNameNode().getText()
      : element.getOpeningElement().getTagNameNode().getText();

    if (!localNames.has(tagName)) continue;

    const { replacement, hadWidthProps, hasDynamicAlignment } = buildDoubleLineReplacement(
      element,
      tableNamespaceLocalName,
    );
    if (hadWidthProps) {
      addTodoForNode(element, WIDTH_TODO, todoMeta, sourceFile);
    }
    if (hasDynamicAlignment) {
      addTodoForNode(element, ALIGNMENT_TODO, todoMeta, sourceFile);
    }

    element.replaceWithText(replacement);
  }
}

function transformJsx(
  sourceFile: SourceFile,
  bindings: Binding[],
  tableNamespaceLocalName: string,
  todoMeta: Map<number, { insertPos: number; indent: string; messages: Set<TodoMessage> }>,
): void {
  const localNamesByImported = new Map<string, Set<string>>();
  for (const binding of bindings) {
    const current = localNamesByImported.get(binding.importedName) ?? new Set<string>();
    current.add(binding.localName);
    localNamesByImported.set(binding.importedName, current);
  }

  transformDoubleLineCells(
    sourceFile,
    localNamesByImported.get("DoubleLineCell") ?? new Set<string>(),
    tableNamespaceLocalName,
    todoMeta,
  );

  const openingElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ];

  const localToImported = new Map<string, string>();
  for (const binding of bindings) {
    localToImported.set(binding.localName, binding.importedName);
  }

  for (const element of openingElements) {
    const tagNameNode = element.getTagNameNode();
    const tagName = tagNameNode.getText();
    const importedName = localToImported.get(tagName);
    if (!importedName) continue;

    if (importedName === "DoubleLineCell") {
      continue;
    }

    if (importedName === "TableContainer") {
      tagNameNode.replaceWithText("div");
      if (Node.isJsxOpeningElement(element)) {
        const parent = element.getParentIfKind(SyntaxKind.JsxElement);
        const closingTag = parent?.getClosingElement();
        if (
          closingTag &&
          localToImported.get(closingTag.getTagNameNode().getText()) === "TableContainer"
        ) {
          closingTag.getTagNameNode().replaceWithText("div");
        }
      }
      continue;
    }

    const replacementName = getComponentReplacement(importedName, tableNamespaceLocalName);
    if (replacementName) {
      tagNameNode.replaceWithText(replacementName);
      if (Node.isJsxOpeningElement(element)) {
        const parent = element.getParentIfKind(SyntaxKind.JsxElement);
        const closingTag = parent?.getClosingElement();
        if (
          closingTag &&
          localToImported.get(closingTag.getTagNameNode().getText()) === importedName
        ) {
          closingTag.getTagNameNode().replaceWithText(replacementName);
        }
      }
    }

    if (importedName === "TableRow") {
      addTodoForNode(element, ROW_TODO, todoMeta, sourceFile);
    }

    if (importedName === "TableHeaderCell" || importedName === "SingleLineCell") {
      renamePropsForElement(element, {
        renameAlignment: true,
        removeWidthProps: true,
        sourceFile,
        todoMeta,
      });
      continue;
    }

    if (importedName === "TableToolbar") {
      renamePropsForElement(element, {
        renameToolbarProps: true,
        sourceFile,
        todoMeta,
      });
    }
  }
}

function insertTodoComments(
  sourceFile: SourceFile,
  stmtCommentMeta: Map<number, { insertPos: number; indent: string; messages: Set<TodoMessage> }>,
): void {
  const entries = [...stmtCommentMeta.values()].sort((a, b) => b.insertPos - a.insertPos);

  const priority: Record<TodoMessage, number> = {
    [ROW_TODO]: 0,
    [WIDTH_TODO]: 1,
    [ALIGNMENT_TODO]: 2,
  };

  for (const { insertPos, indent, messages } of entries) {
    const orderedMessages = [...messages].sort((a, b) => priority[a] - priority[b]);
    const commentText = orderedMessages.map((message) => `${indent}//${message}\n`).join("");
    sourceFile.insertText(insertPos, commentText);
  }
}

export default function transform(
  source: string,
  filePath: string = "file.tsx",
  options?: { facadePackage?: string },
): string {
  if (
    !source.includes("Table") &&
    !source.includes("SingleLineCell") &&
    !source.includes("DoubleLineCell")
  ) {
    return source;
  }

  const sourceFile = createProjectFromSource(source, filePath);
  const facadePackage = options?.facadePackage;

  const { bindings, needsTableImport } = removeTrackedImports(sourceFile, facadePackage);
  if (bindings.length === 0) {
    return source;
  }

  const tableNamespaceLocalName = getTableNamespaceLocalName(sourceFile, bindings, facadePackage);

  if (needsTableImport) {
    addTableImport(sourceFile, tableNamespaceLocalName, facadePackage);
  }

  const stmtCommentMeta = new Map<
    number,
    { insertPos: number; indent: string; messages: Set<TodoMessage> }
  >();
  transformJsx(sourceFile, bindings, tableNamespaceLocalName, stmtCommentMeta);
  insertTodoComments(sourceFile, stmtCommentMeta);

  return sourceFile.getFullText();
}
