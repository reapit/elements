import { AtAGlance } from './at-a-glance'
import figma from '@figma/code-connect'

figma.connect(AtAGlance, '<AT_A_GLANCE_URL>', {
  props: {
    cards: figma.enum('Variant', {
      Carousel: figma.slot('Carousel slot'),
      Grid: figma.slot('Grid slot'),
    }),
    header: figma.boolean('Show header', {
      true: figma.children('AAG header'),
      false: undefined,
    }),
  },
  example: (props) => (
    <AtAGlance.Listbox>
      {props.header}
      {props.cards}
    </AtAGlance.Listbox>
  ),
})

//
// Deprecated Figma component support.
//

figma.connect(AtAGlance, '<AT_A_GLANCE_URL_DEPRECATED>', {
  props: {
    children: figma.children('*'),
  },
  example: (props) => <AtAGlance.Listbox>{props.children}</AtAGlance.Listbox>,
})
