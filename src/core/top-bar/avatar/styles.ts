import { css } from "@linaria/core";

import { ElAvatar } from "#src/core/avatar/styles";

export const elTopBarAvatarBase = css`
  @layer elements.main {
    display: inline-block;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    border-radius: var(--comp-navigation-border-radius-avatar_button);

    /* Override default UA text underline applied to anchor elements. */
    text-decoration: none;

    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }

    &:hover ${ElAvatar} {
      background: var(--comp-navigation-colour-fill-avatar_button-hover);
    }
  }
`;
