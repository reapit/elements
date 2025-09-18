import { FOLDER_TABS_CSS_CONTAINER_NAME } from '../constants'

import type { Decorator } from '@storybook/react-vite'

export function useFolderTabsContainerDecorator(): Decorator {
  return (Story) => (
    <div style={{ containerName: FOLDER_TABS_CSS_CONTAINER_NAME, containerType: 'inline-size' }}>
      <Story />
    </div>
  )
}
