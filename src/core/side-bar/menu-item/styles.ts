import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElDeprecatedIcon } from '../../../deprecated/icon'
import { font } from '#src/core/text/index'

// NOTE: This class is used as the basis for the menu group's summary element as well. Changes here
// will also affect that component.
export const elSideBarMenuItem = css`
  display: grid;
  align-items: center;
  justify-content: start;
  grid-template-areas: 'icon label';
  grid-template-columns: auto 1fr;

  gap: var(--spacing-3);
  padding: var(--spacing-2);
  width: 100%;

  text-decoration: none;
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

  color: var(--comp-navigation-colour-text-sidebar-default);
  ${font('sm', 'regular')}

  [aria-current='page'] > & {
    color: var(--comp-navigation-colour-text-sidebar-select);
    ${font('sm', 'medium')}
  }
`

export const ElSideBarMenuItemIcon = styled.span`
  grid-area: icon;

  display: inline-flex;
  align-items: center;

  /* NOTE: We don't want the padding to reduce the content size as we want the icons to be
   * exactly --icon_size-m */
  box-sizing: content-box;
  padding: var(--spacing-half);

  width: var(--icon_size-m);
  height: var(--icon_size-m);

  color: var(--comp-navigation-colour-icon-sidebar-default);
  [aria-current='page'] > & {
    color: var(--comp-navigation-colour-icon-sidebar-select);
  }

  /* TODO: remove this when DeprecatedIcon is removed. */
  ${ElDeprecatedIcon} {
    color: inherit;
    width: inherit;
    height: inherit;
  }
`
