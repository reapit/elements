import { composeStories } from '@storybook/react'
import Drawer from './drawer'
import * as DrawerBodyStories from './body/body.stories'
import * as DrawerFormFooterStories from './footer/footer.stories'
import * as DrawerHeaderStories from './header/header.stories'
import { Breakpoint, useDrawerBreakpointDecorator } from './__story__/useDrawerBreakpointDecorator'
import { useArgs } from '@storybook/preview-api'

import type { Meta, StoryObj } from '@storybook/react'

const { Example: BodyStory } = composeStories(DrawerBodyStories)
const { Example: FormFooterStory } = composeStories(DrawerFormFooterStories)
const { Example: HeaderStory } = composeStories(DrawerHeaderStories)

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    children: {
      control: 'radio',
      mapping: {
        Simple: <ExampleSimpleLayout />,
        'With Footer': <ExampleFooterLayout />,
        Empty: null,
      },
      options: ['Simple', 'With Footer', 'Empty'],
    },
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Simple',
    closedBy: 'closerequest',
    isOpen: false,
  },
  render: function Example(args) {
    const [, setArgs] = useArgs()
    return (
      <>
        <button onClick={() => setArgs({ isOpen: true })}>Open Drawer</button>
        <Drawer onClose={() => setArgs({ isOpen: false })} {...args} />
      </>
    )
  },
}

/**
 * There's two main layout variations for drawer's and two sizes. The first layout has no footer and is typically
 * used to display content that is not part of a form. The second layout has a footer, which will typically house
 * form actions like submit and cancel.
 *
 * The drawer also sizes itself based on the viewport size. This is faked in the story below by sizing the container
 * of the example drawer content to match the width the drawer will within the specified breakpoint ranges.
 */
export const Breakpoints: StoryObj = {
  decorators: [useDrawerBreakpointDecorator()],
  render: () => (
    <>
      <Breakpoint breakpoint="XS-SM">
        <ExampleSimpleLayout />
      </Breakpoint>
      <Breakpoint breakpoint="MD-2XL">
        <ExampleSimpleLayout />
      </Breakpoint>

      <Breakpoint breakpoint="XS-SM">
        <ExampleFooterLayout />
      </Breakpoint>
      <Breakpoint breakpoint="MD-2XL">
        <ExampleFooterLayout />
      </Breakpoint>
    </>
  ),
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}

function ExampleSimpleLayout() {
  return (
    <>
      <HeaderStory title="Drawer title" />
      <BodyStory children="Long" />
    </>
  )
}

function ExampleFooterLayout() {
  return (
    <>
      <HeaderStory action="None" title="Drawer title" />
      <BodyStory children="Long" />
      <FormFooterStory />
    </>
  )
}
