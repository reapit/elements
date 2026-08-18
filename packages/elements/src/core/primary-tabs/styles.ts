import { styled } from "@linaria/react";

export interface ElPrimaryTabsProps {
  "data-overflow": "scroll" | "visible";
}

export const ElPrimaryTabs = styled.nav<ElPrimaryTabsProps>`
  @layer elements.main {
    border-bottom: var(--border-width-default) solid var(--comp-tab-colour-border-group);
    width: 100%;

    &,
    &[data-overflow="visible"] {
      overflow-x: visible;
    }

    &[data-overflow="scroll"] {
      overflow-x: auto;
    }
  }
`;

export interface ElPrimaryTabsListProps {
  "data-justify-content": "start" | "stretch";
}

export const ElPrimaryTabsList = styled.menu<ElPrimaryTabsListProps>`
  @layer elements.main {
    position: relative;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: var(--spacing-8);
    list-style: none;

    margin: 0;
    padding: 0;

    &[data-justify-content="stretch"] {
      gap: var(--spacing-none);
    }
  }
`;

export const ElPrimaryTabsListItem = styled.li`
  @layer elements.main {
    display: flex;
    align-items: center;

    menu[data-justify-content="stretch"] > & {
      flex: 1 1 0%;
    }
  }
`;
