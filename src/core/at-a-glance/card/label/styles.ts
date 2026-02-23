import { css } from '@linaria/core'
import { font } from '#src/utils/font'

/**
 * Base label/heading styling. Grid-positioned via grid-area.
 */
export const elAtAGlanceCardLabel = css`
  grid-area: label;
  color: var(--colour-text-primary);
  ${font('base', 'medium')}
  margin: 0;
  padding: 0;
`
