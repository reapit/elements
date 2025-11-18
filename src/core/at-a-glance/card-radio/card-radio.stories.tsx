import { AtAGlanceCardContent } from '../card-content'
import { AtAGlanceCardRadio } from './card-radio'
import { SproutIcon } from '#src/icons/sprout'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof AtAGlanceCardRadio> = {
  title: 'Core/AtAGlance/CardRadio',
  component: AtAGlanceCardRadio,
  argTypes: {
    defaultChecked: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
    children: {
      control: false,
    },
    name: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    defaultChecked: false,
    checked: undefined,
    children: <AtAGlanceCardContent icon={<SproutIcon />} label="Apple" description="Crunchy and juicy" value="42" />,
    name: 'fruit-1',
    value: 'apple',
  },
}

export const Checked: Story = {
  args: {
    ...Example.args,
    name: 'fruit-2',
    checked: true,
  },
}

export const Group: Story = {
  decorators: [
    (Story) => (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    return (
      <>
        <AtAGlanceCardRadio defaultChecked name="fruit" value="apple">
          <AtAGlanceCardContent icon={<SproutIcon />} label="Apple" layout="horizontal" value="42" />
        </AtAGlanceCardRadio>

        <AtAGlanceCardRadio name="fruit" value="banana">
          <AtAGlanceCardContent icon={<SproutIcon />} label="Banana" layout="horizontal" value="23" />
        </AtAGlanceCardRadio>
      </>
    )
  },
}
