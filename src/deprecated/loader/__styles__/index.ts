import { styled } from '@linaria/react'
import { elIsFullPage } from '../../../styles/deprecated-states'

const ANIM_TIME = 1.2

/** @deprecated */
export const ElLoaderContainer = styled.div`
  display: flex;
  align-items: center;

  &.${elIsFullPage} {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
  }
`

/** @deprecated */
export const ElLoaderLabel = styled.p`
  margin-right: 0.75rem;
  font-size: var(--font-size-default);
  color: var(--neutral-500);
`

/** @deprecated */
export const ElLoader = styled.div`
  position: relative;
  background: var(--neutral-100);
  height: 3px;
  width: 80px;
`

/** @deprecated */
export const ElLoaderMovingBar = styled.div`
  position: absolute;
  height: 100%;
  width: 0;
  background: var(--purple-500);
  animation: moveDarkBlueBar ${ANIM_TIME}s infinite linear;
  z-index: 3;

  @keyframes moveDarkBlueBar {
    0% {
      width: 0;
    }
    50% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }
`
