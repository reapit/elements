import { styled } from "@linaria/react";

import { font } from "#src/utils/font";

export const ElComboboxCard = styled.div`
  @layer elements.main {
    position: relative;

    display: inline-flex;
    align-items: stretch;
    justify-content: space-between;
    /* NOTE: Combobox sets --combobox-max-width */
    max-width: var(--combobox-max-width, 100%);
    width: 100%;
    height: 100%;

    padding: var(--spacing-1);

    /* We ignore the combobox set background and colour variables because we don't want them for the card UI */
    background: var(--comp-input-colour-fill-background-default);
    border-radius: var(--border-radius-l);
    color: var(--comp-input-colour-text-default-input);

    /* NOTE: Combobox sets --combobox-* variables. Fallbacks enable standalone demos. */
    border: var(--combobox-border-width, var(--comp-input-border-width)) solid
      var(--combobox-border-colour, var(--comp-input-colour-border-default));

    &[data-size="small"] {
      /* Combobox.CardDefaultContent inherits these size-based font styles */
      ${font("xs", "medium")}
      min-height: var(--size-8);
      --combobox-button-icon-size: var(--icon_size-sm);
    }
    /* NOTE: Medium is the default size */
    &,
    &[data-size="medium"] {
      ${font("sm", "medium")}
      min-height: var(--size-9);
      --combobox-button-icon-size: var(--icon_size-sm);
    }
    &[data-size="large"] {
      ${font("base", "medium")}
      min-height: var(--size-10);
      --combobox-button-icon-size: var(--icon_size-md);
    }

    /* Use :focus rather than :focus-visible to provide the same visual feedback
     * as other inputs/form controls. */
    &:has(button:focus) {
      border: var(--comp-input-border-width) solid var(--comp-input-colour-border-focused);
    }
  }
`;

export const ElComboboxCardButton = styled.button`
  @layer elements.main {
    appearance: none;
    background: transparent;
    border: none;
    outline: none;

    display: inline-flex;
    align-items: center;
    width: 100%;
    padding: var(--spacing-1);
    /* NOTE: ElComboboxInputContainer sets --combobox-max-width */
    max-width: var(--combobox-max-width, 100%);

    font: inherit;
    text-align: left;

    color: var(--combobox-text-colour);
  }
`;

export const ElComboboxCardActionContainer = styled.span`
  @layer elements.main {
    display: inline-flex;
    align-self: start;
    align-items: center;
    justify-content: center;

    box-sizing: content-box;
    height: var(--combobox-button-icon-size);
    width: var(--combobox-button-icon-size);

    color: var(--combobox-icon-colour, var(--comp-input-colour-icon-default));
  }
`;
