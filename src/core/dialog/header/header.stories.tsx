import preview from '#.storybook/preview'
import { Dialog } from '../dialog'
import { Pattern } from '#src/core/drawer/__story__/Pattern'
import { useDialogContextDecorator } from '../__story__/useDialogContextDecorator'

const meta = preview.meta({
  title: 'Core/Dialog/Header',
  component: Dialog.Header,
  argTypes: {
    action: {
      control: 'radio',
      mapping: {
        Close: <Dialog.Header.CloseButton />,
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
})

/**
 * The dialog header can be used without an action. This will typically be the case when the dialog has a footer
 * that contains the actions available to the user.
 */
export const Example = meta.story({
  args: {
    action: 'None',
    'aria-label': '',
    children: 'Dialog Title',
  },
})

/**
 * Dialogs that do not provide one or more actions in a footer should have a close action in the header to allow
 * user's to dismiss the dialog.
 */
export const Action = Example.extend({
  args: {
    action: 'Close',
  },
})

/**
 * The dialog header can also be used without a visible title. In this case, an `aria-label` should be provided
 * to make the dialog accessible.
 */
export const NoTitle = Action.extend({
  args: {
    'aria-label': 'Dialog Title',
    children: null,
  },
})

/**
 * By default, the dialog header will be sticky when the dialog content scrolls. This ensures the context displayed by
 * the dialog's header is always visible when viewing the content.
 */
export const StickyPositioning = Example.extend({
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
})

/**
 * However, when the drawer has a footer, the header will not be sticky and it will have no bottom border. This
 * behaviour explicitly depends on the presence of the "official" drawer footer's class being a
 * [subsequent sibling](https://developer.mozilla.org/en-US/docs/Web/CSS/Subsequent-sibling_combinator) to the header.
 */
export const StaticPositioning = Example.extend({
  args: {
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
        <Dialog.Footer>Footer</Dialog.Footer>
      </div>
    ),
  ],
})
