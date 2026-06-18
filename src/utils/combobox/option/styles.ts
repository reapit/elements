import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const ElComboboxOption = styled.button`
  @layer elements.main {
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
  }
`

export const ElComboboxOptionCheckIconContainer = styled.span`
  @layer elements.main {
    grid-area: check;
    align-self: start;
    box-sizing: content-box;
    display: var(--combobox-option-check-icon-display);
    align-items: center;
    justify-content: center;

    color: var(--combobox-option-check-icon-colour);

    height: var(--icon_size-md);
    width: var(--icon_size-md);
    margin-inline-start: var(--spacing-2);
  }
`

export const ElComboboxOptionLabel = styled.span`
  @layer elements.main {
    grid-area: label;
    font: inherit;
    color: inherit;
  }
`

export const ElComboboxOptionTextContainer = styled.span`
  @layer elements.main {
    font: inherit;
    color: inherit;
    margin-inline-end: var(--spacing-2);
  }
`

export const ElComboboxOptionBadgeContainer = styled.span`
  @layer elements.main {
    display: inline-flex;
    align-items: center;
  }
`

export const ElComboboxOptionAdditionalInfoContainer = styled.span`
  @layer elements.main {
    grid-column: 1 / -1;
    display: flex;
    flex-flow: column nowrap;
    gap: var(--spacing-half);

    ${font('xs', 'regular')}
    color: var(--comp-menu-colour-text-default-secondary);

    margin-block-start: var(--spacing-half);
  }
`

export const ElComboboxOptionAdditionalInfo = styled.span`
  @layer elements.main {
    font: inherit;
    color: inherit;
    min-height: var(--size-5);
  }
`

export const ElComboboxOptionAdditionalInfoIconContainer = styled.span`
  @layer elements.main {
    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: text-bottom;

    color: var(--comp-menu-colour-icon-default-left);

    margin-inline-end: var(--spacing-2);
    height: var(--icon_size-sm);
    width: var(--icon_size-sm);
  }
`
