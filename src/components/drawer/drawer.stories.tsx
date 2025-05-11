import { composeStories } from '@storybook/react'
import Drawer from './drawer'
import { ElDrawerContent } from './styles'
import * as DrawerBodyStories from './body/body.stories'
import * as DrawerFormFooterStories from './form-footer/form-footer.stories'
import * as DrawerHeaderStories from './header/header.stories'
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
        Detail: <ExampleDetailDrawerContent />,
        Form: <ExampleFormDrawerContent />,
        Empty: null,
      },
      options: ['Detail', 'Form', 'Empty'],
    },
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Detail',
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

export const Patterns = {
  render: function DetailDrawer() {
    return (
      <div
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: '480px 480px',
          gridTemplateRows: 'auto',
          height: '400px',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
        // @ts-expect-error -- inert is not in @types/react yet
        inert=""
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ExampleDetailDrawerContent />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ExampleFormDrawerContent />
        </div>
      </div>
    )
  },
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
}

function ExampleDetailDrawerContent() {
  return (
    <ElDrawerContent>
      <HeaderStory title="Detail Drawer" />
      <BodyStory />
    </ElDrawerContent>
  )
}

function ExampleFormDrawerContent() {
  return (
    <ElDrawerContent>
      <HeaderStory action="None" title="Form Drawer" />
      <BodyStory />
      <FormFooterStory />
    </ElDrawerContent>
  )
}
