import { css } from '@linaria/core'
import { ElTopBarMenuDrawerMenuItemBadge, ElTopBarMenuDrawerMenuItemLabel } from '../menu-item'
import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const elTopBarMenuDrawerMenuGroup = css`
  border-radius: var(--comp-navigation-border-radius-nav_item-mobile);
  width: 100%;

  &:open,
  &[open],
  &[data-is-active='true'],
  &:has([aria-current='page']) {
    background: var(--comp-navigation-colour-fill-mobile_nav-expanded);
  }
`

// NOTE: This is designed to work in conjunction with `elTopBarMenuDrawerMenuItem`
export const elTopBarMenuDrawerMenuGroupSummary = css`
  grid-template-areas: 'label badge dropdown';
  grid-template-columns: 1fr minmax(0, auto) auto;
  overflow: hidden;

  cursor: pointer;
`

export const ElTopBarMenuDrawerMenuGroupSummaryLabel = styled(ElTopBarMenuDrawerMenuItemLabel)`
  :where(details[data-is-active='true'], details:has([aria-current='page'])) & {
    ${font('base', 'medium')}
    color: var(--comp-navigation-colour-text-mobile_nav-select);
  }
`

export const ElTopBarMenuDrawerMenuGroupSummaryBadge = styled(ElTopBarMenuDrawerMenuItemBadge)`
  details:open & {
    display: none;
  }
`

export const ElTopBarMenuDrawerMenuGroupSummaryDropdownIcon = styled.span`
  grid-area: dropdown;

  display: inline-flex;
  align-items: center;

  color: var(--comp-navigation-colour-icon-sidebar-default);

  /* Use content-box sizing to prevent the padding from affecting the icon's size */
  box-sizing: content-box;
  width: var(--icon_size-s);
  height: var(--icon_size-s);
  padding-inline: var(--spacing-1) 0;

  details:open & {
    padding-inline: 0 var(--spacing-1);
    transform: rotate(180deg);
  }
`
