import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Button } from '../button'
import { Dialog } from './dialog'
import { ElDialog, ElDialogBody, ElDialogFooter, ElDialogHeader, ElDialogTitle } from './style'
import { ButtonGroup } from '../button-group'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'padded',
  },
  args: {
    isOpen: true,
  },
  argTypes: {
    isOpen: {
      control: false,
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'medium'],
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const BasicUsageSmall: Story = {
  render: (args) => {
    return (
      <ElDialog {...args} data-size="small" open>
        <ElDialogHeader>
          <ElDialogTitle>Small Dialog Title</ElDialogTitle>
        </ElDialogHeader>
        <ElDialogBody>Content</ElDialogBody>
        <ElDialogFooter>
          <ButtonGroup>
            <Button>Cancel</Button>
            <Button variant="primary">Close</Button>
          </ButtonGroup>
        </ElDialogFooter>
      </ElDialog>
    )
  },
}

export const BasicUsageMedium: Story = {
  render: (args) => {
    return (
      <ElDialog {...args} data-size="medium" open>
        <ElDialogHeader>
          <ElDialogTitle>Medium Dialog Title</ElDialogTitle>
        </ElDialogHeader>
        <ElDialogBody>Content</ElDialogBody>
        <ElDialogFooter>
          <ButtonGroup>
            <Button>Cancel</Button>
            <Button variant="primary">Close</Button>
          </ButtonGroup>
        </ElDialogFooter>
      </ElDialog>
    )
  },
}

export const ReactUsage: Story = {
  args: {
    title: 'Hello from React Usage Dialog!',
    size: 'small',
    children: "Here's some nice content for the inside of the React dialog",
    onClose: action('handleCloseDialog'),
    isOpen: false,
  },
  render: ({ title, children, size, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <ButtonGroup>
          <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        </ButtonGroup>
        <Dialog {...rest} isOpen={isOpen} size={size} title={title} onClose={() => setIsOpen(false)}>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>{children}</Dialog.Body>
          <Dialog.Footer>
            <ButtonGroup>
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </ButtonGroup>
          </Dialog.Footer>
        </Dialog>
      </>
    )
  },
}
