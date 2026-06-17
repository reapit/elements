import figma from '@figma/code-connect'
import { FormLayout } from './form-layout'

figma.connect(FormLayout, '<FORM_LAYOUT_URL>', {
  variant: { 'Form header': true, 'Show footer': true },
  props: {
    title: figma.textContent('Form title'),
    children: figma.slot('Form body'),
    description: figma.textContent('Form description'),
    footer: figma.boolean('Show footer', {
      true: figma.children('Form footer'),
      false: undefined,
    }),
  },
  example: (props) => (
    <FormLayout>
      <FormLayout.Header>
        <FormLayout.Title>{props.title}</FormLayout.Title>
        <FormLayout.Description>{props.description}</FormLayout.Description>
      </FormLayout.Header>
      {props.children}
      <FormLayout.Footer>{props.footer}</FormLayout.Footer>
    </FormLayout>
  ),
})

figma.connect(FormLayout, '<FORM_LAYOUT_URL>', {
  variant: { 'Form header': true, 'Show footer': false },
  props: {
    title: figma.textContent('Form title'),
    children: figma.slot('Form body'),
    description: figma.textContent('Form description'),
  },
  example: (props) => (
    <FormLayout>
      <FormLayout.Header>
        <FormLayout.Title>{props.title}</FormLayout.Title>
        <FormLayout.Description>{props.description}</FormLayout.Description>
      </FormLayout.Header>
      {props.children}
    </FormLayout>
  ),
})

figma.connect(FormLayout, '<FORM_LAYOUT_URL>', {
  variant: { 'Form header': false, 'Show footer': true },
  props: {
    children: figma.slot('Form body'),
    footer: figma.boolean('Show footer', {
      true: figma.children('Form footer'),
      false: undefined,
    }),
  },
  example: (props) => (
    <FormLayout>
      {props.children}
      <FormLayout.Footer>{props.footer}</FormLayout.Footer>
    </FormLayout>
  ),
})

figma.connect(FormLayout, '<FORM_LAYOUT_URL>', {
  variant: { 'Form header': false, 'Show footer': false },
  props: {
    children: figma.slot('Form body'),
  },
  example: (props) => <FormLayout>{props.children}</FormLayout>,
})
