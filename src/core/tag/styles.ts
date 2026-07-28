import { styled } from "@linaria/react";
import type { CSSProperties } from "react";

import { font } from "#src/utils/font";

interface ElTagCSSProperties extends CSSProperties {
  /** Used to determine the maximum width of the tag because the browser does not support
   * [CSS' advanced attr() syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/attr) */
  "--tag-max_width"?: `var(--size-${string})`;
}

interface ElTagProps {
  style: ElTagCSSProperties;
}

export const ElTag = styled.span<ElTagProps>`
  @layer elements.main {
    display: inline-grid;
    align-items: center;
    max-width: var(--tag-max_width, auto);
    width: fit-content;

    padding: var(--spacing-half) var(--spacing-3);

    border-radius: var(--comp-tag-border-radius);
    background: var(--comp-tag-colour-fill);
    color: var(--comp-tag-colour-text);

    ${font("xs", "medium")}
  }
`;

interface ElTagLabelProps {
  "data-overflow": "truncate" | undefined;
}

export const ElTagLabel = styled.span<ElTagLabelProps>`
  @layer elements.main {
    max-width: var(--tag-max_width);

    font: inherit;
    text-align: left;
    white-space: nowrap;

    &[data-overflow="truncate"] {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
