import { styled } from '@linaria/react'
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type CommonNavIconItemProps = {
  /**
   * NOTE: data attribute to indicate the state of the nav item
   * by default the styles is already applied with pseudo-class selector
   * but to make it more flexible, consumer could use this attribute to
   * change the styles
   */
  'data-state'?: 'focus' | 'hover' | 'active'
}

const baseStyles = `
  display: inline-flex;
  padding: var(--spacing-2, 8px);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-none, 0px);
  border-radius: var(--corner-default, 0.25rem);
  background: var(--white, #ffffff);
  border: none;
  outline: none;

  /* change children color by default */
  > * {
    color: var(--neutral-400, #798da1) !important;
  }

  &:focus, &[data-state='focus'] {
    border-radius: var(--corner-default, 0.25rem);
    background: var(--white, #ffffff);
    box-shadow:
      0px 0px 0px 1px #fff,
      0px 0px 0px 4px var(--icon-button_primary-hover, #7e9bfa);
  }

  &:hover, &[data-state='hover'] {
    cursor: pointer;
    border-radius: var(--corner-default, 0.25rem);
    background: var(--neutral-050, #f2f4f6);
  }

  &:active, &[data-state='active'] {
    > * {
      color: var(--intent-primary, #4e56ea) !important;
    }
    border-radius: var(--corner-default, 0.25rem);
    background: var(--neutral-050, #f2f4f6);
  }
`

type ElButtonNavIconItemProps = ButtonHTMLAttributes<HTMLButtonElement> & CommonNavIconItemProps
export const ElButtonNavIconItem = styled.button<ElButtonNavIconItemProps>`
  ${baseStyles}
`

type ElAnchorNavIconItemProps = AnchorHTMLAttributes<HTMLAnchorElement> & CommonNavIconItemProps
export const ElAnchorNavIconItem = styled.a<ElAnchorNavIconItemProps>`
  ${baseStyles}
`
