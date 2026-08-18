import { clampPercentage } from "../../clamp-percentage";
import {
  ElCircularProgressIndicator,
  ElCircularProgressIndicatorComplete,
  ElCircularProgressTrack,
} from "./styles";

const SIZE = 32;
const CENTER = SIZE / 2;
const TRACK_RADIUS = SIZE / 2;
const INDICATOR_RADIUS = TRACK_RADIUS - 2;
const INDICATOR_STROKE_RADIUS = INDICATOR_RADIUS / 2;
const CIRCUMFERENCE = 2 * Math.PI * INDICATOR_STROKE_RADIUS;

export namespace FileUploaderCircularProgress {
  export interface Props {
    /** The current progress, as a percentage between `0` and `100`. */
    value: number;
  }
}

/**
 * A determinate circular progress disk, shown on `FileUploaderMediaThumbnail`'s overlay while an item's
 * upload progress is known.
 */
export function FileUploaderCircularProgress({ value }: FileUploaderCircularProgress.Props) {
  const clampedValue = clampPercentage(value);
  const dashoffset = CIRCUMFERENCE * (1 - clampedValue / 100);

  return (
    <svg aria-hidden height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE}>
      <ElCircularProgressTrack cx={CENTER} cy={CENTER} r={TRACK_RADIUS} />
      {clampedValue >= 100 ? (
        <ElCircularProgressIndicatorComplete cx={CENTER} cy={CENTER} r={INDICATOR_RADIUS} />
      ) : (
        <ElCircularProgressIndicator
          cx={CENTER}
          cy={CENTER}
          r={INDICATOR_STROKE_RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashoffset}
          strokeWidth={INDICATOR_RADIUS}
          transform={`rotate(-90, ${CENTER}, ${CENTER})`}
        />
      )}
    </svg>
  );
}
