import { font } from '#src/core/text/index'
import { styled } from '@linaria/react'

import type { CSSProperties } from 'react'

interface ElChipCSSProperties extends CSSProperties {
  /** Used to determine the maximum width of the chip because the browser does not support
   * [CSS' advanced attr() syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/attr) */
  '--chip-max-width'?: `var(--size-${string})`
}

interface ElChipProps {
  'data-variant': 'filter' | 'selection'
  style?: ElChipCSSProperties
}

export const ElChip = styled.button<ElChipProps>`
  align-items: center;
  border: none;
  border-radius: var(--comp-chip-border-radius);
  color: var(--comp-chip-colour-text-active);
  cursor: pointer;
  display: grid;
  gap: var(--spacing-2);
  grid-template-columns: auto min-content;
  min-height: var(--size-8);
  max-width: var(--chip-max-width, auto);
  padding-block: var(--spacing-1);
  padding-inline: var(--spacing-4) var(--spacing-2);
  width: fit-content;

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }

  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
    color: var(--comp-chip-colour-text-disabled);
  }

  &[data-variant='filter'] {
    background: var(--comp-chip-colour-fill-filter-default);

    &:hover {
      background: var(--comp-chip-colour-fill-filter-hover);
    }

    &:disabled,
    &:disabled:hover,
    &[aria-disabled='true'],
    &[aria-disabled='true']:hover {
      background: var(--comp-chip-colour-fill-filter-disabled);
    }
  }

  &[data-variant='selection'] {
    background: var(--comp-chip-colour-fill-selection-default);

    &:hover {
      background: var(--comp-chip-colour-fill-selection-hover);
    }

    &:disabled,
    &:disabled:hover,
    &[aria-disabled='true'],
    &[aria-disabled='true']:hover {
      background: var(--comp-chip-colour-fill-selection-disabled);
    }
  }
`

interface ElChipLabelProps {
  'data-will-truncate'?: boolean
}

export const ElChipLabel = styled.span<ElChipLabelProps>`
  color: var(--text-primary);

  /* Allows long words to be broken and wrapped onto the next line. */
  overflow-wrap: anywhere;

  ${font('sm', 'regular')}

  text-align: left;

  &[data-will-truncate='true'] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :disabled &,
  [aria-disabled='true'] & {
    color: var(--text-placeholder);
  }
`

export const ElChipClearIcon = styled.div`
  /* NOTE: We only use !important here because the current Icon component
   * does not allow consumer-supplied styles to have a higher specificity */
  color: var(--comp-chip-colour-icon-active) !important;

  height: var(--icon_size-s) !important;
  width: var(--icon_size-s) !important;

  :disabled &,
  [aria-disabled='true'] & {
    color: var(--comp-chip-colour-icon-disabled) !important;
  }
`
