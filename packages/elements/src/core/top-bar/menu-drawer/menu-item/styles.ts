import { css } from "@linaria/core";
import { styled } from "@linaria/react";

import { font } from "#src/utils/font";

export const elTopBarMenuDrawerMenuItem = css`
  @layer elements.main {
    display: grid;
    align-items: center;
    justify-content: start;
    grid-template-areas: "label badge";
    grid-template-columns: 1fr minmax(0, auto);

    padding: var(--spacing-2) var(--spacing-4);
    width: 100%;

    cursor: pointer;

    text-decoration: none;
    border: none;
    background: transparent;
    text-align: left;
    border-radius: var(--comp-navigation-border-radius-nav_item-mobile);

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

export const ElTopBarMenuDrawerMenuItemLabel = styled.span`
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

// TODO: This should be handled by a Badge component. All our menu item should be responsible for is
// positioning the badge correctly.
export const ElTopBarMenuDrawerMenuItemBadge = styled.span`
  @layer elements.main {
    grid-area: badge;

    width: var(--size-2);
    height: var(--size-2);
    background-color: var(--comp-navigation-colour-fill-notification_badge);
    border-radius: 100%;
    /* Use margin instead of padding to keep the badge's content box square */
    margin-inline-start: var(--spacing-2);
  }
`;
