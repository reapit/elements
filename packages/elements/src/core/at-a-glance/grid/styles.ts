import { css } from "@linaria/core";
import { styled } from "@linaria/react";

export const elAtAGlanceGrid = css`
  @layer elements.main {
    display: grid;
    gap: var(--aag-grid-gap, var(--spacing-4));
    /* Ensures the card's outlines and shadows do not get clipped by the scroll container */
    padding-block: var(--spacing-1) var(--spacing-2);
    padding-inline: var(--border-width-double);
    margin-block: calc(0px - var(--spacing-1)) calc(0px - var(--spacing-2));
    margin-inline: calc(0px - var(--border-width-double));
    list-style: none;

    &,
    &[data-layout="template"] {
      grid-auto-flow: row;
    }
    &[data-layout="auto"] {
      grid-auto-flow: column;
      overflow: auto;
      scroll-snap-type: x mandatory;
      /* Account for grid container padding when scroll snapping */
      scroll-padding: var(--border-width-double);

      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

export const ElAtAGlanceGridItem = styled.li`
  @layer elements.main {
    display: grid;
    padding: 0;
    margin: 0;

    scroll-snap-align: center;
  }
`;
