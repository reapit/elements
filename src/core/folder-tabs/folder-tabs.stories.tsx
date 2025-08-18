import { FolderTabs } from './folder-tabs'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Core/FolderTabs',
  component: FolderTabs,
  argTypes: {
    children: {
      control: 'radio',
      options: ['Two tabs', 'Three tabs', 'Many tabs', 'With counts'],
      mapping: {
        'Two tabs': buildTabs('Two tabs'),
        'Three tabs': buildTabs('Three tabs'),
        'Many tabs': buildTabs('Many tabs'),
        'With counts': buildTabs('With counts'),
      },
    },
  },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
} satisfies Meta<typeof FolderTabs>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Many tabs',
  },
}

/**
 * When the tabs are constrained by their container, they will display in a compact vertical layout
 * that is appropriate for smaller screens. This occurs when the container's inline width is less than
 * the equivalent `SM` breakpoint minimum width.
 */
export const Breakpoints: Story = {
  args: {
    children: 'With counts',
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

function buildTabs(type: 'Two tabs' | 'Three tabs' | 'Many tabs' | 'With counts') {
  const renderLabel = (label: string) => {
    return type === 'With counts' ? <FolderTabs.CountLabel count="00">{label}</FolderTabs.CountLabel> : label
  }
  return (
    <>
      <FolderTabs.Item key="apples" href={href} aria-current={false}>
        {renderLabel('Apples')}
      </FolderTabs.Item>
      <FolderTabs.Item key="bananas" aria-current="page" href={href}>
        {renderLabel('Bananas')}
      </FolderTabs.Item>
      {type !== 'Two tabs' && (
        <>
          <FolderTabs.Item key="peaches" aria-current={false} href={href}>
            {renderLabel('Peaches')}
          </FolderTabs.Item>
          {type !== 'Three tabs' && (
            <>
              <FolderTabs.Item key="strawberries" aria-current={false} href={href}>
                {renderLabel('Strawberries')}
              </FolderTabs.Item>
              <FolderTabs.Item key="watermelon" aria-current={false} href={href}>
                {renderLabel('Watermelon')}
              </FolderTabs.Item>
            </>
          )}
        </>
      )}
    </>
  )
}
