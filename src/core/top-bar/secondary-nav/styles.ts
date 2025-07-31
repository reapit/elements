import { styled } from '@linaria/react'

export const ElTopBarSecondaryNav = styled.nav`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`

export const ElTopBarSecondaryNavList = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: var(--spacing-2);
  list-style: none;
  margin: 0;
  padding: 0;
`

export const ElTopBarSecondaryNavListItem = styled.li`
  display: flex;
  align-items: center;
`
