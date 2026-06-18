import figma from '@figma/code-connect'
import { ButtonCard } from './button-card'
import { Card } from './card'

figma.connect(Card, '<CARD_URL>', {
  variant: { Variant: 'Simple' },
  props: {
    nested: figma.nestedProps('Basic card', {
      isBorderless: figma.boolean('↳ Borderless'),
    }),
  },
  example: (props) => <Card isBorderless={props.nested.isBorderless}>Content</Card>,
})

figma.connect(ButtonCard, '<CARD_URL>', {
  variant: { Variant: 'Interactive' },
  example: () => (
    // NOTE: Use AnchorCard when the card needs to navigate to a URL
    <ButtonCard>Content</ButtonCard>
  ),
})
