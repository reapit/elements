import { getPopoverTriggerProps } from './get-popover-trigger-props'
import { Popover } from './popover'
import { styled } from '@linaria/react'
import { useId } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const MyPopoverContent = styled.div`
  padding: var(--spacing-2);
  background: var(--colour-fill-action-lightest);
  border: 1px solid #fa00ff;
`

const meta = {
  title: 'Utils/Popover',
  component: Popover,
  argTypes: {
    children: {
      control: false,
    },
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    // NOTE: because we have multiple stories on the one docs page, we append a "suffix" to
    // the IDs so they are unique per story. Then ensures our positioning of the popover will
    // be anchored to the correct element.
    const suffix = useId()
    const props = {
      ...args,
      anchorId: `${args.anchorId}-${suffix}`,
      id: `${args.id}-${suffix}`,
    }
    return (
      <>
        <button
          autoFocus
          {...getPopoverTriggerProps({ popoverTarget: props.id, popoverTargetAction: 'toggle' })}
          id={props.anchorId}
        >
          Anchor
        </button>
        <Popover {...props} />
      </>
    )
  },
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Popovers come with no styling: no background, no padding, no border. They are intended to be a blank
 * canvas on which to build a more visually attractive UI element, such as a tooltip or a menu.
 *
 * In the examples here, we're using a simple styled element as the content of the popover in order to
 * help communicate the behaviour and capabilities of the popover.
 */
export const Example: Story = {
  args: {
    anchorId: 'anchor',
    children: <MyPopoverContent>Popover content</MyPopoverContent>,
    elevation: 'none',
    gap: 'var(--spacing-1)',
    id: 'popover',
    placement: 'top-start',
    positionTryFallbacks: 'flip-block, flip-inline',
  },
}

/**
 * The distance, or gap, between the popover and its anchor can be customised. By default, there will be
 * no gap, but many use cases will call for a non-zero gap. While the `gap` prop accepts any valid CSS
 * length, it should typically be a `--spacing-*` CSS variable.
 */
export const Gap: Story = {
  args: {
    ...Example.args,
    gap: 'var(--spacing-6)',
  },
}

/**
 * There are a number of placements available for popovers relative to their anchor. They are shown below.
 */
export const Placements: Story = {
  args: {
    ...Example.args,
  },
  parameters: {
    controls: {
      disabled: true,
    },
  },
  render: () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
        <div
          id="anchor"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--colour-fill-neutral-light',
            borderRadius: 'var(--border-radius-xl)',
            width: '400px',
            height: '200px',
          }}
        >
          Anchor
        </div>
        {(
          [
            'top-start',
            'top',
            'top-end',
            'right-start',
            'right',
            'right-end',
            'bottom-start',
            'bottom',
            'bottom-end',
            'left-start',
            'left',
            'left-end',
          ] as const
        ).map((placement) => (
          <Popover
            key={placement}
            id={placement}
            anchorId="anchor"
            gap="var(--spacing-2)"
            placement={placement}
            popover={null}
            positionTryFallbacks="none"
          >
            <MyPopoverContent>{placement}</MyPopoverContent>
          </Popover>
        ))}
      </div>
    )
  },
}

/**
 * By default, popovers will grow to the width of their content. To constrain this behaviour, a maximum
 * width can be specified. Content should generally adapt to the constrained width by wrapping rather
 * than overflowing.
 *
 * While the maximum width can be defined using any valid CSS length, the value should typically be a
 * `--size-*` CSS variable.
 */
export const MaxWidth: Story = {
  args: {
    ...Example.args,
    children: (
      <MyPopoverContent>
        This popover has a lot of words, which increases the element&apos;s width to the point that it overflows the
        popover&apos;s maximum width constraint. In this case, the text flows to additional lines, increasing the
        intrinic height of the popover.
      </MyPopoverContent>
    ),
    maxWidth: 'var(--size-36)',
  },
}

/**
 * Similarly, popovers will grow, by default, to the height of their content. To constrain this behaviour,
 * a maximum height can also be specified, at which point the popover will scroll the content.
 *
 * As with the maximum width, the maximum height can be defined using any valid CSS length, but the value
 * should typically be a `--size-*` CSS variable.
 */
export const MaxHeight: Story = {
  args: {
    ...MaxWidth.args,
    maxHeight: 'var(--size-36)',
  },
}

/**
 * Since popovers are an elevated, non-modal material, it's common for them to cast a shadow on the
 * UI beneath them. This can be achieved using the `elevation` prop. There's currently two supported
 * elevations: `none` and `xl`.
 */
export const Elevation: Story = {
  args: {
    ...Example.args,
    elevation: 'xl',
  },
}
