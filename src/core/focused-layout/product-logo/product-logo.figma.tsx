import figma from '@figma/code-connect'
import { FocusedLayout } from '../focused-layout'

figma.connect(FocusedLayout.ProductLogo, '<FOCUSED_LAYOUT_PRODUCT_LOGO_URL>', {
  props: {
    product: figma.enum('Product logo', {
      Reapit: 'Reapit',
      Autoresponder: 'Autoresponder',
      KeyWhere: 'KeyWhere',
      'Lettings BDM': 'Reapit Lettings BDM',
      'Reapit Forms': 'Reapit Forms',
      'Reapit Lettings': 'Reapit Lettings',
      'Reapit PM': 'Reapit PM',
      'Reapit Proposals': 'Reapit Proposals',
      'Reapit Sales': 'Reapit Sales',
      'Reapit Websites': 'Reapit Websites',
      'Reapit Verify': 'Reapit Verify',
    }),
  },
  example: (props) => <FocusedLayout.ProductLogo product={props.product} />,
})
