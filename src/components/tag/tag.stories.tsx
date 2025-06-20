import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag, TagGroup as TagGroupComponent } from './tag'

export default {
  title: 'Components/Tag',
  component: Tag,
  args: {
    children: 'Tag',
  },
  argTypes: {
    as: {
      control: 'inline-radio',
      description:
        'whether the component will be rendered as `li` or `span`, defaults to `li` for easier use with `TagGroup`',
      options: ['li', 'span'],
    },
  },
} as Meta<typeof Tag>

type Story = StoryObj<typeof Tag>

/**
 * The `Tag` component is used to label, categorise or organise items using keywords.
 */
export const Default: Story = {
  args: {
    as: 'li',
  },
}

/**
 * The `TagGroup` Component is useful to render multiple `Tag`
 */
export const TagGroup: Story = {
  render: () => (
    <TagGroupComponent>
      <Tag>Tag</Tag>
      <Tag>Tag</Tag>
      <Tag>Tag</Tag>
      <Tag>Tag</Tag>
      <Tag>Tag</Tag>
    </TagGroupComponent>
  ),
}
