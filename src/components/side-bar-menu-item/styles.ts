import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const ElSideBarMenuItemText = styled.span`
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-style: normal;
  font-weight: 400;
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);
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
    font-weight: 500;
  }

  &[aria-current='page'] {
    &,
    ${ElSideBarMenuItemIcon} svg {
      color: var(--text-action);
      font-weight: 500;
    }
  }
`

export const ElSideBarMenuItem = styled.a``
