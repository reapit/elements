import { css } from "@linaria/core";

export const elPopover = css`
  @layer elements.base {
    position: absolute;
    inset: auto;
    background: none;
    border: none;
    padding: 0;
    margin: 0;

    border-radius: var(--popover-border-radius, 0);
    max-height: var(--popover-max-height, max-content);
    max-width: var(--popover-max-width, max-content);

    &,
    &[data-elevation="none"] {
      box-shadow: none;
    }
    &[data-elevation="xs"] {
      box-shadow: var(--shadow-down-xs);
    }
    &[data-elevation="sm"] {
      box-shadow: var(--shadow-down-sm);
    }
    &[data-elevation="md"] {
      box-shadow: var(--shadow-down-md);
    }
    &[data-elevation="lg"] {
      box-shadow: var(--shadow-down-lg);
    }
    &[data-elevation="xl"] {
      box-shadow: var(--shadow-down-xl);
    }
    &[data-elevation="2xl"] {
      box-shadow: var(--shadow-down-2xl);
    }
  }
`;
