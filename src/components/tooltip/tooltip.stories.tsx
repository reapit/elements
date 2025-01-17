import { Meta } from '@storybook/react'
import { Button } from '../button'
import { useTooltip } from './use-tooltip'
import { Tooltip, TooltipProps } from './tooltip'
import { ElTooltip, ElTooltipLabel } from './styles'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    description: {
      control: 'text',
      description: 'Defines the description of the tooltip.',
    },
    label: {
      control: 'text',
      description: 'Defines the label of the tooltip',
    },
    position: {
      control: 'select',
      options: [
        'top',
        'bottom',
        'right',
        'left',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'right-start',
        'right-end',
        'left-start',
        'left-end',
      ],
      description: 'Defines where to position of the tooltip relative to the trigger.',
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'top' },
      },
    },
    maxWidth: {
      control: 'text',
      description: 'Defines the max-width of the tooltip container.',
      table: {
        type: { summary: 'string', detail: 'CSS max-width value (e.g., 400px, 50%)' },
        defaultValue: { summary: '400px' },
      },
    },
  },
}

export default meta

/**
 * The Tooltip component is a lightweight UI element used to display contextual
 * information when a user hovers over or focuses on a target element.
 * In the default configuration, the tooltip provides a brief label and/or description,
 * positioned to the top relative to the target,
 * with customizable properties such as label, description, position, and maxWidth.
 *
 * The component utilizes the `useTooltip` hook, which simplifies the integration of tooltip behavior
 * by providing properties and methods required to manage the tooltip and its trigger seamlessly.
 *
 * The `useTooltip` hook provides two keys props:
 *
 * `getTriggerProps()`: Applied to the trigger element (e.g., a Button or an Icon, etc)
 * to bind the necessary event handlers for displaying the tooltip.
 *
 * `getTooltipProps()`: Applied to the Tooltip component to manage its visibility, positioning, and accessibility.
 */
export const BasicUsage = {
  args: {
    description: 'Tooltip text', // Default value for description
    label: 'Label', // Default value for label
  },
  // This is to style the story, as the story parent container has overflow hidden.
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: (args: any) => {
    const tooltip = useTooltip()

    return (
      <>
        <Button {...tooltip.getTriggerProps()}>Hover me</Button>
        <Tooltip {...tooltip.getTooltipProps()} {...args} />
      </>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `
render: () => {
 const tooltip = useTooltip()
 return (
    <Button {...tooltip.getTriggerProps()}>Hover me</Button>
    <Tooltip {...tooltip.getTooltipProps()} label="Label" description="This is a tooltip" />
  )
}
        `,
      },
    },
  },
}

// Mock createPortal for this story
const MockedTooltip = (props: TooltipProps) => {
  const content = (
    <ElTooltip role="tooltip" data-position={props.position} style={{ maxWidth: props.maxWidth }} aria-live="assertive">
      {props.label && <ElTooltipLabel>{props.label}: </ElTooltipLabel>}
      {props.description}
    </ElTooltip>
  )

  return content
}

/**
 * Below is the UI representation for the tooltip component without the trigger.
 */
export const DisplayTooltipWithoutTrigger = {
  args: {
    description: 'Tooltip text', // Default value for description
    label: 'Label', // Default value for label
    position: 'top',
    maxWidth: '400px',
    isVisible: true,
  },
  render: (args) => {
    console.log('args', args)
    // Pass args to MockedTooltip to make it reactive
    return <MockedTooltip {...args} />
  },
  parameters: {
    docs: {
      canvas: {
        sourceState: 'none',
      },
      story: {
        inline: false,
        iframeHeight: 60,
      },
    },
  },
}
