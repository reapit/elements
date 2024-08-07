import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const elTilePaddingSmall = css``
export const elTilePaddingNone = css``

export const ElTile = styled.div`
  border-radius: 0.5rem;
  border: 1px solid var(--neutral-100);
  padding: 1.5rem;
  background-color: var(--white);

  &.${elTilePaddingSmall} {
    padding: 1rem;
  }

  &.${elTilePaddingNone} {
    padding: 0;
  }
`
