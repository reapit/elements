import { ElSpinnerIndicator, ElSpinnerTrack } from './styles'

const SIZE = 32
// Equivalent to --border-width-triple. Kept as a JS constant, not read from the CSS custom property, because the
// radius/circumference math below needs a concrete number at render time.
const STROKE_WIDTH = 4
const RADIUS = (SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const INDICATOR_ARC_LENGTH = CIRCUMFERENCE * 0.25

/**
 * An indeterminate circular spinner, shown on `FileUploaderMediaThumbnail`'s overlay while an item is
 * `processing`, or `uploading` with no known `progress`.
 */
export function FileUploaderSpinner() {
  return (
    <svg aria-hidden height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE}>
      <ElSpinnerTrack cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} strokeWidth={STROKE_WIDTH} />
      <ElSpinnerIndicator
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        strokeDasharray={`${INDICATOR_ARC_LENGTH} ${CIRCUMFERENCE - INDICATOR_ARC_LENGTH}`}
        strokeWidth={STROKE_WIDTH}
      />
    </svg>
  )
}
