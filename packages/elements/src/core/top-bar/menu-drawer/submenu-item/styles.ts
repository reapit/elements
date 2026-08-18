import { css } from "@linaria/core";
import { styled } from "@linaria/react";

import { font } from "#src/utils/font";

export const elTopBarMenuDrawerSubmenuItem = css`
  @layer elements.main {
    display: grid;
    align-items: center;
    justify-content: start;
    grid-template-areas: "label badge";
    grid-template-columns: 1fr minmax(0, auto);

    padding: var(--spacing-2) var(--spacing-4);
    width: 100%;

    text-decoration: none;
    border: none;
    background: transparent;
    text-align: left;
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background: var(--colour-fill-neutral-light);
    }

    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }
  }
`;

export const ElTopBarMenuDrawerSubmenuItemLabel = styled.span`
  @layer elements.main {
    grid-area: label;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    color: var(--comp-navigation-colour-text-mobile_nav-default);
    ${font("base", "regular")}

    [aria-current="page"] > & {
      ${font("base", "medium")}
      color: var(--comp-navigation-colour-text-mobile_nav-select);
    }
  }
`;
