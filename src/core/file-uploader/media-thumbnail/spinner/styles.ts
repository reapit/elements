import { styled } from '@linaria/react'

export const ElSpinnerTrack = styled.circle`
  @layer elements.main {
    fill: none;
    stroke: var(--comp-uploader-colour-fill-spinner-background);
  }
`

export const ElSpinnerIndicator = styled.circle`
  @layer elements.main {
    fill: none;
    stroke: var(--comp-uploader-colour-fill-spinner-indicator);
    stroke-linecap: round;
    transform-origin: 50% 50%;

    @media (prefers-reduced-motion: no-preference) {
      animation: spinner-rotate 1s linear infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      animation: spinner-pulse 1.5s ease-in-out infinite;
    }
  }

  @keyframes spinner-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes spinner-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
`
