import { ComboboxCardDefaultContent } from './card-default-content'
import { SupplementaryInfo } from '#src/core/supplementary-info'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Utils/Combobox/CardDefaultContent',
  component: ComboboxCardDefaultContent,
  argTypes: {
    children: {
      control: 'text',
    },
    additionalInfo: {
      control: 'radio',
      options: ['None', 'One line', 'Two lines'],
      mapping: {
        None: undefined,
        'One line': (
          <SupplementaryInfo>
            <SupplementaryInfo.Item>Supplementary info</SupplementaryInfo.Item>
          </SupplementaryInfo>
        ),
        'Two lines': [
          <SupplementaryInfo key="line-1">
            <SupplementaryInfo.Item>Supplementary info</SupplementaryInfo.Item>
          </SupplementaryInfo>,
          <SupplementaryInfo key="line-2">
            <SupplementaryInfo.Item>Supplementary info</SupplementaryInfo.Item>
          </SupplementaryInfo>,
        ],
      },
    },
  },
} satisfies Meta<typeof ComboboxCardDefaultContent>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Selected item label',
    additionalInfo: 'None',
  },
}
