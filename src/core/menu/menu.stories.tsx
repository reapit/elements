import { Badge } from '#src/core/badge'
import { Menu } from './menu'
import { StarIcon } from '#src/icons/star'
import { useId } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Core/Menu',
  component: Menu,
  argTypes: {
    children: {
      control: 'select',
      options: ['Simple', 'Fancy'],
      mapping: {
        Simple: (
          <>
            <Menu.AnchorItem href={href}>Item 1</Menu.AnchorItem>
            <Menu.Item>Item 2</Menu.Item>
            <Menu.Item>Item 3</Menu.Item>
          </>
        ),
        Fancy: (
          <>
            <Menu.Group label="Menu group">
              <Menu.AnchorItem
                badge={
                  <Badge colour="success" variant="reversed">
                    Badge
                  </Badge>
                }
                href={href}
                iconLeft={<StarIcon />}
                supplementaryInfo="Supplementary info"
              >
                Item 1
              </Menu.AnchorItem>
              <Menu.Item
                iconLeft={<StarIcon />}
                badge={
                  <Badge colour="success" variant="reversed">
                    Badge
                  </Badge>
                }
                supplementaryInfo="Supplementary info"
              >
                Item 2
              </Menu.Item>
              <Menu.Item
                iconLeft={<StarIcon />}
                badge={
                  <Badge colour="success" variant="reversed">
                    Badge
                  </Badge>
                }
                supplementaryInfo="Supplementary info"
              >
                Item 3
              </Menu.Item>
            </Menu.Group>
            <Menu.Divider />
            <Menu.Item>Item 4</Menu.Item>
            <Menu.Item>Item 5</Menu.Item>
            <Menu.Item>Item 6</Menu.Item>
          </>
        ),
      },
    },
    gap: {
      control: 'text',
      table: {
        type: {
          summary: '--spacing-*',
        },
      },
    },
    maxHeight: {
      control: 'text',
      table: {
        type: {
          summary: '--size-*',
        },
      },
    },
    maxWidth: {
      control: 'text',
      table: {
        type: {
          summary: '--size-*',
        },
      },
    },
  },
  render: (args) => {
    // NOTE: because we have multiple stories on the one docs page, we append a "suffix" to
    // the IDs so they are unique per story. Then ensures our positioning of the menu will
    // be anchored to the correct element.
    const suffix = useId()
    const props = {
      ...args,
      'aria-labelledby': `${args['aria-labelledby']}-${suffix}`,
      id: `${args.id}-${suffix}`,
    }

    return (
      <>
        <button
          aria-controls={props.id}
          aria-haspopup="menu"
          {...Menu.getTriggerProps({
            id: props['aria-labelledby'],
            popoverTarget: props.id,
            popoverTargetAction: 'toggle',
          })}
        >
          Click me!
        </button>
        <Menu {...props} />
      </>
    )
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Menu>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-labelledby': 'anchor',
    children: 'Simple',
    id: 'menu',
  },
}

/**
 * The distance, or gap, between the menu and its trigger can be customised. By default, there will be
 * a `--spacing-1`, but any `--spacing-*` value can be specified.
 */
export const Gap: Story = {
  args: {
    ...Example.args,
    gap: '--spacing-6',
  },
}

/**
 * By default, a menu will grow to the width of its widest item. A maximum width can be specified to
 * constrain how wide it can grow. Menu item content that would otherwise to wider will subsequently wrap.
 */
export const MaxWidth: Story = {
  args: {
    ...Example.args,
    children: (
      <>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
        <Menu.Item>
          An item with a really long label that will wrap to additional lines because the menu&apos;s width is
          constrained
        </Menu.Item>
      </>
    ),
    maxWidth: '--size-40',
  },
}

/**
 * By default, a menu will grow to the height of its items. A maximum height can be specified to
 * help ensure the menu does not grow beyond the viewport. If the menu exceeds this maximum height,
 * the items will scroll.
 */
export const MaxHeight: Story = {
  args: {
    ...Example.args,
    maxHeight: '--size-40',
  },
}

/**
 * By default, a menu will automatically close when one of its menu items are clicked. This behaviour
 * can be avoided by calling `event.preventDefault()` on the click event, either through an `onClick`
 * event handler on the Menu itself, or through an `onClick` handler on a specific menu item.
 *
 * The example below demonstrates a single, stubborn menu item that just won't let the menu close.
 */
export const PreventingClosure: Story = {
  args: {
    ...Example.args,
    children: (
      <>
        <Menu.Item onClick={(event) => event.preventDefault()}>I won&apos;t let the menu close</Menu.Item>
        <Menu.Item>But I will</Menu.Item>
      </>
    ),
  },
}

/**
 * If a menu item prevents the automatic closure of the menu, it's likely it will need to manually close
 * the menu itself at some point (e.g., after an asynchrous action has settled). To do this, the menu
 * element must be used.
 *
 * The `Menu.getClosestMenuElement` helper is available to assist with this. For example,
 *
 * ```ts
 * const handleClick = (event: React.MouseEvent) => {
 *   // Prevent the menu from closing automatically
 *   event.preventDefault()
 *   const menu = Menu.getClosestMenuElement(event.currentTarget)
 *
 *   await doSomethingAsync()
 *
 *   // Close the menu after the async action has completed
 *   menu?.hidePopover()
 * }
 * ```
 */
export const ImperativeClosure: Story = {
  args: {
    ...Example.args,
    children: (
      <>
        <Menu.Item
          onClick={async (event) => {
            event.preventDefault()
            const menu = Menu.getClosestMenuElement(event.currentTarget)

            // Simulate an async action
            await new Promise((resolve) => setTimeout(resolve, 1000))

            menu?.hidePopover()
          }}
        >
          I&apos;ll close the menu in a second
        </Menu.Item>
        <Menu.Item>But I will</Menu.Item>
      </>
    ),
  },
}
