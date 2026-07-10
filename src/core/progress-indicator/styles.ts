import { styled } from '@linaria/react'

export const ElProgressIndicatorTrack = styled.div`
  @layer elements.main {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: var(--size-1);
    background: var(--colour-fill-white);
  }
`

export const ElProgressIndicatorFill = styled.div`
  @layer elements.main {
    position: absolute;
    top: 0;
    bottom: 0;
    background: var(--comp-progress_bar-colour-fill);
  }
`

export const ElDeterminateProgressIndicatorFill = styled(ElProgressIndicatorFill)`
  @layer elements.main {
    left: 0;
    transform-origin: left;

    @media (prefers-reduced-motion: no-preference) {
      transition: width 200ms ease-out;
      animation: determinate-progress-indicator 300ms;
    }
  }

  @keyframes determinate-progress-indicator {
    0% {
      animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
      scale: 0 1;
    }
    100% {
      scale: 1 1;
    }
  }
`

export const ElIndeterminateProgressIndicatorFill = styled(ElProgressIndicatorFill)`
  @layer elements.main {
    width: 25%;

    @media (prefers-reduced-motion: no-preference) {
      animation: indeterminate-progress-indicator 1.5s ease-in-out infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      left: 0;
      width: 100%;
      animation: indeterminate-progress-indicator-pulse 1.5s ease-in-out infinite;
    }
  }

  @keyframes indeterminate-progress-indicator {
    0% {
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
      left: -25%;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes indeterminate-progress-indicator-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
`
