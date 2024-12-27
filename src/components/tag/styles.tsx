import { styled } from '@linaria/react'

export const ElTag = styled.div`
  width: fit-content;
  padding: var(--spacing-half) var(--spacing-3);
  border-radius: var(--corner-xl);
  background: var(--fill-default-light);
  color: var(--text-tertiary);
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-xs);
`

export const ElTagGroup = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: var(--spacing-1);
`
