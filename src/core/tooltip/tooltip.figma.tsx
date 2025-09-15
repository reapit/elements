import figma from '@figma/code-connect'
import { Tooltip } from './tooltip'

figma.connect(Tooltip, '<TOOLTIP_URL>', {
  props: {
    children: figma.string('Description'),
  },
  example: (props) => (
    <Tooltip id="my-tooltip-id" triggerId="my-trigger-id" truncationTargetId="optional-truncation-target-id">
      {props.children}
    </Tooltip>
  ),
})
