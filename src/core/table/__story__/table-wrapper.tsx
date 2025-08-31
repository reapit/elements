import { Table } from '../table'

import type { FC, ReactNode } from 'react'

export type ChildPlacement = 'body' | 'body-cell' | 'body-row' | 'head' | 'header-cell' | 'header-row'

/** Simple factory that returns a component that renders valid table DOM hierarchy around its children */
export function buildTableWrapper(
  placement: ChildPlacement,
  columns: string = '1fr 1fr 1fr min-content',
): FC<{ children: ReactNode }> {
  return ({ children }) => {
    switch (placement) {
      case 'body':
        return <Table columns={columns}>{children}</Table>
      case 'body-cell':
        return (
          <Table columns={columns}>
            <Table.Body>
              <Table.BodyRow style={{ border: 'none' }}>{children}</Table.BodyRow>
            </Table.Body>
          </Table>
        )
      case 'body-row':
        return (
          <Table columns={columns}>
            <Table.Body>{children}</Table.Body>
          </Table>
        )
      case 'head':
        return <Table columns={columns}>{children}</Table>
      case 'header-cell':
        return (
          <Table columns={columns}>
            <Table.Head>
              <Table.HeaderRow style={{ border: 'none' }}>{children}</Table.HeaderRow>
            </Table.Head>
          </Table>
        )
      case 'header-row':
        return (
          <Table columns={columns}>
            <Table.Head>{children}</Table.Head>
          </Table>
        )
    }
  }
}
