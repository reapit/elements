import preview from '#.storybook/preview'
import { FakeImage } from './__story__/fake-image'
import LogoDevice from './__story__/logo-device.svg?react'
import { PageHeader } from '../page-header'

const meta = preview.meta({
  title: 'Containers and layout/PageHeader/LeadingElement',
  component: PageHeader.LeadingElement,
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
})

export const Example = meta.story({
  args: {
    children: 'Image',
    type: 'image',
  },
})

export const Icon = meta.story({
  args: {
    children: 'Icon',
    type: 'icon',
  },
})
