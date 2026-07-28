import { css } from "@linaria/core";
import { styled } from "@linaria/react";

export const elTopBarNavIconItem = css`
  @layer elements.main {
    position: relative;
    display: inline-flex;
    padding: var(--spacing-2);
    justify-content: center;
    align-items: center;
    gap: var(--spacing-none);
    border-radius: var(--comp-navigation-border-radius-nav_icon);
    background: var(--comp-navigation-colour-fill-nav_icon-default);
    border: var(--border-none);
    color: var(--comp-navigation-colour-icon-nav_icon-default);
    outline: none;

    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-focus);
    }

    &:hover {
      cursor: pointer;
      background: var(--comp-navigation-colour-fill-nav_icon-hover);
    }

    /* NOTE: we only apply the current page styles to anchor-based nav icon items. */
    &:is(a)[aria-current="page"] {
      color: var(--comp-navigation-colour-icon-nav_icon-select);
      background: var(--comp-navigation-colour-fill-nav_icon-select);
    }
  }
`;

export const ElTopBarNavIconItemIcon = styled.span`
  @layer elements.main {
    color: inherit;
    width: var(--icon_size-lg);
    height: var(--icon_size-lg);
  }
`;

// TODO: This should be handled by a Badge component. All our NavIconItem should be responsible for is
// positioning the badge correctly.
export const ElTopBarNavIconItemBadge = styled.span`
  @layer elements.main {
    position: absolute;
    right: 5px;
    top: 5px;
    width: var(--size-2);
    height: var(--size-2);
    background-color: var(--comp-navigation-colour-fill-notification_badge);
    border-radius: 100%;
  }
`;
