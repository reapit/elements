export type Breakpoint = 'XS' | 'SM' | 'MD' | 'LG' | 'XL' | '2XL'

export const BreakpointMinimumDimensions = {
  XS: '0px',
  SM: '768px',
  MD: '1024px',
  LG: '1440px',
  XL: '1920px',
  '2XL': '2560px',
} as const satisfies Record<Breakpoint, `${number}px`>
