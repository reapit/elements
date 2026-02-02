import { css } from '@linaria/core'

/**
 * Base icon styling. Grid-positioned via grid-area.
 * Padding is set via --aag-card-icon-padding CSS variable from parent card layout.
 */
export const elAtAGlanceCardIcon = css`
  grid-area: icon;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon_size-l);
  height: var(--icon_size-l);
  padding: var(--aag-card-icon-padding);
  color: var(--colour-icon-primary);
`
