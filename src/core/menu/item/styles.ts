import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { font } from '../../text'

export const elMenuItem = css`
  box-sizing: border-box;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--spacing-3);
  padding: var(--spacing-3);
  width: 100%;

  border: none;
  border-radius: var(--comp-menu-border-radius);
  background: var(--comp-menu-colour-fill-default);

  text-align: start;
  text-decoration: none;
  cursor: pointer;

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);

    /* NOTE: Menu items sit flush against each other, so we need to ensure the focus outline
     * sits above subsequent items */
    z-index: 1;
  }

  &:hover {
    background: var(--comp-menu-colour-fill-hover);
  }

  &[aria-disabled='true'],
  &:disabled {
    cursor: not-allowed;
    background: var(--comp-menu-colour-fill-default);
  }

  &[aria-checked='true']:enabled,
  &[aria-current='page']:enabled {
    background: var(--comp-menu-colour-fill-highlighted);
  }
`

export const ElMenuItemIconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: var(--icon_size-m);
  height: var(--icon_size-m);

  /* aka left icon */
  &:first-of-type {
    color: var(--comp-menu-colour-icon-default-left);
  }

  /* aka right icon */
  &:last-of-type {
    color: var(--comp-menu-colour-icon-default-right);
  }

  [aria-disabled='true'] &,
  :disabled & {
    &:first-of-type {
      color: var(--comp-menu-colour-icon-disabled-left);
    }
    &:last-of-type {
      color: var(--comp-menu-colour-icon-disabled-right);
    }
  }

  [aria-checked='true']:enabled &,
  [aria-current='page']:enabled & {
    &:first-of-type {
      color: var(--comp-menu-colour-icon-default-action);
    }
  }

  [aria-checked='true']:enabled:hover &,
  [aria-current='page']:enabled:hover & {
    &:first-of-type {
      color: var(--comp-menu-colour-icon-hover-action);
    }
  }
`

export const ElMenuItemContentContainer = styled.span`
  display: flex;
  flex-flow: column nowrap;
  gap: var(--spacing-1);
  align-items: start;
  width: 100%;
`

export const ElMenuItemLabel = styled.span`
  display: flex;
  flex-flow: row wrap;
  gap: var(--spacing-2);
  align-items: center;
  justify-content: start;
  width: 100%;
`

export const ElMenuItemLabelText = styled.span`
  ${font('sm', 'regular')}
  color: var(--comp-menu-colour-text-default-primary);

  [aria-disabled='true'] &,
  :disabled & {
    color: var(--comp-menu-colour-text-disabled-primary);
  }

  [aria-checked='true']:enabled &,
  [aria-current='page']:enabled & {
    color: var(--comp-menu-colour-text-default-action);
  }

  [aria-checked='true']:enabled:hover &,
  [aria-current='page']:enabled:hover & {
    color: var(--comp-menu-colour-text-hover-action);
  }
`

export const ElMenuItemBadgeContainer = styled.span`
  /*
   * NOTE: This element allows us to attached an ID that is used to describe the menu item.
   * Further, Linaria currently has a bug where it falls over for empty styled elements/classes.
   * Hence, why this comment is within the template string.
   */
`

export const ElMenuItemSupplementaryInfo = styled.span`
  ${font('xs', 'regular')}
  color: var(--comp-menu-colour-text-default-secondary);

  [aria-disabled='true'] &,
  :disabled & {
    color: var(--comp-menu-colour-text-disabled-secondary);
  }
`
