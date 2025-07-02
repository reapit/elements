import { Features } from './features'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Features',
  component: Features,
  argTypes: {
    children: {
      control: 'radio',
      options: ['One', 'Some', 'Many'],
      mapping: {
        One: <Features.Bedrooms value={4} />,
        Some: (
          <>
            <Features.Bedrooms value={4} />
            <Features.Bathrooms value={2} />
            <Features.CarSpaces value={2} />
          </>
        ),
        Many: (
          <>
            <Features.Bedrooms value={4} />
            <Features.Bathrooms value={2} />
            <Features.CarSpaces value={2} />
            <Features.LandSize
              value={
                <>
                  375 <abbr title="square metres">sq m</abbr>
                </>
              }
            />
          </>
        ),
      },
    },
  },
} satisfies Meta<typeof Features>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Many',
    size: '2xs',
  },
}

/** There are four sizes available: `2xs`, `xs`, `sm`, and `base`. */
export const Sizes: Story = {
  args: {
    ...Example.args,
    size: 'base',
  },
  argTypes: {
    size: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, max-content)',
          gridAutoFlow: 'row',
          gap: 'var(--spacing-10)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <Features {...args} size="2xs" />
      <Features {...args} size="xs" />
      <Features {...args} size="sm" />
      <Features {...args} size="base" />
    </>
  ),
}

/**
 * By default, feature items will wrap if they do not have enough space.
 */
export const Overflow: Story = {
  args: {
    children: 'Many',
    size: '2xs',
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '120px' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * However, wrapping can be prevented with `wrap="nowrap"`.
 */
export const NoWrap: Story = {
  args: {
    ...Overflow.args,
    wrap: 'nowrap',
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '120px' }}>
        <Story />
      </div>
    ),
  ],
}
