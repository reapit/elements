import { Avatar } from './avatar'
import figma from '@figma/code-connect'

figma.connect(Avatar, '<AVATAR_CIRCLE_URL>', {
  props: {
    children: figma.children('*'),
    colour: figma.enum('Colour', {
      Default: 'default',
      Primary: 'primary',
    }),
    size: figma.enum('Size', {
      Medium: 'medium',
      Small: 'small',
    }),
  },
  example: (props) => (
    <Avatar colour={props.colour} shape="circle" size={props.size}>
      {props.children}
    </Avatar>
  ),
})

figma.connect(Avatar, '<AVATAR_SQUARE_URL>', {
  props: {
    children: figma.children('*'),
    colour: figma.enum('Colour', {
      Default: 'default',
      Primary: 'primary',
    }),
    size: figma.enum('Size', {
      Medium: 'medium',
      Small: 'small',
    }),
  },
  example: (props) => (
    <Avatar colour={props.colour} shape="square" size={props.size}>
      {props.children}
    </Avatar>
  ),
})
