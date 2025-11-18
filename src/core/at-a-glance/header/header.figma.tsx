import { AtAGlanceHeader } from './header'
import figma from '@figma/code-connect'

figma.connect(AtAGlanceHeader, '<AT_A_GLANCE_HEADER_URL>', {
  props: {
    accessory: figma.boolean('Show accessory', {
      true: figma.instance('Accessory'),
      false: undefined,
    }),
    children: figma.string('Title'),
  },
  example: (props) => <AtAGlanceHeader accessory={props.accessory}>{props.children}</AtAGlanceHeader>,
})
