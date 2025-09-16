import figma from '@figma/code-connect'
import { SideBar } from '../side-bar'

figma.connect(SideBar.CollapseButton, '<SIDE_BAR_COLLAPSE_BUTTON_URL>', {
  example: () => <SideBar.CollapseButton />,
})
