import { styled } from '@linaria/react'

interface ElExperimentalTableRowProps {
  'data-is-selected'?: boolean
}

export const ElExperimentalTableRow = styled.tr<ElExperimentalTableRowProps>`
  width: 100%;
  border-bottom: var(--border-default, 1px) solid var(--colour-border-neutral-light_default);
  background: var(--colour-fill-white);
  min-height: var(--size-10);
  padding: var(--spacing-2);
  &[data-is-selected='true'] {
    background: var(--colour-fill-action-lightest);
  }
  &:hover {
    background: var(--colour-fill-neutral-lightest);
  }
`
