import type { Decorator } from '@storybook/react'

export const useViewportHeightDecorator: Decorator = (Story) => {
  return (
    <div
      style={{
        border: '1px solid #FA00FF',
        boxSizing: 'content-box',
        height: '300px',
      }}
    >
      <Story />
    </div>
  )
}
