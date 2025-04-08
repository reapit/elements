import { styled } from '@linaria/react'

import { Button } from '../button'

export const PaginationButton = styled(Button)`
  border-radius: var(--comp-button-border-radius-default);
  &[aria-disabled='true'] {
    background: var(--comp-button-colour-fill-tertiary-disabled);
  }
`
