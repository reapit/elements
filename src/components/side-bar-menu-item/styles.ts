import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const ElSideBarMenuItemText = styled.span`
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-style: normal;
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);
  font-weight: var(--font-weight-regular);
`

export const ElSideBarMenuItemIcon = styled.span`
  // override elIcon and custom icon
  svg,
  & {
    width: var(--icon-md);
    height: var(--icon-md);
    color: var(--neutral-400);
    box-sizing: content-box;
  }

  padding: var(--spacing-half);
`

export const elSideBarMenuItemAnchor = css`
  width: 100%;

  display: flex;
  align-self: stretch;
  align-items: center;
  height: 40px;
  padding: var(--spacing-none) var(--spacing-2);
  gap: var(--spacing-3);
  color: var(--neutral-600);
  border-radius: var(--corner-lg);

  &:hover,
  &[aria-current='page'] {
    background: var(--fill-default-lightest);
  }

  &[aria-current='page'] {
    & ${ElSideBarMenuItemText}, ${ElSideBarMenuItemIcon} svg {
      color: var(--text-action);
      font-weight: var(--font-weight-medium);
    }
  }
`

export const ElSideBarMenuItem = styled.a``
