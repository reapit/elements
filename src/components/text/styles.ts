import { font } from './font'
import { fontSizes, fontWeights, textColours } from './types'
import { styled } from '@linaria/react'

import type { FontSize, FontWeight } from './types'

interface ElTextProps {
  'data-font-size': FontSize
  'data-font-weight': FontWeight
}

export const ElText = styled.span<ElTextProps>`
  ${generateElTextFontStyles()}
  ${generateElTextColourStyles()}
`

function generateElTextFontStyles() {
  return fontSizes
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
    .join('\n')
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
