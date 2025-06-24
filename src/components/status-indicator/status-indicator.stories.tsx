import { Meta } from '@storybook/react-vite'
import { StatusIndicator } from './status-indicator'
import { FlexContainer } from '../layout'

const meta = {
  title: 'Components/Status Indicator',
  component: StatusIndicator,
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'success', 'pending', 'warning', 'danger', 'inactive', 'accent1', 'accent2'],
      description: 'Defines the status indicator style variant.',
    },
    className: {
      control: 'text',
      description: 'CSS class for additional styling',
    },
  },
} satisfies Meta<typeof StatusIndicator>

export default meta

export const Default = {
  args: {
    children: 'Status Indicator',
  },
}

export const Variants = {
  render: ({}) => (
    <FlexContainer style={{ gap: 'var(--spacing-7)' }}>
      <StatusIndicator variant="neutral">Neutral</StatusIndicator>
      <StatusIndicator variant="success">Success</StatusIndicator>
      <StatusIndicator variant="pending">Pending</StatusIndicator>
      <StatusIndicator variant="warning">Warning</StatusIndicator>
      <StatusIndicator variant="danger">Danger</StatusIndicator>
      <StatusIndicator variant="inactive">Neutral</StatusIndicator>
      <StatusIndicator variant="accent1">Accent 1</StatusIndicator>
      <StatusIndicator variant="accent2">Accent 2</StatusIndicator>
    </FlexContainer>
  ),
}
