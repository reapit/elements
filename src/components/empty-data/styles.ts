import { styled } from '@linaria/react'

export const ElEmptyDataDescription = styled.div`
  color: var(text-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-base);
  letter-spacing: var(--letter-spacing-base);
`

export const ElEmptyDataSecondaryDescription = styled.div`
  color: var(--text-secondary);
  font-size: var(--font-size-sm,);
  font-weight: var(--font-weight-regular,);
  line-height: var(--line-height-sm,);
  letter-spacing: var(--letter-spacing-sm);
`

export const ElEmptyDataActionButton = styled.button`
  color: var(--text-action);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);

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
  // TODO: ask design team to clarify
  height: 186px;
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
