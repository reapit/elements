import { FOLDER_TABS_CSS_CONTAINER_NAME } from '../constants'
import { ElFolderTab } from './styles'
import { FolderTab } from './tab'
import { FolderTabCountLabel } from '../count-label'
import { useFolderTabsContainerDecorator } from '../__story__/useFolderTabsContainerDecorator'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/FolderTabs/Tab',
  component: FolderTab,
  argTypes: {
    'aria-current': {
      options: ['page', false],
      mapping: {
        page: 'page',
        false: false,
      },
    },
    children: {
      control: 'text',
    },
    href: {
      control: false,
    },
  },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
} satisfies Meta<typeof FolderTab>

export default meta

type Story = StoryObj<typeof FolderTab>

/**
 * The visual appearance of a folder tab will change based on it's container's size. For small
 * containers (XS breakpoint only), the tab will be more compact and designed to stack vertically.
 * For larger containers (SM breakpoint and above), the tab will be wider and designed to stack
 * horizontally.
 *
 * For solitary tabs, which will be rare in practice, the visual difference is subtle.
 */
export const Example: Story = {
  args: {
    'aria-current': false,
    children: 'Label',
    href: globalThis.top?.location.href!,
  },
  decorators: [useFolderTabsContainerDecorator()],
}

/**
 * When there are multiple siblings (i.e., they all share the same parent element), tabs in larger
 * containers feature "waves" on their ends that overlap adjacent tabs while tabs in smaller containers
 * feature subtle top borders. In both cases, some tabs will have negative margins to cause them to
 * overlap their siblings.
 *
 * These differences are because tabs are designed to be stacked horizontally in larger containers, but
 * vertically in smaller containers. This behaviour is more clearly seen in the stories for
 * [FolderTabs](./?path=/docs/core-foldertabs--example).
 */
export const FirstTab: Story = {
  args: {
    ...Example.args,
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
          gridTemplateColumns: '1fr 0 0',
          alignItems: 'center',
        }}
      >
        <Story />
        <ElFolderTab aria-current={false} style={{ opacity: 0 }} />
        <ElFolderTab aria-current={false} style={{ opacity: 0 }} />
      </div>
    ),
  ],
}

/**
 * When the tab is neither the first nor the last sibling, a "wave" will be featured on both sides in
 * larger containers. It will also have a negative right margin, though this is not visible here.
 * On smaller containers, the tab will feature a subtle top border and negative top margin.
 */
export const MiddleTab: Story = {
  args: {
    ...Example.args,
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
          gridTemplateColumns: '0 1fr 0',
          alignItems: 'center',
        }}
      >
        <ElFolderTab aria-current={false} style={{ opacity: 0 }} />
        <Story />
        <ElFolderTab aria-current={false} style={{ opacity: 0 }} />
      </div>
    ),
  ],
}

/**
 * Finally, when the tab is neither the last sibling, a "wave" will be featured on its left side in
 * larger containers. On smaller containers, the tab will feature a subtle top border and negative
 * top margin.
 */
export const LastTab: Story = {
  args: {
    ...Example.args,
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
          gridTemplateColumns: '0 0 1fr',
          alignItems: 'stretch',
        }}
      >
        <ElFolderTab aria-current={false} style={{ opacity: 0 }} />
        <ElFolderTab aria-current={false} style={{ opacity: 0 }} />
        <Story />
      </div>
    ),
  ],
}

/**
 * When the tab represents the current page, `aria-current="page"` should be supplied to communicate to
 * visual and accessible users that the tab is currently "selected". The selected tab, in large containers
 * only, will sit above all other tabs. This behaviour is more clearly seen in the stories for
 * [FolderTabs](./?path=/docs/core-foldertabs--example).
 */
export const Selected: Story = {
  args: {
    ...Example.args,
    'aria-current': 'page',
  },
  decorators: [useFolderTabsContainerDecorator()],
}

/**
 * The [FolderTabs.CountLabel](./?path=/docs/core-foldertabs-countlabel-example) component can be used to
 * display a numerical count alongside the tab label. This is typically used to indicate the number
 * of items associated with the tab, such as the number of transactions ready for processing.
 */
export const WithCount: Story = {
  args: {
    ...Example.args,
    children: <FolderTabCountLabel count="00">Label</FolderTabCountLabel>,
  },
  argTypes: {
    children: {
      control: false,
    },
  },
  decorators: [useFolderTabsContainerDecorator()],
}

/**
 * By default, tabs can contain any content, though this will typically be plain text or a
 * [FolderTabs.CountLabel](./?path=/docs/core-foldertabs-countlabel--example). When plain text is displayed,
 * it will be truncated if it is too long to fit within the available space.
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
          <ElFolderTab aria-current={false} style={{ opacity: 0 }} />
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

/**
 * When [FolderTabs.CountLabel](?path=/docs/core-foldertabs-countlabel-example) is used for the tab content,
 * the label text will still truncate if there's not enough space, but tabs in large containers will
 * allow two lines of text before truncation is applied.
 */
export const OverflowWithCount: Story = {
  name: 'Overflow w/ count',
  args: {
    ...Example.args,
    children: (
      <FolderTabCountLabel count="00">
        A very very very long tab label that will need to wrap to additional lines and may even be truncated
      </FolderTabCountLabel>
    ),
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
          <ElFolderTab aria-current={false} style={{ opacity: 0 }} />
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
