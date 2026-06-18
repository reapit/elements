import { css } from '@linaria/core'
import { ElTopBarMenuDrawerMenuItemBadge, ElTopBarMenuDrawerMenuItemLabel } from '../menu-item/styles'
import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const elTopBarMenuDrawerMenuGroup = css`
  @layer elements.main {
    border-radius: var(--comp-navigation-border-radius-nav_item-mobile);
    width: 100%;

    &:open,
    &[open],
    &[data-is-active='true'],
    &:has([aria-current='page']) {
      background: var(--comp-navigation-colour-fill-mobile_nav-expanded);
    }
  }
`

// NOTE: This is designed to work in conjunction with `elTopBarMenuDrawerMenuItem`
export const elTopBarMenuDrawerMenuGroupSummary = css`
  @layer elements.main {
    grid-template-areas: 'label badge dropdown';
    grid-template-columns: 1fr minmax(0, auto) auto;
    overflow: hidden;

    cursor: pointer;
  }
`

export const ElTopBarMenuDrawerMenuGroupSummaryLabel = styled(ElTopBarMenuDrawerMenuItemLabel)`
  @layer elements.main {
    :where(details[data-is-active='true'], details:has([aria-current='page'])) & {
      ${font('base', 'medium')}
      color: var(--comp-navigation-colour-text-mobile_nav-select);
    }
  }
`

export const ElTopBarMenuDrawerMenuGroupSummaryBadge = styled(ElTopBarMenuDrawerMenuItemBadge)`
  @layer elements.main {
    details:open & {
      display: none;
    }
  }
`

export const ElTopBarMenuDrawerMenuGroupSummaryDropdownIcon = styled.span`
  @layer elements.main {
    grid-area: dropdown;

    display: inline-flex;
    align-items: center;

    color: var(--comp-navigation-colour-icon-sidebar-default);

    /* Use content-box sizing to prevent the padding from affecting the icon's size */
    box-sizing: content-box;
    width: var(--icon_size-sm);
    height: var(--icon_size-sm);
    padding-inline: var(--spacing-1) 0;

    details:open & {
      padding-inline: 0 var(--spacing-1);
      transform: rotate(180deg);
    }
  }
`
