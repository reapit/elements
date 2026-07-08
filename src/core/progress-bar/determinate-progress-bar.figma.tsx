import { DeterminateProgressBar } from './determinate-progress-bar'
import figma from '@figma/code-connect'

figma.connect(DeterminateProgressBar, '<PROGRESS_BAR_DETERMINATE_URL>', {
  example: () => <DeterminateProgressBar aria-label="Progress" value={50} />,
})
