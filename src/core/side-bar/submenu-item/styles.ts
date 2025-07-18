import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { font } from '#src/core/text/index'

export const ElSideBarSubmenuItemLabel = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: var(--comp-navigation-colour-text-sidebar-default);
  ${font('sm', 'regular')}

  [aria-current='page'] > & {
    color: var(--comp-navigation-colour-text-sidebar-select);
    ${font('sm', 'medium')}
  }
`

export const elSideBarSubmenuItem = css`
  display: flex;
  align-items: center;
  text-align: start;
  width: 100%;

  text-decoration: none;
  padding: var(--spacing-none) var(--spacing-3) var(--spacing-none) 44px;

  border-radius: var(--comp-navigation-border-radius-none);
  height: var(--size-8);

  &:hover,
  &:focus-visible {
    background: var(--comp-navigation-colour-fill-sidebar-hover);
  }

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }
`
