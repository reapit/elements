import { styled } from '@linaria/react'

export const ElTopBarMainNav = styled.nav``

export const ElTopBarMainNavList = styled.ul`
  @layer elements.main {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: var(--spacing-2);
    list-style: none;
    margin: 0;
    padding: 0;
  }
`

export const ElTopBarMainNavListItem = styled.li`
  @layer elements.main {
    display: flex;
    align-items: center;
  }
`
