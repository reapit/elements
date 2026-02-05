import { css } from '@linaria/core'
import { font } from './font'
import { fontSizes, fontWeights, textColours } from './types'

export const elText = css`
  /* NOTE: We use :where instead of :is because we want these styles to have lower precedence than
   * those applied by a custom class or other selector */
  &:where(p) {
    margin: 0;
    padding: 0;
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
