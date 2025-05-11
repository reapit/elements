import { Button } from '../../button'
import { ButtonGroup } from '../../button-group'
import { Breakpoint, useDrawerBreakpointDecorator } from '../__story__/useDrawerBreakpointDecorator'
import { composeStories } from '@storybook/react'
import { DrawerFooter } from './footer'
import * as drawerBodyStories from '../body/body.stories'

import type { Meta, StoryObj } from '@storybook/react'

const DrawerBodyStories = composeStories(drawerBodyStories)

const meta = {
  title: 'Components/Drawer/Footer',
  component: DrawerFooter,
  argTypes: {
    children: {
      control: false,
    },
    supplementaryAction: {
      control: 'radio',
      mapping: {
        Delete: 'Delete',
        None: null,
      },
      options: ['Delete', 'None'],
    },
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
} satisfies Meta<typeof DrawerFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: (
      <ButtonGroup>
        <form>
          <Button formMethod="dialog" type="submit">
            Cancel
          </Button>
        </form>
        <Button variant="primary">Add</Button>
      </ButtonGroup>
    ),
    supplementaryAction: 'None',
  },
}

/**
 * TODO: Question this with design. Elements Figma file doesn't show a supplementary action,
 * but the Reapit DS file does.
 *
 * TODO: Also need to question whether the buttons are intended to "self-grow" for small breakpoints
 * or if that's only for mobile apps.
 */
export const SupplementaryAction: Story = {
  args: {
    ...Example.args,
    supplementaryAction: 'Delete',
  },
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
          maxHeight: '200px',
          overflow: 'auto',
        }}
      >
        <div style={{ color: '#FA00FF', height: '300px' }}>↓↓↓↓</div>
        <Story />
      </div>
    ),
  ],
}

/**
 * Like the header and body, the drawer footer will adjust it's padding based on the inline-size of its parent
 * container. This story demonstrates the unique padding within containers that mimic the drawer's width within
 * different breakpoints.
 */
export const DynamicPadding: StoryObj = {
  decorators: [useDrawerBreakpointDecorator()],
  render: () => (
    <>
      <Breakpoint breakpoint="XS-SM">
        <DrawerFooter {...SupplementaryAction.args} />
      </Breakpoint>
      <Breakpoint breakpoint="MD-2XL">
        <DrawerFooter {...SupplementaryAction.args} />
      </Breakpoint>
    </>
  ),
}
