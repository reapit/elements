import { styled } from '@linaria/react'

const baseButtonOverride = `
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
`

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

const ElSideBarMenuItemBase = `
  ${baseButtonOverride}
  cursor: pointer;
  display: flex;
  height: 40px;
  padding: var(--spacing-none) var(--spacing-2);
  align-items: center;
  gap: var(--spacing-3);
  align-self: stretch;
  color: var(--neutral-600);
  border-radius: var(--corner-lg);

  &:hover,
  &[aria-current='page'] {
    background: var(--fill-default-lightest);
    font-weight: 500;
  }
`

export const ElSideBarMenuItemButton = styled.button`
  ${ElSideBarMenuItemBase}

  &[aria-current='page'] {
    &,
    ${ElSideBarMenuItemIcon} svg {
      color: var(--text-action);
      font-weight: 500;
    }
  }
`
export const ElSideBarMenuItemAnchor = styled.a`
  ${ElSideBarMenuItemBase}

  &[aria-current='page'] {
    &,
    ${ElSideBarMenuItemIcon} svg {
      color: var(--text-action);
      font-weight: 500;
    }
  }
`
