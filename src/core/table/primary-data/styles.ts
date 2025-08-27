import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElTableCellPrimaryData = styled.div`
  display: inline-grid;
  grid-template: 'icon-left data icon-right' auto / auto auto auto;
  align-items: center;
  justify-content: start;

  ${font('sm', 'regular')}
`

export const ElTableCellPrimaryDataContentContainer = styled.div`
  grid-area: data;
  display: inline-grid;
  overflow: hidden;
  white-space: nowrap;
`

interface ElTableCellPrimaryDataIconContainerProps {
  'data-placement': 'left' | 'right'
}

export const ElTableCellPrimaryDataIconContainer = styled.span<ElTableCellPrimaryDataIconContainerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--icon_size-s);
  height: var(--icon_size-s);

  color: var(--colour-icon-primary);

  &[data-placement='left'] {
    grid-area: icon-left;
    margin-inline-end: var(--spacing-2);
  }

  &[data-placement='right'] {
    grid-area: icon-right;
    margin-inline-start: var(--spacing-2);
  }
`
