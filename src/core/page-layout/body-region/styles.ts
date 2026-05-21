import { styled } from '@linaria/react'

interface ElPageLayoutBodyRegionProps {
  'data-overflow': 'auto' | undefined
}

export const ElPageLayoutBodyRegion = styled.main<ElPageLayoutBodyRegionProps>`
  @layer elements.main {
    grid-area: body;
    container-type: inline-size;

    &[data-overflow='auto'] {
      overflow: auto;
    }
  }
`
