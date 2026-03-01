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
  color: var(--colour-text-secondary);
  font-size: 0.875rem /* was --font-size-small */;
  cursor: pointer;
  position: relative;
  border-left: 3px solid var(--colour-fill-white);

  &.${elIsActive} {
    border-left: 3px solid var(--colour-fill-action-dark);
    background-color: var(--colour-fill-action-lightest);
    color: var(--colour-text-action);
  }

  &:hover {
    border-left: 3px solid var(--colour-fill-action-dark);
    background-color: var(--colour-fill-action-lightest);
  }
`
