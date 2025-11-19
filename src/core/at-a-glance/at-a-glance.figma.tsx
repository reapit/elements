import { AtAGlance } from './at-a-glance'
import figma from '@figma/code-connect'

figma.connect(AtAGlance, '<AT_A_GLANCE_URL>', {
  props: {
    children: figma.children('*'),
  },
  example: (props) => <AtAGlance.Listbox>{props.children}</AtAGlance.Listbox>,
})
