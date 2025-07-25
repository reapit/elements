import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElSnack, elSnackIcon, elSnackCloseIcon, ElSnackHolder } from './__styles__'
import { DeprecatedIcon, IconNames } from '../icon'
import { Intent, getIntentClassName } from '../../helpers/intent'

/** @deprecated */
export interface SnackProps extends HTMLAttributes<HTMLDivElement> {
  icon?: IconNames
  intent?: Intent
  className?: string
  onRemove?: () => void // onRemove callback added by the SnackHolder component
  text?: string // used for shorthand snack creation inside the useSnacks hook
  _id?: string //internal identifier to remove snacks after a timeout
}

/** @deprecated */
export interface SnackHolderProps extends HTMLAttributes<HTMLDivElement> {
  snacks: SnackProps[]
  removeSnackById?: (id: string) => void
}

/** @deprecated */
export const SnackHolder: FC<SnackHolderProps> = ({ snacks, removeSnackById, ...rest }) => {
  return (
    <ElSnackHolder {...rest}>
      {snacks &&
        snacks.map(({ text, _id, ...rest }) => (
          <Snack key={_id} onRemove={() => _id && removeSnackById && removeSnackById(_id)} {...rest}>
            {text}
          </Snack>
        ))}
    </ElSnackHolder>
  )
}

/** @deprecated */
export const Snack: FC<SnackProps> = ({ icon, intent = 'primary', className, onRemove, children, ...rest }) => {
  const intentClassName = getIntentClassName(intent)
  const combinedClassName = cx(className, intentClassName)

  return (
    <ElSnack className={combinedClassName} role="status" aria-live="polite" {...rest}>
      {icon && <DeprecatedIcon fontSize="1.25rem" className={elSnackIcon} intent={intent} icon={icon} />}
      {children}
      {onRemove && (
        <DeprecatedIcon
          fontSize="1.25rem"
          className={elSnackCloseIcon}
          data-testid="close-icon"
          onClick={onRemove}
          icon="close"
        />
      )}
    </ElSnack>
  )
}
