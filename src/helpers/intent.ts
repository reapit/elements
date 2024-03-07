import {
  elIntentPrimary,
  elIntentSuccess,
  elIntentDanger,
  elIntentNeutral,
  elIntentPending,
  elIntentWarning,
  elIntentDefault,
} from '../styles/intent'

export type Intent =
  | 'primary'
  | 'neutral'
  | 'success'
  | 'pending'
  | 'warning'
  | 'danger'
  | 'default'
  | 'secondary'
  | 'critical'
  | 'low'

export const getIntentClassName = (intent: Intent): string => {
  switch (intent) {
    case 'primary':
      return elIntentPrimary
    case 'neutral':
      return elIntentNeutral
    case 'success':
      return elIntentSuccess
    case 'pending':
      return elIntentPending
    case 'warning':
      return elIntentWarning
    case 'danger':
      return elIntentDanger
    default:
      return elIntentDefault
  }
}
