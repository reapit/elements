import { DialogContext } from '../context'

import type { Decorator } from '@storybook/react-vite'

export function useDialogContextDecorator(): Decorator {
  return (Story) => (
    <DialogContext.Provider value={{ titleId: 'test-title-id' }}>
      <Story />
    </DialogContext.Provider>
  )
}
