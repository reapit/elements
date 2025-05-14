import { styled } from '@linaria/react'

export const ElDoubleLineCell = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 0;
`

export const ElAvatarContent = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  flex: 1 0 0;
`

export const ElCellContent = styled.div`
  display: flex;
  padding: var(--spacing-2) 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--spacing-1);
  flex: 1 0 0;
`

export const ElMediaItemContent = styled.div`
  display: flex;
  align-items: flex-start;
  flex: none;
  width: auto;
  & > * {
    width: var(--size-12);
    height: var(--size-10);
  }
`

export const ElDoubleLineContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--spacing-1);
  flex: none;
  width: auto;
`

export const ElFirstLine = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  align-self: stretch;
`

export const ElSecondLine = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  align-self: stretch;
`
