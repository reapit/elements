import { styled } from '@linaria/react'

export const ElEmptyData = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-3);

  width: 100%;
  overflow: hidden;

  padding: var(--spacing-6);
  border-radius: var(--border-radius-l);
  background: var(--colour-fill-neutral-lightest);
`
