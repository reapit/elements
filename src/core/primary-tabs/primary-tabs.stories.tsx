import { PrimaryTabs } from './primary-tabs'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Components/PrimaryTabs',
  component: PrimaryTabs,
  argTypes: {
    children: {
      control: 'radio',
      options: ['No selected tab', 'Selected tab'],
      mapping: {
        'No selected tab': buildTabs('No selected tab'),
        'Selected tab': buildTabs('Selected tab'),
      },
    },
    overflow: {
      control: 'radio',
      options: ['scroll', 'visible'],
      mapping: {
        scroll: 'scroll',
        visible: 'visible',
      },
    },
  },
} satisfies Meta<typeof PrimaryTabs>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'No selected tab',
  },
}

/**
 * If a tab represents the current page/section, it should be marked as "selected" with aria-current="page".
 */
export const SelectedTab: Story = {
  args: {
    children: 'Selected tab',
  },
}

/**
 * Ideally, overflowing should be avoided as much as possible. When it can’t be avoided (e.g. small
 * breakpoints) use horizontal scrolling by providing `overflow="scroll"`. By default, tabs will simply
 * overflow the container.
 */
export const Overflow: Story = {
  args: {
    children: 'Selected tab',
    overflow: 'scroll',
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ border: '1px solid #FA00FF', width: '397px' }}>
          <Story />
        </div>
      )
    },
  ],
}

function buildTabs(type: 'No selected tab' | 'Selected tab') {
  return [
    <PrimaryTabs.Item key="apples" href={href} aria-current={type === 'Selected tab' ? 'page' : false}>
      Apples
    </PrimaryTabs.Item>,
    <PrimaryTabs.Item key="bananas" aria-current={false} href={href}>
      Bananas
    </PrimaryTabs.Item>,
    <PrimaryTabs.Item key="peaches" aria-current={false} href={href}>
      Peaches
    </PrimaryTabs.Item>,
    <PrimaryTabs.Item key="strawberries" aria-current={false} href={href}>
      Strawberries
    </PrimaryTabs.Item>,
    <PrimaryTabs.Item key="watermelon" aria-current={false} href={href}>
      Watermelon
    </PrimaryTabs.Item>,
  ]
}
