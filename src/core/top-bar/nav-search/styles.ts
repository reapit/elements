import { styled } from '@linaria/react'

export const ElTopBarNavSearch = styled.div`
  container-name: nav-search;
  container-type: inline-size;
`

export const ElTopBarNavSearchButtonContainer = styled.div`
  display: none;

  @container nav-search (width >= 150px) {
    display: block;
  }
`

export const ElTopBarNavSearchIconItemContainer = styled.div`
  display: block;

  @container nav-search (width >= 150px) {
    display: none;
  }
`
