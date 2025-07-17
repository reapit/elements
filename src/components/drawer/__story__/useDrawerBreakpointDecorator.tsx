import { DRAWER_WIDTH_XS_SM, DRAWER_WIDTH_MD_2XL } from '../constants'

import type { Decorator } from '@storybook/react'
import type { ReactNode } from 'react'

export function useDrawerBreakpointDecorator(): Decorator {
  return (Story) => (
    <BreakpointsLayout>
      <p style={{ color: '#FA00FF', textAlign: 'center' }}>XS-SM breakpoints</p>
      <p style={{ color: '#FA00FF', textAlign: 'center' }}>MD-2XL breakpoints</p>
      <Story />
    </BreakpointsLayout>
  )
}

interface BreakpointsLayoutProps {
  children: ReactNode
}

function BreakpointsLayout({ children }: BreakpointsLayoutProps) {
  return (
    <div
      style={{
        display: 'grid',
        columnGap: 'var(--spacing-10)',
        rowGap: 'var(--spacing-10)',
        gridTemplateColumns: `${DRAWER_WIDTH_XS_SM} ${DRAWER_WIDTH_MD_2XL}`,
        gridTemplateRows: 'min-content 400px',
        gridAutoRows: '400px',
        height: 'max-content',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}
    >
      {children}
    </div>
  )
}

interface BreakpointProps {
  breakpoint: 'XS-SM' | 'MD-2XL'
  children: ReactNode
}

export function Breakpoint({ breakpoint, children }: BreakpointProps) {
  return (
    <div
      style={{
        containerName: 'drawer',
        containerType: 'size',
        display: 'grid',
        gridTemplateAreas: '"header" "body" "footer"',
        gridTemplateColumns: '100%',
        gridTemplateRows: 'auto 1fr auto',
        height: '400px',
        width: breakpoint === 'XS-SM' ? DRAWER_WIDTH_XS_SM : DRAWER_WIDTH_MD_2XL,
        overflow: 'auto',
        border: '1px solid #FA00FF',
        boxSizing: 'content-box',
      }}
    >
      {children}
    </div>
  )
}
