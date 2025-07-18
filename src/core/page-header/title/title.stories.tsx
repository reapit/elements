import { AddIcon } from '#src/icons/add'
import { Badge } from '#src/core/badge/index'
import { Button } from '#src/core/button/index'
import { ButtonGroup } from '#src/core/button-group/index'
import { MoreIcon } from '#src/icons/more'
import { PageHeaderTitle } from './title'
import { StarIcon } from '#src/icons/star'
import { TagGroup } from '#src/core/tag-group/index'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/PageHeader/Title',
  component: PageHeaderTitle,
  argTypes: {
    actions: {
      control: 'radio',
      options: ['None', 'One', 'Some'],
      mapping: {
        None: null,
        One: (
          <Button iconLeft={<AddIcon />} size="medium" variant="primary">
            Add new
          </Button>
        ),
        Some: (
          <ButtonGroup>
            <Button variant="secondary" size="medium">
              Button 1
            </Button>
            <Button variant="secondary" size="medium">
              Button 2
            </Button>
            <Button variant="secondary" size="medium" iconLeft={<MoreIcon />} aria-label="More" />
          </ButtonGroup>
        ),
      },
    },
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
            <StarIcon aria-label="Preferred" size="lg" color="primary" />
          </>
        ),
      },
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof PageHeaderTitle>

export default meta
type Story = StoryObj<typeof meta>

/**
 * At its simplest, the page header's title contains just that: the page's title.
 */
export const Example: Story = {
  args: {
    actions: 'None',
    additionalInfo: 'None',
    children: 'Page Title',
  },
}

/**
 * Additional information can follow the title. This information is typically some combination of one or more tags,
 * badges, and/or icons.
 */
export const AdditionalInfo: Story = {
  args: {
    ...Example.args,
    additionalInfo: 'All',
  },
}

/**
 * The title can also contain a primary action for the page. If it does, this should be the only primary action
 * on the page.
 */
export const SingleAction: Story = {
  args: {
    ...Example.args,
    actions: 'One',
  },
}

/**
 * It's also common for pages to have multiple secondary actions. When more than one action is present, a `ButtonGroup`
 * should be used.
 */
export const MultipleActions: Story = {
  args: {
    ...Example.args,
    actions: 'Some',
  },
}

/**
 * When the title (and any additional information) do not have enough space to display on a single line, they will
 * wrap to additional lines.
 */
export const Overflow: Story = {
  args: {
    ...Example.args,
    actions: 'One',
    additionalInfo: 'All',
    children: 'This is a long title that flows into the next line.',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexFlow: 'column', gap: 'var(--spacing-10)' }}>
        <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '650px' }}>
          <Story />
        </div>
        <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '400px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
}
