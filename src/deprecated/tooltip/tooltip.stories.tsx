import { Meta } from '@storybook/react-vite'
import { DeprecatedButton } from '../../deprecated/button'
import { useDeprecatedTooltip } from './use-tooltip'
import { DeprecatedTooltip, DeprecatedTooltipProps } from './tooltip'
import { ElDeprecatedTooltip, ElDeprecatedTooltipLabel } from './styles'
import { useId } from 'react'
import { FlexContainer } from '../../deprecated/layout'

const meta: Meta<typeof DeprecatedTooltip> = {
  title: 'Core/Tooltip',
  component: DeprecatedTooltip,
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
 *
 *
 * **Note**: The tooltip component ensures that the tooltip remains visible regardless of its
 * initially declared position.
 * If the tooltip overflows the viewport in any direction,
 * it automatically adjusts to stay visible inside the viewport.
 * This guarantees an optimal viewing experience without content being clipped or hidden.
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
    const tooltip = useDeprecatedTooltip()

    return (
      <>
        <DeprecatedButton {...tooltip.getTriggerProps()}>Hover me</DeprecatedButton>
        <DeprecatedTooltip {...tooltip.getTooltipProps()} {...args} />
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
const MockedTooltip = (props: DeprecatedTooltipProps) => {
  const content = (
    <ElDeprecatedTooltip
      role="tooltip"
      data-position={props.position}
      style={{ maxWidth: props.maxWidth }}
      data-is-visible={true}
    >
      {props.label && <ElDeprecatedTooltipLabel>{props.label}: </ElDeprecatedTooltipLabel>}
      {props.description}
    </ElDeprecatedTooltip>
  )

  return content
}

/**
 * The useTooltip hook provides an optional parameter.
 *
 * `truncationTargetId` **(Optional)**
 *
 * This optional parameter allows you to specify an ID for a target element that may have truncated text.
 * If provided, the tooltip will only appear when the text within the target element is truncated
 * (i.e., the content overflows the element's width).
 * When the text in the element specified by truncationTargetId is truncated,
 * the tooltip will be shown when the user interacts with the element (e.g., mouse hover, focus).
 * If the element's text is not truncated, the tooltip will not be displayed.
 *
 * Usage example:
 *
 * ```
 * const truncatedId = 'test-id' // can use useId() from react to get unique Id
 * const tooltip = useTooltip({ truncationTargetId: truncatedId })
 * ```
 *
 * To ensure the tooltip triggers correctly, you need to pass the `truncationTargetId` to the element
 * that will be responsible for showing the tooltip (trigger element).
 * This allows the hook to correctly detect when the text is truncated and display the tooltip.
 *
 *

 *
 * ```
 *
 * <div id={truncatedId}>Text will get truncated</div>
 * ```
 */
export const ConditionalDisplay = {
  render: () => {
    const truncatedElementId1 = useId()
    const truncatedElementId2 = useId()
    const tooltipData = [
      {
        tooltip: useDeprecatedTooltip({ truncationTargetId: truncatedElementId1 }),
        text: 'Text is truncated here',
        id: truncatedElementId1,
      },
      {
        tooltip: useDeprecatedTooltip({ truncationTargetId: truncatedElementId2 }),
        text: 'Text not truncated',
        id: truncatedElementId2,
      },
    ]

    return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', height: '20vh' }}>
        {tooltipData.map(({ tooltip, text, id }, index) => (
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
              id={id}
              style={{
                display: 'block',
                minWidth: 0,
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                border: '1px solid #FA00FF',
              }}
              {...tooltip.getTriggerProps()}
            >
              {text}
            </span>
            <DeprecatedTooltip {...tooltip.getTooltipProps()} description={text} />
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
  const triggerElementIdforTruncatedText = 'trigger-id-for-truncated-text' // Can use useId() from react to get unique id
  const triggerElementIdforNonTruncatedText = 'trigger-id-for-non-truncated-text' // Can use useId() from react to get unique id

  const tooltipWithTruncatedText = useTooltip({ truncationTargetId : triggerElementIdforTruncatedText })
  const tooltipWithoutTruncatedText = useTooltip({ truncationTargetId : triggerElementIdforNonTruncatedText })
  return (
    <>
      <div style={{ width: '138px' }}>
        <span
          id={triggerElementIdforTruncatedText}
          {...tooltipWithTruncatedText.getTriggerProps()}
        >
          This is truncated text
        </span>
        <Tooltip {...tooltipWithTruncatedText.getTooltipProps()} description="This is truncated text" />
      </div>
      <div style={{ width: '138px' }}>
        <span
          id={triggerElementIdforNonTruncatedText}
          {...tooltipWithoutTruncatedText.getTriggerProps()}
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

/**
 * This tooltip component ensures that the tooltip remains visible regardless of its initially declared position.
 * If the tooltip overflows the viewport in any direction,
 * it automatically adjusts to stay visible inside the viewport.
 * This guarantees an optimal viewing experience without content being clipped or hidden.
 */
export const DynamicDisplayTooltipExample = {
  args: {
    description: 'Tooltip text', // Default value for description
    label: 'Label', // Default value for label
    position: 'top',
    maxWidth: '400px',
  },
  render: (args) => {
    const tooltipTopLeft = useDeprecatedTooltip()
    const tooltipTopRight = useDeprecatedTooltip()
    const tooltipBottomRight = useDeprecatedTooltip()
    const tooltipBottomLeft = useDeprecatedTooltip()
    // Pass args to MockedTooltip to make it reactive
    return (
      <FlexContainer>
        <FlexContainer
          isFlexColumn
          isFlexJustifyBetween
          style={{
            height: '100vh',
            width: '100vw',
            overflow: 'hidden',
            minWidth: 'auto',
          }}
        >
          <FlexContainer isFlexJustifyBetween>
            <DeprecatedButton {...tooltipTopLeft.getTriggerProps()}>Hover me</DeprecatedButton>
            <DeprecatedTooltip {...tooltipTopLeft.getTooltipProps()} {...args} />
            <DeprecatedButton {...tooltipTopRight.getTriggerProps()}>Hover me</DeprecatedButton>
            <DeprecatedTooltip {...tooltipTopRight.getTooltipProps()} {...args} />
          </FlexContainer>
          <FlexContainer isFlexJustifyBetween>
            <DeprecatedButton {...tooltipBottomRight.getTriggerProps()}>Hover me</DeprecatedButton>
            <DeprecatedTooltip {...tooltipBottomRight.getTooltipProps()} {...args} />
            <DeprecatedButton {...tooltipBottomLeft.getTriggerProps()}>Hover me</DeprecatedButton>
            <DeprecatedTooltip {...tooltipBottomLeft.getTooltipProps()} {...args} />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    )
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
