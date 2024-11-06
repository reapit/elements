import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { styled } from '@linaria/react'
import { ElIcon } from '../icon'

const baseStyles = `
  display: inline-flex;
  padding: var(--space-2, 8px);
  justify-content: center;
  align-items: center;
  gap: var(--space-none, 0px);
  border-radius: var(--corner-default, 4px);
  background: var(--fill-white, #ffffff);
  border: var(--border-none, 0px);
  color: var(--icon-app_bar-default, #798da1);
  outline: none;

  &:focus-visible {
    border-radius: var(--corner-default, 4px);
    background: var(--fill-white, #ffffff);
    box-shadow:
      0px 0px 0px 1px #fff,
      0px 0px 0px 4px var(--icon-button_primary-hover, #7e9bfa);
  }

  &:hover {
    cursor: pointer;
    border-radius: var(--corner-default, 4px);
    background: var(--fill-default-lightest, #f2f4f6);
  }

  &:active, &[aria-current="page"], &[aria-current="true"] {
    color: var(--fill-action-dark, #4e56ea);
    border-radius: var(--corner-default, 4px);
    background: var(--fill-default-lightest, #f2f4f6);
  }
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
