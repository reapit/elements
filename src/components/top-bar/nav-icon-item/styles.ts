import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElDeprecatedIcon } from '../../deprecated-icon'

export const elTopBarNavIconItem = css`
  position: relative;
  display: inline-flex;
  padding: var(--spacing-2);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-none);
  border-radius: var(--comp-navigation-border-radius-nav_icon);
  background: var(--comp-navigation-colour-fill-nav_icon-default);
  border: var(--border-none);
  color: var(--comp-navigation-colour-icon-nav_icon-secondary);
  outline: none;

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
  }

  &:hover {
    cursor: pointer;
    background: var(--comp-navigation-colour-fill-nav_icon-hover);
  }

  /* NOTE: we only apply the current page styles to anchor-based nav icon items. */
  &:is(a)[aria-current='page'] {
    color: var(--comp-navigation-colour-icon-nav_icon-select);
    background: var(--comp-navigation-colour-fill-nav_icon-select);
  }
`

export const ElTopBarNavIconItemIcon = styled.span`
  color: inherit;
  font-size: var(--icon_size-l);
  width: var(--icon_size-l);
  height: var(--icon_size-l);

  ${ElDeprecatedIcon} {
    color: inherit;
    font-size: inherit;
    width: inherit;
    height: inherit;
  }
`

// TODO: This should be handled by a Badge component. All our NavIconItem should be responsible for is
// positioning the badge correctly.
export const ElTopBarNavIconItemBadge = styled.span`
  position: absolute;
  right: 5px;
  top: 5px;
  width: var(--size-2);
  height: var(--size-2);
  background-color: var(--comp-navigation-colour-fill-notification_badge);
  border-radius: 100%;
`
