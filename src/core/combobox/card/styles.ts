import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElComboboxCard = styled.article`
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

  &[data-size='small'] {
    ${font('xs', 'regular')}
    min-height: var(--size-8);
    --combobox-button-icon-size: var(--icon_size-s);
  }
  /* NOTE: Medium is the default size */
  &,
  &[data-size='medium'] {
    ${font('sm', 'regular')}
    min-height: var(--size-9);
    --combobox-button-icon-size: var(--icon_size-s);
  }
  &[data-size='large'] {
    ${font('base', 'regular')}
    min-height: var(--size-10);
    --combobox-button-icon-size: var(--icon_size-m);
  }
`

export const ElComboboxContent = styled.div`
  padding: var(--spacing-1);
`

export const ElComboboxCardActionContainer = styled.span`
  display: inline-flex;
  align-self: start;
  align-items: center;
  justify-content: center;

  box-sizing: content-box;
  height: var(--combobox-button-icon-size);
  width: var(--combobox-button-icon-size);

  color: var(--combobox-icon-colour, var(--comp-input-colour-icon-default));
`
