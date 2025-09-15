import figma from '@figma/code-connect'
import { SupplementaryInfo } from './supplementary-info'

figma.connect(SupplementaryInfo, '<SUPPLEMENTARY_INFO_URL>', {
  props: {
    children: figma.children('Supp text *'),
    size: figma.enum('Size', {
      base: 'base',
      sm: 'sm',
      xs: 'xs',
    }),
  },
  example: (props) => <SupplementaryInfo size={props.size}>{props.children}</SupplementaryInfo>,
})
