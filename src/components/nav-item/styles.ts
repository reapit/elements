import { styled } from '@linaria/react'

export const ElNavItemLabelContainer = styled.span`
  display: flex;
  padding: var(--spacing-spacing-half, 2px);
  align-items: flex-start;

  font-family: var(--font-family, Inter);
  font-size: var(--font-size-sm, 14px);
  font-style: normal;
  font-weight: 500;
  line-height: var(--line-height-sm, 20px);
  letter-spacing: var(--letter-spacing-sm, -0.14px);
`

const baseNavItemStyle = `
  display: inline-flex;
  padding: var(--spacing-spacing-1, 4px) var(--spacing-spacing-3, 12px);
  align-items: center;
  border-radius: var(--corner-radius-corner-default, 4px);
  background: var(--fill-colour-fill-white, #fff);
  &:focus {
    box-shadow:
      0px 0px 0px 1px #fff,
      0px 0px 0px 4px var(--Colours-Purple-purple-300, #7e9bfa);
  }
  &:hover {
    background: var(--fill-colour-fill-default-lightest, #f2f4f6);
  }
  &:active {
    background: var(--fill-colour-fill-default-lightest, #f2f4f6);
  }
  &:focus-visible {
    outline: none;
  }
  cursor: pointer;
  border: none;

  color: var(--text-colour-text-secondary, #607890);
  &:active, &[aria-current="true"], &[aria-current="page"] {
    color: var(--text-colour-text-action, #4e56ea);
  }
`

export const ElNavItemButton = styled.button`
  ${baseNavItemStyle}
`

export const ElNavItemAnchor = styled.a`
  ${baseNavItemStyle}
`
