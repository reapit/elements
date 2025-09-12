import { DialogContext } from '../context'

import type { Decorator } from '@storybook/react'

export function useDialogContextDecorator(): Decorator {
  return (Story) => (
    <DialogContext.Provider value={{ titleId: 'test-title-id' }}>
      <Story />
    </DialogContext.Provider>
  )
}
