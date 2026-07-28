import { styled } from "@linaria/react";

import { font } from "#src/utils/font";

export type LinkSize = "base" | "sm" | "xs";
export type LinkVariant = "primary" | "secondary" | "reversed";

interface ElLinkProps {
  "data-is-quiet"?: boolean;
  "data-size"?: LinkSize;
  "data-variant"?: LinkVariant;
}

export const ElLink = styled.a<ElLinkProps>`
  @layer elements.main {
    cursor: pointer;

    &,
    &[data-is-quiet="false"] {
      text-decoration: underline;
      text-decoration-style: dotted;
      text-underline-offset: 25%;
    }

    &[data-is-quiet="true"] {
      text-decoration: none;
    }

    &,
    &[data-size="base"] {
      ${font("base", "regular")}
    }

    &[data-size="sm"] {
      ${font("sm", "medium")}
    }

    &[data-size="xs"] {
      ${font("xs", "medium")}
    }

    &,
    &[data-variant="primary"] {
      color: var(--colour-text-action);
    }

    &[data-variant="secondary"] {
      color: var(--colour-text-secondary);
    }

    &[data-variant="reversed"] {
      color: var(--colour-text-white);
    }

    &:hover {
      text-decoration: underline;
      text-decoration-style: solid;
    }

    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }
  }
`;
