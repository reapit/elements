import { AtAGlanceCarousel } from './carousel'
import figma from '@figma/code-connect'

figma.connect(AtAGlanceCarousel, '<AT_A_GLANCE_CAROUSEL_URL>', {
  props: {
    children: figma.children('Card *'),
  },
  example: (props) => <AtAGlanceCarousel columns="<CHANGE ME>">{props.children}</AtAGlanceCarousel>,
})
