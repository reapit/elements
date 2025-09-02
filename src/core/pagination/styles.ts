import { styled } from '@linaria/react'

export const ElPagination = styled.nav`
  padding-block: var(--spacing-6) var(--spacing-2);
`

export const ElPaginationList = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-6);

  list-style: none;
  padding: 0;
  margin: 0;
`

export const ElPaginationItem = styled.li`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
