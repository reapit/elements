import type { Decorator } from '@storybook/react'

export const useSideBarWidthDecorator: Decorator = (Story, context) => {
  const { state, width } = context.parameters.sideBar ?? { state: 'expanded' }

  return (
    <div
      style={{
        containerType: 'inline-size',
        border: state === 'collapsed' ? '1px solid #FA00FF' : '1px solid transparent',
        boxSizing: 'content-box',
        width: state === 'collapsed' ? '40px' : width,
      }}
    >
      <Story />
    </div>
  )
}
