import type { Meta, StoryObj } from '@storybook/react'
import { Tag, TagGroup as TagGroupComponent } from './tag'

export default {
  title: 'Components/Tag',
  component: Tag,
  args: {
    children: 'Tag',
  },
} as Meta<typeof Tag>

type Story = StoryObj<typeof Tag>

/**
 * The `Tag` component is used to label, categorise or organise items using keywords.
 */
export const Default: Story = {}

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
