import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const ElComboboxOption = styled.button`
  --combobox-option-check-icon-display: none;
  --combobox-option-check-icon-colour: var(--comp-menu-colour-icon-default-action);
  --combobox-option-label-colour: var(--comp-menu-colour-text-default);

  display: grid;
  grid: 'label check' auto / 1fr auto;
  grid-auto-flow: row;
  grid-auto-rows: auto;
  align-items: center;
  justify-content: start;

  appearance: none;
  background-color: var(--combobox-option-background-colour, transparent);
  color: var(--combobox-option-label-colour);
  cursor: pointer;
  user-select: none;

  width: 100%;
  border: none;
  border-radius: var(--comp-menu-border-radius);
  padding: var(--spacing-2) var(--spacing-3);

  text-align: left;

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }

  &:hover {
    --combobox-option-background-colour: var(--comp-menu-colour-fill-hover);
    --combobox-option-check-icon-colour: var(--comp-menu-colour-icon-hover-action);
  }

  &,
  &[data-size='medium'] {
    ${font('sm', 'regular')}
  }

  &[data-size='large'] {
    ${font('base', 'regular')}
  }

  &[aria-checked='true'],
  &[aria-selected='true'] {
    --combobox-option-check-icon-display: inline-flex;
    --combobox-option-label-colour: var(--comp-menu-colour-text-default-action);

    &,
    &[data-size='medium'] {
      ${font('sm', 'bold')}
    }

    &[data-size='large'] {
      ${font('base', 'bold')}
    }
  }
`

export const ElComboboxOptionCheckIconContainer = styled.span`
  grid-area: check;
  align-self: start;
  box-sizing: content-box;
  display: var(--combobox-option-check-icon-display);
  align-items: center;
  justify-content: center;

  color: var(--combobox-option-check-icon-colour);

  height: var(--icon_size-m);
  width: var(--icon_size-m);
  margin-inline-start: var(--spacing-2);
`

export const ElComboboxOptionLabel = styled.span`
  grid-area: label;
  font: inherit;
  color: inherit;
`

export const ElComboboxOptionTextContainer = styled.span`
  font: inherit;
  color: inherit;
  margin-inline-end: var(--spacing-2);
`

export const ElComboboxOptionBadgeContainer = styled.span`
  display: inline-flex;
  align-items: center;
`

export const ElComboboxOptionAdditionalInfoContainer = styled.span`
  grid-column: 1 / -1;
  display: flex;
  flex-flow: column nowrap;
  gap: var(--spacing-half);

  ${font('xs', 'regular')}
  color: var(--comp-menu-colour-text-default-secondary);

  margin-block-start: var(--spacing-half);
`

export const ElComboboxOptionAdditionalInfo = styled.span`
  font: inherit;
  color: inherit;
  min-height: var(--size-5);
`

export const ElComboboxOptionAdditionalInfoIconContainer = styled.span`
  box-sizing: content-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: text-bottom;

  color: var(--comp-menu-colour-icon-default-left);

  margin-inline-end: var(--spacing-2);
  height: var(--icon_size-s);
  width: var(--icon_size-s);
`
