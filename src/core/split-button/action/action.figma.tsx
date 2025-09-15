import figma from '@figma/code-connect'
import { SplitButton } from '../split-button'

figma.connect(SplitButton.Action, '<SPLIT_BUTTON_ACTION_URL>', {
  props: {
    children: figma.string('Label'),
    disabled: figma.enum('State', {
      Disabled: true,
    }),
  },
  example: (props) => (
    <SplitButton.Action disabled={props.disabled}>
      {/* Use SplitButton.AnchorAction for main actions that involve navigation */}
      {props.children}
    </SplitButton.Action>
  ),
})
