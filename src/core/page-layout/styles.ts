import { styled } from '@linaria/react'

interface ElPageLayoutProps {
  'data-overflow': 'auto' | undefined
}

export const ElPageLayout = styled.div<ElPageLayoutProps>`
  @layer elements.main {
    container-type: inline-size;

    display: grid;
    grid-template:
      'top-bar top-bar' auto
      'side-bar body' 1fr
      'side-bar bottom-bar' auto / min-content 1fr;

    /* NOTE: This is a default value; it can be overridden via inline styles */
    background-color: var(--colour-fill-white);

    width: 100%;
    height: 100svh;

    &[data-overflow='auto'] {
      overflow: auto;
    }
  }
`
