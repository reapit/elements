import type { Decorator } from '@storybook/react-vite'
import { useSideBarContext } from '../side-bar-context'

export const useSideBarWidthDecorator: Decorator = (Story, context) => {
  // The `useSideBarContextDecorator` will internally track collapsed <--> expanded state changes for the fake
  // side bar, but it also allows stories to specify a pinnded state for the side bar that should be used for
  // that story regardless of what interaction or state changes would otherwise occur.
  //
  // - `useSideBarContext` gives us the current state of the side bar.
  // - `context.parameters.sideBar.state` gives us the fixed state of the side bar, if any.
  // - `context.parameters.sideBar.width` gives us the custom width of the side bar, if any.
  const { id, state: currentState } = useSideBarContext()
  const { state: fixedState, width } = context.parameters.sideBar ?? {}

  return (
    <div
      id={id}
      style={{
        containerType: 'inline-size',
        // If the side bar is fixed to its collapsed state or there is a specific width specified, we show a border
        border: fixedState === 'collapsed' || width ? '1px solid #FA00FF' : '1px solid transparent',
        boxSizing: 'content-box',
        // If the side bar is currently collapsed
        width: currentState === 'collapsed' || fixedState === 'collapsed' ? '40px' : width,
      }}
    >
      <Story />
    </div>
  )
}
