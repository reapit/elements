import preview from '#.storybook/preview'
import { Badge } from '#src/core/badge/index'
import { PageHeaderSubtitle } from './subtitle'
import { StarIcon } from '#src/icons/star'
import { TagGroup } from '#src/core/tag-group/index'

const meta = preview.meta({
  title: 'Core/PageHeader/Subtitle',
  component: PageHeaderSubtitle,
  argTypes: {
    additionalInfo: {
      control: 'radio',
      options: ['None', 'Tag', 'Badge', 'Icon', 'All'],
      mapping: {
        None: null,
        Tag: (
          <TagGroup>
            <TagGroup.Item>Tag</TagGroup.Item>
          </TagGroup>
        ),
        Badge: <Badge colour="neutral">Badge</Badge>,
        Icon: <StarIcon size="lg" color="primary" />,
        All: (
          <>
            <TagGroup>
              <TagGroup.Item>Tag</TagGroup.Item>
            </TagGroup>
            <Badge colour="neutral">Badge</Badge>
            <StarIcon size="lg" color="primary" />
          </>
        ),
      },
    },
    children: {
      control: 'text',
    },
  },
})

/**
 * At its simplest, the page header's subtitle contains just that: the page's subtitle.
 */
export const Example = meta.story({
  args: {
    additionalInfo: 'None',
    children: 'Page Subtitle',
  },
})

/**
 * Additional information can follow the subtitle. This information is typically some combination of one or more tags,
 * badges, and/or icons.
 */
export const AdditionalInfo = Example.extend({
  args: {
    additionalInfo: 'All',
  },
})

/**
 * When the subtitle (and any additional information) do not have enough space to display on a single line, they will
 * wrap to additional lines.
 */
export const Overflow = Example.extend({
  args: {
    additionalInfo: 'All',
    children: 'This is a long subtitle that flows into the next line.',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexFlow: 'column', gap: 'var(--spacing-10)' }}>
        <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '400px' }}>
          <Story />
        </div>
        <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '250px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
})
