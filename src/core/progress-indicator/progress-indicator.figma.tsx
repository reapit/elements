import { ProgressIndicator } from './progress-indicator'
import figma from '@figma/code-connect'

figma.connect(ProgressIndicator, '<PROGRESS_INDICATOR_DETERMINATE_URL>', {
  example: () => <ProgressIndicator aria-label="Progress" value={50} />,
})

figma.connect(ProgressIndicator, '<PROGRESS_INDICATOR_INDETERMINATE_URL>', {
  example: () => <ProgressIndicator aria-label="Loading" />,
})
