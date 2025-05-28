import type { Decorator } from '@storybook/react'
import { useSideBar } from '../use-side-bar'
import { useId } from 'react'
import { SideBarContextPublisher } from '../side-bar-context'

export const useSideBarContextDecorator: Decorator = (Story, context) => {
  const id = useId()
  const { initialState, state } = context.parameters.sideBar ?? { initialState: 'expanded' }
  const sideBar = useSideBar(initialState)

  return (
    <SideBarContextPublisher {...sideBar} id={id} state={state ?? sideBar.state}>
      <Story />
    </SideBarContextPublisher>
  )
}
