import { styled } from '@linaria/react'

export const ElTopBarMainNav = styled.nav``

export const ElTopBarMainNavList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: var(--spacing-2);
  list-style: none;
  margin: 0;
  padding: 0;
`

export const ElTopBarMainNavListItem = styled.li`
  display: flex;
  align-items: center;
`
