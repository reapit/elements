import { styled } from '@linaria/react'
import { isBelowDesktop } from '../../../styles/media'

export const ElTableHead = styled.thead`
  width: 100%;
  min-height: 40px;
  border-bottom: 1px solid var(--outline-default);
  background: var(--fill-white);
  &[data-position='sticky'] {
    position: sticky;
    top: -1rem;
    background: white;
    z-index: 100;
  }
  ${isBelowDesktop} {
    display: none;
  }
`
