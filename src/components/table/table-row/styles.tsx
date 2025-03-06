import { styled } from '@linaria/react'

interface ElTableRowProps {
  'data-is-selected'?: boolean
}

export const ElTableRow = styled.tr<ElTableRowProps>`
  width: 100%;
  border-bottom: var(--border-default, 1px) solid var(--outline-default);
  background: var(--fill-white);
  min-height: var(--size-10);
  padding: var(--spacing-2);
  &[data-is-selected='true'] {
    background: var(--fill-action-lightest);
  }
  &:hover {
    background: var(--fill-default-lightest);
  }
`
