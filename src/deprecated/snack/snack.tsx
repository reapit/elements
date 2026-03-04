import React, { FC, HTMLAttributes, ReactNode } from 'react'
import { cx } from '@linaria/core'
import { ElSnack, elSnackIcon, elSnackCloseIcon, ElSnackHolder } from './__styles__'
import { Intent, getIntentClassName } from '../../helpers/intent'
import { CloseIcon } from '#src/icons/close'

/** @deprecated */
export interface SnackProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
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
      {icon && <span className={elSnackIcon}>{icon}</span>}
      {children}
      {onRemove && <CloseIcon className={elSnackCloseIcon} data-testid="close-icon" onClick={onRemove} size="md" />}
    </ElSnack>
  )
}
