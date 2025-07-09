import { AddIcon } from '#src/icons/add'
import { Avatar } from '../avatar'
import { AvatarRectangle } from '../avatar-rectangle'
import { Badge } from '../badge'
import { Breadcrumbs } from '../breadcrumbs'
import { Button } from '../button'
import { ButtonGroup } from '../button-group'
import { CompactSelectNative } from '../compact-select-native'
import { Features } from '../features'
import { PageHeader } from './page-header'
import { StarIcon } from '#src/icons/star'
import { SupplementaryInfo } from '../supplementary-info'
import { TagGroup } from '../tag-group'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  argTypes: {
    backgroundColour: {
      control: 'select',
      options: ['none', 'white', 'neutral-lightest'],
      mapping: {
        none: null,
      },
    },
    breadcrumbs: {
      control: 'select',
      options: ['None', 'Some', 'Many'],
      mapping: {
        None: null,
        Some: (
          <Breadcrumbs overflow="truncate">
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href={href}>Level one</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href={href}>Level two</Breadcrumbs.Link>
            </Breadcrumbs.Item>
          </Breadcrumbs>
        ),
        Many: (
          <Breadcrumbs overflow="truncate">
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href={href}>Level one</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href={href}>Level two</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href={href}>Level three</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href={href}>Level four</Breadcrumbs.Link>
            </Breadcrumbs.Item>
          </Breadcrumbs>
        ),
      },
    },
    leadingElement: {
      control: 'select',
      options: ['None', 'Avatar', 'Icon', 'Thumbnail'],
      mapping: {
        None: null,
        Avatar: <Avatar size="medium">T</Avatar>,
        Thumbnail: <AvatarRectangle size="medium" variant="residential" />,
      },
    },
    subtitle: {
      control: 'select',
      options: ['None', 'Basic', 'Additional Info'],
      mapping: {
        None: null,
        Basic: <PageHeader.Subtitle>Subtitle</PageHeader.Subtitle>,
        'Additional Info': (
          <PageHeader.Subtitle
            additionalInfo={
              <>
                <TagGroup>
                  <TagGroup.Item>Tag</TagGroup.Item>
                </TagGroup>
                <Badge colour="neutral">Badge</Badge>
                <StarIcon color="primary" size="lg" />
              </>
            }
          >
            Subtitle
          </PageHeader.Subtitle>
        ),
      },
    },
    supplementaryInfo: {
      control: 'select',
      options: ['None', 'Select', 'Summary Info', 'Everything'],
      mapping: {
        None: null,
        Select: (
          <PageHeader.SupplementaryInfo>
            <CompactSelectNative aria-label="Select portfolio" size="small">
              <option>Select portfolio</option>
              <option>Portfolio 1</option>
              <option>Portfolio 2</option>
              <option>Portfolio 3</option>
            </CompactSelectNative>
          </PageHeader.SupplementaryInfo>
        ),
        'Summary Info': (
          <PageHeader.SupplementaryInfo>
            <SupplementaryInfo size="sm">
              <SupplementaryInfo.Item>Supplementary Info 1</SupplementaryInfo.Item>
              <SupplementaryInfo.Item>Supplementary Info 2</SupplementaryInfo.Item>
            </SupplementaryInfo>
            <Features size="2xs">
              <Features.Bedrooms value={3} />
              <Features.Bathrooms value={2} />
              <Features.CarSpaces value={2} />
              <Features.LandSize value="375 sq m" />
            </Features>
          </PageHeader.SupplementaryInfo>
        ),
        Everything: (
          <PageHeader.SupplementaryInfo>
            <SupplementaryInfo size="sm">
              <SupplementaryInfo.Item>Supplementary Info 1</SupplementaryInfo.Item>
              <SupplementaryInfo.Item>Supplementary Info 2</SupplementaryInfo.Item>
            </SupplementaryInfo>
            <Features size="sm">
              <Features.Bedrooms value={3} />
              <Features.Bathrooms value={2} />
              <Features.CarSpaces value={2} />
              <Features.LandSize value="375 sq m" />
            </Features>
            <CompactSelectNative aria-label="Select portfolio" size="medium">
              <option>Select portfolio</option>
              <option>Portfolio 1</option>
              <option>Portfolio 2</option>
              <option>Portfolio 3</option>
            </CompactSelectNative>
          </PageHeader.SupplementaryInfo>
        ),
      },
    },
    title: {
      control: 'select',
      options: ['Basic', 'Single Action', 'Multiple Actions', 'Additional Info'],
      mapping: {
        Basic: <PageHeader.Title>Title</PageHeader.Title>,
        'Single Action': (
          <PageHeader.Title
            actions={
              <Button iconLeft={<AddIcon />} size="medium" variant="primary">
                Add new
              </Button>
            }
          >
            Title
          </PageHeader.Title>
        ),
        'Multiple Actions': (
          <PageHeader.Title
            actions={
              <ButtonGroup>
                <Button size="medium" variant="secondary">
                  Button 1
                </Button>
                <Button size="medium" variant="secondary">
                  Button 2
                </Button>
              </ButtonGroup>
            }
          >
            Title
          </PageHeader.Title>
        ),
        'Additional Info': (
          <PageHeader.Title
            additionalInfo={
              <>
                <TagGroup>
                  <TagGroup.Item>Tag</TagGroup.Item>
                </TagGroup>
                <Badge colour="neutral">Badge</Badge>
                <StarIcon color="primary" size="lg" />
              </>
            }
          >
            Title
          </PageHeader.Title>
        ),
      },
    },
  },
  decorators: [
    (Story) => (
      <main style={{ containerType: 'inline-size' }}>
        <Story />
      </main>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The main purpose of the page header is to title the page.
 */
export const Example: Story = {
  args: {
    backgroundColour: 'neutral-lightest',
    breadcrumbs: 'None',
    leadingElement: 'None',
    subtitle: 'None',
    supplementaryInfo: 'None',
    title: 'Basic',
  },
}

/**
 * A key feature of the page header is the ability to provide navigation breadcrumbs. This is useful for providing
 * context for the page's location within the application's information architecture.
 */
export const Navigation: Story = {
  args: {
    ...Example.args,
    breadcrumbs: 'Some',
  },
}

/**
 * Often, a page header will contain one or more actions. These are provided as part of the page header's `title`
 * region. Often, one of these actions will be a primary action, such as "Add new". Other times there will be multiple
 * secondary actions.
 */
export const Actions: Story = {
  args: {
    ...Example.args,
    title: 'Single Action',
  },
}

/**
 * The page header also supports a leading element, such as an avatar, image, or product logo. This is useful for
 * providing a visual representation of the page's subject.
 */
export const LeadingElement: Story = {
  args: {
    ...Example.args,
    leadingElement: 'Avatar',
  },
}

/**
 * The title can also include additional information such as tags, badges, and icons. This is useful for providing
 * additional context to the title or its subject.
 */
export const Title: Story = {
  args: {
    ...Example.args,
    title: 'Additional Info',
  },
}

/**
 * Sometimes a page will want to provide a subtitle for the page in addition to the title. This is useful for providing
 * extended information about the page that otherwise would not fit within the title itself, or has a lower importance
 * than the title. Like the title, the subtitle can include additional information such as tags, badges, and icons.
 */
export const Subtitle: Story = {
  args: {
    ...Example.args,
    subtitle: 'Additional Info',
    title: 'Multiple Actions',
  },
}

/**
 * Often a page will also need to provide supplementary information within the page header. This will typically be
 * information that does not title the page, but is still of high importance. Typically, it will be a collection of
 * `SupplementaryInfo` items, the property's `Features`, or a compact select component that influences the page's
 * content, such as filter high in the page's information architecture.
 */
export const Supplementary: Story = {
  args: {
    ...Example.args,
    supplementaryInfo: 'Summary Info',
  },
}

/**
 * The page header can support alternative background colours. Typically, the background will either be
 * `white` or `neutral-lightest`, though the default (i.e. when no `backgroundColour` is specified) is
 * transparent. It is strongly encouraged to only use semantic colour variables defined by the Design System.
 */
export const BackgroundColour: Story = {
  args: {
    ...Example.args,
    backgroundColour: 'white',
  },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
}

/**
 * The page header is designed to be responsive, and will adapt to the size of the container it is in. This is largely
 * done through internal padding. If the page header's ancestor element is a size or inline-size container, the page
 * header will use container queries for its responsive behaviour; if there is no ancestral container, or container
 * queries are not supported, the page header will use media queries.
 */
export const Breakpoints: Story = {
  args: {
    ...Example.args,
    breadcrumbs: 'Many',
    leadingElement: 'Avatar',
    subtitle: 'Additional Info',
    supplementaryInfo: 'Summary Info',
    title: 'Multiple Actions',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-10)' }}>
        <article
          style={{
            containerType: 'inline-size',
            boxSizing: 'content-box',
            border: '1px solid #FA00FF',
            width: '500px',
          }}
        >
          <Story />
        </article>
        <article
          style={{
            containerType: 'inline-size',
            boxSizing: 'content-box',
            border: '1px solid #FA00FF',
            width: '768px',
          }}
        >
          <Story />
        </article>
        <article
          style={{
            containerType: 'inline-size',
            boxSizing: 'content-box',
            border: '1px solid #FA00FF',
            width: '1024px',
          }}
        >
          <Story />
        </article>
      </div>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
}

/**
 * Overflow should be avoided as much as possible, but when it is unavoidable, most of the page header's information
 * will try to avoid truncation.
 */
export const Overflow: Story = {
  args: {
    ...Example.args,
    breadcrumbs: 'Many',
    subtitle: 'Additional Info',
    supplementaryInfo: 'Summary Info',
    title: (
      <PageHeader.Title
        actions={<Button aria-label="Add new" iconLeft={<AddIcon />} size="medium" variant="primary" />}
      >
        Title with a very long title that will overflow
      </PageHeader.Title>
    ),
  },
  decorators: [
    (Story) => (
      <div
        style={{ containerType: 'inline-size', boxSizing: 'content-box', border: '1px solid #FA00FF', width: '375px' }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
}
