import type { SourceFile } from 'ts-morph'
import { Node } from 'ts-morph'

/**
 * Walks up the AST from `node` to find the nearest ancestor (or the node
 * itself) that satisfies `Node.isStatement()`.
 *
 * Returns `undefined` if no statement ancestor exists.
 *
 * @param node - The starting AST node.
 */
export function getNearestStatement(node: Node): Node | undefined {
  let current: Node | undefined = node
  while (current) {
    if (Node.isStatement(current)) return current
    current = current.getParent()
  }
  return undefined
}

/**
 * Collects the positions at which line comments should be inserted, one per
 * containing statement, for the given list of AST nodes.
 *
 * For each node the function:
 * 1. Finds the nearest containing statement via `getNearestStatement`.
 * 2. Skips the node if an entry for that statement already exists
 *    (de-duplication keyed by `stmt.getPos()`).
 * 3. Computes `insertPos` and `indent` from the statement's leading trivia:
 *    - `triviaStart` = `stmt.getPos()`
 *    - `trivia` = text between `triviaStart` and `stmt.getStart()`
 *    - `lastNewline` = last `\n` index within `trivia`
 *    - `indent` = everything after that newline (empty string when absent)
 *    - `insertPos` = `triviaStart` offset to just after the last newline
 * 4. Stores `{ insertPos, indent }` keyed by `triviaStart`.
 *
 * **Important:** Comments must be inserted after all AST mutations are
 * complete. Both `triviaStart` (from `stmt.getPos()`) and `stmt.getStart()`
 * are queried against the post-mutation state, so they remain consistent with
 * the post-mutation text returned by `getFullText()`. Earlier mutations scoped
 * inside JSX element boundaries cannot shift the byte offset of the
 * statement's leading trivia.
 *
 * @param sourceFile - The ts-morph source file being transformed.
 * @param nodes - The AST nodes whose containing statements should be annotated.
 * @returns A map from `triviaStart` to `{ insertPos, indent }`.
 */
export function collectStatementCommentPositions(
  sourceFile: SourceFile,
  nodes: Node[],
): Map<number, { insertPos: number; indent: string }> {
  const stmtCommentMeta = new Map<number, { insertPos: number; indent: string }>()

  for (const node of nodes) {
    const stmt = getNearestStatement(node)
    if (!stmt) continue

    const triviaStart = stmt.getPos()
    if (stmtCommentMeta.has(triviaStart)) continue

    const trivia = sourceFile.getFullText().slice(triviaStart, stmt.getStart())
    const lastNewline = trivia.lastIndexOf('\n')
    const indent = lastNewline === -1 ? '' : trivia.slice(lastNewline + 1)
    const insertPos = triviaStart + (lastNewline === -1 ? 0 : lastNewline + 1)

    stmtCommentMeta.set(triviaStart, { insertPos, indent })
  }

  return stmtCommentMeta
}

/**
 * Inserts a line comment immediately before each statement recorded in
 * `positions`.
 *
 * Entries are sorted by `insertPos` in descending order so that inserting
 * text at later positions does not shift the byte offsets of earlier ones.
 * Each comment is written as `${indent}//${comment}\n`.
 *
 * The `comment` parameter should include the leading space when one is
 * desired (e.g. `' TODO: some message'`).
 *
 * @param sourceFile - The ts-morph source file to modify.
 * @param positions - The map returned by `collectStatementCommentPositions`.
 * @param comment - The comment text to insert (including any leading space).
 */
export function insertLineComments(
  sourceFile: SourceFile,
  positions: Map<number, { insertPos: number; indent: string }>,
  comment: string,
): void {
  const sortedEntries = [...positions.values()].sort((a, b) => b.insertPos - a.insertPos)
  for (const { insertPos, indent } of sortedEntries) {
    sourceFile.insertText(insertPos, `${indent}//${comment}\n`)
  }
}
