import figma from '@figma/code-connect'
import { FormLayout } from '../form-layout'

figma.connect(FormLayout.Section, '<FORM_LAYOUT_SECTION_URL>', {
  variant: { 'Section header': true, '↳ Show description': true },
  props: {
    title: figma.textContent('Form title'),
    children: figma.slot('Form body'),
    description: figma.textContent('Section description'),
  },
  example: (props) => (
    <FormLayout.Section>
      <FormLayout.SectionHeader>
        <FormLayout.SectionTitle>{props.title}</FormLayout.SectionTitle>
        <FormLayout.SectionDescription>{props.description}</FormLayout.SectionDescription>
      </FormLayout.SectionHeader>
      {props.children}
    </FormLayout.Section>
  ),
})

figma.connect(FormLayout.Section, '<FORM_LAYOUT_SECTION_URL>', {
  variant: { 'Section header': true, '↳ Show description': false },
  props: {
    title: figma.textContent('Form title'),
    children: figma.slot('Form body'),
  },
  example: (props) => (
    <FormLayout.Section>
      <FormLayout.SectionHeader>
        <FormLayout.SectionTitle>{props.title}</FormLayout.SectionTitle>
      </FormLayout.SectionHeader>
      {props.children}
    </FormLayout.Section>
  ),
})

figma.connect(FormLayout.Section, '<FORM_LAYOUT_SECTION_URL>', {
  variant: { 'Section header': false, '↳ Show description': false },
  props: {
    children: figma.slot('Form body'),
  },
  example: (props) => <FormLayout.Section>{props.children}</FormLayout.Section>,
})
