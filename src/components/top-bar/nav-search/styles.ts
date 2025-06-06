import { isTablet } from '#src/styles/media'
import { styled } from '@linaria/react'

export const ElNavSearch = styled.div`
  container-name: nav-search;
  container-type: inline-size;
`

export const ElNavSearchButtonContainer = styled.div`
  display: none;

  @supports not (container-type: inline-size) {
    ${isTablet} {
      display: block;
    }
  }
  @supports (container-type: inline-size) {
    @container nav-search (width >= 150px) {
      display: block;
    }
  }
`

export const ElNavSearchIconItemContainer = styled.div`
  display: block;

  @supports not (container-type: inline-size) {
    ${isTablet} {
      display: none;
    }
  }
  @supports (container-type: inline-size) {
    @container nav-search (width >= 150px) {
      display: none;
    }
  }
`
