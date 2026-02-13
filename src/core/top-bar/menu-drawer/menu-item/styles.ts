import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { font } from '#src/core/text/index'

export const elTopBarMenuDrawerMenuItem = css`
  display: grid;
  align-items: center;
  justify-content: start;
  grid-template-areas: 'label';
  grid-template-columns: 1fr;

  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  width: 100%;

  text-decoration: none;
  border: none;
  background: transparent;
  text-align: left;
  border-radius: var(--comp-navigation-border-radius-nav_item-mobile);

  &:hover,
  &:focus-visible {
    background: var(--colour-fill-neutral-light);
  }

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }
`

export const ElTopBarMenuDrawerMenuItemLabel = styled.span`
  grid-area: label;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: var(--comp-navigation-colour-text-mobile_nav-default);
  ${font('base', 'regular')}

  [aria-current='page'] > & {
    ${font('base', 'medium')}
    color: var(--comp-navigation-colour-text-mobile_nav-select);
  }
`
