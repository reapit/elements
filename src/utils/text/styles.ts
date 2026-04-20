import { css } from '@linaria/core'
import { font } from '#src/utils/font'
import { fontSizes, fontWeights } from '#src/utils/font'
import { textColours } from './types'

export const elText = css`
  /* We place these styles inside a layer so they can be easily overridden by a
   * consumer-supplied class. We also use :where() to further reduce specificity. */
  @layer default {
    &:where(p) {
      margin: 0;
      padding: 0;
    }
  }

  ${generateElTextFontStyles()}
  ${generateElTextColourStyles()}

  &[data-overflow='truncate'] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

function generateElTextFontStyles() {
  return `
  &[data-font-size='inherit'][data-font-weight='inherit'] {
    font: inherit;
  }

  ${fontSizes
    .map((size) => {
      return fontWeights
        .map((weight) => {
          return `
        &[data-font-size='${size}'][data-font-weight='${weight}'] {
          ${font(size, weight)}
        }
      `
        })
        .join('\n')
    })
    .join('\n')}
  `
}

function generateElTextColourStyles() {
  return textColours
    .map((colour) => {
      return `&[data-colour='${colour}'] {
      color: ${colour === 'inherit' ? 'inherit' : `var(--colour-text-${colour})`};
    }`
    })
    .join('\n')
}
