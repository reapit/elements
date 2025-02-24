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
    <ElTooltip
      role="tooltip"
      data-position={props.position}
      style={{ maxWidth: props.maxWidth }}
      data-is-visible={true}
    >
      {props.label && <ElTooltipLabel>{props.label}: </ElTooltipLabel>}
      {props.description}
    </ElTooltip>
  )

  return content
}

/**
 * The useTooltip hook provides an additional props:
 *
 * `getTruncationTargetProps()`: Applies a data-will-truncate attribute and a unique id to the target element.
 * Which is utilized by the `getTriggerProps()` function to determine whether the text has been truncated.
 * This enables conditional tooltip display only when truncation occurs, ensuring an optimal user experience.
 *
 * `getTriggerProps()` function applies general props to the trigger element.
 * The first parameter allows passing additional properties,
 * while setting the second parameter to true enables text truncation detection.
 * This ensures that the tooltip is conditionally displayed only when the text is truncated.
 *
 * Usage example: `getTriggerProps({}, true)`
 */
export const ConditionalDisplay = {
  render: () => {
    const tooltipData = [
      {
        tooltip: useTooltip(),
        text: 'Text is truncated here',
      },
      {
        tooltip: useTooltip(),
        text: 'Text not truncated',
      },
    ]

    return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', height: '20vh' }}>
        {tooltipData.map(({ tooltip, text }, index) => (
          <div
            key={index}
            style={{
              width: '138px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                display: 'block',
                minWidth: 0,
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                border: '1px solid #FA00FF',
              }}
              {...tooltip.getTriggerProps({}, true)}
              {...tooltip.getTruncationTargetProps()}
            >
              {text}
            </span>
            <Tooltip {...tooltip.getTooltipProps()} description={text} />
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `
render: () => {
  const tooltipWithTruncatedText = useTooltip()
  const tooltipWithoutTruncatedText = useTooltip()
  return (
    <>
      <div style={{ width: '138px' }}>
        <span
          {...tooltipWithTruncatedText.getTriggerProps({}, true)}
          {...tooltipWithTruncatedText.getTruncationTargetProps()}
        >
          This is truncated text
        </span>
        <Tooltip {...tooltipWithTruncatedText.getTooltipProps()} description="This is truncated text" />
      </div>
      <div style={{ width: '138px' }}>
        <span
          {...tooltipWithoutTruncatedText.getTriggerProps({}, true)}
          {...tooltipWithoutTruncatedText.getTruncationTargetProps()}
        >
          Text not truncated
        </span>
        <Tooltip {...tooltipWithoutTruncatedText.getTooltipProps()} description="Text not truncated" />
      </div>
    </>
  )
}
        `,
      },
    },
  },
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
