import { styled } from '@linaria/react'
import { FOCUSED_LAYOUT_CSS_CONTAINER_NAME } from './constants'

interface ElFocusedLayoutProps {
  'data-background': 'light' | 'dark'
}

export const ElFocusedLayout = styled.div<ElFocusedLayoutProps>`
  container-name: ${FOCUSED_LAYOUT_CSS_CONTAINER_NAME};
  container-type: inline-size;

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100svh;
  overflow-y: auto;
  isolation: isolate;

  &[data-background='light'] {
    background-color: var(--colour-fill-white);
  }

  &[data-background='dark'] {
    background-color: var(--colour-fill-neutral-light);
  }
`
