import { styled } from '@linaria/react'
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { ElIcon } from '../icon'

export const ElBottomBarItemIcon = styled.div`
  width: var(--icon-default);
  height: var(--icon-default);
  color: inherit;
`

export const ElBottomBarItemLabel = styled.span`
  color: inherit;
  text-align: center;
  font-family: var(--font-family);
  font-size: var(--font-size-3xs);
  font-style: normal;
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-3xs);
  letter-spacing: var(--letter-spacing-2xs);
`

const baseStyles = `
  background-color: var(--fill-white);
  outline: none;
  width: 100%;
  border: var(--border-none);
  display: flex;
  cursor: pointer;
  padding: var(--spacing-half) var(--spacing-none);
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-half);
  position: relative;

  color: var(--icon-secondary);

  &:active, &[aria-current="true"], &[aria-current="page"] {
    color: var(--icon-action)
  }
`

export const ElBottomBarItemContent = styled.div`
  position: relative;
`

export const ElBottomBarItemBadge = styled.span`
  position: absolute;
  top: -3px;
  right: -3px;
  width: var(--size-2);
  height: var(--size-2);
  background-color: var(--icon-error);
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
