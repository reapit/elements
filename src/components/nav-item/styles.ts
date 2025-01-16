import { styled } from '@linaria/react'

export const ElNavItemLabelContainer = styled.span`
  display: flex;
  padding: var(--spacing-half);
  align-items: flex-start;

  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-style: normal;
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);
`

const baseNavItemStyle = `
  display: inline-flex;
  padding: var(--spacing-1) var(--spacing-3);
  align-items: center;
  border-radius: var(--corner-default);
  background: var(--fill-white);
  &:focus {
    box-shadow:
      0px 0px 0px 1px #fff,
      0px 0px 0px 4px var(--purple-300);
  }
  &:hover {
    background: var(--fill-default-lightest);
  }
  &:active {
    background: var(--fill-default-lightest);
  }
  &:focus-visible {
    outline: none;
  }
  cursor: pointer;
  border: none;

  color: var(--text-secondary);
  &:active, &[aria-current="true"], &[aria-current="page"] {
    color: var(--text-action);
  }

  white-space: nowrap
`

export const ElNavItemButton = styled.button`
  ${baseNavItemStyle}
`

export const ElNavItemAnchor = styled.a`
  ${baseNavItemStyle}
`
