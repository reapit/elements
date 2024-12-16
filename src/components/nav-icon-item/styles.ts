import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { styled } from '@linaria/react'
import { ElIcon } from '../icon'

// TODO: add tooltip integration on hover state
const baseStyles = `
  position: relative;
  display: inline-flex;
  padding: var(--spacing-2);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-none);
  border-radius: var(--corner-defaul);
  background: var(--fill-white);
  border: var(--border-none);
  color: var(--icon-app_bar-default);
  outline: none;

  &:focus-visible {
    border-radius: var(--corner-default);
    background: var(--fill-white);
    box-shadow:
      0px 0px 0px 1px var(--fill-white)
      0px 0px 0px 4px var(--icon-button_primary-hover);
  }

  &:hover {
    cursor: pointer;
    border-radius: var(--corner-default);
    background: var(--fill-default-lightest);
  }

  &:active, &[aria-current="page"], &[aria-current="true"] {
    color: var(--fill-action-dark);
    border-radius: var(--corner-default);
    background: var(--fill-default-lightest);
  }
`

export const ElNavIconItemBadge = styled.span`
  position: absolute;
  right: 5px;
  top: 5px;
  width: var(--size-2);
  height: var(--size-2);
  background-color: var(--icon-error);
  border-radius: 100%;
`

export const ElButtonNavIconItem = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
  ${baseStyles}

  ${ElIcon} {
    color: inherit;
  }
`

export const ElAnchorNavIconItem = styled.a<AnchorHTMLAttributes<HTMLAnchorElement>>`
  ${baseStyles}

  ${ElIcon} {
    color: inherit;
  }
`
