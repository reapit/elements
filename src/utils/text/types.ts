import type { FontSize, FontWeight, FontStyle } from '#src/utils/font'

export type { FontSize, FontWeight, FontStyle }

export const textColours = [
  'primary',
  'secondary',
  'tertiary',
  'white',
  'error',
  'info',
  'success',
  'warning',
  'pending',
  'placeholder',
  'accent_1',
  'accent_2',
  'action',
  'inherit',
] as const

export type TextColour = (typeof textColours)[number]
