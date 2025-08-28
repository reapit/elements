import { TableBody } from '../body'
import { TableBodyRow } from '../body-row'

import type { CSSProperties, FC, ReactNode } from 'react'

export type ChildPlacement = 'body' | 'body-cell' | 'body-row' | 'head' | 'header-cell' | 'header-row'

/** Simple factory that returns a component that renders valid table DOM hierarchy around its children */
export function buildTableWrapper(placement: ChildPlacement): FC<{ children: ReactNode }> {
  return ({ children }) => {
    const tableStyle: CSSProperties = {
      display: 'grid',
      gridAutoFlow: 'row',
      gridAutoRows: 'auto',
      gridTemplateColumns: '1fr 1fr 1fr min-content',
      justifyContent: 'start',
      width: '100%',
    }

    const subgridStyles: CSSProperties = {
      display: 'grid',
      gridColumn: '1 / -1',
      gridTemplateColumns: 'subgrid',
    }

    switch (placement) {
      case 'body':
        return <table style={tableStyle}>{children}</table>
      case 'body-cell':
        return (
          <table style={tableStyle}>
            <TableBody>
              <TableBodyRow style={{ border: 'none' }}>{children}</TableBodyRow>
            </TableBody>
          </table>
        )
      case 'body-row':
        return (
          <table style={tableStyle}>
            <TableBody>{children}</TableBody>
          </table>
        )
      case 'head':
        return <table style={tableStyle}>{children}</table>
      case 'header-cell':
        return (
          <table style={tableStyle}>
            <thead style={subgridStyles}>
              <tr style={subgridStyles}>{children}</tr>
            </thead>
          </table>
        )
      case 'header-row':
        return (
          <table style={tableStyle}>
            <thead style={subgridStyles}>{children}</thead>
          </table>
        )
    }
  }
}
