import { isBelowDesktop } from '../../../styles/media'
import { styled } from '@linaria/react'

export const ElTableRow = styled.tr`
  width: 100%;
  border-bottom: 1px solid var(--outline-default);
  background: var(--fill-white);
  flex: 1;
  ${isBelowDesktop} {
    display: flex;
    flex-wrap: wrap;
  }
`
