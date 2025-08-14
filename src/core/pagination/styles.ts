import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElPagination = styled.nav`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`

export const ElPaginationList = styled.ul`
  list-style: none;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-6) var(--spacing-none) var(--spacing-2) var(--spacing-none);
  gap: var(--spacing-6);
`

export const ElPaginationItem = styled.li`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`

export const ElPaginationText = styled.span`
  text-align: center;
  min-width: var(--size-12);

  color: var(--colour-text-primary);
  ${font('base', 'regular')}
`
