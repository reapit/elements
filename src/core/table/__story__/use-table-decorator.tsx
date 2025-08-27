import type { Decorator } from '@storybook/react-vite'
import { CSSProperties } from 'react'

type StoryPlacement = 'body' | 'body-cell' | 'body-row' | 'head' | 'header-cell' | 'header-row'

/** Simple story decorator that renders the story in a valid table DOM hierarchy */
export function useTableDecorator(placement: StoryPlacement): Decorator {
  return (Story, { parameters: { tableWidth = 'auto' } }) => {
    const tableStyle: CSSProperties = { borderCollapse: 'collapse', width: tableWidth }
    const rowGroupStyle: CSSProperties = { display: 'grid' }
    const rowStyle: CSSProperties = { display: 'grid', gridAutoFlow: 'column' }

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
            <tbody>
              <tr style={rowStyle}>
                <Story />
              </tr>
            </tbody>
          </table>
        )
      case 'body-row':
        return (
          <table style={tableStyle}>
            <thead />
            <tbody style={rowGroupStyle}>
              <Story />
            </tbody>
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
              <tr style={rowStyle}>
                <Story />
              </tr>
            </thead>
            <tbody />
          </table>
        )
      case 'header-row':
        return (
          <table style={tableStyle}>
            <thead style={rowGroupStyle}>
              <Story />
            </thead>
            <tbody />
          </table>
        )
    }
  }
}
