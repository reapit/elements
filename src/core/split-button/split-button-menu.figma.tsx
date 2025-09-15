import figma from '@figma/code-connect'
import { SplitButton } from './split-button'

figma.connect(SplitButton.Menu, '<SPLIT_BUTTON_MENU_URL>', {
  props: {
    disabled: figma.enum('State', {
      Disabled: true,
    }),
  },
  example: (props) => (
    <SplitButton.Menu aria-label="Replace me" disabled={props.disabled}>
      TODO: Add menu items
    </SplitButton.Menu>
  ),
})
