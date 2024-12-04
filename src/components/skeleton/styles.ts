import { styled } from '@linaria/react'

export const ElSkeleton = styled.span`
  display: flex;
  background: var(--fill-default-light, #e5e9ed);
  animation: blink 1.5s infinite;

  @keyframes blink {
    0% {
      background: var(--fill-default-light, #e5e9ed);
    }
    50% {
      background: var(--fill-default-lightest, #e5e9ed);
    }
    100% {
      background: var(--fill-default-light, #e5e9ed);
    }
  }
`
