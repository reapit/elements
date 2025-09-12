import figma from '@figma/code-connect'
import { TagGroup } from './tag-group'

figma.connect(TagGroup, '<TAG_GROUP_URL>', {
  variant: { 'No of tags': '1' },
  props: {
    tag: figma.nestedProps('Tag', {
      children: figma.string('Label text'),
    }),
  },
  example: ({ tag }) => (
    <TagGroup>
      <TagGroup.Item>{tag.children}</TagGroup.Item>
    </TagGroup>
  ),
})

figma.connect(TagGroup, 'https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=118%3A6272', {
  imports: ['import { TagGroup } from "@reapit/elements/core/tag-group"'],
  variant: { 'No of tags': '2' },
  props: {
    tag1: figma.nestedProps('Tag 1', {
      children: figma.string('Label text'),
    }),
    tag2: figma.nestedProps('Tag 2', {
      children: figma.string('Label text'),
    }),
  },
  example: ({ tag1, tag2 }) => (
    <TagGroup>
      <TagGroup.Item>{tag1.children}</TagGroup.Item>
      <TagGroup.Item>{tag2.children}</TagGroup.Item>
    </TagGroup>
  ),
})

figma.connect(TagGroup, 'https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=118%3A6272', {
  imports: ['import { TagGroup } from "@reapit/elements/core/tag-group"'],
  variant: { 'No of tags': '3' },
  props: {
    tag1: figma.nestedProps('Tag 1', {
      children: figma.string('Label text'),
    }),
    tag2: figma.nestedProps('Tag 2', {
      children: figma.string('Label text'),
    }),
    tag3: figma.nestedProps('Tag 3', {
      children: figma.string('Label text'),
    }),
  },
  example: ({ tag1, tag2, tag3 }) => (
    <TagGroup>
      <TagGroup.Item>{tag1.children}</TagGroup.Item>
      <TagGroup.Item>{tag2.children}</TagGroup.Item>
      <TagGroup.Item>{tag3.children}</TagGroup.Item>
    </TagGroup>
  ),
})
