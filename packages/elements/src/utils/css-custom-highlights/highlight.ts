/**
 * Highlights each occurrence of `query` within `element`'s text content using the
 * [CSS Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_custom_highlight_API).
 *
 * `name` is registered directly in the global `CSS.highlights` registry, so it must be unique across the
 * page; reusing a `name` across multiple calls will cause them to overwrite each other's highlights, and
 * the corresponding `::highlight(name)` CSS selector must use the exact same string.
 *
 * Matching happens within each individual text node, not across `element`'s combined `textContent`; a
 * `query` split across nested elements (and therefore across separate text nodes) will not be found even
 * though the concatenated text content contains it.
 *
 * Returns a cleanup function that removes the highlight from the registry, or `undefined` if the browser
 * doesn't support the CSS Custom Highlight API or the query is empty.
 */
export function highlight(
  /** The name to register the highlight under in `CSS.highlights`: must match the `::highlight()` selector, and be unique across the page. */
  name: string,
  /** The text to search for within `element`. Matching is case-insensitive. */
  query: string,
  /** The element whose text content should be searched for `query`. */
  element: HTMLElement,
): void | (() => void) {
  // Check for browser support.
  if (!globalThis.CSS?.highlights) {
    return;
  }

  // Clean-up the search query and bail-out before walking the DOM if it's empty, clearing any
  // previously-registered highlight under `name` so the function is idempotent regardless of caller.
  const queryText = query.trim().toLowerCase();
  if (!queryText) {
    globalThis.CSS.highlights.delete(name);
    return;
  }

  const treeWalker = element.ownerDocument.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const textNodes: Node[] = [];

  while (treeWalker.nextNode()) {
    textNodes.push(treeWalker.currentNode);
  }

  // Iterate over all text nodes and find matches.
  const ranges = textNodes
    .filter((node) => node.textContent)
    .map((node) => {
      const text = node.textContent!.toLowerCase();
      const indices: number[] = [];
      let startPos = 0;
      while (startPos < text.length) {
        const index = text.indexOf(queryText, startPos);
        if (index === -1) break;
        indices.push(index);
        startPos = index + queryText.length;
      }

      // Create a range object for each instance of queryText we found in the text node.
      return indices.map((index) => {
        const range = new Range();
        range.setStart(node, index);
        range.setEnd(node, index + queryText.length);
        return range;
      });
    });

  // Create a Highlight object for the ranges.
  const searchResultsHighlight = new Highlight(...ranges.flat());

  // Register the Highlight object in the registry.
  globalThis.CSS.highlights.set(name, searchResultsHighlight);

  // Return cleanup function
  return () => {
    globalThis.CSS?.highlights.delete(name);
  };
}
