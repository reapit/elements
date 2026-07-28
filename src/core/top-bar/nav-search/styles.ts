import { styled } from "@linaria/react";

export const ElTopBarNavSearch = styled.div`
  @layer elements.main {
    container-name: nav-search;
    container-type: inline-size;
  }
`;

export const ElTopBarNavSearchButtonContainer = styled.div`
  @layer elements.main {
    display: none;

    @container nav-search (width >= 150px) {
      display: block;
    }
  }
`;

export const ElTopBarNavSearchIconItemContainer = styled.div`
  @layer elements.main {
    display: block;

    @container nav-search (width >= 150px) {
      display: none;
    }
  }
`;
