import figma from '@figma/code-connect'
import { TopBar } from '../top-bar'

figma.connect(TopBar.AvatarMenu, '<TOP_BAR_AVATAR_BUTTON_URL>', {
  props: {
    children: figma.string('Initials'),
  },
  example: (props) => <TopBar.AvatarMenu initials={props.children}>TODO: add menu items</TopBar.AvatarMenu>,
})
