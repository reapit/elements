import { styled } from '@linaria/react'

export const ElNavItemLabelContainer = styled.span`
  display: flex;
  padding: var(--spacing-half);
  align-items: flex-start;

  /* text-sm/Medium */
  font-family: var(--font-sm-medium-family);
  font-size: var(--font-sm-medium-size);
  font-style: normal;
  font-weight: var(--font-sm-medium-weight);
  line-height: var(--font-sm-medium-line_height);
  letter-spacing: var(--font-sm-medium-letter_spacing);
`

const baseNavItemStyle = `
  display: inline-flex;
  padding: var(--spacing-1) var(--spacing-3);
  align-items: center;
  border-radius: var(--comp-navigation-border-radius-nav_item-desktop);
  background: var(--comp-navigation-colour-fill-nav_item-default);

  &:focus {
    outline: var(--border-width-double) solid var(--colour-border-focus);
  }


  &:hover {
    background: var(--comp-navigation-colour-fill-nav_item-hover);
  }

  &:active {
    background: var(--comp-navigation-colour-fill-nav_item-select);
  }

  cursor: pointer;
  border: none;

  color: var(--comp-navigation-colour-text-nav_item-default);
  &:active, &[aria-current="true"], &[aria-current="page"] {
    color: var(--comp-navigation-colour-text-nav_item-select);
  }

  white-space: nowrap
`

export const ElNavItemButton = styled.button`
  ${baseNavItemStyle}
`

export const ElNavItemAnchor = styled.a`
  ${baseNavItemStyle}
`
