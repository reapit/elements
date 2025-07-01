import { styled } from '@linaria/react'

import { DeprecatedButton } from '../deprecated-button'

export const PaginationButton = styled(DeprecatedButton)`
  border-radius: var(--comp-button-border-radius-default);
  &[aria-disabled='true'] {
    background: var(--comp-button-colour-fill-tertiary-disabled);
  }
`
