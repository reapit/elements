import { css } from '@linaria/core'
import { font } from '#src/utils/font'

export const elFormLayoutSectionTitle = css`
  @layer elements.main {
    ${font('base', 'bold')}
    margin: 0;
  }
`
