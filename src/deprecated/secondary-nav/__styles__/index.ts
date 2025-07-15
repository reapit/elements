import { styled } from '@linaria/react'
import { elIsActive } from '../../../styles/deprecated-states'

/** @deprecated */
export const ElSecondaryNav = styled.div`
  transform: translate3d(-1.5rem, -1.5rem, 0);
  width: 14rem;
`

/** @deprecated */
export const ElSecondaryNavItem = styled.div`
  padding: 0.625rem 1.5rem;
  color: var(--neutral-400);
  font-size: var(--font-size-small);
  cursor: pointer;
  position: relative;
  border-left: 3px solid var(--white);

  &.${elIsActive} {
    border-left: 3px solid var(--purple-500);
    background-color: var(--purple-050);
    color: var(--purple-500);
  }

  &:hover {
    border-left: 3px solid var(--purple-500);
    background-color: var(--purple-050);
  }
`
