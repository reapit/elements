// TODO: Ideally we can derive or generate these from the token files in future.
export const fontSizes = ['3xs', '2xs', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl'] as const
export const fontWeights = ['regular', 'medium', 'bold'] as const
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
] as const

export type FontSize = (typeof fontSizes)[number]
export type FontWeight = (typeof fontWeights)[number]
export type TextColour = (typeof textColours)[number]
