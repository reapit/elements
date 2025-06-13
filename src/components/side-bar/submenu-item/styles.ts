import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { font } from '#src/components/text'

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

  padding: var(--spacing-none) var(--spacing-3) var(--spacing-none) 44px;

  /* NOTE: If the container width is 40px or less, the side bar must be collapsed,
   * so we want to reduce our inline start padding to ensure we aren't overflowing
   * the container. */
  @container (width <= 40px) {
    padding-inline-start: 28px; /* 40px - var(--spacing-3) */
  }

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
