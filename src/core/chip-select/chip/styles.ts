import { font } from '#src/core/text/index'
import { styled } from '@linaria/react'

interface ElChipSelectChipProps {
  'data-size': 'small' | 'medium' | 'large'
}

export const ElChipSelectChip = styled.label<ElChipSelectChipProps>`
  display: inline-flex;
  gap: var(--spacing-1);

  width: fit-content;
  /* NOTE: max-width can be overridden via inline styles when an explicit maxWidth prop is provided
   * to ChipSelectOption */
  max-width: 100%;

  background: var(--colour-white);

  align-items: center;
  border: var(--comp-interactive_chip-border-width) solid var(--comp-interactive_chip-colour-border-default);
  border-radius: var(--comp-interactive_chip-border-radius);
  cursor: pointer;

  &:has(input:checked) {
    border-color: var(--comp-interactive_chip-colour-fill-default-selected);
    background: var(--comp-interactive_chip-colour-fill-default-selected);
    color: var(--comp-interactive_chip-colour-text-default-selected);
  }

  &:hover {
    background: var(--comp-interactive_chip-colour-fill-hover-unselected);
    border-color: var(--comp-interactive_chip-colour-border-hover);

    &:has(input:checked) {
      border-color: var(--comp-interactive_chip-colour-fill-hover-selected);
      background: var(--comp-interactive_chip-colour-fill-hover-selected);
      color: var(--comp-interactive_chip-colour-text-hover-selected);
    }
  }

  &:has(input:focus-visible) {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }

  &:has(input:disabled) {
    cursor: not-allowed;
    background: var(--comp-interactive_chip-colour-fill-disabled-unselected);
    border-color: var(--comp-interactive_chip-colour-fill-disabled-unselected);
    color: var(--comp-interactive_chip-colour-text-disabled-unselected);

    &:has(input:checked) {
      border-color: var(--comp-interactive_chip-colour-fill-disabled-selected);
      background: var(--comp-interactive_chip-colour-fill-disabled-selected);
      color: var(--comp-interactive_chip-colour-text-disabled-selected);
    }
  }

  &[data-size='small'] {
    height: var(--size-8);
    padding-inline: var(--spacing-3);
  }
  &[data-size='medium'] {
    height: var(--size-9);
    padding-inline: var(--spacing-4);
  }
  &[data-size='large'] {
    height: var(--size-10);
    padding-inline: var(--spacing-4);
  }
`

export const ElChipSelectChipInput = styled.input`
  /* Visually hide the checkbox but keep it accessible */
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  outline: none;
  border: 0;
`

export const ElChipSelectChipIconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;

  box-sizing: content-box;

  padding: var(--spacing-half);

  color: var(--comp-interactive_chip-colour-icon-default-unselected);

  input:checked ~ & {
    color: var(--comp-interactive_chip-colour-icon-default-selected);
  }

  label:hover ~ & {
    color: var(--comp-interactive_chip-colour-icon-hover-unselected);
  }

  label:hover:has(input:checked) ~ & {
    color: var(--comp-interactive_chip-colour-icon-hover-selected);
  }

  input:disabled ~ & {
    color: var(--comp-interactive_chip-colour-icon-disabled-unselected);
  }

  input:disabled:checked ~ & {
    color: var(--comp-interactive_chip-colour-icon-disabled-selected);
  }

  [data-size='small'] &,
  [data-size='medium'] & {
    width: var(--icon_size-s);
    height: var(--icon_size-s);
  }
  [data-size='large'] & {
    width: var(--icon_size-m);
    height: var(--icon_size-m);
  }
`

interface ElChipSelectChipLabelTextProps {
  'data-overflow': 'truncate' | undefined
}

export const ElChipSelectChipLabelText = styled.span<ElChipSelectChipLabelTextProps>`
  display: inline-block;
  padding-inline: var(--spacing-half);

  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  input:checked ~ * & {
    color: var(--neutral-700);
  }

  input:disabled ~ * & {
    color: var(--neutral-400);
  }

  [data-size='small'] &,
  [data-size='medium'] & {
    ${font('sm', 'medium')}
  }
  [data-size='large'] & {
    ${font('base', 'medium')}
  }
`
