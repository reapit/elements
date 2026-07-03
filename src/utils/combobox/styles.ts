import { styled } from '@linaria/react'

import type { CSSProperties } from 'react'

interface ElComboboxProps {
  // NOTE: We use a CSS variable for the max-width rather than simply using the max-width inline
  // style because we want the max-width to be available to both the container and input elements.
  style?: CSSProperties & {
    '--combobox-max-width'?: string
  }
}

export const ElCombobox = styled.div<ElComboboxProps>`
  @layer elements.main {
    display: inline-flex;
    align-items: center;
    max-width: var(--combobox-max-width, 100%);
    width: 100%;

    /* Default theme variables: These CSS variables define the combobox appearance in its default state.
     * They are mapped from design system tokens and can be overridden by descendant components.
     * State-specific selectors below (:invalid, :focus-visible, :disabled) override these defaults. */
    --combobox-background: var(--comp-input-colour-fill-default-background);
    --combobox-border-colour: var(--comp-input-colour-border-default);
    --combobox-border-radius: var(--comp-input-border-radius);
    --combobox-border-width: var(--comp-input-border-width);
    --combobox-icon-colour: var(--comp-input-colour-icon-default);
    --combobox-placeholder-colour: var(--comp-input-colour-text-default-placeholder);
    --combobox-text-colour: var(--comp-input-colour-text-default-input);

    /* Error state: When the combobox contains an invalid select and showValidity is enabled,
     * override theme variables to display error styling. aria-invalid="true", when present on
     * the combobox element (the button) is also supported. */
    &:has(select:invalid, select:user-invalid):where([data-show-validity='true']),
    &:has(button[aria-invalid='true']):where([data-show-validity='true']) {
      --combobox-background: var(--comp-input-colour-fill-error-background);
      --combobox-border-colour: var(--comp-input-colour-border-error);
      --combobox-icon-colour: var(--comp-input-colour-icon-error);
      --combobox-placeholder-colour: var(--comp-input-colour-text-error-placeholder);
      --combobox-text-colour: var(--comp-input-colour-text-error-input);
    }

    /* Focused state: When the combobox contains a focused element, override theme variables
     * to display focused styling. This takes precedence over default state. */
    &:has(:focus) {
      --combobox-background: var(--comp-input-colour-fill-focused-background);
      --combobox-border-colour: var(--comp-input-colour-border-focused);
      --combobox-icon-colour: var(--comp-input-colour-icon-focused);
      --combobox-placeholder-colour: var(--comp-input-colour-text-focused-placeholder);
      --combobox-text-colour: var(--comp-input-colour-text-focused-input);
    }

    /* Disabled state: When the combobox contains a disabled select, override theme variables
     * to display disabled styling. This takes precedence over all other states. */
    &:has(select:disabled) {
      --combobox-background: var(--comp-input-colour-fill-disabled-background);
      --combobox-border-colour: var(--comp-input-colour-border-disabled);
      --combobox-icon-colour: var(--comp-input-colour-icon-disabled);
      --combobox-placeholder-colour: var(--comp-input-colour-text-disabled-placeholder);
      --combobox-text-colour: var(--comp-input-colour-text-disabled-input);
    }
  }
`
