import { TableBody } from '../body'
import { TableBodyRow } from '../body-row'

import type { CSSProperties } from 'react'
import type { Decorator } from '@storybook/react-vite'

type StoryPlacement = 'body' | 'body-cell' | 'body-row' | 'head' | 'header-cell' | 'header-row'

/** Simple story decorator that renders the story in a valid table DOM hierarchy */
export function useTableDecorator(placement: StoryPlacement): Decorator {
  return (Story, { parameters: { tableWidth = 'auto', tableColumns = 3 } }) => {
    const tableStyle: CSSProperties = {
      display: 'grid',
      gridAutoFlow: 'row',
      gridAutoRows: 'auto',
      gridTemplateColumns: `repeat(${tableColumns}, 1fr)`,
      justifyContent: 'start',
      width: tableWidth,
    }

    switch (placement) {
      case 'body':
        return (
          <table style={tableStyle}>
            <thead />
            <Story />
          </table>
        )
      case 'body-cell':
        return (
          <table style={tableStyle}>
            <thead />
            <TableBody>
              <TableBodyRow style={{ border: 'none' }}>
                <Story />
              </TableBodyRow>
            </TableBody>
          </table>
        )
      case 'body-row':
        return (
          <table style={tableStyle}>
            <thead />
            <TableBody>
              <Story />
            </TableBody>
          </table>
        )
      case 'head':
        return (
          <table style={tableStyle}>
            <Story />
            <tbody />
          </table>
        )
      case 'header-cell':
        return (
          <table style={tableStyle}>
            <thead>
              <tr>
                <Story />
              </tr>
            </thead>
            <tbody />
          </table>
        )
      case 'header-row':
        return (
          <table style={tableStyle}>
            <thead>
              <Story />
            </thead>
            <tbody />
          </table>
        )
    }
  }
}
