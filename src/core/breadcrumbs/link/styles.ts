import { styled } from "@linaria/react";

import { font } from "#src/utils/font";

export const ElBreadcrumbLink = styled.a`
  @layer elements.main {
    color: var(--colour-text-secondary);

    ${font("sm", "regular")}

    cursor: pointer;
    text-decoration: none;

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ElBreadcrumbLinkContent = styled.span`
  @layer elements.main {
    color: inherit;
    font: inherit;
  }
`;
