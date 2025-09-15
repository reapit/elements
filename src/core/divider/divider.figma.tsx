import { Divider } from './divider'
import figma from '@figma/code-connect'

figma.connect(Divider, '<DIVIDER_URL>', {
  props: {},
  example: () => <Divider />,
})
