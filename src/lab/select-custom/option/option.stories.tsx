import type { Meta, StoryObj } from '@storybook/react-vite'
import { Option } from './option'
import { StarIcon } from '#src/icons/star'
import { LabelText } from '#src/core/label-text'
import { Badge } from '#src/core/badge'

const meta = {
  title: 'Lab/SelectCustom/Option',
  component: Option,
  argTypes: {
    value: {
      control: 'text',
      description: 'The internal value of the option.',
    },
    label: {
      control: 'text',
      description: 'The label displayed for the option.',
    },
    badge: {
      control: 'text',
      description: 'The badge displayed for the option.',
    },
    additionalInfo1: {
      control: 'radio',
      description: 'Additional information displayed below the label.',
      options: ['Default', 'Additional Info 1', 'Additional Info 2'],
      mapping: {
        Default: <></>,
        'Additional Info 1': (
          <>
            <StarIcon size="sm" color="primary" />
            <LabelText size="small">Additional Info 1</LabelText>
            <Badge colour="neutral">Badge</Badge>
          </>
        ),
        'Additional Info 2': (
          <>
            <StarIcon size="sm" color="primary" />
            <LabelText size="small">Additional Info 2</LabelText>
            <Badge colour="neutral">Badge</Badge>
          </>
        ),
      },
    },
    additionalInfo2: {
      control: 'radio',
      description: 'Additional information displayed below the label.',
      options: ['Default', 'Additional Info 1', 'Additional Info 2'],
      mapping: {
        Default: <></>,
        'Additional Info 1': (
          <>
            <StarIcon size="sm" color="primary" />
            <LabelText size="small">Additional Info 1</LabelText>
            <Badge colour="neutral">Badge</Badge>
          </>
        ),
        'Additional Info 2': (
          <>
            <StarIcon size="sm" color="primary" />
            <LabelText size="small">Additional Info 2</LabelText>
            <Badge colour="neutral">Badge</Badge>
          </>
        ),
      },
    },
    selected: {
      control: false,
    },
  },
} satisfies Meta<typeof Option>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Default story for the `Option` component.
 * Displays a basic option with only a value and label.
 */
export const Default: Story = {
  args: {
    value: 'option1',
    label: 'Option 1',
  },
}

/**
 * Custom usage story for the `Option` component.
 * Demonstrates how to use badges and additional info JSX elements.
 */
export const CustomUsage: Story = {
  args: {
    value: 'option1',
    label: 'Option 1',
    badge: 'New',
    additionalInfo1: 'Additional Info 1',
    additionalInfo2: 'Additional Info 2',
  },
}
