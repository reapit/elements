import { Breadcrumbs } from '../breadcrumbs'
import figma from '@figma/code-connect'

figma.connect(Breadcrumbs.Link, '<BREADCRUMB_LINK_URL>', {
  props: {
    children: figma.string('Link text'),
  },
  example: (props) => <Breadcrumbs.Link href="#replace-me">{props.children}</Breadcrumbs.Link>,
})
