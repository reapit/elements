import { styled } from '@linaria/react'
import { css } from '@linaria/core'

/** @deprecated */
export const ElDeprecatedToolTipChild = styled.div`
  position: absolute;
  padding: 0.5rem;
  background: var(--black);
  border-radius: 0.5rem;
  font-size: var(--font-size-small);
  color: var(--white);
  top: calc(-35px + -0.25rem);
  display: none;
  left: auto;
  right: auto;

  &::after {
    position: absolute;
    bottom: -0.5rem;
    left: calc(50% - 0.25rem);
    border: 0.25rem solid transparent;
    border-top-color: var(--black);
    content: '';
  }
`

/** @deprecated */
export const elToolTipActive = css`
  display: block;
`

/** @deprecated */
export const ElDeprecatedToolTipContainer = styled.div`
  position: relative;
  padding: 0.25rem;
`
