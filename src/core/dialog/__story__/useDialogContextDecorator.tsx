import { DialogContextProvider } from '../context'

import type { Decorator } from '@storybook/react'

export function useDialogContextDecorator(): Decorator {
  return (Story) => (
    <DialogContextProvider dialogRef={{ current: null }} titleId="test-title-id">
      <Story />
    </DialogContextProvider>
  )
}
