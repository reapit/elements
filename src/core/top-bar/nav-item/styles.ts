import { font } from '#src/core/text/index'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const elTopBarNavItem = css`
  --__padding-block: calc(var(--spacing-half) + var(--spacing-1));
  --__padding-inline: calc(var(--spacing-half) + var(--spacing-3));

  display: flex;
  padding: var(--__padding-block) var(--__padding-inline);
  align-items: center;
  justify-content: center;

  border-radius: var(--comp-navigation-border-radius-nav_item-desktop);
  background: var(--comp-navigation-colour-fill-nav_item-default);

  width: min-content;

  cursor: pointer;
  text-decoration: none;
  border: none;

  color: var(--comp-navigation-colour-text-nav_item-default);

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }

  &:hover {
    border-radius: var(--comp-navigation-border-radius-nav_item-desktop);
    background: var(--comp-navigation-colour-fill-nav_item-hover);
  }

  &[aria-current='page'] {
    background: var(--comp-navigation-colour-fill-nav_item-select);
  }
`

export const ElTopBarNavItemLabel = styled.span`
  white-space: nowrap;

  color: var(--comp-navigation-colour-text-nav_item-default);
  ${font('sm', 'medium')}

  [aria-current='page'] & {
    color: var(--comp-navigation-colour-text-nav_item-select);
  }
`
