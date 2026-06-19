import { Dialog } from './dialog'
import figma from '@figma/code-connect'

figma.connect(Dialog, '<DIALOG_URL>', {
  variant: { Footer: true, 'Show title': true },
  props: {
    children: figma.slot('Content slot'),
    footer: figma.children('Button group'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      'Full screen': 'full-screen',
    }),
    title: figma.textContent('Title'),
  },
  example: (props) => (
    <Dialog size={props.size}>
      <Dialog.Header>{props.title}</Dialog.Header>
      <Dialog.Body>{props.children}</Dialog.Body>
      <Dialog.Footer>{props.footer}</Dialog.Footer>
    </Dialog>
  ),
})

figma.connect(Dialog, '<DIALOG_URL>', {
  variant: { Footer: true, 'Show title': false },
  props: {
    children: figma.slot('Content slot'),
    footer: figma.children('Button group'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      'Full screen': 'full-screen',
    }),
  },
  example: (props) => (
    <Dialog size={props.size}>
      <Dialog.Header aria-label="Replace me with an accessible title" />
      <Dialog.Body>{props.children}</Dialog.Body>
      <Dialog.Footer>{props.footer}</Dialog.Footer>
    </Dialog>
  ),
})

figma.connect(Dialog, '<DIALOG_URL>', {
  variant: { Footer: false, 'Show title': true },
  props: {
    children: figma.slot('Content slot'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      'Full screen': 'full-screen',
    }),
    title: figma.textContent('Title'),
  },
  example: (props) => (
    <Dialog size={props.size}>
      <Dialog.Header action={<Dialog.HeaderCloseButton />}>{props.title}</Dialog.Header>
      <Dialog.Body>{props.children}</Dialog.Body>
    </Dialog>
  ),
})

figma.connect(Dialog, '<DIALOG_URL>', {
  variant: { Footer: false, 'Show title': false },
  props: {
    children: figma.slot('Content slot'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      'Full screen': 'full-screen',
    }),
  },
  example: (props) => (
    <Dialog size={props.size}>
      <Dialog.Header action={<Dialog.HeaderCloseButton />} aria-label="Replace me with an accessible title" />
      <Dialog.Body>{props.children}</Dialog.Body>
    </Dialog>
  ),
})
