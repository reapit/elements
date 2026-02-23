import { css } from '@linaria/core'
import { font } from '#src/utils/font'
import { fontSizes, fontWeights } from '#src/utils/font'
import { textColours } from '#src/utils/text'

export const elHeading = css`
  /* NOTE: We use :where instead of :is because we want these styles to have lower precedence than
   * those applied by a custom class or other selector */
  &:where(h1, h2, h3, h4, h5, h6) {
    margin: 0;
    padding: 0;
  }

  ${generateElHeadingFontStyles()}
  ${generateElHeadingColourStyles()}
`

function generateElHeadingFontStyles() {
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

function generateElHeadingColourStyles() {
  return textColours
    .map((colour) => {
      return `&[data-colour='${colour}'] {
      color: ${colour === 'inherit' ? 'inherit' : `var(--colour-text-${colour})`};
    }`
    })
    .join('\n')
}
