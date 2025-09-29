import figma from '@figma/code-connect'
import { LabelText } from './label-text'

figma.connect(LabelText, '<LABEL_TEXT_URL>', {
  props: {
    children: figma.string('Label text'),
    isRequired: figma.boolean('Required'),
    size: figma.enum('Size', {
      Small: 'xs',
      Medium: 'sm',
    }),
    variant: figma.enum('Variant', {
      Soft: 'soft',
      Strong: 'strong',
    }),
  },
  example: (props) => (
    <LabelText isRequired={props.isRequired} size={props.size} variant={props.variant}>
      {props.children}
    </LabelText>
  ),
})
