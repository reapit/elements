export interface FrontMatter {
  description?: string;
  body: string;
}

/**
 * Parses front matter from a markdown file.
 * Front matter should be in YAML format between --- delimiters.
 *
 * @param content - The raw markdown content
 * @returns Parsed front matter and body
 *
 * @example
 * ```
 * const content = `---
 * description: My description
 * ---
 * # My Content
 * `
 * const { description, body } = parseFrontMatter(content)
 * // description = "My description"
 * // body = "# My Content"
 * ```
 */
export function parseFrontMatter(content: string): FrontMatter {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { body: content };

  const frontMatter = match[1];
  const body = match[2];
  const descMatch = frontMatter.match(/^description:\s*(.+)$/m);

  return {
    description: descMatch?.[1],
    body: body.trim(),
  };
}
