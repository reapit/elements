import { styled } from '@linaria/react'

export const ElPagination = styled.nav``

export const ElPaginationList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-6) var(--spacing-none) var(--spacing-2) var(--spacing-none);
  gap: var(--spacing-6);
`

export const ElPaginationItem = styled.li``

export const ElPaginationText = styled.span`
  color: var(--text-primary);
  text-align: center;
  min-width: var(--size-14);

  font-family: var(--font-family);
  font-size: var(--font-size-base);
  font-style: normal;
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-base);
  letter-spacing: var(--letter-spacing-base);
`
