import preview from '#.storybook/preview'
import { Button } from '#src/core/button/index'
import { Dialog } from '../dialog'
import { Pattern } from '#src/core/drawer/__story__/Pattern'

const meta = preview.meta({
  title: 'Containers and layout/Dialog/Footer',
  component: Dialog.Footer,
  argTypes: {
    children: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      // NOTE: The footer requires a parent container with `containerType: 'inline-size'` to allow its container
      // queries to work. Typically, this would be the Drawer itself, but we're not rendering that here.
      <div style={{ containerType: 'inline-size' }}>
        <Story />
      </div>
    ),
  ],
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
})

export const Example = meta.story({
  args: {
    children: (
      <>
        {/* Note: We use `display: contents` to allow the grid layout of the footer to affect the Cancel button.
         * There are other ways to achieve this, but this is one of the simplest. We may chose, in future, to
         * provide a Drawer-specific Cancel button similar to the header's Close button.*/}
        <form style={{ display: 'contents' }}>
          <Button formMethod="dialog" size="medium" type="submit" variant="secondary">
            Cancel
          </Button>
        </form>
        <Button size="medium" variant="primary">
          Add
        </Button>
      </>
    ),
  },
})

/**
 * The drawer footer actions will expand to equally share space when inside a full-screen dialog.
 */
export const FullScreen = Example.extend({
  decorators: [
    (Story) => (
      <div data-size="full-screen">
        <Story />
      </div>
    ),
  ],
})

/**
 * The drawer footer is sticky positioned to the bottom of its parent when it scrolls.
 */
export const Sticky = Example.extend({
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
        <Pattern />
        <Story />
      </div>
    ),
  ],
})
