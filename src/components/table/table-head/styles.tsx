import { styled } from '@linaria/react'

export const ElTableHead = styled.thead`
  width: 100%;
  background: var(--fill-white);
  &[data-position='sticky'] {
    position: sticky;
    top: -1rem;
    z-index: 100;
  }
`

export const ElTableRowHead = styled.tr`
  width: 100%;
  border-bottom: var(--border-default, 1px) solid var(--outline-default);
  min-height: var(--size-10);
  padding: var(--spacing-2);
  &[data-is-selected='true'] {
    background: var(--fill-action-lightest);
  }
  &:hover {
    background: var(--fill-default-lightest);
  }
`