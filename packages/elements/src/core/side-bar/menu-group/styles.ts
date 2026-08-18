import { css } from "@linaria/core";
import { styled } from "@linaria/react";

import { font } from "#src/utils/font";

import { ElSideBarMenuItemIcon, ElSideBarMenuItemLabel } from "../menu-item/styles";

export const elSideBarMenuGroup = css`
  @layer elements.main {
    border-radius: var(--comp-navigation-border-radius-menu_item);
    width: 100%;

    &:open,
    &[open],
    &[data-is-active="true"],
    &:has([aria-current="page"]) {
      background: var(--comp-navigation-colour-fill-sidebar-select);
    }
  }
`;

// NOTE: This is designed to work in conjunction with `elSideBarMenuItem`
export const elSideBarMenuGroupSummary = css`
  @layer elements.main {
    grid-template-areas: "icon label dropdown";
    grid-template-columns: auto 1fr auto;
    overflow: hidden;

    cursor: pointer;
  }
`;

export const ElSideBarMenuGroupSummaryIcon = styled(ElSideBarMenuItemIcon)`
  @layer elements.main {
    :where(details[data-is-active="true"], details:has([aria-current="page"])) & {
      color: var(--comp-navigation-colour-icon-sidebar-select);
    }
  }
`;

export const ElSideBarMenuGroupSummaryLabel = styled(ElSideBarMenuItemLabel)`
  @layer elements.main {
    :where(details[data-is-active="true"], details:has([aria-current="page"])) & {
      color: var(--comp-navigation-colour-text-sidebar-select);
      ${font("sm", "medium")}
    }
  }
`;

export const ElSideBarMenuGroupSummaryDropdownIcon = styled.span`
  @layer elements.main {
    grid-area: dropdown;

    display: inline-flex;
    align-items: center;

    color: var(--comp-navigation-colour-icon-sidebar-default);

    /* NOTE: We don't want the padding to reduce the content size as we want the icons to be
     * exactly --icon_size-sm */
    box-sizing: content-box;
    padding: var(--spacing-1);

    width: var(--icon_size-sm);
    height: var(--icon_size-sm);

    details:open & {
      transform: rotate(180deg);
    }
  }
`;
