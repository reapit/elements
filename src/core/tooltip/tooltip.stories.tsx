import preview from '#.storybook/preview'
import { Tooltip } from './tooltip'
import { useId } from 'react'

const meta = preview.meta({
  title: 'Core/Tooltip',
  component: Tooltip,
  argTypes: {
    children: {
      control: 'text',
    },
    maxWidth: {
      control: 'text',
      table: {
        type: {
          summary: '--size-*',
        },
      },
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ],
    },
  },
  render: (args) => {
    // NOTE: because we have multiple stories on the one docs page, we append a "suffix" to
    // the IDs so they are unique per story. This ensures our positioning of the tooltip will
    // be anchored to the correct element.
    const suffix = useId()
    const props = {
      ...args,
      id: `${args.id}-${suffix}`,
      triggerId: `${args.triggerId}-${suffix}`,
      truncationTargetId: args.truncationTargetId ? `${args.truncationTargetId}-${suffix}` : undefined,
    }

    return (
      <>
        <button
          {...Tooltip.getTriggerProps({ id: props.triggerId, tooltipId: props.id, tooltipPurpose: 'describe' })}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
        >
          Hover or focus me!
        </button>
        <Tooltip {...props} />
      </>
    )
  },
  parameters: {
    layout: 'centered',
  },
})

export const Example = meta.story({
  args: {
    children: "I'm a helpful tooltip, short and concise",
    id: 'tooltip',
    triggerId: 'trigger',
  },
})

/**
 * Tooltips can be positioned in different locations relative to their trigger element.
 * The placement can be customized using the `placement` prop.
 */
export const Placement = Example.extend({
  args: {
    placement: 'bottom',
  },
})

/**
 * Tooltips will grow to the width of their content, up to a default maximum of `--size-100` (400px).
 * This maximum width can be overridden when required.
 */
export const MaxWidth = Example.extend({
  name: 'Max-width',
  args: {
    children: 'This is a very long tooltip message that will wrap to additional lines.',
    maxWidth: '--size-40',
  },
})

/**
 * In some cases, we only want the tooltip to display if some or all of the trigger's content is truncated.
 * By specifying a `truncationTargetId`, the tooltip will only display on focus/hover if that targeted
 * element's content is not fully visible.
 */
export const ConditionalDisplay = Example.extend({
  args: {
    children: 'Hover or focus me!',
    truncationTargetId: 'trigger',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '50px' }}>
          <Story />
        </div>
        <Story />
      </div>
    ),
  ],
})
