import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElTableToolbar = styled.div`
  display: flex;
  width: 100%;
  background: var(--fill-white);
  padding: var(--spacing-2) 0 var(--spacing-2) 0;
  gap: 0;
  justify-content: space-between;
  align-items: center;
`

export const ElTableToolbarDescription = styled.div`
  text-align: left;
  gap: var(--spacing-1);

  color: var(--colour-text-primary);
  ${font('sm', 'regular')}
`

export const ElTableToolbarActions = styled.div`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`
