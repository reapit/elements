import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElIcon } from '../../icon'

// NOTE: This class is used as the basis for the menu item group as well. Changes here
// will affect that component too.
export const elSideBarMenuItem = css`
  display: grid;
  align-items: center;
  justify-content: start;
  grid-template-areas: 'icon label';
  grid-template-columns: auto 1fr;

  gap: var(--spacing-3);
  padding: var(--spacing-2);
  width: 100%;

  border-radius: var(--comp-navigation-border-radius-menu_item);

  &:hover,
  &:focus-visible {
    background: var(--colour-fill-neutral-light);
  }

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }
`

export const ElSideBarMenuItemLabel = styled.span`
  grid-area: label;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  padding-block: var(--spacing-half);

  /* text-sm/Regular */
  font-family: var(--font-sm-regular-family);
  font-size: var(--font-sm-regular-size);
  font-style: normal;
  font-weight: var(--font-sm-regular-weight);
  line-height: var(--font-sm-regular-line_height);
  letter-spacing: var(--font-sm-regular-letter_spacing);

  color: var(--comp-navigation-colour-text-sidebar-default);
  [aria-current='page'] > & {
    color: var(--comp-navigation-colour-text-sidebar-select);
    font-weight: var(--font-weight-medium);
  }
`

export const ElSideBarMenuItemIcon = styled.span`
  grid-area: icon;

  color: var(--comp-navigation-colour-icon-sidebar-default);
  [aria-current='page'] > & {
    color: var(--comp-navigation-colour-icon-sidebar-select);
  }

  // TODO: remove this when our Icon component inherits by default and
  // can be sized via props correctly.
  ${ElIcon} {
    color: inherit;
    width: var(--icon_size-m);
    height: var(--icon_size-m);
  }

  display: flex;
  place-items: center;
  padding: var(--spacing-half);
`
