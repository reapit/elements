import { styled } from '@linaria/react'

export const ElTopBarMainNav = styled.nav`
  padding-inline-start: var(--spacing-6);
  padding-block: var(--spacing-1);

  /* Allows individual nav items to be displayed (or not) using container queries */
  container-name: top-bar-main-nav;
  container-type: inline-size;
`

export const ElTopBarMainNavList = styled.ul`
  display: flex;
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
