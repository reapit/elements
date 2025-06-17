import { styled } from '@linaria/react'

interface ElTableRowProps {
  'data-is-selected'?: boolean
}

export const ElTableRow = styled.tr<ElTableRowProps>`
  width: 100%;
  border-bottom: var(--border-width-default) solid var(--colour-border-light_default);
  background: var(--colour-fill-white);
  min-height: var(--size-10);
  &[data-is-selected='true'] {
    background: var(--fill-action-lightest);
  }
  &:hover {
    background: var(--fill-default-lightest);
  }
`
