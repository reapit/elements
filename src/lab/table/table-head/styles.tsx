import { styled } from '@linaria/react'

export const ElExperimentalTableHead = styled.thead`
  width: 100%;
  background: var(--fill-white);
  &[data-position='sticky'] {
    position: sticky;
    top: -1rem;
    z-index: 100;
  }
`
