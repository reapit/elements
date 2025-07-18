import { styled } from '@linaria/react'

export const ElSkeleton = styled.span`
  display: flex;
  background: var(--colour-fill-neutral-light);
  animation: blink 1.5s infinite;

  @keyframes blink {
    0% {
      background: var(--colour-fill-neutral-light);
    }
    50% {
      background: var(--colour-fill-neutral-lightest);
    }
    100% {
      background: var(--colour-fill-neutral-light);
    }
  }
`
