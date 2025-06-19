import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElIcon } from '../../icon'
import { ElSideBarMenuItemIcon, ElSideBarMenuItemLabel } from '../menu-item'
import { font } from '#src/components/text'

export const elSideBarMenuGroup = css`
  border-radius: var(--comp-navigation-border-radius-menu_item);
  width: 100%;

  &:open,
  &[open],
  &[data-is-active='true'],
  &:has([aria-current='page']) {
    background: var(--comp-navigation-colour-fill-sidebar-select);
  }
`

// NOTE: This is designed to work in conjunction with `elSideBarMenuItem`
export const elSideBarMenuGroupSummary = css`
  grid-template-areas: 'icon label dropdown';
  grid-template-columns: auto 1fr auto;
  overflow: hidden;

  cursor: pointer;
`

export const ElSideBarMenuGroupSummaryIcon = styled(ElSideBarMenuItemIcon)`
  :where(details[data-is-active='true'], details:has([aria-current='page'])) & {
    color: var(--comp-navigation-colour-icon-sidebar-select);
  }
`

export const ElSideBarMenuGroupSummaryLabel = styled(ElSideBarMenuItemLabel)`
  :where(details[data-is-active='true'], details:has([aria-current='page'])) & {
    color: var(--comp-navigation-colour-text-sidebar-select);
    ${font('sm', 'medium')}
  }
`

export const ElSideBarMenuGroupSummaryDropdownIcon = styled.span`
  grid-area: dropdown;

  color: var(--comp-navigation-colour-icon-sidebar-default);

  padding: var(--spacing-1);

  ${ElIcon} {
    width: var(--icon_size-xs);
    height: var(--icon_size-xs);
  }

  details:open & {
    transform: rotate(180deg);
  }
`
