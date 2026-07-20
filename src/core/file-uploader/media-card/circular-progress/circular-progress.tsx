import { clampPercentage } from '../../clamp-percentage'
import { ElCircularProgressIndicator, ElCircularProgressIndicatorComplete, ElCircularProgressTrack } from './styles'

const SIZE = 32
const CENTER = SIZE / 2
const TRACK_RADIUS = SIZE / 2
const INDICATOR_RADIUS = TRACK_RADIUS - 2

export namespace FileUploaderCircularProgress {
  export interface Props {
    /** The current progress, as a percentage between `0` and `100`. */
    value: number
  }
}

/**
 * A determinate circular progress disk, shown on `FileUploader.MediaCard`'s thumbnail overlay while an item's
 * upload progress is known.
 */
export function FileUploaderCircularProgress({ value }: FileUploaderCircularProgress.Props) {
  const clampedValue = clampPercentage(value)

  return (
    <svg aria-hidden height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE}>
      <ElCircularProgressTrack cx={CENTER} cy={CENTER} r={TRACK_RADIUS} />
      {clampedValue >= 100 ? (
        <ElCircularProgressIndicatorComplete cx={CENTER} cy={CENTER} r={INDICATOR_RADIUS} />
      ) : (
        clampedValue > 0 && <ElCircularProgressIndicator d={getWedgePath(clampedValue)} />
      )}
    </svg>
  )
}

/**
 * The path for a pie wedge, swept clockwise from 12 o'clock, covering `value` percent of the disk.
 */
function getWedgePath(value: number): string {
  const sweepAngle = (value / 100) * 2 * Math.PI
  const startAngle = -Math.PI / 2
  const endAngle = startAngle + sweepAngle

  const startX = CENTER + INDICATOR_RADIUS * Math.cos(startAngle)
  const startY = CENTER + INDICATOR_RADIUS * Math.sin(startAngle)
  const endX = CENTER + INDICATOR_RADIUS * Math.cos(endAngle)
  const endY = CENTER + INDICATOR_RADIUS * Math.sin(endAngle)
  const largeArcFlag = sweepAngle > Math.PI ? 1 : 0

  return `M ${CENTER} ${CENTER} L ${startX} ${startY} A ${INDICATOR_RADIUS} ${INDICATOR_RADIUS} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`
}
