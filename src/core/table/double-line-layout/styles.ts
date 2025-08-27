import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElTableCellDoubleLineLayout = styled.div`
  display: inline-grid;
  grid-template: 'media-item primary-data' auto 'media-item supplementary-data' auto / auto 1fr;
  align-items: center;
  justify-content: inherit;
  justify-self: inherit;

  padding-block: var(--spacing-2);
`

export const ElTableCellDoubleLineLayoutPrimaryData = styled.div`
  grid-area: primary-data;
  display: inline-grid;
  justify-content: inherit;
  justify-self: inherit;

  /* NOTE: We want to avoid any overflow AND prevent text from wrapping. The nowrap
   * behaviour here is important because some components may be design to wrap by default.
   * However, when used in a table cell, we don't want them to. */
  overflow: hidden;
  white-space: nowrap;

  ${font('sm', 'regular')}
`

export const ElTableCellDoubleLineLayoutSupplementaryData = styled.span`
  grid-area: supplementary-data;
  display: inline-grid;
  color: var(--colour-text-secondary);
  justify-content: inherit;
  justify-self: inherit;

  /* NOTE: We want to avoid any overflow AND prevent text from wrapping. The nowrap
   * behaviour here is important because some components may be design to wrap by default.
   * However, when used in a table cell, we don't want them to. */
  overflow: hidden;
  white-space: nowrap;

  ${font('xs', 'regular')}

  margin-block-start: var(--spacing-1);
`

export const ElTableCellDoubleLineLayoutMediaItem = styled.div`
  grid-area: media-item;
  max-height: var(--size-10);
  margin-inline-end: var(--spacing-4);
`
