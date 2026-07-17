import { MainContainer } from './main-container'
import figma from '@figma/code-connect'

figma.connect(MainContainer, '<MAIN_CONTAINER_URL>', {
  variant: { Breakpoint: 'XS' },
  props: {
    layout: figma.nestedProps('Layout XS', {
      children: figma.slot('Content slot').connectedInstances,
    }),
    size: figma.enum('Container width', {
      Narrow: 'narrow',
      Wide: 'wide',
      Fluid: 'fluid',
    }),
    // We have to invert Bottom padding because our React component's prop is the inverse of the Figma prop
    hasNoBottomPadding: figma.boolean('Bottom padding', {
      true: false,
      false: true,
    }),
    // We have to invert Top padding because our React component's prop is the inverse of the Figma prop
    hasNoTopPadding: figma.boolean('Top padding', {
      true: false,
      false: true,
    }),
  },
  example: (props) => (
    <MainContainer
      hasNoBottomPadding={props.hasNoBottomPadding}
      hasNoTopPadding={props.hasNoTopPadding}
      size={props.size}
      template="single-column"
    >
      {props.layout.children}
    </MainContainer>
  ),
})

figma.connect(MainContainer, '<MAIN_CONTAINER_URL>', {
  variant: { Breakpoint: 'SM' },
  props: {
    layout: figma.nestedProps('Layout SM', {
      children: figma.slot('Content slot').connectedInstances,
      template: figma.enum('Variant', {
        '1': 'single-column',
        '1-1': 'two-columns-symmetrical',
      }),
    }),
    // We have to invert Bottom padding because our React component's prop is the inverse of the Figma prop
    hasNoBottomPadding: figma.boolean('Bottom padding', {
      true: false,
      false: true,
    }),
    // We have to invert Top padding because our React component's prop is the inverse of the Figma prop
    hasNoTopPadding: figma.boolean('Top padding', {
      true: false,
      false: true,
    }),
    size: figma.enum('Container width', {
      Narrow: 'narrow',
      Wide: 'wide',
      Fluid: 'fluid',
    }),
  },
  example: (props) => (
    <MainContainer
      hasNoBottomPadding={props.hasNoBottomPadding}
      hasNoTopPadding={props.hasNoTopPadding}
      size={props.size}
      template={props.layout.template}
    >
      {props.layout.children}
    </MainContainer>
  ),
})

figma.connect(MainContainer, '<MAIN_CONTAINER_URL>', {
  props: {
    layout: figma.nestedProps('Layout MD-2XL', {
      children: figma.slot('Content slot').connectedInstances,
      template: figma.enum('Variant', {
        '1': 'single-column',
        '1-1': 'two-columns-symmetrical',
        '2-1': 'two-columns-asymmetrical-start',
        '1-2': 'two-columns-asymmetrical-end',
        '1-1-1': 'three-columns',
      }),
    }),
    // We have to invert Bottom padding because our React component's prop is the inverse of the Figma prop
    hasNoBottomPadding: figma.boolean('Bottom padding', {
      true: false,
      false: true,
    }),
    // We have to invert Top padding because our React component's prop is the inverse of the Figma prop
    hasNoTopPadding: figma.boolean('Top padding', {
      true: false,
      false: true,
    }),
    size: figma.enum('Container width', {
      Narrow: 'narrow',
      Wide: 'wide',
      Fluid: 'fluid',
    }),
  },
  example: (props) => (
    <MainContainer
      hasNoBottomPadding={props.hasNoBottomPadding}
      hasNoTopPadding={props.hasNoTopPadding}
      size={props.size}
      template={props.layout.template}
    >
      {props.layout.children}
    </MainContainer>
  ),
})
