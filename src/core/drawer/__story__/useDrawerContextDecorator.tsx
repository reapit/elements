import { DrawerContext } from '../context'

import type { Decorator } from '@storybook/react'

export function useDrawerContextDecorator(): Decorator {
  return (Story) => (
    <DrawerContext.Provider value={{ titleId: 'test-title-id' }}>
      <Story />
    </DrawerContext.Provider>
  )
}
