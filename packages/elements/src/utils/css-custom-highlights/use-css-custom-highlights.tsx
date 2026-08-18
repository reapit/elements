import { useEffect } from "react";
import type { RefObject } from "react";

import { highlight } from "./highlight";

/**
 * Highlights each occurrence of `query` within the text content of the element referenced by `ref`, using the
 * [CSS Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_custom_highlight_API).
 *
 * The highlight is applied and re-applied whenever `name`, `query`, or `ref` change, and is removed
 * automatically when the component unmounts. As with other ref-based utilities, the element must already be
 * attached to `ref.current` by the time this hook runs — attaching it later (e.g. via conditional rendering)
 * without also changing `name` or `query` will not re-trigger the highlight.
 *
 * Matching happens within each individual text node, not across the element's combined text content — a
 * `query` split across nested elements will not be found even though the concatenated text contains it.
 *
 * No-ops if the browser doesn't support the CSS Custom Highlight API.
 */
export function useCSSCustomHighlights(
  /** The name to register the highlight under — must be unique across the page and match the corresponding `::highlight()` CSS selector. */
  name: string,
  /** The text to search for within the referenced element. Matching is case-insensitive. */
  query: string,
  /** A ref attached to the element whose text content should be searched for `query`. */
  ref: RefObject<HTMLElement>,
) {
  useEffect(() => {
    if (ref.current) {
      const cleanup = highlight(name, query, ref.current);
      return cleanup;
    }
  }, [name, ref, query]);
}
