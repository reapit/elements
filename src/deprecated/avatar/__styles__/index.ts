import { css } from '@linaria/core'
import { styled } from '@linaria/react'

/** @deprecated */
export const elAvatarSmall = css``

/** @deprecated will be replaced by new v5 ElAvatarRectangle */
export const ElDeprecatedAvatar = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-color: var(--neutral-100);
  border-radius: 50%;
  overflow: hidden;
  width: 2.5rem;
  height: 2.5rem;

  img {
    max-width: 2.5rem;
  }

  &.${elAvatarSmall} {
    width: 2rem;
    height: 2rem;

    img {
      max-width: 2rem;
    }
  }
`

/** @deprecated will be removed in future version */
export const ElDeprecatedAvatarImage = styled(ElDeprecatedAvatar)`
  border-radius: 0;
  width: 4.5rem;
  height: 3.25rem;

  img {
    max-width: 4.5rem;
  }
`
