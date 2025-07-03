import { TagGroup } from './tag-group'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/TagGroup',
  component: TagGroup,
  argTypes: {
    children: {
      control: 'radio',
      options: ['One', 'Some', 'Many'],
      mapping: {
        One: <TagGroup.Item>Tag 1</TagGroup.Item>,
        Some: [<TagGroup.Item key="1">Tag 1</TagGroup.Item>, <TagGroup.Item key="2">Tag 2</TagGroup.Item>],
        Many: [
          <TagGroup.Item key="1">Tag 1</TagGroup.Item>,
          <TagGroup.Item key="2">Tag 2</TagGroup.Item>,
          <TagGroup.Item key="3">Tag 3</TagGroup.Item>,
          <TagGroup.Item key="4">Tag 4</TagGroup.Item>,
          <TagGroup.Item key="5">Tag 5</TagGroup.Item>,
        ],
      },
    },
  },
} satisfies Meta<typeof TagGroup>

export default meta
type Story = StoryObj<typeof TagGroup>

export const Example: Story = {
  args: {
    children: 'Many',
  },
}

/**
 * By default, tags within the tag group will wrap to the next line if the container is too small.
 */
export const Overflow: Story = {
  args: {
    children: 'Many',
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '200px' }}>
        <Story />
      </div>
    ),
  ],
}
