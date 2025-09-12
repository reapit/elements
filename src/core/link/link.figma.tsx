import { Link } from './link'
import figma from '@figma/code-connect'

figma.connect(Link, '<LINK_URL>', {
  props: {
    children: figma.string('Link text'),
    isQuiet: figma.boolean('Quiet'),
    size: figma.enum('Size', {
      base: 'base',
      sm: 'sm',
      xs: 'xs',
    }),
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Reversed: 'reversed',
    }),
  },
  example: (props) => (
    <Link href="#replace-me" isQuiet={props.isQuiet} size={props.size} variant={props.variant}>
      {props.children}
    </Link>
  ),
})
