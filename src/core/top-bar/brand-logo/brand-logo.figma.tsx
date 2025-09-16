import figma from '@figma/code-connect'
import { TopBar } from '../top-bar'

figma.connect(TopBar.BrandLogo, '<TOP_BAR_BRAND_LOGO_URL>', {
  props: {
    brand: figma.enum('Brand', {
      Reapit: 'Reapit',
      'Console Owner': 'Console Owner',
      'Console Pay': 'Console Pay',
      'Console Tenant': 'Console Tenant',
      'Reapit Connect': 'Reapit Connect',
      'Reapit Projector': 'Reapit Projector',
      'Reapit Sales': 'Reapit Sales',
      'Reapit Lettings': 'Reapit Lettings',
      'Reapit PM': 'Reapit PM',
      'PM Demo': 'PM Demo',
      'PM Sales': 'PM Sales',
      'PM Inspect': 'PM Inspect',
      'Reapit Forms': 'Reapit Forms',
      'Reapit Websites': 'Reapit Websites',
      'Reapit Proposals': 'Reapit Proposals',
      KeyWhere: 'KeyWhere',
      'Auto Responder': 'Auto Responder',
    }),
  },
  example: (props) => <TopBar.BrandLogo appName={props.brand} />,
})
