import { styled } from "@linaria/react";

export const ElTopBarSecondaryNav = styled.nav``;

export const ElTopBarSecondaryNavList = styled.ul`
  @layer elements.main {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: var(--spacing-2);
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const ElTopBarSecondaryNavListItem = styled.li`
  @layer elements.main {
    display: flex;
    align-items: center;
  }
`;
