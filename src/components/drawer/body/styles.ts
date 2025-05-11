import { DRAWER_WIDTH_MD_2XL } from '../constants'
import { styled } from '@linaria/react'

export const ElDrawerBody = styled.div`
  grid-area: body;
  background: var(--fill-white);
  height: 100%;

  /* XS-SM container size */
  padding: var(--spacing-5);

  @container (width >= ${DRAWER_WIDTH_MD_2XL}) {
    padding: var(--spacing-6) var(--spacing-8);
  }
`
