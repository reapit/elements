import { css } from '@linaria/core'
import { styled } from '@linaria/react'

/** @deprecated */
export const elTilePaddingSmall = css``

/** @deprecated */
export const elTilePaddingNone = css``

/** @deprecated */
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
