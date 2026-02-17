import { styled } from '@linaria/react'

export const ElTopBarMenuDrawerMenuList = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
  margin-block: 0;
  padding: var(--spacing-3);
  width: 100%;

  border-top: var(--border-width-default) solid var(--comp-navigation-colour-border-mobile_nav);

  &:first-of-type {
    border-top: none;
  }
`

export const ElTopBarMenuDrawerMenuListItem = styled.li`
  display: block;
`
