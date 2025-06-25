// TODO: Ideally we can derive or generate these from the token files in future.
export const iconSizes = ['xs', 'sm', 'md', 'lg', '100%'] as const
export const iconColours = [
  'inherit',
  'primary',
  'secondary',
  'disabled',
  'white',
  'action',
  'pending',
  'warning',
  'error',
  'success',
  'info',
  'accent_1',
  'accent_2',
] as const

export type IconSize = (typeof iconSizes)[number]
export type IconColour = (typeof iconColours)[number]
