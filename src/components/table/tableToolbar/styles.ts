import { styled } from '@linaria/react'

export const ElTableToolbar = styled.div`
  display: flex;
  width: 100%;
  background: var(--fill-white);
  padding: var(--spacing-2) 0px var(--spacing-2) 0px;
  gap: 0px;
  justify-content: space-between;
  align-items: center;
`

export const ElTableToolbarDescription = styled.div`
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: 400;
  color: var(--text-colour-text-primary);
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);
  text-align: left;
  gap: var(--spacing-1);
`

export const ElTableToolbarActions = styled.div``

// Skeleton styles
export const ElSkeleton = styled.div`
  display: inline-block;
  background-color: var(--skeleton-bg, #e0e0e0);
  border-radius: 4px;
  animation: blink 1.5s infinite;

  // Default size
  width: 100%;
  height: 100%;

  @keyframes blink {
    0% {
      background-color: var(--skeleton-bg, #e0e0e0);
    }
    50% {
      background-color: var(--skeleton-highlight-bg, #f0f0f0);
    }
    100% {
      background-color: var(--skeleton-bg, #e0e0e0);
    }
  }
`
