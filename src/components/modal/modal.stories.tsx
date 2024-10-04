import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'
import { cx } from '@linaria/core'

import { elIsActive } from '../../styles/states'

import { Button, ButtonGroup } from '../button'

import { ModalBg, ModalBody, ModalHeader, ModalContainer, Modal, ModalFooter, getModalVariantClass } from './index'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    isOpen: {
      control: false,
      description: 'Whether the modal is open or not',
      type: 'boolean',
    },
    onModalClose: {
      control: { type: 'function' },
      type: 'function',
      description: 'Callback function to be called when the modal is closed',
    },
    variant: {
      control: { type: 'select' },
      options: ['small', 'medium'],
      type: 'string',
      description: 'The variant of the modal (small or medium)',
    },
    title: {
      control: { type: 'text' },
      description: 'The title of the modal',
      type: 'string',
    },
    children: {
      control: false,
      description: 'JSX content of the modal',
      name: 'content',
      type: 'function',
    },
    footer: {
      control: false,
      description: 'The footer content of the modal',
      type: 'function',
    },
  },
  args: {
    isOpen: true,
    onModalClose: action('onModalClose'),
    title: 'Welcome to the demo modal',
    children: "Here's some nice content for the inside of the modal",
    footer: (
      <ButtonGroup>
        <Button intent="secondary">Cancel</Button>
        <Button intent="primary">Save</Button>
      </ButtonGroup>
    ),
  },
  render: ({ title, children, footer, variant, onModalClose, ...rest }) => (
    <>
      <ModalBg className={elIsActive} onClick={onModalClose} />
      <ModalContainer
        role="dialog"
        aria-modal="true"
        aria-describedby="modal-1"
        className={cx(elIsActive, getModalVariantClass(variant))}
        autoFocus
        {...rest}
        title={title}
      >
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalBody id="modal-1">{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContainer>
    </>
  ),
} satisfies Meta<typeof Modal>

export default meta

export const BasicUsage: StoryObj<typeof meta> = {}

export const SmallVariant: StoryObj<typeof meta> = {
  args: {
    title: 'Hello from small modal',
    variant: 'small',
  },
}

export const SmallVariantWithoutTitle: StoryObj<typeof meta> = {
  args: {
    variant: 'small',
    title: undefined,
  },
  argTypes: {
    title: {
      control: false,
      description: 'The title of the modal',
      type: 'string',
    },
  },
}

export const MediumVariant: StoryObj<typeof meta> = {
  args: {
    title: 'Hello from medium modal',
    variant: 'medium',
  },
}

export const MediumVariantWithoutTitle: StoryObj<typeof meta> = {
  args: {
    variant: 'medium',
    title: undefined,
  },
  argTypes: {
    title: {
      control: false,
      description: 'The title of the modal',
      type: 'string',
    },
  },
}

export const ReactUsage: StoryObj<typeof meta> = {
  args: {
    title: 'Hello from react usage modal',
  },
  render: ({ title, children, variant, onModalClose, ...rest }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const handleOpenModal = () => {
      setModalIsOpen(true)
    }

    const handleCloseModal = () => {
      onModalClose()
      setModalIsOpen(false)
    }

    return (
      <>
        <Button intent="primary" onClick={handleOpenModal}>
          Open Modal
        </Button>
        <Modal
          onModalClose={handleCloseModal}
          variant={variant}
          title={title}
          {...rest}
          footer={
            <ButtonGroup>
              <Button intent="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button intent="primary" onClick={handleCloseModal}>
                Save
              </Button>
            </ButtonGroup>
          }
          isOpen={modalIsOpen}
        >
          {children}
        </Modal>
      </>
    )
  },
}
