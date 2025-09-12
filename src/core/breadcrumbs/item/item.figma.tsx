import { Breadcrumbs } from '../breadcrumbs'
import figma from '@figma/code-connect'

figma.connect(Breadcrumbs.Item, '<BREADCRUMB_ITEM_URL>', {
  props: {
    children: figma.children('Breadcrumb link*'),
  },
  example: (props) => <Breadcrumbs.Item>{props.children}</Breadcrumbs.Item>,
})
