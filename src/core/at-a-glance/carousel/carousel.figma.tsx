import { AtAGlance } from '../at-a-glance'
import figma from '@figma/code-connect'

figma.connect(AtAGlance.Carousel, '<AT_A_GLANCE_CAROUSEL_URL>', {
  props: {
    children: figma.children('Card *'),
  },
  example: (props) => (
    // Use <AtAGlance.Listbox as={AtAGlance.Carousel} columns="<CHANGE ME>"> when using
    // `AtAGlance.ListboxOption` as the children.
    <AtAGlance.Carousel columns="<CHANGE ME>">{props.children}</AtAGlance.Carousel>
  ),
})
