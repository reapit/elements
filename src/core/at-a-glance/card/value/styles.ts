import { css } from '@linaria/core'
import { font } from '#src/utils/font'

/**
 * Base value/metric styling. Grid-positioned via grid-area.
 * Alignment and padding set via CSS variables from parent card layout.
 * Color can be customized via --aag-card-value-colour CSS variable.
 */
export const elAtAGlanceCardValue = css`
  grid-area: value;
  align-self: var(--aag-card-value-align-self);
  color: var(--aag-card-value-colour, var(--colour-text-primary));
  ${font('2xl', 'bold')}
  white-space: nowrap;
  margin: 0;
  padding: var(--aag-card-value-padding);
`
