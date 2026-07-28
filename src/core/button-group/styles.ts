import { styled } from "@linaria/react";

interface ElButtonGroupProps {
  "data-align"?: "start" | "end" | "center" | "stretch";
  /** @deprecated Use `data-orientation` instead */
  "data-auto-flow"?: "row" | "column";
  "data-orientation"?: "horizontal" | "vertical";
  /** @deprecated Use `data-align` instead */
  "data-justify-content"?: "start" | "end" | "center" | "stretch";
}

export const ElButtonGroup = styled.div<ElButtonGroupProps>`
  @layer elements.main {
    display: flex;
    gap: var(--spacing-2);

    &:not([data-orientation="vertical"]):not([data-auto-flow="row"]),
    &[data-orientation="horizontal"],
    &[data-auto-flow="column"]:not([data-orientation]) {
      flex-direction: row;
      align-items: center;

      &[data-align="end"],
      &[data-justify-content="end"]:not([data-align]) {
        justify-content: end;
      }

      &[data-align="center"],
      &[data-justify-content="center"]:not([data-align]) {
        justify-content: center;
      }

      &[data-align="stretch"],
      &[data-justify-content="stretch"]:not([data-align]) {
        display: grid;
        grid-auto-columns: 1fr;
        grid-auto-flow: column;
        align-items: stretch;
        justify-content: stretch;
      }
    }

    &[data-orientation="vertical"],
    &[data-auto-flow="row"]:not([data-orientation]) {
      flex-direction: column;
      align-items: start;

      &[data-align="end"],
      &[data-justify-content="end"]:not([data-align]) {
        align-items: end;
      }

      &[data-align="center"],
      &[data-justify-content="center"]:not([data-align]) {
        align-items: center;
      }

      &[data-align="stretch"],
      &[data-justify-content="stretch"]:not([data-align]) {
        align-items: stretch;
      }
    }
  }
`;
