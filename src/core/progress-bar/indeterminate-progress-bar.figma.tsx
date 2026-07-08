import { IndeterminateProgressBar } from './indeterminate-progress-bar'
import figma from '@figma/code-connect'

figma.connect(IndeterminateProgressBar, '<PROGRESS_BAR_INDETERMINATE_URL>', {
  example: () => <IndeterminateProgressBar aria-label="Loading" />,
})
