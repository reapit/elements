import { font } from '#src/utils/font'
import { isWidthAtOrAbove } from '#src/utils/index'
import { styled } from '@linaria/react'

export const ElOfficeSwitcher = styled.div`
  display: none;

  grid-template-columns: 1fr;
  align-items: center;

  background: var(--colour-fill-white);
  color: var(--colour-text-primary);

  height: var(--size-10);
  width: 100%;
  padding-inline: var(--spacing-5);

  ${font('sm', 'regular')}

  @media screen and (${isWidthAtOrAbove('SM')}) {
    display: grid;
  }
`
