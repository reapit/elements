import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElComboboxButtonContainer = styled.div`
  position: relative;

  display: inline-flex;
  align-items: stretch;
  /* NOTE: Combobox sets --combobox-max-width */
  max-width: var(--combobox-max-width, 100%);
  width: 100%;
  height: 100%;

  padding: 0;

  /* NOTE: Combobox sets --combobox-* variables. Fallbacks enable standalone demos. */
  background: var(--combobox-background, var(--comp-input-colour-fill-background-default));
  border-radius: var(--combobox-border-radius, var(--comp-input-border-radius));
  border: var(--combobox-border-width, var(--comp-input-border-width)) solid
    var(--combobox-border-colour, var(--comp-input-colour-border-default));
  color: var(--combobox-text-colour, var(--comp-input-colour-text-default-input));

  &[data-size='small'] {
    ${font('xs', 'regular')}
    height: var(--size-8);
    --combobox-button-addon-padding-inline: var(--spacing-2);
    --combobox-button-icon-size: var(--icon_size-s);
  }
  /* NOTE: Medium is the default size */
  &,
  &[data-size='medium'] {
    ${font('sm', 'regular')}
    height: var(--size-9);
    --combobox-button-addon-padding-inline: var(--spacing-3);
    --combobox-button-icon-size: var(--icon_size-s);
  }
  &[data-size='large'] {
    ${font('base', 'regular')}
    height: var(--size-10);
    --combobox-button-addon-padding-inline: var(--spacing-3);
    --combobox-button-icon-size: var(--icon_size-m);
  }

  /* Use :focus rather than :focus-visible to provide the same visual feedback
   * as other inputs/form controls. */
  &:has(button:focus) {
    border: var(--comp-input-border-width) solid var(--comp-input-colour-border-focused);
  }
`

export const ElComboboxButton = styled.button`
  --padding-without-action: var(--spacing-3);
  --padding-with-action: calc(
    var(--spacing-2) + var(--combobox-button-icon-size) + var(--combobox-button-addon-padding-inline)
  );
  position: absolute;
  inset: 0;

  appearance: none;
  background: transparent;
  border: none;
  outline: none;

  display: inline-flex;
  align-items: center;
  width: 100%;
  padding-block: 0;
  padding-inline: var(--padding-inline-start) var(--padding-inline-end);
  /* NOTE: ElComboboxInputContainer sets --combobox-max-width */
  max-width: var(--combobox-max-width, 100%);

  font: inherit;
  text-align: left;

  color: var(--combobox-text-colour);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  /* Style placeholder text when data-placeholder-shown is true */
  &[data-placeholder-shown='true'] {
    color: var(--combobox-placeholder-colour, var(--comp-input-colour-text-default-placeholder));
  }

  /* No trailing action */
  &:only-child {
    --padding-inline-start: var(--padding-without-action);
    --padding-inline-end: var(--padding-without-action);
  }

  /* Trailing action */
  &:not(:only-child) {
    --padding-inline-start: var(--padding-without-action);
    --padding-inline-end: var(--padding-with-action);
  }
`

export const ElComboboxButtonIconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  box-sizing: content-box;
  height: var(--combobox-button-icon-size);
  width: var(--combobox-button-icon-size);
  padding-inline-end: var(--combobox-button-addon-padding-inline);

  color: var(--combobox-icon-colour, var(--comp-input-colour-icon-default));
`

export const ElComboboxButtonLabelContainer = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ElComboboxButtonActionContainer = styled.span`
  /* NOTE: Absolute positioning allows the primary button to fill the container. This ensures the popup's
   * size visually matches the container. */
  position: absolute;
  right: 0;

  display: inline-flex;
  align-self: center;
  align-items: center;
  justify-content: center;

  box-sizing: content-box;
  height: var(--combobox-button-icon-size);
  width: var(--combobox-button-icon-size);
  padding-inline-end: var(--combobox-button-addon-padding-inline);

  color: var(--combobox-icon-colour, var(--comp-input-colour-icon-default));
`
