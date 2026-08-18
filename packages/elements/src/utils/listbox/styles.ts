import { css } from "@linaria/core";

export const elListboxContainer = css`
  @layer elements.main {
    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }

    /* Once an option is active, its own data-is-active outline (see consumer styles, e.g.
     * ElComboboxOption) communicates focus position instead — suppress the container's
     * outline so the two don't render at once. */
    &:has([data-is-active="true"]) {
      outline: none;
    }
  }
`;
