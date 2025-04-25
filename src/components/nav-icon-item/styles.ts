import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { styled } from '@linaria/react'

// TODO: add tooltip integration on hover state
const baseStyles = `
  position: relative;
  display: inline-flex;
  padding: var(--spacing-2);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-none);
  border-radius: var(--comp-navigation-border-radius-nav_icon);
  background: var(--comp-navigation-colour-fill-nav_icon-default);
  border: var(--border-none);
  color: var(--icon-app_bar-default);
  outline: none;

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);

  }

  &:hover {
    cursor: pointer;
    background: var(--comp-navigation-colour-fill-nav_icon-hover);
  }

  &:active, &[aria-current="page"], &[aria-current="true"] {
    color: var(--comp-navigation-colour-icon-nav_icon-select);
    background: var(--comp-navigation-colour-fill-nav_icon-select);
  }
`

export const ElNavIconItemBadge = styled.span`
  position: absolute;
  right: 5px;
  top: 5px;
  width: var(--size-2);
  height: var(--size-2);
  background-color: var(--comp-navigation-colour-fill-notification_badge);
  border-radius: 100%;
`

export const ElButtonNavIconItem = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
  ${baseStyles}
`

export const ElAnchorNavIconItem = styled.a<AnchorHTMLAttributes<HTMLAnchorElement>>`
  ${baseStyles}
`
