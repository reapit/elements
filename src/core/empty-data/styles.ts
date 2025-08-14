import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElEmptyDataDescription = styled.p`
  color: var(--text-primary);
  ${font('base', 'regular')}
  text-align: center;
`

export const ElEmptyDataSecondaryDescription = styled.p`
  color: var(--text-secondary);
  ${font('sm', 'regular')}
  text-align: center;
`

export const ElEmptyDataActionButton = styled.button`
  color: var(--text-action);
  ${font('sm', 'medium')}

  text-align: center;
  border: none;
  background: none;
  cursor: pointer;
`

export const ElEmptyData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: var(--size-40);
  padding: var(--spacing-6);
  border-radius: var(--corner-lg);
  background: var(--fill-default-lightest);

  ${ElEmptyDataSecondaryDescription} + ${ElEmptyDataActionButton} {
    margin-top: var(--spacing-1);
  }

  & * {
    font-family: var(--font-family);
  }
`
