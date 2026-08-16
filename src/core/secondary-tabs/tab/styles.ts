import { styled } from "@linaria/react";

import { font } from "#src/utils/font";

interface ElSecondaryTabProps {
  "aria-current": "page" | false;
  "aria-disabled"?: boolean | "true" | "false";
}

export const ElSecondaryTab = styled.a<ElSecondaryTabProps>`
  @layer elements.main {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    height: var(--size-6);
    width: min-content;

    color: var(--comp-tab-colour-text-secondary-default);

    cursor: pointer;
    text-decoration: none;

    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }

    &:hover:not([aria-disabled="true"]) {
      color: var(--comp-tab-colour-text-secondary-hover);
    }

    &[aria-current="page"]:not([aria-disabled="true"]) {
      color: var(--comp-tab-colour-text-secondary-selected);
    }

    &[aria-disabled="true"] {
      color: var(--comp-tab-colour-text-secondary-disabled);
      cursor: not-allowed;
    }
  }
`;

export const ElSecondaryTabLabel = styled.span`
  @layer elements.main {
    white-space: nowrap;
    ${font("base", "medium")}

    color: inherit;
  }
`;
