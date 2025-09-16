import figma from '@figma/code-connect'
import { PageHeader } from '../page-header'

figma.connect(PageHeader.LeadingElement, '<PAGE_HEADER_LEADING_ELEMENT_URL>', {
  props: {
    type: figma.enum('Type', {
      Image: 'image',
      Icon: 'icon',
    }),
  },
  example: (props) => (
    <PageHeader.LeadingElement type={props.type}>TODO: Add leading element content</PageHeader.LeadingElement>
  ),
})
