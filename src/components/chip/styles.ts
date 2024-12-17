import { styled } from '@linaria/react'
import { Icon } from '../icon'

interface ElChipProps {
  'data-variant': 'filter' | 'selection'
}

export const ElChip = styled.button<ElChipProps>`
  align-items: center;
  border: none;
  border-radius: var(--corner-2xl);
  cursor: pointer;
  display: grid;
  gap: var(--spacing-2);
  grid-template-columns: auto min-content;
  height: min-content;
  padding-block: var(--spacing-1);
  padding-inline: var(--spacing-4) var(--spacing-2);
  width: fit-content;

  &[data-variant='filter'] {
    background: var(--fill-action-lightest);

    &:hover {
      background: var(--fill-action-light);
    }
  }

  &[data-variant='selection'] {
    background: var(--fill-default-lightest);

    &:hover {
      background: var(--fill-default-light);
    }
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    background: var(--fill-default-lightest);

    &:hover {
      background: var(--fill-default-lightest);
    }
  }

  &:focus-visible {
    outline: 3px solid var(--purple-300);
    outline-offset: var(--size-px);
  }
`

interface ElChipLabelProps {
  'data-will-truncate'?: boolean
}

export const ElChipLabel = styled.span<ElChipLabelProps>`
  color: var(--text-primary);

  /* text-sm/Regular */
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-style: normal;
  font-weight: 400;
  letter-spacing: var(--letter-spacing-sm);
  line-height: var(--line-height-sm);
  text-align: left;

  &[data-will-truncate='true'] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  [aria-disabled='true'] & {
    color: var(--text-placeholder);
  }
`

export const ElChipClearIcon = styled(Icon)`
  /* NOTE: We only use !important here because the current Icon component
   * does not allow consumer-supplied styles to have a higher specificity */
  color: var(--icon-secondary) !important;
  font-size: 1rem;
  height: var(--size-icon-sm) !important;
  width: var(--size-icon-sm) !important;

  [aria-disabled='true'] & {
    color: var(--icon-disabled) !important;
  }
`
