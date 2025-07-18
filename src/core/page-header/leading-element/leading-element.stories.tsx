import { FakeImage } from './__story__/fake-image'
import LogoDevice from './__story__/logo-device.svg?react'
import { PageHeaderLeadingElement } from './leading-element'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/PageHeader/LeadingElement',
  component: PageHeaderLeadingElement,
  argTypes: {
    children: {
      control: 'radio',
      options: ['Icon', 'Image'],
      mapping: {
        Image: <FakeImage />,
        Icon: <LogoDevice style={{ width: '100%', height: '100%' }} />,
      },
    },
  },
} satisfies Meta<typeof PageHeaderLeadingElement>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Image',
    type: 'image',
  },
}

export const Icon: Story = {
  args: {
    children: 'Icon',
    type: 'icon',
  },
}
