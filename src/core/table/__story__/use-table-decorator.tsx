import { TableBody } from '../body'
import { TableBodyRow } from '../body-row'

import type { CSSProperties } from 'react'
import type { Decorator } from '@storybook/react-vite'

type StoryPlacement = 'body' | 'body-cell' | 'body-row' | 'head' | 'header-cell' | 'header-row'

/** Simple story decorator that renders the story in a valid table DOM hierarchy */
export function useTableDecorator(placement: StoryPlacement): Decorator {
  return (Story) => {
    const tableStyle: CSSProperties = {
      display: 'grid',
      gridAutoFlow: 'row',
      gridAutoRows: 'auto',
      gridTemplateColumns: '1fr 1fr 1fr min-content',
      justifyContent: 'start',
      width: '100%',
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
