import { Button } from '#src/core/button/index'
import { DialogFooter } from './footer'
import { Pattern } from '#src/core/drawer/__story__/Pattern'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Dialog/Footer',
  component: DialogFooter,
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
} satisfies Meta<typeof DialogFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
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
}

/**
 * The drawer footer actions will expand to equally share space when inside a full-screen dialog.
 */
export const FullScreen: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story) => (
      <div data-size="full-screen">
        <Story />
      </div>
    ),
  ],
}

/**
 * The drawer footer is sticky positioned to the bottom of its parent when it scrolls.
 */
export const Sticky: Story = {
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
        <Pattern />
        <Story />
      </div>
    ),
  ],
}
