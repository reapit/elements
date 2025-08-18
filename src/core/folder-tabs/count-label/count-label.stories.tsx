import { FOLDER_TABS_CSS_CONTAINER_NAME } from '../constants'
import { FolderTabCountLabel } from './count-label'
import { useFolderTabsContainerDecorator } from '../__story__/useFolderTabsContainerDecorator'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/FolderTabs/CountLabel',
  component: FolderTabCountLabel,
} satisfies Meta<typeof FolderTabCountLabel>

export default meta

type Story = StoryObj<typeof FolderTabCountLabel>

/**
 * By default, the count will expand to fill the available space of it's container.
 */
export const Example: Story = {
  args: {
    children: 'Label',
    count: '00',
  },
  decorators: [useFolderTabsContainerDecorator()],
}

/**
 * While labels should be concise to avoid overflow, if there is not enough space available, the label
 * text will be permitted to wrap to a second line when the tabs container is large enough.
 */
export const Wrapping: Story = {
  args: {
    ...Example.args,
    children: "A long tab label that will wrap to a second line but won't truncate",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          boxSizing: 'content-box',
          border: '1px solid #FA00FF',
          containerName: FOLDER_TABS_CSS_CONTAINER_NAME,
          containerType: 'inline-size',
          display: 'grid',
          gridTemplateColumns: '50% 50%',
          width: '768px',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

/**
 * If there is not enough space, even after wrapping is permitted in large containers, the text will
 * be truncated.
 */
export const Overflow: Story = {
  args: {
    ...Example.args,
    children: 'A very very very long tab label that will need to wrap to additional lines and may even be truncated',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <div
          style={{
            boxSizing: 'content-box',
            border: '1px solid #FA00FF',
            containerName: FOLDER_TABS_CSS_CONTAINER_NAME,
            containerType: 'inline-size',
            display: 'grid',
            gridTemplateColumns: '50% 50%',
            width: '768px',
          }}
        >
          <Story />
        </div>
        <div
          style={{
            boxSizing: 'content-box',
            border: '1px solid #FA00FF',
            containerName: FOLDER_TABS_CSS_CONTAINER_NAME,
            containerType: 'inline-size',
            width: '300px',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
}
