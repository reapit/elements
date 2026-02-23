import { css } from '@linaria/core'
import { font } from '#src/utils/font'

/**
 * Base description text styling. Grid-positioned via grid-area.
 */
export const elAtAGlanceCardDescription = css`
  grid-area: description;
  color: var(--colour-text-secondary);
  ${font('sm', 'regular')}
  margin: 0;
  padding: 0;
`
