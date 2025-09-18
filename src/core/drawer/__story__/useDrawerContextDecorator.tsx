import { DrawerContext } from '../context'

import type { Decorator } from '@storybook/react-vite'

export function useDrawerContextDecorator(): Decorator {
  return (Story) => (
    <DrawerContext.Provider value={{ titleId: 'test-title-id' }}>
      <Story />
    </DrawerContext.Provider>
  )
}
