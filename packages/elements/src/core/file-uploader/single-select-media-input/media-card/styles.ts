import { css } from "@linaria/core";
import { styled } from "@linaria/react";

import { font } from "#src/utils/font";

export const ElFileUploaderSingleSelectMediaCard = styled.div`
  @layer elements.main {
    position: relative;
    display: block;
    width: 100%;
    border-radius: var(--border-radius-l);
    cursor: pointer;

    /* We create a new stacking context to ensure the z-index layering we setup for the remove button
     * is contained to the media card */
    isolation: isolate;
    z-index: var(--z-index-base);

    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }

    &[data-disabled="true"] {
      cursor: not-allowed;
    }
  }
`;

export const elFileUploaderSingleSelectMediaCardRemoveButton = css`
  @layer elements.main {
    position: relative;
    /* We need the remove button to sit above the replace overlay */
    z-index: var(--z-index-elevated);
  }
`;

export const ElFileUploaderSingleSelectMediaCardReplaceOverlay = styled.div`
  @layer elements.main {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius-l);
    background: var(--overlay-50);
    opacity: 0;

    ${ElFileUploaderSingleSelectMediaCard}:hover &,
    ${ElFileUploaderSingleSelectMediaCard}:focus-within &,
    ${ElFileUploaderSingleSelectMediaCard}[data-is-dragging-over='true'] & {
      opacity: 1;
    }
  }
`;

export const ElFileUploaderSingleSelectMediaCardReplaceLabel = styled.span`
  @layer elements.main {
    ${font("sm", "bold")}
    display: inline-flex;
    align-items: center;
    height: var(--size-9);
    padding-inline: var(--spacing-4);
    border: var(--border-width-double) solid var(--colour-border-white);
    border-radius: var(--comp-button-border-radius-default);
    color: var(--comp-button-colour-text-primary-default);
    white-space: nowrap;
  }
`;
