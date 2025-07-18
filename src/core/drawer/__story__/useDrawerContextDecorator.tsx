import { DrawerContextProvider } from '../context'

import type { Decorator } from '@storybook/react'

export function useDrawerContextDecorator(): Decorator {
  return (Story) => (
    <DrawerContextProvider dialogRef={{ current: null }} titleId="test-title-id">
      <Story />
    </DrawerContextProvider>
  )
}
