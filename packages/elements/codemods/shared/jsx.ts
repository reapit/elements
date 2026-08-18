import { JsxOpeningElement, JsxSelfClosingElement, Node, SourceFile, SyntaxKind } from "ts-morph";

/**
 * Returns all JSX opening and self-closing elements in `sourceFile` whose tag
 * name is present in `tagNames`.
 *
 * @param sourceFile - The ts-morph source file to search.
 * @param tagNames - The set of tag name strings to match against.
 */
export function getJsxElements(
  sourceFile: SourceFile,
  tagNames: Set<string>,
): Array<JsxOpeningElement | JsxSelfClosingElement> {
  const elements: Array<JsxOpeningElement | JsxSelfClosingElement> = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ];

  return elements.filter((element) => tagNames.has(element.getTagNameNode().getText()));
}

/**
 * Returns `true` if any JSX opening or self-closing element in `sourceFile`
 * has a tag name present in `tagNames`. Useful for early-exit decisions before
 * performing more expensive AST work.
 *
 * @param sourceFile - The ts-morph source file to search.
 * @param tagNames - The set of tag name strings to match against.
 */
export function hasJsxUsage(sourceFile: SourceFile, tagNames: Set<string>): boolean {
  const openingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement);
  for (const element of openingElements) {
    if (tagNames.has(element.getTagNameNode().getText())) return true;
  }

  const selfClosingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);
  for (const element of selfClosingElements) {
    if (tagNames.has(element.getTagNameNode().getText())) return true;
  }

  return false;
}

/**
 * Synchronises the closing tag of a `JsxElement` after its opening tag has
 * been renamed.
 *
 * When `element` is a `JsxOpeningElement`, this function walks up to the
 * enclosing `JsxElement` and renames its closing tag from `oldName` to
 * `newName` — but only if the closing tag currently reads `oldName`. If the
 * element is self-closing, no action is taken (there is no closing tag to
 * sync).
 *
 * @param element - The opening or self-closing element whose closing tag
 *   should be synchronised.
 * @param oldName - The tag name the closing element is expected to have before
 *   renaming.
 * @param newName - The tag name to write to the closing element.
 */
export function syncClosingTag(
  element: JsxOpeningElement | JsxSelfClosingElement,
  oldName: string,
  newName: string,
): void {
  if (element.getKind() !== SyntaxKind.JsxOpeningElement) return;

  const parent = element.getParent();
  if (parent?.getKind() !== SyntaxKind.JsxElement) return;

  const jsxElement = parent.asKind(SyntaxKind.JsxElement);
  const closingTag = jsxElement?.getClosingElement();

  if (closingTag?.getTagNameNode().getText() === oldName) {
    closingTag.getTagNameNode().replaceWithText(newName);
  }
}

/**
 * Returns `true` if a TODO comment inserted adjacent to `element` should use
 * JSX comment syntax (`{/* ... *\/}`), or `false` if plain JS comment syntax
 * (`// ...`) is appropriate.
 *
 * The decision is made from the *outer* JSX node:
 * - For a self-closing element, the element itself is the outer node.
 * - For an opening element, the outer node is its parent `JsxElement` wrapper.
 *
 * If that outer node is a direct child of a `JsxElement` or `JsxFragment`,
 * the element is inside JSX content and requires JSX comment syntax. Otherwise
 * (e.g. the parent is a `ReturnStatement`, `VariableDeclaration`, or
 * `JsxExpression`) plain JS syntax is correct.
 *
 * @param element - The opening or self-closing element to inspect.
 */
export function shouldUseJsxComment(element: JsxOpeningElement | JsxSelfClosingElement): boolean {
  // For a non-self-closing tag the opening element's immediate parent is the
  // JsxElement wrapper. Use that as the outer node so we check *its* parent
  // rather than the opening element's parent, which is always JsxElement.
  const outerNode: Node =
    element.getKind() === SyntaxKind.JsxOpeningElement ? (element.getParent() ?? element) : element;

  const outerParent = outerNode.getParent();
  if (!outerParent) return false;

  const parentKind = outerParent.getKind();
  return parentKind === SyntaxKind.JsxElement || parentKind === SyntaxKind.JsxFragment;
}
