import { SupplementaryInfo } from './supplementary-info'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/SupplementaryInfo',
  component: SupplementaryInfo,
  argTypes: {
    children: {
      control: 'radio',
      options: ['One', 'Some', 'Many', 'All colours'],
      mapping: {
        One: <SupplementaryInfo.Item>Supplementary info 1</SupplementaryInfo.Item>,
        Some: (
          <>
            <SupplementaryInfo.Item>Supplementary info 1</SupplementaryInfo.Item>
            <SupplementaryInfo.Item>Supplementary info 2</SupplementaryInfo.Item>
          </>
        ),
        Many: (
          <>
            <SupplementaryInfo.Item>Supplementary info 1</SupplementaryInfo.Item>
            <SupplementaryInfo.Item>Supplementary info 2</SupplementaryInfo.Item>
            <SupplementaryInfo.Item>Supplementary info 3</SupplementaryInfo.Item>
          </>
        ),
        'All colours': [
          <SupplementaryInfo.Item key="primary" colour="primary">
            Primary
          </SupplementaryInfo.Item>,
          <SupplementaryInfo.Item key="secondary" colour="secondary">
            Secondary
          </SupplementaryInfo.Item>,
          <SupplementaryInfo.Item key="neutral" colour="neutral">
            Neutral
          </SupplementaryInfo.Item>,
          <SupplementaryInfo.Item key="success" colour="success">
            Success
          </SupplementaryInfo.Item>,
          <SupplementaryInfo.Item key="pending" colour="pending">
            Pending
          </SupplementaryInfo.Item>,
          <SupplementaryInfo.Item key="warning" colour="warning">
            Warning
          </SupplementaryInfo.Item>,
          <SupplementaryInfo.Item key="danger" colour="danger">
            Danger
          </SupplementaryInfo.Item>,
          <SupplementaryInfo.Item key="accent-1" colour="accent-1">
            Accent 1
          </SupplementaryInfo.Item>,
          <SupplementaryInfo.Item key="accent-2" colour="accent-2">
            Accent 2
          </SupplementaryInfo.Item>,
        ],
      },
    },
  },
} satisfies Meta<typeof SupplementaryInfo>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Many',
    size: 'base',
  },
}

/**
 * There's three sizes for the supplementary info: `base`, `sm` and `xs`.
 */
export const Size: Story = {
  args: {
    ...Example.args,
    size: 'xs',
  },
}

/**
 * Different colours can be applied to individual items to convey certain messages or to draw users'
 * attention to certain information.
 */
export const Colour: StoryObj = {
  args: {
    ...Example.args,
    children: 'All colours',
  },
}

/**
 * When the parent's width is constrained, the supplementary info will wrap like normal text.
 */
export const Overflow: Story = {
  args: {
    ...Example.args,
    children: [
      <SupplementaryInfo.Item key="1">Supplementary info very long text something 1</SupplementaryInfo.Item>,
      <SupplementaryInfo.Item key="2">Supp info 2</SupplementaryInfo.Item>,
      <SupplementaryInfo.Item key="3">Supplementary info 3</SupplementaryInfo.Item>,
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '266px' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * However, if the parent has a width smaller than the longest unbreakable text in the supplementary
 * info, the supplementary info will overflow that parent. This is because we do not want to introduce
 * breaks in the middle of words.
 */
export const WordBreaks: Story = {
  args: {
    children: [
      <SupplementaryInfo.Item key="1">Supplementary info very long text something 1</SupplementaryInfo.Item>,
      <SupplementaryInfo.Item key="2">Supp info 2</SupplementaryInfo.Item>,
      <SupplementaryInfo.Item key="3">Supplementary info 3</SupplementaryInfo.Item>,
    ],
    size: 'base',
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '70px' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * It's important to note that block content within an item will break the flow of the supplementary
 * info's otherwise inline content. For this reason, care should be take to avoid block content within
 * items.
 */
export const BlockContent: Story = {
  args: {
    ...Example.args,
    children: [
      <SupplementaryInfo.Item key="1">
        <div style={{ border: '1px solid #FA00FF', width: '250px', textAlign: 'center' }}>
          Block content will break the flow
        </div>
      </SupplementaryInfo.Item>,
      <SupplementaryInfo.Item key="2">Supplementary info 2</SupplementaryInfo.Item>,
      <SupplementaryInfo.Item key="3">
        <div style={{ display: 'inline-block', border: '1px solid #FA00FF', width: '200px', textAlign: 'center' }}>
          Inline content will not
        </div>
      </SupplementaryInfo.Item>,
    ],
  },
}
