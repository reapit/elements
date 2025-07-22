import { DialogFooter } from '../footer'
import { DialogHeader } from './header'
import { Pattern } from '#src/core/drawer/__story__/Pattern'
import { useDialogContextDecorator } from '../__story__/useDialogContextDecorator'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Dialog/Header',
  component: DialogHeader,
  argTypes: {
    action: {
      control: 'radio',
      mapping: {
        Close: <DialogHeader.CloseButton />,
        None: null,
      },
      options: ['Close', 'None'],
    },
    children: {
      control: 'text',
    },
  },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
  decorators: [useDialogContextDecorator()],
} satisfies Meta<typeof DialogHeader>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The dialog header can be used without an action. This will typically be the case when the dialog has a footer
 * that contains the actions available to the user.
 */
export const Example: Story = {
  args: {
    action: 'None',
    'aria-label': '',
    children: 'Dialog Title',
  },
}

/**
 * Dialogs that do not provide one or more actions in a footer should have a close action in the header to allow
 * user's to dismiss the dialog.
 */
export const Action: Story = {
  args: {
    ...Example.args,
    action: 'Close',
  },
}

/**
 * The dialog header can also be used without a visible title. In this case, an `aria-label` should be provided
 * to make the dialog accessible.
 */
export const NoTitle: Story = {
  args: {
    ...Action.args,
    'aria-label': 'Dialog Title',
    children: null,
  },
}

/**
 * By default, the dialog header will be sticky when the dialog content scrolls. This ensures the context displayed by
 * the dialog's header is always visible when viewing the content.
 */
export const StickyPositioning: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          boxSizing: 'border-box',
          border: '1px solid #FA00FF',
          containerType: 'inline-size',
          maxHeight: '200px',
          overflow: 'auto',
        }}
      >
        <Story />
        <Pattern />
      </div>
    ),
  ],
}

/**
 * However, when the drawer has a footer, the header will not be sticky and it will have no bottom border. This
 * behaviour explicitly depends on the presence of the "official" drawer footer's class being a
 * [subsequent sibling](https://developer.mozilla.org/en-US/docs/Web/CSS/Subsequent-sibling_combinator) to the header.
 */
export const StaticPositioning: Story = {
  args: {
    ...Example.args,
    action: 'None',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          boxSizing: 'border-box',
          border: '1px solid #FA00FF',
          containerType: 'inline-size',
          maxHeight: '200px',
          overflow: 'auto',
        }}
      >
        <Story />
        <Pattern />
        <DialogFooter>Footer</DialogFooter>
      </div>
    ),
  ],
}
