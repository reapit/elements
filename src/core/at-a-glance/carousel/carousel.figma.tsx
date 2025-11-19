import { AtAGlance } from '../at-a-glance'
import figma from '@figma/code-connect'

figma.connect(AtAGlance.Carousel, '<AT_A_GLANCE_CAROUSEL_URL>', {
  props: {
    children: figma.children('Card *'),
  },
  example: (props) => (
    <AtAGlance.Carousel columns="<CHANGE ME>">
      {/* Use <AtAGlance.Listbox as={AtAGlance.Carousel}> when children are AtAGlance.ListboxOption. */}
      {props.children}
    </AtAGlance.Carousel>
  ),
})
