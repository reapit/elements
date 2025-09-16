import figma from '@figma/code-connect'
import { PageHeader } from '../page-header'

figma.connect(PageHeader.SupplementaryInfo, '<PAGE_HEADER_SUPPLEMENTARY_INFO_URL>', {
  props: {
    children: figma.children('*'),
  },
  example: (props) => <PageHeader.SupplementaryInfo>{props.children}</PageHeader.SupplementaryInfo>,
})
