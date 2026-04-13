import { MainContainer } from './main-container'
import figma from '@figma/code-connect'

figma.connect(MainContainer, '<MAIN_CONTAINER_MD_2XL_URL>', {
  props: {
    children: figma.slot('Content slot'),
    template: figma.enum('Layout', {
      '1': 'single-column',
      '1-1': 'two-columns-symmetrical',
      '2-1': 'two-columns-asymmetrical-start',
      '1-2': 'two-columns-asymmetrical-end',
      '1-1-1': 'three-columns',
    }),
  },
  example: (props) => (
    <MainContainer size="wide" template={props.template}>
      {props.children}
    </MainContainer>
  ),
})

figma.connect(MainContainer, '<MAIN_CONTAINER_SM_URL>', {
  props: {
    children: figma.slot('Content slot'),
    template: figma.enum('Layout', {
      '1': 'single-column',
      '1-1': 'two-columns-symmetrical',
    }),
  },
  example: (props) => (
    <MainContainer size="wide" template={props.template}>
      {props.children}
    </MainContainer>
  ),
})

figma.connect(MainContainer, '<MAIN_CONTAINER_XS_URL>', {
  props: {
    children: figma.slot('Content slot'),
  },
  example: (props) => (
    <MainContainer size="wide" template="single-column">
      {props.children}
    </MainContainer>
  ),
})
