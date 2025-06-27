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
  font-family: var(--font-sm-regular-family);
  font-size: var(--font-sm-regular-size);
  font-style: normal;
  font-weight: var(--font-sm-regular-weight);
  line-height: var(--font-sm-regular-line_height);
  letter-spacing: var(--font-sm-regular-letter_spacing);
`

export const ElTableToolbarActions = styled.div``
