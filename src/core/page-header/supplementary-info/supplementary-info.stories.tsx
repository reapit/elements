import { CompactSelectNative } from '#src/core/compact-select-native/index'
import { Features } from '#src/core/features/index'
import { PageHeaderSupplementaryInfo } from './supplementary-info'
import { SupplementaryInfo } from '#src/core/supplementary-info/index'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/PageHeader/SupplementaryInfo',
  component: PageHeaderSupplementaryInfo,
  argTypes: {
    children: {
      control: 'radio',
      options: ['Select', 'Supplementary Info', 'Features', 'All'],
      mapping: {
        Select: (
          <CompactSelectNative aria-label="Select portfolio" size="small">
            <option>Select portfolio</option>
            <option>Portfolio 1</option>
            <option>Portfolio 2</option>
            <option>Portfolio 3</option>
          </CompactSelectNative>
        ),
        'Supplementary Info': (
          <SupplementaryInfo size="sm">
            <SupplementaryInfo.Item>Supplementary Info 1</SupplementaryInfo.Item>
            <SupplementaryInfo.Item>Supplementary Info 2</SupplementaryInfo.Item>
          </SupplementaryInfo>
        ),
        Features: (
          <Features size="2xs">
            <Features.Bedrooms value={3} />
            <Features.Bathrooms value={2} />
            <Features.CarSpaces value={2} />
            <Features.LandSize value="375 sq m" />
          </Features>
        ),
        All: (
          <>
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
          </>
        ),
      },
    },
  },
} satisfies Meta<typeof PageHeaderSupplementaryInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'All',
  },
}

/**
 * When there is not enough space to display all the supplementary information on a single line, they will wrap to
 * additional lines.
 */
export const Overflow: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexFlow: 'column', gap: 'var(--spacing-10)' }}>
        <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '400px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
}
