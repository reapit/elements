import { styled } from '@linaria/react'

export const ElEmptyDataHeading = styled.h4`
  color: var(--text-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-base);
  letter-spacing: var(--letter-spacing-base);
  text-align: center;
`

export const ElEmptyDataContent = styled.p`
  color: var(--text-secondary);
  font-size: var(--font-size-sm,);
  font-weight: var(--font-weight-regular,);
  line-height: var(--line-height-sm,);
  letter-spacing: var(--letter-spacing-sm);
  text-align: center;
`

export const ElEmptyDataActionButton = styled.button`
  color: var(--text-action);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);

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

  ${ElEmptyDataContent} + ${ElEmptyDataActionButton} {
    margin-top: var(--spacing-1);
  }

  & * {
    font-family: var(--font-family);
  }
`
