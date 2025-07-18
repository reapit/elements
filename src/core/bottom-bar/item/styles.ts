import { css } from '@linaria/core'
import { font } from '#src/core/text/index'
import { styled } from '@linaria/react'
import { ElDeprecatedIcon } from '../../../deprecated/icon'

export const elBottomBarItem = css`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-half) var(--spacing-none);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-half);
  background-color: var(--comp-navigation-colour-fill-bottom_bar);
  border: var(--border-none);
  border-radius: var(--border-radius-none);
  color: var(--comp-navigation-colour-text-bottom_bar-default);
  outline: none;
  text-decoration: none;

  width: 100%;

  &:focus-visible {
    /* NOTE: z-index is required to ensure the focus ring is visible above other items */
    z-index: 1;
    outline: var(--border-width-double) solid var(--colour-border-focus);
  }

  &:hover {
    cursor: pointer;
  }
`

export const ElBottomBarItemIcon = styled.span`
  /* NOTE: Required for the badge to position correctly */
  position: relative;

  color: var(--comp-navigation-colour-icon-bottom_bar-default);
  font-size: var(--icon_size-l);
  width: var(--icon_size-l);
  height: var(--icon_size-l);

  ${ElDeprecatedIcon} {
    color: inherit;
    font-size: inherit;
    width: inherit;
    height: inherit;
  }

  /* NOTE: we only apply the current page styles to anchor-based items. */
  :is(a)[aria-current='page'] & {
    color: var(--comp-navigation-colour-icon-bottom_bar-select);
  }
`

export const ElBottomBarItemLabel = styled.span`
  color: var(--comp-navigation-colour-text-bottom_bar-default);
  text-align: center;

  ${font('3xs', 'medium')}

  /* NOTE: we only apply the current page styles to anchor-based items. */
  :is(a)[aria-current='page'] & {
    color: var(--comp-navigation-colour-text-bottom_bar-select);
  }
`

// TODO: This should be handled by a Badge component. All our NavIconItem should be responsible for is
// positioning the badge correctly.
export const ElBottomBarItemBadge = styled.span`
  position: absolute;
  /* NOTE: this positions the badge so that it is centered on the icon's right edge */
  right: calc(-1 * var(--size-2) / 2);
  width: var(--size-2);
  height: var(--size-2);
  background-color: var(--comp-navigation-colour-fill-notification_badge);
  border-radius: 100%;
`
