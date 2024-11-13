import { styled } from '@linaria/react'
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { ElIcon } from '../icon'

export const ElBottomBarItemIcon = styled.div`
  width: var(--icon-default, 24px);
  height: var(--icon-default, 24px);
  color: inherit;
`

export const ElBottomBarItemLabel = styled.span`
  color: inherit;
  text-align: center;
  font-family: var(--font-family, Inter);
  font-size: var(--font-size-2xs, 12px);
  font-style: normal;
  font-weight: var(--font-weight-regular, Regular);
  line-height: var(--line-height-3xs, 12px);
  letter-spacing: var(--letter-spacing-2xs, 0px);
`

const baseStyles = `
  background-color: var(--fill-white, white);
  outline: none;
  width: 44px; 
  border: var(--border-none, 0);
  display: flex;
  cursor: pointer;
  padding: var(--space-half, 2px) var(--space-none, 0px); 
  flex-direction: column;
  align-items: center;
  gap: var(--space-half, 2px);
  position: relative;

  color: var(--icon-secondary, #607890);

  &:active, &[aria-current="true"], &[aria-current="page"] {
    color: var(--icon-action, #4e56ea)
  }
`

export const ElBottomBarItemBadge = styled.span`
  position: absolute;
  top: 1px;
  right: 6px;
  width: var(--size-2, 8px);
  height: var(--size-2, 8px);
  background-color: var(--icon-error, #f01830);
  border-radius: 100%;
`

export const ElAnchorBottomBarItemContainer = styled.a<AnchorHTMLAttributes<HTMLAnchorElement>>`
  ${baseStyles}

  ${ElIcon} {
    color: inherit;
  }
`

export const ElButtonBottomBarItemContainer = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
  ${baseStyles}

  ${ElIcon} {
    color: inherit;
  }
`
