import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Button, ButtonGroup } from '../button'

import { Dialog as DialogReactUsage } from './dialog'
import { Dialog as DialogBasicUsage } from './dialog.atoms'

const meta = {
  title: 'Components/Dialog',
  component: DialogReactUsage,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
    },
    'data-size': {
      control: {
        type: 'select',
        options: ['small', 'medium'],
      },
    },
    isOpen: {
      control: false,
      description: 'Whether the dialog is open or not',
      type: 'boolean',
    },
    children: {
      control: false,
      description: 'JSX content that will placed within the dialog body',
      name: 'content',
      type: 'function',
    },
    footerItems: {
      control: false,
      description: 'The JSX footer content for dialog footer',
      type: 'function',
    },
    handleCloseDialog: action('handleCloseDialog'),
  },
  args: {
    title: 'Welcome to the demo dialog',
    children: "Here's some nice content for the inside of the basic dialog",
    'data-size': undefined,
    isOpen: true,
    handleCloseDialog: action('handleCloseDialog'),
    footerItems: ({ closeDialog }) => (
      <ButtonGroup>
        <Button intent="secondary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button intent="primary" onClick={closeDialog}>
          Save
        </Button>
      </ButtonGroup>
    ),
  },
} satisfies Meta<typeof DialogReactUsage>

export default meta
type Story = StoryObj<typeof meta>

export const BasicUsageSmall: Story = {
  args: {
    isOpen: true,
    title: 'Hello from Small Dialog',
    'data-size': 'small',
  },
  render: ({ title, children, footerItems, isOpen, ...rest }) => {
    return (
      <DialogBasicUsage {...rest} data-size={rest['data-size']} open={isOpen}>
        <DialogBasicUsage.Title title={title} />
        <DialogBasicUsage.Body>{children}</DialogBasicUsage.Body>
        <DialogBasicUsage.Footer>{footerItems({ closeDialog: action('closeDialog') })}</DialogBasicUsage.Footer>
      </DialogBasicUsage>
    )
  },
}

export const BasicUsageMedium: Story = {
  args: {
    isOpen: true,
    title: 'Hello from Medium Dialog',
    'data-size': 'medium',
  },
  render: ({ title, children, footerItems, isOpen, ...rest }) => {
    return (
      <DialogBasicUsage {...rest} data-size={rest['data-size']} open={isOpen}>
        <DialogBasicUsage.Title title={title} />
        <DialogBasicUsage.Body>{children}</DialogBasicUsage.Body>
        <DialogBasicUsage.Footer>{footerItems({ closeDialog: action('closeDialog') })}</DialogBasicUsage.Footer>
      </DialogBasicUsage>
    )
  },
}

export const ReactUsage: Story = {
  args: {
    title: 'Hello from React Usage Dialog',
    children: "Here's some nice content for the inside of the React dialog",
    handleCloseDialog: action('handleCloseDialog'),
  },
  render: ({ title, children, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <ButtonGroup>
          <Button intent="secondary" onClick={() => setIsOpen(true)}>
            Open Dialog
          </Button>
        </ButtonGroup>
        <DialogReactUsage
          {...rest}
          isOpen={isOpen}
          title={title}
          handleCloseDialog={() => setIsOpen(false)}
          footerItems={({ closeDialog }) => (
            <ButtonGroup alignment="right">
              <Button intent="secondary" onClick={closeDialog}>
                Cancel
              </Button>
              <Button intent="primary" onClick={closeDialog}>
                Close
              </Button>
            </ButtonGroup>
          )}
        >
          <p>{children}. Try to change the size of the dialog</p>
        </DialogReactUsage>
      </>
    )
  },
}
