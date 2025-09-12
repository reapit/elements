import { Breadcrumbs } from './breadcrumbs'
import figma from '@figma/code-connect'

figma.connect(Breadcrumbs, '<BREADCRUMBS_URL>', {
  props: {
    children: figma.children('*'),
  },
  example: (props) => <Breadcrumbs>{props.children}</Breadcrumbs>,
})
