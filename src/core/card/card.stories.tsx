import preview from '#.storybook/preview'
import { AnchorCard } from './anchor-card'
import { ButtonCard } from './button-card'
import { Card } from './card'
import { CardContent } from './__story__/card-content'

const meta = preview.meta({
  title: 'Containers and layout/Card',
  component: Card,
  subcomponents: { ButtonCard, AnchorCard },
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'article', 'aside', 'section'],
    },
    children: {
      control: false,
    },
  },
})

export const Example = meta.story({
  args: {
    as: 'div',
    borderRadius: '--border-radius-xl',
    isBorderless: false,
    padding: '--spacing-4',
  },
  render: (args) => (
    <Card {...args}>
      <CardContent />
    </Card>
  ),
})

/**
 * Setting `isBorderless` removes the card's border, leaving only the background
 * and padding. Useful when a card is displayed against a non-white background
 * where the border would create unwanted contrast.
 */
export const Borderless = Example.extend({
  args: { isBorderless: true },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
})

/**
 * The `borderRadius` and `padding` props accept design token references,
 * allowing the defaults to be overridden when the design calls for a tighter
 * or more rounded card.
 */
export const OverriddenSurface = Example.extend({
  name: 'Overridden surface',
  args: {
    borderRadius: '--border-radius-m',
    padding: '--spacing-2',
  },
})

/**
 * Use the `as` prop to render the card as a semantically appropriate HTML element.
 * Choose `'article'` for self-contained content, `'aside'` for complementary
 * content, and `'section'` for thematic groupings of related content.
 */
export const SemanticElement = Example.extend({
  name: 'Semantic element',
  argTypes: {
    as: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <Card {...args} as="article">
        <CardContent>{'<article>'}</CardContent>
      </Card>
      <Card {...args} as="aside">
        <CardContent>{'<aside>'}</CardContent>
      </Card>
      <Card {...args} as="section">
        <CardContent>{'<section>'}</CardContent>
      </Card>
    </>
  ),
})

/**
 * `Card` stretches to fill its container. Constrain it by wrapping it in an
 * element with an explicit width.
 */
export const Constrained = Example.extend({
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * When the entire card must be interactive — triggering an action or navigating
 * to a URL — use `ButtonCard` or `AnchorCard` instead of `Card`. Both variants
 * share Card's `borderRadius` and `padding` props and add hover, focus, and
 * disabled states appropriate for interactive elements.
 *
 * Use `ButtonCard` for actions (e.g. opening a modal, selecting an item). Use
 * `AnchorCard` for navigation (e.g. linking to a detail page).
 */
export const Interactive = Example.extend({
  argTypes: {
    as: { table: { disable: true } },
    isBorderless: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <ButtonCard borderRadius={args.borderRadius} padding={args.padding}>
        <CardContent>{'<ButtonCard>'}</CardContent>
      </ButtonCard>
      <AnchorCard borderRadius={args.borderRadius} href="https://www.reapit.com" padding={args.padding}>
        <CardContent>{'<AnchorCard>'}</CardContent>
      </AnchorCard>
    </>
  ),
})

/**
 * Use `aria-pressed` on `ButtonCard` to communicate a toggled or selected state
 * to assistive technologies. Use `aria-current="page"` on `AnchorCard` to
 * indicate the link represents the current page or location. In both cases the
 * card's border changes to indicate the active state.
 */
export const Selected = Interactive.extend({
  render: (args) => (
    <>
      <ButtonCard aria-pressed="true" borderRadius={args.borderRadius} padding={args.padding}>
        <CardContent>{'<ButtonCard>'}</CardContent>
      </ButtonCard>
      <AnchorCard
        aria-current="page"
        borderRadius={args.borderRadius}
        href="https://www.reapit.com"
        padding={args.padding}
      >
        <CardContent>{'<AnchorCard>'}</CardContent>
      </AnchorCard>
    </>
  ),
})
